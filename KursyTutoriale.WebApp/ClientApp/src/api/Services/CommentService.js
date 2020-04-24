import apiClient from '../ApiClient';

export const CommentService = {
  getComments: (courseId) => {
    return apiClient.get(`api/Comment/GetComments?courseId=${courseId}`);
  },
  addComment: (newComment) => {
    return apiClient.post('api/Comment/AddComment', {newComment});
  },
  resolveReport: (enable, courseID) => {
    return apiClient.put('/api/Comment/EnableComments', {
      enable,
      courseID,
    });
  },
};

export default CommentService;
