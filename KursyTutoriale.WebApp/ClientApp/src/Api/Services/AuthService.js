import apiClient from "../ApiClient"

const AuthService = {
    createAccount: (username,password,email)=>{
        return apiClient.post(
            '/api/Login/SignUp',
            {
                username,password,email
            });
    }
}

export default AuthService;