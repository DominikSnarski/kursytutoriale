import apiClient from '../ApiClient';

const api = 'api/Moderator/';
export const ModService = {
  // Course Verification
  getCoursesRequiringVerification: () => {
    return apiClient.get(`${api}AssignCoursesRequiringVerification`);
  },
  verifyCourse: (CourseId) => {
    return apiClient.put(`${api}VerifyCourse?CourseId=${CourseId}`);
  },
  rejectCourse: (CourseId, Note) => {
    return apiClient.put(`${api}RejectCourse?CourseId=${CourseId}`, {
      note: Note,
    });
  },
  // Reports
  getReports: () => {
    return apiClient.get(`${api}AssignReports`);
  },
  getReportCodes: () => {
    return apiClient.get(`${api}GetReportStatusCodes`);
  },
  resolverReport: (ReportId, ReportStatus, Comment) => {
    return apiClient.put(`${api}ResolveReport`, {
      reportId: ReportId,
      resolverComment: Comment,
      reportStatus: ReportStatus,
    });
  },
};

export default ModService;
