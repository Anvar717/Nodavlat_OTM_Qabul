<template>
  <b-card no-body>
    <div class="m-2">
      <b-row>
        <b-col>
          <b-button-group @click="Refresh" size="sm">
            <b-button
              :variant="eduType == item.id ? 'primary' : 'outline-primary'"
              v-for="(item, index) in EduTypeList"
              @click="ChangeEduType(item)"
              :key="index"
              >{{ item.name }}</b-button
            >
          </b-button-group>
        </b-col>
      </b-row>
      <b-row class="mt-1">
        <b-col md="8" style="margin-top: 5px">
          <div>
            <b-button-group @click="Refresh" size="sm">
              <b-button
                @click="educationLevel = ''"
                :variant="educationLevel == '' ? 'primary' : 'outline-primary'"
                >{{ $t("All") }}</b-button
              >
              <b-button
                :variant="
                  educationLevel == item.id ? 'primary' : 'outline-primary'
                "
                v-for="(item, index) in EducationLevels"
                @click="ChangeEducationLevel(item)"
                :key="index"
                >{{ item.name }}</b-button
              >
            </b-button-group>
          </div>
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
      <template #cell(applicationStatus)="{ item }">
        <b-badge
          :variant="
            item.applicationStatus === 'APPROVED'
              ? 'light-success'
              : item.applicationStatus === 'NEW'
              ? 'light-primary'
              : 'light-danger'
          "
        >
          {{
            item.applicationStatus === "APPROVED"
              ? $t("APPROVED")
              : item.applicationStatus === "NEW"
              ? $t("New")
              : $t("REJECTED")
          }}
        </b-badge>
      </template>
      <template #cell(actions)="{ item }">
        <div class="text-center">
          <b-link
            :to="{ name: 'ViewContractApplications', params: { id: item.id } }"
            v-b-tooltip.hover.top="$t('View')"
          >
            <feather-icon
              icon="EyeIcon"
              style="margin-right: 5px"
            ></feather-icon>
          </b-link>
        </div>
      </template>
      <template v-slot:table-busy>
        <div
          class="text-center text-primary my-2"
          style="vertical-align: middle"
        >
          <b-spinner class="align-middle mr-2"></b-spinner>
          <strong>{{ $t("Loading") }}</strong>
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
          <label>{{ $t("Entries") }}</label>
          <v-select
            v-model="filter.size"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="filter.perPageOptions"
            :clearable="false"
            @input="Refresh"
            class="per-page-selector d-inline-block ml-50 mr-1"
          />
          <span class="text-muted"
            >{{ $t("Showing") }} {{ firstNumber }} {{ $t("to") }}
            {{ lastNumber }} {{ $t("of") }} {{ filter.totalElements }}
            {{ $t("entries") }}</span
          >
        </b-col>
        <!-- Pagination -->
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-end"
        >
          <b-pagination
            v-model="filter.page"
            :total-rows="filter.totalElements"
            :per-page="filter.size"
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
import {
  BButton,
  BPagination,
  BTable,
  BCol,
  BRow,
  BSpinner,
  BCard,
  BTooltip,
  BBadge,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BLink,
  VBTooltip,
  BButtonGroup,
} from "bootstrap-vue";
import ContractapplicationsService from "@/services/info/contractapplications.service";
import ContractscheduleService from "@/services/info/contractschedule.service";
export default {
  directives: {
    "b-tooltip": VBTooltip,
  },
  components: {
    BButton,
    BPagination,
    BTable,
    BCol,
    BRow,
    BSpinner,
    BCard,
    BTooltip,
    BBadge,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BLink,
    BButtonGroup,
  },
  data() {
    return {
      eduType: 11,
      educationLevel: "",
      items: [],
      EducationLevels: [],
      EduTypeList: [],
      fields: [
        {
          key: "id",
          label: this.$t("id"),
          sortable: true,
        },
        {
          key: "contractSum",
          label: this.$t("contractSum"),
          sortable: true,
        },
        {
          key: "createDate",
          label: this.$t("createDate"),
          sortable: true,
        },
        {
          key: "eduTypeName",
          label: this.$t("eduTypeName"),
          sortable: true,
        },
        {
          key: "fullName",
          label: this.$t("fullName"),
          sortable: true,
        },
        {
          key: "otmName",
          label: this.$t("otmName"),
          sortable: true,
        },
        {
          key: "specialitlyName",
          label: this.$t("specialitlyName"),
          sortable: true,
        },
        {
          key: "applicationStatus",
          label: this.$t("status"),
          sortable: true,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "actions",
          label: this.$t("actions"),
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
      filter: {
        courseId: 0,
        search: "",
        eduTypeId: 0,
        page: 1,
        size: 20,
        perPageOptions: [10, 20, 50, 100],
      },
      isBusy: false,
    };
  },
  computed: {
    firstNumber() {
      return (this.filter.page - 1) * this.filter.size + 1;
    },
    lastNumber() {
      if (this.filter.totalElements < this.filter.size) {
        return this.filter.totalElements;
      } else {
        if (this.filter.page * this.filter.size > this.filter.totalElements) {
          return this.filter.totalElements;
        } else {
          return this.filter.page * this.filter.size;
        }
      }
    },
  },
  created() {
    ContractscheduleService.getEduType()
      .then((res) => {
        this.EduTypeList = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, "danger");
      });
    this.GetEducationLevel();
    this.Refresh();
  },
  methods: {
    Edit(item) {
      this.$router.push({ path: "/info/universities/edit/" + item.id });
    },
    SortChange(data) {
      this.filter.Sort = data.sortBy;
      this.filter.Order = data.sortDesc ? "desc" : "asc";
      this.Refresh();
    },
    GetEducationLevel() {
      ContractscheduleService.getEducationLevel(this.eduType)
        .then((res) => {
          this.EducationLevels = res.data;
          // this.educationLevel = this.EducationLevels[0].id;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, "danger");
        });
    },
    Refresh() {
      this.isBusy = true;
      ContractapplicationsService.getHighCourseApplications(
        this.educationLevel,
        this.filter.search,
        this.eduType,
        this.filter.page,
        this.filter.size
      ).then((res) => {
        this.items = res.data.content;
        this.filter.totalElements = res.data.totalElements;
        this.isBusy = false;
      });
    },
    ChangeEduType(item) {
      this.eduType = item.id;
      this.GetEducationLevel();
    },
    ChangeEducationLevel(item) {
      this.educationLevel = item.id;
    },
  },
};
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.invoice-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
</style>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
