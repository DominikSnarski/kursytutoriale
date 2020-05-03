import apiClient from '../ApiClient';

export const CommentService = {
  getComments: (courseId) => {
    return apiClient.get(`api/Comment/GetComments?courseId=${courseId}`);
  },
  addComment: (newComment, courseId) => {
    return apiClient.post(`api/Comment/AddComment?courseId=${courseId}`, {
      content: newComment,
    });
  },
  resolveReport: (enable, courseID) => {
    return apiClient.put('/api/Comment/EnableComments', {
      enable,
      courseID,
    });
  },
};

export default CommentService;
