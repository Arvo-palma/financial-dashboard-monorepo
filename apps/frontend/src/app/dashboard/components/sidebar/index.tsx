import { HomeIcon } from '@/app/core/assets/icons/home-icon';
import { LogoutIcon } from '@/app/core/assets/icons/logout-icon';
import { useAuthContext } from '@/app/login/providers/auth-provider';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDataContext } from '../../providers/data-provider';
import { StyledSideBar, StyledSidebarButton } from '../styles/styled-sidebar';

export interface SidebarProps {}
const Sidebar: React.FC<SidebarProps> = () => {
  const router = useRouter();

  const { signOut } = useAuthContext();
  const { applyFilter } = useDataContext();

  return (
    <StyledSideBar>
      <StyledSidebarButton
        onClick={() => {
          localStorage.removeItem('filters');
          applyFilter({
            startDate: null,
            endDate: null,
            states: [],
            industries: [],
            accounts: [],
          });
          router.replace('/');
        }}
      >
        <HomeIcon />
      </StyledSidebarButton>
      <StyledSidebarButton
        onClick={() => {
          signOut();
          router.replace('/login');
        }}
      >
        <LogoutIcon />
      </StyledSidebarButton>
    </StyledSideBar>
  );
};

export default Sidebar;
