import ApiService from "../api.service";

const ContractapplicationsService = {
  getHighCourseApplications(courseId, search, eduTypeId, page, size) {
    return ApiService.get(
      `/api/adminService/getHighCourseApplications?courseId=${courseId}&search=${search}&eduTypeId=${eduTypeId}&page=${page}&size=${size}`
    );
  },
};
export default ContractapplicationsService;
