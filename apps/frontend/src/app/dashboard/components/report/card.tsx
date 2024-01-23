import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-wrap: 1;
  max-width: 200px;
  border: 1rem;
  border-color: #f3f1f3;
  border-radius: 10px;
  background: #2b2930;
  padding: 10px 35px 25px 35px;
  width: 100%;
  height: 100px;
`;

export interface CardProps {
  value: number;
  title: string;
}

export const formatCurrency = (value: number) => {
  if (value || value > 0) {
    const valueStrArray: string[] = value.toString().split('');

    const cents = [
      valueStrArray[valueStrArray.length - 2] + valueStrArray[valueStrArray.length - 1],
    ].join('');
    valueStrArray.pop();
    valueStrArray.pop();

    let valueStr = valueStrArray.join('');

    valueStr = valueStr.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    const formattedValue = `${valueStr},${cents}`;

    return formattedValue;
  }
  return '0,00';
};

const Card: React.FC<CardProps> = ({ title, value }) => {
  return (
    <StyledCard>
      <StyledTitle>{title}</StyledTitle>
      <StyledValue type={title === 'Total Balance' ? 'Total Balance' : 'Other'}>
        R$ {formatCurrency(value)}
      </StyledValue>
    </StyledCard>
  );
};

type StyledValueProps = {
  type: 'Total Balance' | 'Other';
};

const StyledValue = styled.h2<StyledValueProps>`
  text-align: center;
  color: ${(props) => (props.type === 'Total Balance' ? '#2F97C1' : '#b6dcfb')};
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
  margin: 0;
  padding: 15px 0px;
`;

const StyledTitle = styled.h2`
  text-align: center;
  color: #c5b9c3;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
  margin: 0;
  padding: 15px 0px;
`;

export default Card;
