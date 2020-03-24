import apiClient from '../ApiClient';

export const ModuleService = {
  addModule: (courseID, title, description, imageDeleteMePlease) => {
    return new Promise((resolve, reject) =>
      apiClient
        .post('/api/CourseCreator/AddCourseModule', {
          courseID,
          title,
          description,
          imageDeleteMePlease,
        })
        .then((resp) => resolve(resp))
        .catch((error) => reject(error)),
    );
  },
};

export default ModuleService;
