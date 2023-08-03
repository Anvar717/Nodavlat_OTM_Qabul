import ApiService from '../api.service'

const SubjectOlympiadService = {
    GetAll(lang){
        return ApiService.get(`/SubjectOlympiad/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/SubjectOlympiad/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    }
}
export default SubjectOlympiadService