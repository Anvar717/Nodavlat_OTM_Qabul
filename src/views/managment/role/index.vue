<template>
  <b-card no-body>
    <div class="m-2">
      <b-row>
        <b-col
          cols="12"
          md="6"
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
            variant="primary"
            :to="{ name: 'EditRole',params : {id : 0}}"
            v-if="$store.state.auth.organizationtype !== 4 && $can('RoleEdit','permissions')"
          >
            <feather-icon icon="PlusIcon"></feather-icon> {{ $t('create') }}
          </b-button>
        </b-col>
        <b-col md="2"></b-col>
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
      <template #cell(actions)="{item}">
          <div class="text-center">
              <b-link v-if="$store.state.auth.organizationtype !== 4 && $can('RoleEdit','permissions')" :to="{ name : 'EditRole',params : {id : item.id} }" style="margin-right:5px;cursor:pointer" v-b-tooltip.hover.top="$t('Edit')">
                  <feather-icon icon="EditIcon"></feather-icon>
              </b-link>
              <b-link v-if="$store.state.auth.organizationtype !== 4 && $can('RoleDelete','permissions')" @click="$refs['DeleteModal'+item.id].show()" style="cursor:pointer" v-b-tooltip.hover.top="$t('Delete')">
                  <feather-icon icon="TrashIcon"></feather-icon>
              </b-link>
          </div>
          <b-modal
            :ref="'DeleteModal'+item.id"
            :cancel-title="$t('Cancel')"
            :ok-title="$t('Accept')"
            cancel-variant="danger"
            ok-variant="success"
            @ok="Delete(item)"
            >
            <template #modal-title>
                {{ $t('Accept') }} <b-spinner v-if="DeleteLoading" small></b-spinner>
            </template>
            <b-card-text>
                <h5> ID :  {{ item.id }} </h5>
                <h5> {{ $t('WantDelete') }} </h5>
            </b-card-text>
          </b-modal>
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
import { BButton, BPagination, BTable, BCol, BRow, BSpinner, BCard, BTooltip, BBadge, BInputGroup, BFormInput, BInputGroupAppend,VBTooltip,BModal,BLink,BCardText } from 'bootstrap-vue'
import RoleService from "@/services/managment/role.service";
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components : {
    BButton, BPagination, BTable, BCol, BRow, BSpinner, BCard, BTooltip, BBadge, BInputGroup, BFormInput, BInputGroupAppend,BModal,BLink,BCardText
  },
  directives: {
    'b-tooltip': VBTooltip
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
          key: "shortname",
          label: this.$t('shortname'),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "isdefault",
          label: this.$t('isdefault'),
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
        totalRows : 0
      },
      isBusy: false,
      DeleteLoading : false
    };
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
  },
  methods: {
    SortChange(data) {
      this.filter.Sort = data.sortBy;
      this.filter.Order = data.sortDesc ? "desc" : "asc";
      this.Refresh();
    },
    Delete(item){
      this.DeleteLoading = true
      RoleService.Delete(item.id).then(res => {
        this.DeleteLoading = false
        this.makeToast(this.$t('DeleteSuccess'),'success')
        this.Refresh()
      }).catch(error => {
        this.makeToast(error.response.data.error,'danger')
        this.DeleteLoading = false
      })
    },
    Refresh() {
      this.isBusy = true;
      RoleService.GetList(
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
  },
};
</script>

<style lang="scss" scoped>
</style>
