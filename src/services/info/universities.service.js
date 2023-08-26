import ApiService from '../api.service'

const UniversitiesService = {
    // GetAll(){
    //     return ApiService.get(`/Bank/GetAll`)
    // }, 
    // GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
    //     return ApiService.get(`/Bank/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    // },
    getUniversityById(university) {
        return ApiService.get(`/api/adminClassificator/getUniversityById?university=${university}`)
    },
    updateUniversity(data) {
        return ApiService.put('/api/adminClassificator/updateUniversity', data)
    },
    uploadFile(key, formData) {
        console.log(formData);
        return ApiService.post(`/api/public/uploadFile?key=${key}`, formData)
    },
    getUniversities(page, size) {
        return ApiService.get(`/api/adminClassificator/getUniversities?page=${page}&size=${size}`)
    },
    Delete(fileName){
        return ApiService.delete(`/api/adminClassificator/deleteUniversityDocument/${fileName}`)
    },
    getFacilities() {
        return ApiService.get(`/api/public/getFacilities`)
    },
}
export default UniversitiesService