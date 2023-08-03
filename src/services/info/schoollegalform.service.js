import ApiService from '../api.service'

const SchoolLegalFormService = {
    GetAll(lang){
        return ApiService.get(`/SchoolLegalForm/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/SchoolLegalForm/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    }
}
export default SchoolLegalFormService