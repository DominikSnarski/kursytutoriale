import apiClient from '../ApiClient';

export const CommentService = {
  getComments: (courseId) => {
    return apiClient.get(`api/Comment/GetComments?courseId=${courseId}`);
  },
  addComment: (content, courseID) => {
    return new Promise((resolve, reject) =>
      apiClient
        .post('/api/Comment/AddComment', { content, courseID })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error)),
    );
  },
  resolveReport: (enable, courseID) => {
    return apiClient.put('/api/Comment/EnableComments', {
      enable,
      courseID,
    });
  },
};

export default CommentService;
