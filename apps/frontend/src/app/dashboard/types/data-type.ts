import { TransactionsByPeriodType } from './transaction-type';

export type DataType = {
  transactionsByPeriod: TransactionsByPeriodType[];
  income: number;
  expenses: number;
  pendingTransactions: number;
  periodBalance: number;
  stateList: string[];
  industryList: string[];
  accountList: string[];
};
