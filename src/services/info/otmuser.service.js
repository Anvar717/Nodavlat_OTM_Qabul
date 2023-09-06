import ApiService from "../api.service";

const OtmUserService = {
  usersOTMAdmin(page, size, search) {
    return ApiService.get(
      `/api/adminService/usersOTMAdmin?page=${page}&size=${size}&search=${search}`
    );
  },
  userOTMAdminById(userId) {
    return ApiService.get(
      `/api/adminService/userOTMAdminById?userId=${userId}`
    );
  },
};
export default OtmUserService;
