import ApiService from '../api.service'

const ContractscheduleService = {
    getContractDetails(page, size) {
        return ApiService.get(`/api/adminService/getContractDetails?page=${page}&size=${size}`)
    },
    Update(contractDetailId, data) {
        if (data.id == 0 || data.id == undefined || data.id == null || data.id == '') {
            return ApiService.post('/api/adminService/createContractDetail', data)
        } else {
            return ApiService.put(`/api/adminService/updateContractDetail/${contractDetailId}`, data)
        }
    },
    getAcademicYears(page, size) {
        return ApiService.get(`/api/adminClassificator/getAcademicYears?page=${page}&size=${size}`)
    },
    getContractDetailById(contractDetailId) {
        return ApiService.get(`/api/adminService/getContractDetailById/${contractDetailId}`)
    },
    getCheckingAccountList(page, size) {
        return ApiService.get(`/api/adminClassificator/getCheckingAccountList?page=${page}&size=${size}`)
    },
    degrees() {
        return ApiService.get(`/api/public/degrees`)
    },
    getEduType() {
        return ApiService.get(`/api/public/getEduType`)
    },
    generateContractPrices(data) {
        return ApiService.post(`api/adminService/generateContractPrices`, data)
    },
    languages() {
        return ApiService.get(`api/public/languages`)
    },
    getEducationLevel(eduTypeId) {
        return ApiService.get(`api/adminClassificator/getEducationLevel/${eduTypeId}`)
    },
    createContractPrices(data) {
        return ApiService.post(`api/adminService/createContractPrices`, data)
    },
}
export default ContractscheduleService