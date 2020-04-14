import apiClient from '../ApiClient';

export const CourseProgressService = {
        markProgress: (courseId, lessonId) => {
          return new Promise((resolve, reject) =>
            apiClient
              .post('/api/CourseProgress/MarkProgress', {
                courseId,
                lessonId,
              })
              .then((resp) => resolve(resp))
              .catch((error) => reject(error)),
          );
        },

        getUserCompletedCourses: () => {
            return new Promise((resolve, reject) =>
              apiClient
                .get('/api/CourseProgress/GetUserCompletedCourses')
                .then((resp) => resolve(resp))
                .catch((error) => reject(error)),
            );
          },

          getUserUncompletedCourses: () => {
            return new Promise((resolve, reject) =>
              apiClient
                .get('/api/CourseProgress/GetUserUncompletedCourses')
                .then((resp) => resolve(resp))
                .catch((error) => reject(error)),
            );
          },
};

export default CourseProgressService;