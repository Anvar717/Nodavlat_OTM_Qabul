import ApiService from '../api.service'

const StreetHouseService = {
    GetAll(lang, StreetID){
        return ApiService.get(`/StreetHouse/GetAll?lang=${lang}&StreetID=${StreetID}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/StreetHouse/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    }
}
export default StreetHouseService