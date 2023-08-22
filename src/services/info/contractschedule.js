import ApiService from '../api.service'

const ContractscheduleService = {
    getContractDetails(page, size) {
        return ApiService.get(`/api/adminService/getContractDetails?page=${page}&size=${size}`)
    },
  
}
export default ContractscheduleService