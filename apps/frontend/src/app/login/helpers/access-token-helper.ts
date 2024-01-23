import { jwtDecode } from 'jwt-decode';

export type decodeAccessTokenType = {
  id: string;
  iat: number;
  exp: number;
};
export const decodeAccessToken = (accessToken: string): decodeAccessTokenType => {
  try {
    if (accessToken) {
      const decodedToken: decodeAccessTokenType = jwtDecode(accessToken);
      return decodedToken;
    }
  } catch (error) {
    console.error(error);
  }
  return {
    id: '',
    iat: 0,
    exp: 0,
  };
};
