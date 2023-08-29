import ApiService from '../api.service'

const ApplicationService = {
    getApplications(status, page, size) {
        return ApiService.get(`/api/adminService/getApplications?status=${status}&page=${page}&size=${size}`)
    },
    getApplicationById(appId) {
        return ApiService.get(`/api/adminService/getApplicationById/${appId}`)
    },
    changeApplicationStatus(appId,status) {
        return ApiService.post(`/api/adminService/changeApplicationStatus/${appId}?status=${status}`)
    }
}
export default ApplicationService