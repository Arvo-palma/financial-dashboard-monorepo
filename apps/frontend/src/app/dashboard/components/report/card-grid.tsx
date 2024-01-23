import React from 'react';
import styled from 'styled-components';
import Card from './card';

export interface CardGridProps {
  report: { income: number; expense: number; pending: number; totalBalance: number };
}

export const StyledGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  gap: 0.5rem;
  justify-content: space-evenly;
`;

const CardGrid: React.FC<CardGridProps> = ({
  report: { income, expense, pending, totalBalance },
}) => {
  return (
    <StyledGrid>
      <Card value={income} title="Incomes" />
      <Card value={expense} title="Expenses" />
      <Card value={pending} title="Pendings" />
      <Card value={totalBalance} title="Total Balance" />
    </StyledGrid>
  );
};

export default CardGrid;
