import ApiService from '../api.service'

const ContractscheduleService = {
    getContractDetails(page, size) {
        return ApiService.get(`/api/adminService/getContractDetails?page=${page}&size=${size}`)
    },
    Update(contractDetailId , data) {
        if (data.id == 0 || data.id == undefined || data.id == null || data.id == '') {
            return ApiService.post('/api/adminService/createContractDetail', data)
        } else {
            return ApiService.put(`/api/adminService/updateContractDetail/${contractDetailId }`, data)
        }
    }
}
export default ContractscheduleService