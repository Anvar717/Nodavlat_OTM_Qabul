import ApiService from '../api.service'

const ApplicationService = {
    getApplications(status, page, size) {
        return ApiService.get(`/api/adminService/getApplications?status=${status}&page=${page}&size=${size}`)
    },
}
export default ApplicationService