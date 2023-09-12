import ApiService from "../api.service";

const ApplicationService = {
  getApplications(statust, search, eduTypeId, page, size) {
    const params = {
      status: statust || undefined,
      search,
      eduTypeId,
      page,
      size,
    };
    return ApiService.getWithParams(
      `/api/adminService/getApplications`,
      params
    );
  },
  getApplicationById(appId) {
    return ApiService.get(`/api/adminService/getApplicationById/${appId}`);
  },
  changeApplicationStatus(data) {
    return ApiService.post(`/api/adminService/changeApplicationStatus`, data);
  },
  generateContractTemplate(data) {
    return ApiService.post(`/api/adminService/generateContractTemplate`, data);
  },
  getContractTemplates() {
    return ApiService.get(`/api/adminService/getContractTemplates`);
  },
  getContractTemplate(id) {
    return ApiService.get(`/api/adminService/getContractTemplate/${id}`);
  },
  districts(regionId, page, size) {
    return ApiService.get(
      `/api/public/districts/${regionId}?page=${page}&size=${size}`
    );
  },
};
export default ApplicationService;
