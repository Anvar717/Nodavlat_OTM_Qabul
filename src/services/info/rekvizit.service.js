import ApiService from '../api.service'

const RekvizitService = {
    getCheckingAccountList(page, size) {
        return ApiService.get(`/api/adminClassificator/getCheckingAccountList?page=${page}&size=${size}`)
    },
    getCheckingAccountById(checkingAccountId) {
        return ApiService.get(`/api/adminClassificator/getCheckingAccountById/${checkingAccountId}`)
    },
    getBanks() {
        return ApiService.get(`/api/adminClassificator/getBanks`)
    },
    Update(checkingAccountId, data) {
        if (data.id == 0 || data.id == undefined || data.id == null || data.id == '') {
            return ApiService.post('/api/adminClassificator/createCheckingAccount', data)
        } else {
            return ApiService.put(`/api/adminClassificator/updateCheckingAccount/${checkingAccountId}`, data)
        }
    }
}
export default RekvizitService