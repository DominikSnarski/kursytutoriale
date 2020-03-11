import apiClient from '../ApiClient';

export const AdminService = {
  getUsersList: () =>
    new Promise((resolve, reject) =>
      apiClient
        .get(`api/Admin/GetListOfUsers`)
        .then((res) => resolve(res.data))
        .catch((error) => reject(error)),
    ),
};

export default AdminService;
