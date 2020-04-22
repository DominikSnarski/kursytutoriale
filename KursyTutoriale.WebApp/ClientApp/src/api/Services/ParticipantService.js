import apiClient from '../ApiClient';

export const ParticipantService = {
  addParticipant: (courseId) => {
    return new Promise((resolve, reject) =>
      apiClient
        .post(`/api/Participant/AddParticipant?courseId=${courseId}`)
        .then((resp) => resolve(resp))
        .catch((error) => reject(error)),
    );
  },
  removeParticipant: (courseId) => {
    return new Promise((resolve, reject) =>
      apiClient
        .delete(`/api/Participant/RemoveParticipant?courseId=${courseId}`)
        .then((resp) => resolve(resp))
        .catch((error) => reject(error)),
    );
  },
  isParticipating: (courseId) => {
    return new Promise((resolve, reject) =>
      apiClient
        .get(`/api/Participant/IsParticipating?courseId=${courseId}`)
        .then((resp) => resolve(resp))
        .catch((error) => reject(error)),
    );
  },
};

export default ParticipantService;