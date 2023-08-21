import ApiService from '../api.service'

const RegionService = {
    // GetAll(lang, OblastID){
    //     return ApiService.get(`/Region/GetAll?lang=${lang}&OblastID=${OblastID}`)
    // }, 
    // GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
    //     return ApiService.get(`/Region/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    // }
    regions(countryId, page, size) {
        return ApiService.get(`/api/public/regions/${countryId}?page=${page}&size=${size}`)
    }
}
export default RegionService