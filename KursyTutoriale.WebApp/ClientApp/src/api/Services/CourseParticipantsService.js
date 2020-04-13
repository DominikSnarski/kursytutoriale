import apiClient from '../ApiClient';

export const CourseParticipantsService = {
  joinCourse: (CourseId,UserId) => {
    return new Promise((resolve, reject) =>
      apiClient
        .post('/api/CourseParticipants/JoinCourse', {
            CourseId,
            UserId,
        })
        .then((resp) => resolve(resp))
        .catch((error) => reject(error)),
    );
  },
  leaveCourse: (CourseId,UserId) => {
    return new Promise((resolve, reject) =>
      apiClient
        .post('/api/CourseParticipants/LeaveCourse', {
            CourseId,
            UserId,
        })
        .then((resp) => resolve(resp))
        .catch((error) => reject(error)),
    );
  },
  isParticipating: (CourseId,UserId) => {
    return new Promise((resolve, reject) =>
      apiClient
        .post('/api/CourseParticipants/IsParticipating', {
            CourseId,
            UserId,
        })
        .then((resp) => resolve(resp))
        .catch((error) => reject(error)),
    );
  },
};

export default CourseParticipantsService;