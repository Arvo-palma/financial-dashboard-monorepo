import { api } from '@/app/core/libs/axios';
import { GetTransactionsErrorType, handleError } from '../helpers/handle-error';
import { DataType } from '../types/data-type';

export const getTransactions = async (params: string): Promise<DataType> => {
  try {
    const token = localStorage.getItem('credentials');

    const { data } = await api.get('/transactions?' + params, {
      headers: {
        Authorization: ('bearer ' + token).replaceAll('"', ''),
      },
    });

    return data;
  } catch (error) {
    throw handleError(error as GetTransactionsErrorType);
  }
};
