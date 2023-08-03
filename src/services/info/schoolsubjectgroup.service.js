import ApiService from '../api.service'

const SchoolSubjectGroupService = {
    GetAll(lang){
        return ApiService.get(`/SchoolSubjectGroup/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/SchoolSubjectGroup/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    }
}
export default SchoolSubjectGroupService