import axios from 'axios';
import jwtDecode from 'jwt-decode';
import UserContext from '../Context/UserContext';

const apiClient = axios.create({
    baseURL: 'https://localhost:44354/',
    timeout: 100000
});

apiClient.baseURL = 'https://localhost:44354/';

apiClient.login = async (username, password)=>{
    var res = await apiClient.post("api/Login/SignIn", {
        username: username,
        password: password
      });

      localStorage.setItem("access_token",res.data.accessToken);
      localStorage.setItem("refresh_token",res.data.refreshToken);

      let name = jwtDecode(res.data.accessToken)["sub"];
      apiClient.onLogin(name);
}

apiClient.logout = () =>{
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");
    apiClient.onLogout();
}

apiClient.interceptors.request.use(
    function(config){
        config.headers["Authorization"] = "Bearer " + localStorage.getItem("access_token"); 

        return config;
    }
)

apiClient.interceptors.response.use(
    response => {return response;},
    error=>{
        let response = error.response;

        if(response.status !== 401){
            return new Promise((resolve, reject) => {
                reject(error);
              });
        }

        return new Promise((resolve,reject)=>{

            let accessToken = localStorage.getItem("access_token");
            let refreshToken = localStorage.getItem("refresh_token");
            let username = jwtDecode(accessToken)["sub"];

            apiClient.post("api/Login/RefreshToken", {
                username: username,
                refreshToken: refreshToken
              })
              .then(resp =>{
                localStorage.setItem("access_token",resp.data.accessToken);
                  localStorage.setItem("refresh_token",resp.data.refreshToken);

                 resolve(apiClient.request(response.config));
              })
              .catch(error=>{
                  apiClient.logout();
                  reject("User session expired");
              });
        });
    }
)

export default apiClient;