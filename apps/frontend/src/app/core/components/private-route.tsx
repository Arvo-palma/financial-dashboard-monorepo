'use client';
import { useAuthContext } from '@/app/login/providers/auth-provider';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import Column from './column';

export type PrivateRouteProps = {
  children: React.ReactNode | React.ReactNode[];
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isAuthenticating } = useAuthContext();
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const shouldProtectRoute = !isAuthenticating && !isAuthenticated && !isPublicRoute;

  React.useEffect(() => {
    if (shouldProtectRoute) {
      router.replace(LOGIN_ROUTE);
    }
  }, [shouldProtectRoute]);

  if (shouldProtectRoute) {
    return (
      <Column className="items-center justify-center h-screen">
        {/* <SpinnerIcon width={24} height={24} /> */}
        Carregando...
      </Column>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;

const LOGIN_ROUTE = '/login';
const PUBLIC_ROUTES = [LOGIN_ROUTE];
