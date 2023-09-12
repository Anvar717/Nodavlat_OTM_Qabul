import ApiService from '../api.service'

const SpecialitiesService = {
    getSpecialities(page,size,search) {
        return ApiService.get(`/api/adminClassificator/getSpecialities?page=${page}&size=${size}&search=${search}`)
    },
}
export default SpecialitiesService