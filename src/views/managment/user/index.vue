<template>
  <b-card no-body>
    <div class="m-2">
      <b-row>
        <b-col
          cols="12"
          md="8"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <label>{{$t('Entries')}}</label>
          <v-select
            v-model="filter.perPage"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="filter.perPageOptions"
            :clearable="false"
            @input="Refresh"
            class="per-page-selector d-inline-block ml-50 mr-1"
          />
          <b-button
            variant="danger"
            @click="OpenModal"
            v-if="$can('DeleteRegisteredApplicant', 'permissions')"
          >
            <feather-icon icon="Trash2Icon"></feather-icon> {{ $t('DeleteParentUserData') }}
          </b-button>
          <b-button
            variant="primary"
            class="ml-2"
            @click="SyncErpTables"
          >
            <!-- <feather-icon style="margin-right: 5px" icon="RefreshCwIcon"></feather-icon>  -->
             <b-spinner v-if="SaveLoading" small ></b-spinner> {{ $t('SyncErpTables') }}
          </b-button>
           <b-button
            variant="primary"
            @click="NewMobileModal"
            class="ml-1"
            
          >
            <feather-icon icon="Mobile"></feather-icon> {{ $t('NewMobile') }}
          </b-button>
          <b-modal 
              @ok="NewMobileModalFunc" 
              :cancel-title="$t('back')"
              :ok-title="$t('Approve')"
              cancel-variant="danger"
              ok-variant="success" 
              v-model="UpdateParentUserMobileNumber" 
              :title="$t('UpdateParentUserMobileNumber')">
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("oldmobilenumber")
              }}</label>
              <div class="col-sm-7">
                <cleave
                  v-model="filter.oldmobilenumber"
                  class="form-control"
                  :raw="false"
                  :options="options.oldmobilenumber"
                  placeholder="+998-90-123-45-67"
                />
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("newmobilenumber")
              }}</label>
              <div class="col-sm-7">
                <cleave
                  v-model="filter.newmobilenumber"
                  class="form-control"
                  :raw="false"
                  :options="options.newmobilenumber"
                  placeholder="+998-90-123-45-67"
                />
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("documentseriesnumber")
              }}</label>
              <div class="col-sm-7">
                <cleave
                  v-model="filter.documentseriesnumber"
                  class="form-control"
                  :raw="false"
                  :options="options.documentseriesnumber"
                  placeholder="AA7777777"
                />
              </div>
            </div>
          </b-modal>


          <b-modal 
              @ok="DeleteParentFunc" 
              :cancel-title="$t('back')"
              :ok-title="$t('Approve')"
              cancel-variant="danger"
              ok-variant="success" 
              v-model="DeleteParentUserData" 
              :title="$t('DeleteParentUserData')">
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("mobilenumber")
              }}</label>
              <div class="col-sm-7">
                <cleave
                  v-model="filter.mobilenumber"
                  class="form-control"
                  :raw="false"
                  :options="options.mobilenumber"
                  placeholder="+998-90-123-45-67"
                />
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("documentseriesnumber")
              }}</label>
              <div class="col-sm-7">
                <cleave
                  v-model="filter.documentseriesnumber"
                  class="form-control"
                  :raw="false"
                  :options="options.documentseriesnumber"
                />
              </div>
            </div>
          </b-modal>
        </b-col>
        <b-col cols="12" md="4">
          <b-input-group class="text-right">
            <b-form-input v-model="filter.Search" :placeholder="$t('search')" />
            <b-input-group-append>
              <b-button @click="Refresh" variant="primary">
                <feather-icon icon="SearchIcon" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row class="mt-1">
        <b-col>
          <b-button variant="primary" v-if="$can('AutoQueueAssignmentForAdmApp','permissions')" class="mr-1" @click="OpenAutoQueueAssignmentForAdmAppModal">

            {{ $t('AutoQueueAssignmentForAdmApp') }}
          </b-button>
          <b-button variant="primary" v-if="$can('CloseExpireQueueForAdmApp','permissions')" class="mr-1" @click="OpenCloseExpireQueueForAdmApp">

            {{ $t('CloseExpireQueueForAdmApp') }}
          </b-button>
          <b-button variant="primary" v-if="$can('AutoRejectedAdmApp','permissions')" class="mr-1" @click="OpenAutoRejectedAdmApp">

            {{ $t('AutoRejectedAdmApp') }}
          </b-button>
          <b-button variant="success" v-if="$can('InsertSchoolAdmissionAppCountInfo','permissions')" @click="OpenInsertSchoolAdmissionAppCountInfo">

            {{ $t('InsertSchoolAdmissionAppCountInfo') }}
          </b-button>
        </b-col>
      </b-row>
      <b-modal v-model="InsertSchoolAdmissionAppCountInfo" :title="$t('InsertSchoolAdmissionAppCountInfo')" hide-footer no-close-on-backdrop>
        <b-row>
          <b-col>
            {{ $t('WantInsertSchoolAdmissionAppCountInfo') }}
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col class="text-right">
            <b-button variant="danger" @click="InsertSchoolAdmissionAppCountInfo = false" class="mr-1"> {{ $t('no') }} </b-button>
            <b-button variant="success" @click="ReInsertSchoolAdmissionAppCountInfo = true">  {{ $t('yes') }} </b-button>
          </b-col>
        </b-row>
      </b-modal>
      <b-modal v-model="ReInsertSchoolAdmissionAppCountInfo" :title="$t('InsertSchoolAdmissionAppCountInfo')" hide-footer no-close-on-backdrop>
        <b-row>
          <b-col>
            {{ $t('WantInsertSchoolAdmissionAppCountInfo') }}
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col class="text-right">
            <b-button variant="danger" @click="() => { ReInsertSchoolAdmissionAppCountInfo = false; InsertSchoolAdmissionAppCountInfo = false}" class="mr-1"> {{ $t('no') }} </b-button>
            <b-button variant="success" @click="InsertSchoolAdmissionAppCountInfoFunc"> <b-spinner v-if="InsertSchoolAdmissionAppCountInfoLoading" small></b-spinner> {{ $t('yes') }} </b-button>
          </b-col>
        </b-row>
      </b-modal>
      <b-modal v-model="AutoQueueAssignmentForAdmAppModal" :title="$t('AutoQueueAssignmentForAdmApp')" hide-footer no-close-on-backdrop>
        <b-row>
          <b-col>
            <label for=""> {{ $t('startdate') }} </label>
            <flat-pickr
                v-model="filter.startdate"
                class="form-control"
                :placeholder="$t('startdate')"
                :config="config"
            />
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col class="text-right">
            <b-button variant="danger" @click="AutoQueueAssignmentForAdmAppModal = false" class="mr-1"> {{ $t('no') }} </b-button>
            <b-button variant="success" @click="AutoQueueAssignmentForAdmApp"> <b-spinner v-if="AutoQueueAssignmentForAdmAppLoading" small></b-spinner> {{ $t('yes') }} </b-button>
          </b-col>
        </b-row>
      </b-modal>
      <b-modal v-model="CloseExpireQueueForAdmAppModal" :title="$t('CloseExpireQueueForAdmApp')" hide-footer no-close-on-backdrop>
        <b-row>
          <b-col>
            {{ $t('WantCloseExpireQueueForAdmApp') }}
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col class="text-right">
            <b-button variant="danger" @click="CloseExpireQueueForAdmAppModal = false" class="mr-1"> {{ $t('no') }} </b-button>
            <b-button variant="success" @click="CloseExpireQueueForAdmApp"> <b-spinner v-if="CloseExpireQueueForAdmAppLoading" small></b-spinner> {{ $t('yes') }} </b-button>
          </b-col>
        </b-row>
      </b-modal>
      <b-modal v-model="AutoRejectedAdmAppModal" :title="$t('AutoRejectedAdmApp')" hide-footer no-close-on-backdrop>
        <b-row>
          <b-col>
            {{ $t('WantAutoRejectedAdmApp') }}
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col class="text-right">
            <b-button variant="danger" @click="AutoRejectedAdmAppModal = false" class="mr-1"> {{ $t('no') }} </b-button>
            <b-button variant="success" @click="AutoRejectedAdmApp"> <b-spinner v-if="AutoRejectedAdmAppLoading" small></b-spinner> {{ $t('yes') }} </b-button>
          </b-col>
        </b-row>
      </b-modal>
    </div>

    <b-table
      ref="refInvoiceListTable"
      :items="items"
      responsive
      :fields="fields"
      primary-key="id"
      sticky-header="65vh"
      no-border-collapse
      :busy="isBusy"
      show-empty
      :empty-text="$t('NotFound')"
      class="position-relative"
      @sort-changed="SortChange"
    >
      <template #cell(status)="{ item }">
        <b-badge
          :variant="item.status == 'Пассив' ? 'light-danger' : 'light-success'"
        >
          {{ item.status }}
        </b-badge>
      </template>
      <template #cell(username)="{ item }">
          <span> {{ item.username }} <br />  <b>( {{ item.displayname }} ) </b> </span>
      </template>
      <template #cell(orgname)="{ item }">
          <span> {{ item.orgname }} <br />  <b>( {{ item.inn }} ) </b> </span>
      </template>
       <template #cell(actions)="{ item }">
           <div class="text-center">
               <b-link v-b-tooltip.hover.top="$t('Edit')" v-if="$store.state.auth.organizationtype !== 4 && $can('UserEdit','permissions')" @click="SaveSidebar = true">
                   <feather-icon @click="Edit(item)" icon="EditIcon"></feather-icon>
               </b-link>
           </div>
           
       </template>
      <template v-slot:table-busy>
        <div
          class="text-center text-primary my-2"
          style="vertical-align: middle"
        >
          <b-spinner class="align-middle mr-2"></b-spinner>
          <strong>{{$t('Loading')}}</strong>
        </div>
      </template>
    </b-table>
    <b-sidebar
        id="sidebar-variant"
        shadow
        backdrop
        right
        no-header
        width="400px"
        v-model="SaveSidebar"
    >
        <div class="d-flex justify-content-between align-items-center">
            <!-- <h4> Filter </h4> -->
            <feather-icon icon="XCircleIcon"></feather-icon>
        </div>
        <template #default="{ hide }">
            <div class="d-flex justify-content-between align-items-center p-2">
                <h4 class="mb-0"> {{ $t('User') }} </h4>
                <feather-icon style="cursor:pointer" size="24"  @click="hide" icon="XIcon"></feather-icon>
            </div>
            <div class="d-flex justify-content-between align-items-center p-1">
                <span class="mb-0"> {{ $t('username') }} : </span>
                <span class="text-primary"> {{ Account.Username }} </span>
            </div>
            <div class="d-flex justify-content-between align-items-center p-1">
                <span class="mb-0"> {{ $t('DisplayName') }} : </span>
                <span class="text-primary"> {{ Account.DisplayName }} </span>
            </div>
            <div class="d-flex justify-content-between align-items-center p-1">
                <span class="mb-0"> {{ $t('Email') }} : </span>
                <span class="text-primary"> {{ Account.Email }} </span>
            </div>
            <div class="d-flex justify-content-between align-items-center p-1">
                <span class="mb-0"> {{ $t('Organization') }} : </span>
                <span class="text-primary text-right" style="font-size:12px"> {{ Account.OrganizationName }} </span>
            </div>
            <div class="d-flex justify-content-between align-items-center p-1">
                <span class="mb-0"> {{ $t('MobileNumber') }} : </span>
                <span class="text-primary"> {{ Account.MobileNumber }} </span>
            </div>
            <div class="p-1">
                <label> {{ $t('role') }} </label>
                <v-select
                    v-model="Account.Roles"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    multiple
                    label="shortname"
                    :placeholder="$t('ChooseBelow')"
                    :options="RoleList"
                    :reduce="item => item.shortname"
                />
            </div>
            
        </template>
        <template #footer>
            <div class="text-right p-2">
                <b-button variant="outline-success" @click="SaveData"> 
                   <b-spinner v-if="SaveLoading" small></b-spinner> {{ $t('Save') }}
                </b-button>  
            </div>              
        </template>
    </b-sidebar>
    <div class="mx-2 mb-2">
      <b-row>
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-start"
        >
          <span class="text-muted"
            >{{$t('Showing')}} {{ firstNumber }} {{$t('to')}} {{ lastNumber }} {{$t('of')}}
            {{ filter.totalRows }} {{$t('entries')}}</span
          >
        </b-col>
        <!-- Pagination -->
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-end"
        >
          <b-pagination
            v-model="filter.currentPage"
            :total-rows="filter.totalRows"
            :per-page="filter.perPage"
            first-number
            last-number
            @input="Refresh"
            class="mb-0 mt-1 mt-sm-0"
            prev-class="prev-item"
            next-class="next-item"
          >
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
          </b-pagination>
        </b-col>
      </b-row>
    </div>
  </b-card>
</template>

<script>
import { BButton, BPagination, BTable, BCol, BRow, BSpinner, BCard, BTooltip, BBadge, BInputGroup, BFormInput, BInputGroupAppend,BLink,VBTooltip,BSidebar,VBToggle, BModal, BFormGroup } from 'bootstrap-vue'
import AccountService from "@/services/others/account.service";
import HelperService from '@/services/others/helper.service'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Cleave from 'vue-cleave-component'
import flatPickr from 'vue-flatpickr-component';
import RegApplicationByAdminService from '@/services/document/regapplicationbyadmin.service';
export default {
  components : {
    BButton, BPagination, BTable, BCol, BRow, BSpinner, BCard, BTooltip, BBadge, BInputGroup, BFormInput, BInputGroupAppend,BLink,BSidebar, BModal, BFormGroup,Cleave,flatPickr
  },
  data() {
    return {
      items: [],
      fields: [
        {
          key: "id",
          label: this.$t('id'),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "username",
          label: this.$t('username'),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "orgname",
          label: this.$t('orgname'),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "roles",
          label: this.$t('roles'),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "email",
          label: this.$t('email'),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "lastaccesstime",
          label: this.$t('lastaccesstime'),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        { key : 'actions', label : this.$t('actions'),thClass : 'text-center', tdClass : 'text-center' }
      ],
      filter: {
        Search: "",
        Sort: "",
        Order: "asc",
        perPage: 20,
        currentPage: 1,
        perPageOptions: [10, 20, 50, 100],
        totalRows : 0,
        mobilenumber : '+998',
        documentseriesnumber : '',
        oldmobilenumber:'+998',
        newmobilenumber:'+998',
        documentseriesnumber:'',
        startdate : ''
      },
      isBusy: false,
      Account : {},
      RoleList : [],
      SaveSidebar : false,
      SaveLoading : false,
      UpdateParentUserMobileNumber:false,
      DeleteParentUserData : false,
      config: {
        dateFormat: "d.m.Y",
      },
      options : {
        mobilenumber: {
          delimiters: ['-'],
          blocks: [4,2,3, 2, 2],
          uppercase: true,
        },
        oldmobilenumber: {
          delimiters: ['-'],
          blocks: [4,2,3, 2, 2],
          uppercase: true,
        },
        newmobilenumber: {
          delimiters: ['-'],
          blocks: [4,2,3, 2, 2],
          uppercase: true,
        },
        documentseriesnumber : {
          delimiters: ['',],
          blocks: [15],
          uppercase: false,
        }
      },
      AutoQueueAssignmentForAdmAppModal : false,
      AutoQueueAssignmentForAdmAppLoading : false,
      CloseExpireQueueForAdmAppModal : false,
      CloseExpireQueueForAdmAppLoading : false,
      AutoRejectedAdmAppModal : false,
      AutoRejectedAdmAppLoading : false,
      InsertSchoolAdmissionAppCountInfo : false,
      ReInsertSchoolAdmissionAppCountInfo : false,
      InsertSchoolAdmissionAppCountInfoLoading : false
    };
  },
  directives : {
      'b-tooltip': VBTooltip,
      'b-toggle' : VBToggle
  },
  computed : {
    firstNumber() {
      return (this.filter.currentPage - 1) * this.filter.perPage + 1;
    },
    lastNumber() {
      if (this.filter.totalRows < this.filter.perPage) {
        return this.filter.totalRows;
      } else {
        if (this.filter.currentPage * this.filter.perPage > this.filter.totalRows) {
          return this.filter.totalRows;
        } else {
          return this.filter.currentPage * this.filter.perPage;
        }
      }
    },
  },
  created() {
    this.Refresh();
    HelperService.GetRoleList().then(res => {
        this.RoleList = res.data
    })
  },
  methods: {
    InsertSchoolAdmissionAppCountInfoFunc(){
      this.InsertSchoolAdmissionAppCountInfoLoading = true
      HelperService.InsertSchoolAdmissionAppCountInfo().then(res => {
        this.InsertSchoolAdmissionAppCountInfoLoading = false
        this.InsertSchoolAdmissionAppCountInfo = false
        this.ReInsertSchoolAdmissionAppCountInfo = false
        this.makeToast(this.$t('SuccessInsertSchoolAdmissionAppCountInfo'),'success')
      }).catch(error => {
        this.InsertSchoolAdmissionAppCountInfoLoading = false
      })
    },
    OpenAutoRejectedAdmApp(){
      this.AutoRejectedAdmAppModal = true
    },
    OpenInsertSchoolAdmissionAppCountInfo(){
      this.InsertSchoolAdmissionAppCountInfo = true
    },
    OpenCloseExpireQueueForAdmApp(){
      this.CloseExpireQueueForAdmAppModal = true
    },
    AutoRejectedAdmApp(){
      this.AutoRejectedAdmAppLoading = true
      RegApplicationByAdminService.AutoRejectedAdmApp().then(res => {
        this.AutoRejectedAdmAppLoading = false
        this.AutoRejectedAdmAppModal = false
        this.makeToast(this.$t('SuccessAutoRejectedAdmApp'),'success')
      }).catch(err => {
        this.AutoRejectedAdmAppLoading = false
        this.makeToast(err.response.data.error,'danger')
      })
    },
    CloseExpireQueueForAdmApp(){
      this.CloseExpireQueueForAdmAppLoading = true
      RegApplicationByAdminService.CloseExpireQueueForAdmApp().then(res => {
        this.CloseExpireQueueForAdmAppLoading = false
        this.CloseExpireQueueForAdmAppModal = false
        this.makeToast(this.$t('SuccessCloseExpireQueueForAdmApp'),'success')
      }).catch(err => {
        this.CloseExpireQueueForAdmAppLoading = false
        this.makeToast(err.response.data.error,'danger')
      })
    },
    AutoQueueAssignmentForAdmApp(){
      this.AutoQueueAssignmentForAdmAppLoading = true
      RegApplicationByAdminService.AutoQueueAssignmentForAdmApp(this.filter.startdate).then(res => {
        this.AutoQueueAssignmentForAdmAppLoading = false
        this.AutoQueueAssignmentForAdmAppModal = false
        this.makeToast(this.$t('SuccessAutoQueueAssignmentForAdmApp'),'success')
      }).catch(err => {
        this.AutoQueueAssignmentForAdmAppLoading = false
        this.makeToast(err.response.data.error,'danger')
      })
    },
    OpenAutoQueueAssignmentForAdmAppModal(){
      this.AutoQueueAssignmentForAdmAppModal = true
    },
    Edit(item){
        AccountService.Get(item.id).then(res => {
            this.Account = res.data
        })
    },
    SyncErpTables(){
      this.SaveLoading = true 
      HelperService.SyncErpTables().then(res => {
        this.SaveLoading = false
        this.makeToast(this.$t('SyncErpTablesSuccess'),'success')
      })
      .catch(error => {
        this.makeToast(error.response.data.error,'danger')
        this.SaveLoading = false
      })
    },
    DeleteParentFunc(){
      HelperService.DeleteParentUserData(this.filter.mobilenumber, this.filter.documentseriesnumber).then(res => {
        this.makeToast(this.$t('DeleteSuccess'),'success')
      })
      .catch(error => {
        this.makeToast(error.response.data.error,'danger')
      })
    },
    NewMobileModalFunc(){
      HelperService.UpdateParentUserMobileNumber(this.filter.oldmobilenumber,this.filter.newmobilenumber,this.filter.documentseriesnumber).then(res =>{
        this.makeToast(this.$t('SaveSuccess'),'success')
      })
      .catch(error =>{
        this.makeToast(error.response.data.error,'danger')
      })
    },
    SortChange(data) {
      this.filter.Sort = data.sortBy;
      this.filter.Order = data.sortDesc ? "desc" : "asc";
      this.Refresh();
    },
    OpenModal(){
      this.filter.mobilenumber = '+998',
      this.filter.documentseriesnumber = ''
      this.DeleteParentUserData = true
    },
    NewMobileModal(){
      this.filter.oldmobilenumber = '+998',
      this.filter.newmobilenumber = '+998',
      this.filter.documentseriesnumber = ''
      this.UpdateParentUserMobileNumber = true
    },
    SaveData(){
        this.SaveLoading = true
        AccountService.Update(this.Account).then(res => {
            this.SaveLoading = false
            this.makeToast(this.$t('SaveSuccess'),'success')
            this.SaveSidebar = false
        }).catch(error => {
            this.makeToast(error.response.data.error,'danger')
            this.SaveLoading = false
        })
    },
    makeToast(message,variant){
        this.$toast({
            component: ToastificationContent,
            props: {
                title: message,
                icon: variant == 'success' ? 'CheckSquareIcon' : 'AlertTriangleIcon',
                variant: variant,
            },
        })
    },
    Refresh() {
      this.isBusy = true;
      AccountService.GetList(
        this.filter.Search,
        this.filter.Sort,
        this.filter.Order,
        this.filter.currentPage,
        this.filter.perPage
      ).then((res) => {
        this.items = res.data.rows;
        this.filter.totalRows = res.data.total
        this.isBusy = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
