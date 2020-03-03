import apiClient from '../ApiClient';

export const DetailsService = {
  fetchDetails: (id) =>
    new Promise((resolve, reject) =>
      apiClient
        .get(`/api/CoursesViewer/GetCourseDetails?courseId=${id}`)
        .then((res) => resolve(res.data))
        .catch((error) => reject(error)),
    ),
};

export default DetailsService;
