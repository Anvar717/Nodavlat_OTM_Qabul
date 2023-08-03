import ApiService from '../api.service'

const AccountService = {
	GenerateToken(data){
        return ApiService.post('/Account/GenerateToken',data)
    },
    GetList(Search,SortColumn,OrderType,PageNumber,PageLimit){
        return ApiService.get(`/Account/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/Account/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/Account/Update',data)
    },
    SignIn(data){
        return ApiService.post('/Account/SignIn',data)
    },
    SignInTwoFactor(data){
        return ApiService.post('/Account/SignInTwoFactor',data)
    },
    GetAllUserForModerator(){
        return ApiService.get(`/Account/GetAllUserForModerator`)
    },
    SetUserLanguage(data){
        return ApiService.post(`/Account/SetUserLanguage`,data)
    },
    IsUserRegistered(data){
        return ApiService.post(`/Account/IsUserRegistered`,data)
    }
};
export default AccountService;
    