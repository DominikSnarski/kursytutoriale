import apiClient from '../ApiClient';

export const LessonService = {
  addLesson: (courseID, moduleID, title, content) => {
    return new Promise((resolve, reject) =>
      apiClient
        .post('/api/CourseCreator/AddLesson', {
          courseID,
          moduleID,
          title,
          content
        })
        .then((resp) => resolve(resp))
        .catch((error) => reject(error)),
    );
  },
};

export default LessonService;
