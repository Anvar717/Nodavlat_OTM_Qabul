import ApiService from '../api.service'

const ReturnadmapptypeService = {
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/Returnadmapptype/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    GetAll(){
        return ApiService.get(`/Returnadmapptype/GetAll`)
    },
    Get(id){
        return ApiService.get(`/Returnadmapptype/Get?id=${id}`)
    }, 
    Update(data){
        return ApiService.post('/Returnadmapptype/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/Returnadmapptype/Delete?id=${id}`)
    },
}
export default ReturnadmapptypeService