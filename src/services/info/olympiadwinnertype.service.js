import ApiService from '../api.service'

const OlympiadWinnerTypeService = {
    GetAll(lang){
        return ApiService.get(`/OlympiadWinnerType/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/OlympiadWinnerType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    }
}
export default OlympiadWinnerTypeService