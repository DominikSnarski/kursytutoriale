import axios from 'axios';
import jwtDecode from 'jwt-decode';

const apiClient = axios.create({
    baseURL: 'https://localhost:44354/',
    timeout: 100000
});

apiClient.baseURL = 'https://localhost:44354/';

apiClient.fetchCourses=(first_page,last_page, caller)=>{
     apiClient.get('api/CoursesViewer/GetNumberOfCourses')
    .then(response => {  
        var nrOfCourses=response.data;
        var nrOfPages=Math.ceil(response.data/4)-1;
        apiClient.get('api/CoursesViewer/GetPagesOfCourses?firstPageNumber='+first_page+'&lastPageNumber='+nrOfPages+'&pageSize=4')
        .then(response => {  
            var example=[...Array(nrOfCourses).keys()].map(i => ({ id: (i + 1), name: response.data[i].title, date: response.data[i].date }));
            caller.setState({ exampleItems: example, isLoading: false });  

        });

    }, error => {caller.setState({ error, isLoading: false })});
    }

apiClient.login = async (username, password)=>{
    var res = await apiClient.post("api/Login/SignIn", {
        username: username,
        password: password
      })
      .catch(e=>{
          return new Promise((resolve,reject)=>{
            reject(false);
          });
        }
      );

      localStorage.setItem("access_token",res.data.accessToken);
      localStorage.setItem("refresh_token",res.data.refreshToken);

      let name = jwtDecode(res.data.accessToken)["sub"];
      let nameid = jwtDecode(res.data.accessToken)["nameid"];
      apiClient.onLogin(name,nameid);

      return new Promise((resolve,reject)=>{
        resolve(true);
      });
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
                apiClient.setGlobalMessage(response.data);
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