import ApiService from '../api.service'

const AccountService = {
    // GenerateToken(data){
    //     return ApiService.post('/Account/GenerateToken',data)
    // },
    // GetList(Search,SortColumn,OrderType,PageNumber,PageLimit){
    //     return ApiService.get(`/Account/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    // },
    // Get(id){
    //     return ApiService.get(`/Account/Get?id=${id}`)
    // },
    // Update(data){
    //     return ApiService.post('/Account/Update',data)
    // },
    signIn(data) {
        return ApiService.post('/api/public/signIn', data)
    },
    oneId() {
        return ApiService.get(`/api/public/oneId`)
    },
    oneIdSignIn(code) {
        return ApiService.post(`/api/public/oneIdSignIn?code=${code}`)
    },
    oneIdAdminSignIn(code) {
        return ApiService.post(`/api/public/oneIdAdminSignIn?code=${code}`)
    },
    // SignInTwoFactor(data){
    //     return ApiService.post('/Account/SignInTwoFactor',data)
    // },
    // GetAllUserForModerator(){
    //     return ApiService.get(`/Account/GetAllUserForModerator`)
    // },
    // SetUserLanguage(data){
    //     return ApiService.post(`/Account/SetUserLanguage`,data)
    // },
    // IsUserRegistered(data){
    //     return ApiService.post(`/Account/IsUserRegistered`,data)
    // }

};
export default AccountService;
