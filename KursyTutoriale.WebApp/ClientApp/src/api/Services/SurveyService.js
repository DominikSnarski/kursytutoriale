import apiClient from '../ApiClient';

export const SurveyService = {
  getSurvey: (courseId) => {
    return apiClient.get(`api/Survey/GetSurvey?courseId=${courseId}`);
  },
  addSurvey: (courseId) => {
    return new Promise((resolve, reject) =>
      apiClient
        .post(`//api/Survey/AddSurvey?courseId=${courseId}`)
        .then((resp) => resolve(resp))
        .catch((error) => reject(error)),
    );
  },
  updateSurvey: (courseId, Content, Answers) => {
    return new Promise((resolve, reject) =>
      apiClient
        .put(`//api/Survey/UpdateSurvey?courseId=${courseId}`, {
          id: courseId,
          content: Content,
          answers: Answers,
        })
        .then((resp) => resolve(resp))
        .catch((error) => reject(error)),
    );
  },
};

export default SurveyService;
