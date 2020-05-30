import apiClient from '../ApiClient';

const AuthService = {
  createAccount: (username, password, email) =>
    apiClient
      .post('/api/Login/SignUp', {
        username,
        password,
        email,
      })
      .then(() => apiClient.login(username, password)),
};

export default AuthService;
