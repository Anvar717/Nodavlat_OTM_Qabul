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
};
export default SpecialitiesService;
