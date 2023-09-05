import ApiService from '../api.service'

const ApplicationService = {
    getApplications(status,search,eduTypeId, page, size) {
        return ApiService.get(`/api/adminService/getApplications?status=${status}&search=${search}&eduTypeId=${eduTypeId}&page=${page}&size=${size}`)
    },
    getApplicationById(appId) {
        return ApiService.get(`/api/adminService/getApplicationById/${appId}`)
    },
    changeApplicationStatus(data) {
        return ApiService.post(`/api/adminService/changeApplicationStatus`, data)
    },
    generateContractTemplate(data) {
        return ApiService.post(`/api/adminService/generateContractTemplate`, data)
    },
    getContractTemplates() {
        return ApiService.get(`/api/adminService/getContractTemplates`)
    },
    getContractTemplate(id) {
        return ApiService.get(`/api/adminService/getContractTemplate/${id}`)
    }
}
export default ApplicationService