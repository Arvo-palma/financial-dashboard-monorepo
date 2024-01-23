import React from 'react';
import styled from 'styled-components';

const StyledBoardTitle = styled.h1`
  color: #f3f1f3;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
`;

export interface BoardTitleProps {
  activeFilters: {
    period: boolean;
    state: boolean;
    industry: boolean;
    account: boolean;
  };
}
const BoardTitle: React.FC<BoardTitleProps> = () => {
  // TO DO: Dynamic Title
  return <StyledBoardTitle>General Balance</StyledBoardTitle>;
};

export default BoardTitle;
