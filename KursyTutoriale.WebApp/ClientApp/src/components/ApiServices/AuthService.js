import apiClient from "../Auth/ApiClient"

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