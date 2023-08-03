import ApiService from '../api.service'

const QualificationCategoryService = {
    GetAll(lang){
        return ApiService.get(`/QualificationCategory/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/QualificationCategory/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    }
}
export default QualificationCategoryService