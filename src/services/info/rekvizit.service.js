import ApiService from '../api.service'

const RekvizitService = {
    updateCheckingAccount(checkingAccountId) {
        return ApiService.put(`/api/adminClassificator/updateCheckingAccount/${checkingAccountId}`, data)
    },
    getCheckingAccountList(page, size) {
        return ApiService.get(`/api/adminClassificator/getCheckingAccountList?page=${page}&size=${size}`)
    },
    createCheckingAccount(data) {
        return ApiService.post('/api/adminClassificator/createCheckingAccount', data)
    },
    getCheckingAccountById(checkingAccountId) {
        return ApiService.get(`/api/adminClassificator/getCheckingAccountById/${checkingAccountId}`)
    },
    getBanks() {
        return ApiService.get(`/api/adminClassificator/getBanks`)
    },
}
export default RekvizitService