export type GetTransactionsErrorType = { response: { data: { error: string } } };

type HandleErrorType = (
  error: GetTransactionsErrorType,
  options?: { defaultMessage?: string }
) => {
  code?: string;
  message?: string;
};

export const handleError: HandleErrorType = (error) => {
  return {
    code: '404',
    message: error.response.data.error,
  };
};
