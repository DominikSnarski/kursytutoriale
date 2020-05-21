import apiClient from '../ApiClient';

export const SurveyService = {
  getSurvey: (courseId) => {
    return apiClient.get(
      `api/Survey/GetSurvey?courseId=${courseId}`,
    );
  },
  addSurvey: (courseId) => {
    return apiClient.post(
      `/api/Survey/AddSurvey?ourseId=${courseId}`,
    );
  },
  updateSurvey: (courseId) => {
    return apiClient.put(
      `/api/Survey/UpdateSurvey?ourseId=${courseId}`,
    );
  },
};

export default SurveyService;
