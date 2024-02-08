import Show from '@/app/core/components/show';
import React from 'react';
import styled from 'styled-components';
import { DataType } from '../../types/data-type';
import { ChartLoader } from '../styles/chart-loader';
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
      <Show when={!!data} fallback={<ChartLoader>...</ChartLoader>}>
        <BarChartContainer data={data?.transactionsByPeriod} />
        <LineChartContainer data={data?.transactionsByPeriod} />
      </Show>
    </StyledChartBoard>
  );
};

export default ChartBoard;
