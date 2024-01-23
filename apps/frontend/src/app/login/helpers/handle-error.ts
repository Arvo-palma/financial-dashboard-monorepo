export type SignInErrorType = { response: { data: { status: string; message: string } } };

type HandleErrorType = (
  error: SignInErrorType,
  options?: { defaultMessage?: string }
) => {
  code?: string;
  message?: string;
};

export const handleError: HandleErrorType = (error, options) => {
  console.log({ error });
  if (
    error?.response?.data?.status?.includes('fail') ||
    error?.response?.data?.message?.includes('Invalid email or password!')
  ) {
    return {
      code: 'E_INVALID_CREDENTIALS',
      message: 'Nome de usuário ou senha incorretos',
    };
  }

  return {
    error: error || options?.defaultMessage,
  };
};
