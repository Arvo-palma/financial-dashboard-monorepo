'use client';
import { StyledMain } from '@/app/core/components/styles/styled-column';
import { DataProvider } from '@/app/dashboard/providers/data-provider';
import { decodeAccessToken } from '@/app/login/helpers/access-token-helper';
import { GetServerSideProps } from 'next';

import { DashboardBody } from './dashboard-body';
import FilterBar from './filter-bar';
import Report from './report';
import Sidebar from './sidebar';

export interface DashboardProps {}

const DashboardScreen: React.FC<DashboardProps> = () => {
  return (
    <DataProvider>
      <StyledMain>
        <Sidebar />
        <DashboardBody>
          <FilterBar />
          <Report />
        </DashboardBody>
      </StyledMain>
    </DataProvider>
  );
};

export default DashboardScreen;

export const getServerSideProps: GetServerSideProps<DashboardProps> = async (context) => {
  const { req } = context;
  const { cookies } = req;
  const accessToken = cookies['token'];
  const { id } = accessToken ? decodeAccessToken(accessToken) : { id: null };

  return { props: { id } };
};
