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

  getCourseProtected: (courseId) => {
    return apiClient.get(
      `api/CoursesViewer/GetCourseDetailsProtected?courseId=${courseId}`,
    );
  },
  addCourse: (description, ownerId, tags, price, title, image) => {
    return apiClient.post('/api/CourseCreator/AddCourse', {
      description,
      ownerId,
      price,
      title,
      tags,
      image,
    });
  },
  getUsersCourses: (id) => {
    return apiClient.get(`api/CoursesViewer/GetUsersCourses?UserId=${id}`);
  },
  getFeaturedCourses: (categoryCount) => {
    return apiClient.get(
      `/api/CoursesViewer/GetFeaturedCourses?CategoryCount=${categoryCount}`,
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
  publishCourseOnSchedule: (id, date) => {
    return apiClient.post(`/api/PublicCourses/PublishSchedule`, {
      dateOfPublication: date,
      courseId: id,
    });
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
  generateDiscounts: (courseId, discountProperties) => {
    return apiClient.post(
      `/api/PublicCourses/AddPromotionCode?Id=${courseId}`,
      { ...discountProperties },
    );
  },
  getDiscounts: (courseId) => {
    return apiClient.get(`/api/PublicCourses/GetDiscountCodes?Id=${courseId}`);
  },

  getPriceWithDiscount: (courseId, code) => {
    return apiClient.get(
      `/api/PublicCourses/GetPriceWithDiscount?Id=${courseId}`,
      { code },
    );
  },

  sendToVerification: (courseId) => {
    return apiClient.post(
      `/api/CourseCreator/SendToVerification?CourseId=${courseId}`,
    );
  },

  searchCourses: (phrase) => {
    return apiClient.get(`/api/Search/GetCourseSearch?phrase=${phrase}`);
  },
};

export default CourseService;
