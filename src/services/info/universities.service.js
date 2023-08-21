import ApiService from '../api.service'

const UniversitiesService = {
    // GetAll(){
    //     return ApiService.get(`/Bank/GetAll`)
    // }, 
    // GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
    //     return ApiService.get(`/Bank/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    // },
    getUniversityById(universityId){
        return ApiService.get(`/api/adminClassificator/getUniversityById/${universityId}`)
    },
    updateUniversity(data){
        return ApiService.put('/api/adminClassificator/updateUniversity',data)
    },
    uploadFile(){
        return ApiService.post(`/api/public/uploadFile`)
    },
    getUniversities(page, size) {
        return ApiService.get(`/api/adminClassificator/getUniversities?page=${page}&size=${size}`)
    },
}
export default UniversitiesService