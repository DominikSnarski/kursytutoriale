import apiClient from '../ApiClient';

const AuthService = {
  createAccount: (username, password, email) =>
    apiClient.post('/api/Login/SignUp', {
      username,
      password,
      email,
    }),
    confirmEmail: (code) =>
    apiClient.post(`/api/Login/ConfirmEmail?code=${code}`   
    ),

    forgotPassword: (email) =>
    apiClient.post(`/api/Login/ForgotPassword?email=${email}`   
    ),

    changePassword: (token,password) =>
    apiClient.post('/api/Login/ChangePassword', {
      token,
      password,
    }),


};

export default AuthService;
