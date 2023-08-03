import ApiService from '../api.service'

const SportTypeService = {
    Get(id){
        return ApiService.get(`/SportType/Get?id=${id}`)
    },
    GetAll(lang){
      return ApiService.get(`/SportType/GetAll?lang=${lang}`)
    },
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/SportType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Update(data){
        return ApiService.post('/SportType/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/SportType/Delete?id=${id}`)
    }
}
export default SportTypeService