import apiClient from '../ApiClient';

export const AdminService = {
  getUsersList: () =>
    new Promise((resolve, reject) =>
      apiClient
        .get(`api/Admin/GetListOfUsers`)
        .then((res) => resolve(res.data))
        .catch((error) => reject(error)),
    ),

    promoteToModerator: (userId) => {
      return new Promise((resolve, reject) =>
        apiClient
          .post(`/api/Admin/PromoteToModerator?userId=${userId}`)
          .then((resp) => resolve(resp))
          .catch((error) => reject(error)),
      );
    },

    removeModerator: (moderatorId) => {
      return new Promise((resolve, reject) =>
        apiClient
          .delete(`/api/Admin/RemoveModerator?moderatorId=${moderatorId}`)
          .then((resp) => resolve(resp))
          .catch((error) => reject(error)),
      );
    },

    getCoursesForVerification: (NrOfCourses) => {
      return new Promise((resolve, reject) =>
        apiClient
          .post(`/api/Moderator/GetCoursesForVerification?NrOfCourses=${NrOfCourses}`)
          .then((resp) => resolve(resp))
          .catch((error) => reject(error)),
      );
    },
};

export default AdminService;
