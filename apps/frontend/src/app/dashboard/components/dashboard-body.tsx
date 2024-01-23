import React from 'react';
import styled from 'styled-components';

export interface DashboardBodyProps {
  children: React.ReactNode;
}

const Body: React.FC<DashboardBodyProps> = ({ children }) => {
  return <div>{children}</div>;
};

export const DashboardBody = styled(Body)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
