'use client';

import { ErrorType } from '@/app/core/types/error-type';
import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { differenceInSeconds } from 'date-fns';
import React from 'react';
import { signIn as signInService, signOut as signOutService } from '../actions';
import { decodeAccessToken, decodeAccessTokenType } from '../helpers/access-token-helper';
import { sleep } from '../helpers/sleep-function';
import { LoginFormType } from '../types/login-form-type';

type InitialStateType = {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  userId: string | null;
  signing: boolean;
  signIn: UseMutateFunction<unknown, ErrorType, LoginFormType, unknown>;
  signOut: () => void;
};

const initialState: InitialStateType = {
  isAuthenticating: false,
  isAuthenticated: false,
  userId: null,
  signing: false,
  signIn: () => {},
  signOut: () => {},
};

const Context = React.createContext(initialState);

type AuthProviderType = (props: { children: React.ReactNode | React.ReactNode[] }) => JSX.Element;

export const AuthProvider: AuthProviderType = ({ children }) => {
  const [isAuthenticating, setIsAuthenticating] = React.useState(true);
  const [userId, setUserId] = React.useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { mutate: signIn, isPending: signing } = useMutation<any, ErrorType, LoginFormType>({
    mutationFn: signInService,
    onSuccess: () => {
      updateAuth();
    },
  });
  const { mutate: signOut } = useMutation({
    mutationFn: signOutService,
    onSettled: () => {
      setUserId(null);
    },
  });
  const updateAuth = async () => {
    let authToken = extractTokenFromStorage();

    const validAccessToken = isAccessTokenValid(authToken);

    if (!validAccessToken) {
      await sleep(50);
      authToken = extractTokenFromStorage();
    }

    if (authToken) {
      const userId = authToken?.id;
      setUserId(userId);
    }

    setIsAuthenticating(false);
  };

  React.useEffect(() => {
    updateAuth();
  }, []);

  return (
    <Context.Provider
      value={{
        isAuthenticating,
        isAuthenticated: !!userId,
        userId: userId,
        signIn,
        signing,
        signOut,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const AUTH_KEY = 'authToken' + process.env.NEXT_PUBLIC_ENVIRONMENT;

export const REFRESH_TOKEN_KEY = 'refreshToken' + process.env.NEXT_PUBLIC_ENVIRONMENT;

export const extractTokenFromStorage = () => {
  const authTokenString = localStorage.getItem('credentials');

  if (authTokenString) {
    const accessToken = decodeAccessToken(authTokenString);

    return accessToken;
  }
  return undefined;
};

export const isAccessTokenValid = (token: decodeAccessTokenType | undefined) => {
  if (!token) {
    return false;
  }

  const diffInSeconds = differenceInSeconds(new Date(token.exp), new Date());

  return diffInSeconds > 0;
};

export const useAuthContext = () => React.useContext(Context);
