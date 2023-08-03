import ApiService from '../api.service'

const RegionGroupService = {
    GetAll(lang){
        return ApiService.get(`/RegionGroup/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/RegionGroup/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    }
}
export default RegionGroupService