import ApiService from '../api.service'

const StreetService = {
    GetAll(lang, RegionID){
        return ApiService.get(`/Street/GetAll?lang=${lang}&RegionID=${RegionID}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/Street/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    }
}
export default StreetService