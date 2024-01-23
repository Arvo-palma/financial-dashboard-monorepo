'use client';
import Button from '@/app/core/components/button';
import { StyledColumn } from '@/app/core/components/styles/styled-column';
import { required } from '@/app/core/helpers/react-hook-form-rules';
import { ErrorType } from '@/app/core/types/error-type';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useForm } from '../hooks';
import { useShowMessage } from '../hooks/use-show-message';
import { useAuthContext } from '../providers/auth-provider';
import { LoginFormType } from '../types/login-form-type';
import EmailInput from './email-input';
import Form from './form';
import PasswordInput from './password-input';

export interface LoginFormProps {}
const LoginForm: React.FC<LoginFormProps> = () => {
  const router = useRouter();
  const { showError } = useShowMessage();
  const { signIn, isAuthenticated } = useAuthContext();
  const { register, handleSubmit, getError } = useForm<LoginFormType>();
  const onSubmit: SubmitHandler<LoginFormType> = (values) =>
    signIn(values, {
      onError: (err: ErrorType) => showError(err?.message),
    });
  React.useEffect(() => {
    if (isAuthenticated) router.replace('/');
  }, [isAuthenticated]);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <EmailInput
          direction="column"
          testId="login-email-input"
          label="Email"
          error={getError('email')}
          required={true}
          {...register('email', { required })}
        />
        <PasswordInput
          direction="column"
          testId="login-password-input"
          label="Senha"
          error={getError('password')}
          required={true}
          {...register('password', { required })}
        />
        <StyledColumn>
          <Button intent="primary" label="Entrar" pending={false} />
        </StyledColumn>
      </Form>
    </>
  );
};

export default LoginForm;
