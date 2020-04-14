import apiClient from '../ApiClient';

export const ObserverService = {
  observe: (courseId) => {
    return new Promise((resolve, reject) =>
      apiClient
        .post(`/api/Observer/Observe?courseId=${courseId}`)
        .then((resp) => resolve(resp))
        .catch((error) => reject(error)),
    );
  },
  unobserve: (courseId) => {
    return new Promise((resolve, reject) =>
      apiClient
        .delete(`/api/Observer/Unobserve?courseId=${courseId}`)
        .then((resp) => resolve(resp))
        .catch((error) => reject(error)),
    );
  },
  isObserving: (courseId) => {
    return new Promise((resolve, reject) =>
      apiClient
        .get(`/api/Observer/IsObserving?courseId=${courseId}`)
        .then((resp) => resolve(resp))
        .catch((error) => reject(error)),
    );
  },
};

export default ObserverService;