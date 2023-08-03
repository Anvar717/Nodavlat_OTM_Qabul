import ApiService from '../api.service'

const SchoolGroupContingentService = {
    GetAll(lang){
        return ApiService.get(`/SchoolGroupContingent/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/SchoolGroupContingent/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    }
}
export default SchoolGroupContingentService