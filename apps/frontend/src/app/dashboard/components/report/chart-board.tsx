import React from 'react';
import styled from 'styled-components';
import { DataType } from '../../types/data-type';
import { BarChartContainer } from './bar-chart-container';
import { LineChartContainer } from './line-chart-container';

const StyledChartBoard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
  padding: 10px 10px;
`;

export interface ChartBoardProps {
  data?: DataType;
}
const ChartBoard: React.FC<ChartBoardProps> = ({ data }) => {
  return (
    <StyledChartBoard>
      <BarChartContainer data={data?.transactionsByPeriod} />
      <LineChartContainer data={data?.transactionsByPeriod} />
    </StyledChartBoard>
  );
};

export default ChartBoard;
