import React from 'react';
import { useDataContext } from '../../providers/data-provider';
import BoardScreen, { StyledBoardScreen } from './board-screen';
import BoardTitle from './board-title';
import CardGrid from './card-grid';
import ChartBoard from './chart-board';

export interface BoardProps {}
const Board: React.FC<BoardProps> = () => {
  const { startDate, endDate, states, industries, accounts, report } = useDataContext();
  const { income, expenses, pendingTransactions, periodBalance } = report
    ? report
    : { income: 0, expenses: 0, pendingTransactions: 0, periodBalance: 0 };
  const activeFilters = {
    period: !!startDate || !!endDate,
    state: states.length > 0,
    industry: industries.length > 0,
    account: accounts.length > 0,
  };
  return (
    <BoardScreen>
      <StyledBoardScreen>
        <BoardTitle activeFilters={activeFilters} />
        <CardGrid
          report={{
            income,
            expense: expenses,
            pending: pendingTransactions,
            totalBalance: periodBalance,
          }}
        />
        <ChartBoard data={report} />
        {/* <StackedBarChart />
      <LineChart /> */}
      </StyledBoardScreen>
    </BoardScreen>
  );
};

export default Board;
