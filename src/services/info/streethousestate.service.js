import ApiService from '../api.service'

const StreetHouseStateService = {
    GetAll(lang){
        return ApiService.get(`/StreetHouseState/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/StreetHouseState/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    }
}
export default StreetHouseStateService