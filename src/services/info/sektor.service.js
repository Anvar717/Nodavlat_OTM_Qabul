import ApiService from '../api.service'

const SektorService = {
    Get(id){
        return ApiService.get(`/Sektor/Get?id=${id}`)
    },
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/Sektor/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Update(data){
        return ApiService.post('/Sektor/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/Sektor/Delete?id=${id}`)
    }
}
export default SektorService