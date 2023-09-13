import ApiService from "../api.service";

const SpecialitiesService = {
  getSpecialities(page, size, search) {
    return ApiService.get(
      `/api/adminClassificator/getSpecialities?page=${page}&size=${size}&search=${search}`
    );
  },
  getSpecialityById(specialityId) {
    return ApiService.get(
      `/api/adminClassificator/getSpecialityById/${specialityId}`
    );
  },
  getAllFormEdu() {
    return ApiService.get(`/api/public/getAllFormEdu`);
  },
  updateSpeciality(specialityId, data) {
    return ApiService.put(
      `/api/adminClassificator/updateSpeciality/${specialityId}`,
      data
    );
  },
};
export default SpecialitiesService;
