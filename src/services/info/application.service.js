import ApiService from '../api.service'

const ApplicationService = {
    getApplications(status, page, size) {
        return ApiService.get(`/api/adminService/getApplications?status=${status}&page=${page}&size=${size}`)
    },
    getApplicationById(appId) {
        return ApiService.get(`/api/adminService/getApplicationById/${appId}`)
    },
    changeApplicationStatus(appId,status,url) {
        return ApiService.post(`/api/adminService/changeApplicationStatus/${appId}?status=${status}&fileUrl=${url}`)
    },
    generateContractTemplate(data) {
        return ApiService.post(`/api/adminService/generateContractTemplate`, data)
    },
}
export default ApplicationService