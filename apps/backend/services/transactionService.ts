const Transaction = require("../models/Transaction.ts");
const { format } = require("date-fns");

const queryFilterToMongoDBFilter = (query) => {
  let queryStr = JSON.stringify(query);
  let isMultiOption = false;
  // Convert query operator to mongodb operator:
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt|ne|in)\b/g, (match) => {
    if (match === "in") {
      isMultiOption = true;
    }
    return `$${match}`;
  });

  const queryObj = JSON.parse(queryStr);

  // Create an array of options to filter:
  if (isMultiOption) {
    Object.keys(queryObj).map((filter) => {
      if (!!queryObj[filter]["$in"]) {
        const strArray = queryObj[filter]["$in"];

        const arrayOptions = strArray
          .split("[")[1]
          .split("]")[0]
          .split(",")
          .map((option) => option.replace(/'/g, ""));

        queryObj[filter]["$in"] = arrayOptions;
      }
    });
  }

  // Change de string values to number in date filter:
  if (Object.keys(queryObj).some((key) => key === "date")) {
    const filters = queryObj["date"];
    let newFilters = {};
    Object.keys(filters).map(
      (filterKey) =>
        (newFilters[filterKey.replace(/['"]/g, "")] = parseInt(
          filters[filterKey]
        ))
    );

    queryObj["date"] = newFilters;
  }

  return queryObj;
};

const calculateIncome = (transactions) => {
  const income = transactions.reduce(
    (acc, transaction) =>
      transaction.transaction_type === "deposit"
        ? acc + parseInt(transaction.amount)
        : acc,
    0
  );
  return income;
};

const calculateExpenses = (transactions) => {
  const expenses = transactions.reduce(
    (acc, transaction) =>
      transaction.transaction_type === "withdraw"
        ? acc + parseInt(transaction.amount)
        : acc,
    0
  );
  return expenses;
};

const calculatePendingTransactions = (transactions) => {
  const now = new Date().getTime() / 1000;

  const pendingValue = transactions.reduce(
    (acc, transaction) =>
      transaction.date <= now
        ? transaction.transaction_type === "deposit"
          ? acc + parseInt(transaction.amount)
          : acc - parseInt(transaction.amount)
        : acc,
    0
  );
  return pendingValue;
};

const convertEpochToSingleDate = (epoch: number, timezone: string): string => {
  const timestamp = new Date(epoch);

  const formattedDate = format(timestamp, "MM/dd/yyyy, h:mm:ss a zzz", {
    timeZone: timezone,
  });

  const date = formattedDate.split(",")[0];

  return date;
};

const convertEpochToPeriod = (epoch, timezone, period, firstDate) => {
  let periodName = undefined;
  const periodObj = {
    p_1: firstDate + period,
    p_2: firstDate + 2 * period,
    p_3: firstDate + 3 * period,
    p_4: firstDate + 4 * period,
    p_5: firstDate + 5 * period,
    p_6: firstDate + 6 * period,
    p_7: firstDate + 7 * period,
    p_8: firstDate + 8 * period,
    p_9: firstDate + 9 * period,
    p_10: firstDate + 10 * period,
    p_11: firstDate + 11 * period,
    p_12: firstDate + 12 * period,
  };
  for (const key of Object.keys(periodObj)) {
    if (epoch <= periodObj[key]) {
      const lastKey = parseInt(key.split("_")[1]) - 1;
      const lastValue = periodObj[`p_${lastKey}`];
      const lastDate = lastValue ?? firstDate;
      const periodStart = convertEpochToSingleDate(lastDate, timezone);
      const periodEnd = convertEpochToSingleDate(periodObj[key], timezone);
      periodName = lastValue ? periodEnd : periodStart;
      break;
    }
  }
  return periodName;
};

const calculateTxPeriod = (transactions) => {
  // Checks if transactions period is too short:
  const sortedTransactions = transactions.sort((a, b) => a.date - b.date);
  const targetTimezone = "America/New_York";

  const firstDate = sortedTransactions[0].date;
  const lastDate = sortedTransactions[sortedTransactions.length - 1].date;

  let transactionsByPeriod = [];
  // If period is too short, define period by days:
  if (lastDate - firstDate < 1036800) {
    const daysList = [];
    sortedTransactions.map((tx) => {
      const formattedDate = convertEpochToSingleDate(tx.date, targetTimezone);
      // Add new dates to result by periods list:
      if (!daysList.includes(formattedDate)) {
        daysList.push(formattedDate);
        transactionsByPeriod.push({
          period: formattedDate,
          withdraw: tx.transaction_type === "deposit" ? 0 : parseInt(tx.amount),
          deposit: tx.transaction_type === "withdraw" ? 0 : parseInt(tx.amount),
          periodBalance: parseInt(tx.amount),
        });
      } else {
        // Update already added periods in list:
        const periodDoc = transactionsByPeriod.find(
          (doc) => doc.period === formattedDate
        );
        const periodDocIndex = transactionsByPeriod.findIndex(
          (doc) => doc.period === formattedDate
        );
        const newDoc = {
          period: formattedDate,
          withdraw:
            tx.transaction_type === "deposit"
              ? periodDoc.withdraw
              : periodDoc.withdraw + parseInt(tx.amount),
          deposit:
            tx.transaction_type === "withdraw"
              ? periodDoc.deposit
              : periodDoc.deposit + parseInt(tx.amount),
          periodBalance:
            tx.transaction_type === "deposit"
              ? periodDoc.periodBalance + parseInt(tx.amount)
              : periodDoc.periodBalance - parseInt(tx.amount),
        };

        transactionsByPeriod.splice(periodDocIndex, 1);
        transactionsByPeriod = [...transactionsByPeriod, newDoc];
      }
    });

    return transactionsByPeriod;
  }
  // If period is long, divide period and group in smaller parts:
  const period = (lastDate - firstDate) / 12;

  const periodList = [];
  sortedTransactions.map((tx) => {
    const formattedPeriod = convertEpochToPeriod(
      tx.date,
      targetTimezone,
      period,
      firstDate
    );
    // Add new dates to result by periods list:
    if (formattedPeriod && !periodList.includes(formattedPeriod)) {
      periodList.push(formattedPeriod);
      transactionsByPeriod.push({
        period: formattedPeriod,
        withdraw: tx.transaction_type === "deposit" ? 0 : parseInt(tx.amount),
        deposit: tx.transaction_type === "withdraw" ? 0 : parseInt(tx.amount),
        periodBalance: parseInt(tx.amount),
      });
    } else {
      // Update already added periods in list:
      const periodDoc = transactionsByPeriod.find(
        (doc) => doc.period === formattedPeriod
      );
      const periodDocIndex = transactionsByPeriod.findIndex(
        (doc) => doc.period === formattedPeriod
      );
      const newDoc = {
        period: formattedPeriod,
        withdraw:
          tx.transaction_type === "deposit"
            ? periodDoc.withdraw
            : periodDoc.withdraw + parseInt(tx.amount),
        deposit:
          tx.transaction_type === "withdraw"
            ? periodDoc.deposit
            : periodDoc.deposit + parseInt(tx.amount),
        periodBalance:
          tx.transaction_type === "deposit"
            ? periodDoc.periodBalance + parseInt(tx.amount)
            : periodDoc.periodBalance - parseInt(tx.amount),
      };

      transactionsByPeriod.splice(periodDocIndex, 1);
      transactionsByPeriod = [...transactionsByPeriod, newDoc];
    }
  });

  return transactionsByPeriod;
};

const transactionService = async (req) => {
  const { query } = req;
  const queryObj = queryFilterToMongoDBFilter(query);

  const transactions = await Transaction.find(queryObj);

  if (transactions.length <= 0) {
    return {
      transactionsByPeriod: [],
      income: 0,
      expenses: 0,
      pendingTransactions: 0,
      periodBalance: 0,
      stateList: [],
      industryList: [],
      accountList: [],
    };
  }

  const income = calculateIncome(transactions);

  const expenses = calculateExpenses(transactions);

  const pendingTransactions = calculatePendingTransactions(transactions);

  const periodBalance = income - expenses;

  let stateList: string[] = [];
  let industryList: string[] = [];
  let accountList: string[] = [];

  transactions.map((tx) => {
    if (!stateList.includes(tx.state)) {
      stateList = [...stateList, tx.state];
    }
    if (!industryList.includes(tx.industry)) {
      industryList = [...industryList, tx.industry];
    }
    if (!accountList.includes(tx.account)) {
      accountList = [...accountList, tx.account];
    }
  });

  const transactionsByPeriod = calculateTxPeriod(transactions);

  return {
    transactionsByPeriod,
    income,
    expenses,
    pendingTransactions,
    periodBalance,
    stateList,
    industryList,
    accountList,
  };
};

module.exports = transactionService;
