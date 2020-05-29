import axios from 'axios';
import jwtDecode from 'jwt-decode';

const apiClient = axios.create({
  baseURL: 'https://localhost:44354/',
  timeout: 100000,
});

apiClient.baseURL = 'https://localhost:44354/';

apiClient.refreshRequestSent = false;

apiClient.fetchCourses = (firstPage, lastPage, caller) => {
  apiClient.get('api/CoursesViewer/GetNumberOfCourses').then(
    (response) => {
      const nrOfCourses = response.data;
      const nrOfPages = Math.ceil(response.data / 4) - 1;
      apiClient
        .get(
          `api/CoursesViewer/GetPagesOfCourses?firstPageNumber=${firstPage}&lastPageNumber=${nrOfPages}&pageSize=4`,
        )
        .then((resp) => {
          const example = [...Array(nrOfCourses).keys()].map((i) => ({
            id: i + 1,
            name: resp.data[i].title,
            date: resp.data[i].date,
          }));
          caller.setState({ exampleItems: example, isLoading: false });
        });
    },
    (error) => {
      caller.setState({ error, isLoading: false });
    },
  );
};

apiClient.login = async (username, password) => {
  const res = await apiClient.post('api/Login/SignIn', {
    username,
    password,
  });

  localStorage.setItem('access_token', res.data.accessToken);
  localStorage.setItem('refresh_token', res.data.refreshToken);

  const { sub, nameid, roles } = jwtDecode(res.data.accessToken);
  apiClient.onLogin(sub, nameid, roles);

  // eslint-disable-next-line consistent-return
  return new Promise((resolve) => {
    resolve(true);
  });
};

apiClient.logout = () => {
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('access_token');
  apiClient.onLogout();
};

apiClient.interceptors.request.use((config) => {
  const newConfig = {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  };

  return newConfig;
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response !== undefined && response.status !== 401) {
      apiClient.setGlobalMessage(response.data.error);
      return Promise.reject(response);
    }

    return new Promise((resolve, reject) => {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      if (!accessToken || !refreshToken) {
        apiClient.logout();
        resolve(false);
      }

      const username = jwtDecode(accessToken).sub;

      apiClient.refreshRequestSent = true;

      apiClient
        .post('api/Login/RefreshToken', {
          username,
          refreshToken,
        })
        .then((resp) => {
          localStorage.setItem('access_token', resp.data.accessToken);
          localStorage.setItem('refresh_token', resp.data.refreshToken);

          resolve(apiClient.request(response.config));
        })
        .catch(() => {
          apiClient.logout();
          reject(new Error('User session expired'));
        });
    });
  },
);

export default apiClient;
