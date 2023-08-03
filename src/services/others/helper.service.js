import ApiService from '../api.service'

const HelperService = {
	GetStateList(){
        return ApiService.get('/Helper/GetStateList')
    },
    GetStatusList(admissiontypeid){
        return ApiService.get(`/Helper/GetStatusList?admissiontypeid=${admissiontypeid}`)
    },
    GetModuleList(lang){
        return ApiService.get(`/Helper/GetModuleList?lang=${lang}`)
    },
    GetRoleList(){
        return ApiService.get(`/Helper/GetRoleList`)
    },
    GetLanguageList(){
        return ApiService.get(`/Helper/GetLanguageList`)
    },
    GetAllTeachersInSchool(organizationid){
        if(organizationid === null || organizationid === undefined){
            organizationid = 0
        }
        return ApiService.get(`/Helper/GetAllTeachersInSchool?organizationid=${organizationid}`)
    },
    GetPersonCountInSchool(organizationid){
        return ApiService.get(`/Helper/GetPersonCountInSchool?organizationid=${organizationid}`)
    },
    GetAllAdmissionType(){
        return ApiService.get(`/Helper/GetAllAdmissionType`)
    },
    GetAllQuoteType(){
        return ApiService.get(`/Helper/GetAllQuoteType`)
    },
    DeleteParentUserData(mobilenumber, documentseriesnumber){
        return ApiService.get(`/Helper/DeleteParentUserData?mobilenumber=${mobilenumber}&documentseriesnumber=${documentseriesnumber}`)
    },
    SyncErpTables(){
        return ApiService.get(`/Helper/SyncErpTables`)
    },
    UpdateParentUserMobileNumber(oldmobilenumber,newmobilenumber,documentseriesnumber){
        return ApiService.get(`/Helper/UpdateParentUserMobileNumber?oldmobilenumber=${oldmobilenumber}&newmobilenumber=${newmobilenumber}&documentseriesnumber=${documentseriesnumber}`)
    },
    GetAllIdentityDocSeries(IdentityDocumentId){
        return ApiService.get(`/Helper/GetAllIdentityDocSeries?IdentityDocumentId=${IdentityDocumentId}`)
    },
    GetAllIdentityDocument(isParent){
        return ApiService.get(`/Helper/GetAllIdentityDocument?isParent=${isParent}`)
    },
    GetAllKinshipDegree(){
        return ApiService.get(`/Helper/GetAllKinshipDegree`)
    },
    GetGenderList(){
        return ApiService.get(`/Helper/GetGenderList`)
    },
    InsertSchoolAdmissionAppCountInfo(){
        return ApiService.get(`/Helper/InsertSchoolAdmissionAppCountInfo`)
    }
    
};
export default HelperService;
    