import apiClient from '../ApiClient';

export const ReportService = {
  reportCourse: (courseId, reporterComment, reportType) => {
    return apiClient.post(`/api/Report/ReportCourse`, {
      courseId,
      reporterComment,
      reportType,
    });
  },
  getReportTypeCodes: () => {
    return apiClient.get(`/api/Report/GetReportTypeCodes`);
  },
};

export default ReportService;
