import ApiService from '../api.service'

const SchoolSubjectService = {
    GetAll(lang, schoolsubjectgroupid){
        return ApiService.get(`/SchoolSubject/GetAll?lang=${lang}&schoolsubjectgroupid=${schoolsubjectgroupid}`)
    }, 
    GetAllForeignLang(lang, schoolsubjectgroupid){
        return ApiService.get(`/SchoolSubject/GetAllForeignLang?lang=${lang}&schoolsubjectgroupid=${schoolsubjectgroupid}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/SchoolSubject/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    }
}
export default SchoolSubjectService