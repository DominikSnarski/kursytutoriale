import apiClient from '../ApiClient';

export const StatisticsService = {
  getCreatedCoursesData: () =>
    new Promise((resolve, reject) =>
      apiClient
        .get(`/api/Statistics/GetCreatedCoursesData`)
        .then((res) => resolve(res.data))
        .catch((error) => reject(error)),
    ),

    getCreatedAccountsData: () =>
    new Promise((resolve, reject) =>
      apiClient
        .get(`/api/Statistics/GetCreatedAccountsData`)
        .then((res) => resolve(res.data))
        .catch((error) => reject(error)),
    ),

    getSignInData: () =>
    new Promise((resolve, reject) =>
      apiClient
        .get(`/api/Statistics/GetSignInData`)
        .then((res) => resolve(res.data))
        .catch((error) => reject(error)),
    ),

    getDailySignInData: () =>
    new Promise((resolve, reject) =>
      apiClient
        .get(`/api/Statistics/GetDailySignInData`)
        .then((res) => resolve(res.data))
        .catch((error) => reject(error)),
    ),

    getParticipantsData: () =>
    new Promise((resolve, reject) =>
      apiClient
        .get(`/api/Statistics/GetParticipantsData`)
        .then((res) => resolve(res.data))
        .catch((error) => reject(error)),
    ),

    getProgressData: () =>
    new Promise((resolve, reject) =>
      apiClient
        .get(`/api/Statistics/GetProgressData`)
        .then((res) => resolve(res.data))
        .catch((error) => reject(error)),
    ),

};

export default StatisticsService;