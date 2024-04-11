import Cookies from 'js-cookie';

export const setAuthToken = (token) => {
  Cookies.set('authToken', token, { expires: 7, secure: true, sameSite: 'Strict' }); // Enhance cookie security
};

export const clearAuthToken = () => {
  Cookies.remove('authToken');
};
