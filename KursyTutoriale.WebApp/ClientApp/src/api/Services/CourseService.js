import apiClient from '../ApiClient';

export const CourseService = {
  getCoursePages: (firstPage) => {
    return apiClient.get('api/CoursesViewer/GetNumberOfCourses').then(
      (response) => {
        const nrOfPages = Math.ceil(response.data / 4) - 1;

        return new Promise((resolve) =>
          resolve(
            apiClient
              .get(
                `api/CoursesViewer/GetPagesOfCourses?firstPageNumber=${firstPage}&lastPageNumber=${nrOfPages}&pageSize=1`,
              )
              .then((res) => {
                return new Promise((reso) => reso(res.data));
              }),
          ),
        );
      },
      (error) => {
        return new Promise((resolve, reject) => reject(error));
      },
    );
  },
  getCourse: (courseId) => {
    return apiClient.get(
      `api/CoursesViewer/GetCourseDetails?courseId=${courseId}`,
    );
  },
  addCourse: (description, ownerId, tags, price, title) => {
    return apiClient.post('/api/CourseCreator/AddCourse', {
      description,
      ownerId,
      price,
      title,
      tags,
    });
  },
  getUsersCourses: (id) => {
    return new Promise((resolve, reject) =>
      apiClient
        .get(`api/CoursesViewer/GetUsersCourses?UserId=${id}`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error)),
    );
  },
  publishCourse: (id) => {
    return new Promise((resolve, reject) =>
      apiClient
        .post(`/api/PublicCourses/Publish?Id=${id}`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error)),
    );
  },
  publishNewVersionOfCourse: (id) => {
    return new Promise((resolve, reject) =>
      apiClient
        .post(`/api/PublicCourses/PublishNewVersion?Id=${id}`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error)),
    );
  },
  addRating: (courseId, userId, rate) => {
    return new Promise((resolve, reject) =>
      apiClient
        .post(
          `/api/CoursesViewer/AddRating?CourseId=${courseId}&UserId=${userId}&Rating=${rate}`,
        )
        .then((response) => resolve(response.data))
        .catch((error) => reject(error)),
    );
  },
  incrementViewCount: (courseId) => {
    return apiClient.post(
      `/api/CoursesViewer/IncrementViewCount?CourseId=${courseId}`,
    );
  },
};

export default CourseService;
