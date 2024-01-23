import { api } from '../../core/libs/axios';
import { SignInErrorType, handleError } from '../helpers/handle-error';
import { LoginFormType } from '../types/login-form-type';

export const signIn = async (props: LoginFormType) => {
  try {
    const { email, password } = props;
    const { data } = await api.post('/login', { email, password });
    localStorage.setItem('credentials', JSON.stringify(data.token));
    window.dispatchEvent(new Event('storage'));
    return data;
  } catch (error) {
    throw handleError(error as SignInErrorType);
  }
};

type SignOutType = () => Promise<void>;
export const signOut: SignOutType = async () => {
  try {
    localStorage.removeItem('credentials');
  } catch (error) {
    throw handleError(error as SignInErrorType);
  }
};
