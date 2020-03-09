import apiClient from '../ApiClient';

export const UserService = {
  getUserFromContext: () =>
    new Promise((resolve, reject) =>
      apiClient
        .get('/getProfile')
        .then((res) => resolve(res.data))
        .catch((error) => reject(error)),
    ),
  getUserProfileById: (id) =>
    new Promise((resolve, reject) =>
      apiClient
        .get(`/getProfileById?id=${id}`)
        .then((res) => resolve(res.data))
        .catch((error) => reject(error)),
    ),
};

export default UserService;
