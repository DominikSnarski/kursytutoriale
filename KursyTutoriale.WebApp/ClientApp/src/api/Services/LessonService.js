import apiClient from '../ApiClient';

export const LessonService = {
  addLesson: (courseID, moduleID, title, content) => {
    return new Promise((resolve, reject) =>
      apiClient
        .post('/api/CourseCreator/AddLesson', {
          courseID,
          moduleID,
          title,
          content,
        })
        .then((resp) => resolve(resp))
        .catch((error) => reject(error)),
    );
  },
  editLesson: (courseId, lessonId, title, description, content) => {
    return new Promise((resolve, reject) =>
      apiClient
        .post('/api/CourseCreator/EditLesson', {
          courseId,
          lessonId,
          title,
          description,
          content,
        })
        .then((resp) => resolve(resp))
        .catch((error) => reject(error)),
    );
  },
};

export default LessonService;
