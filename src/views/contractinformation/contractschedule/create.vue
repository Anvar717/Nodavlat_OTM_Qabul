<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="12" lg="12">
        <b-card>
          <b-row>
            <b-col sm="12" md="4">
              <div class="form-group">
                <label class="col-form-label" for>{{
                  $t("documentNumber")
                }}</label>
                <div>
                  <b-form-input
                    :placeholder="$t('documentNumber')"
                    v-model="Data.documentNumber"
                  />
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="4">
              <label class="col-form-label" for>{{ $t("documentDate") }}</label>
              <custom-date-picker
                v-model="Data.documentDate"
                @keyup="documentDateValue"
                format="DD.MM.YYYY"
                type="date"
                :clearable="false"
                :placeholder="$t('documentDate')"
              >
              </custom-date-picker>
            </b-col>
            <b-col sm="12" md="4">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("basis") }}</label>
                <div>
                  <b-form-input
                    :placeholder="$t('basis')"
                    v-model="Data.basis"
                  />
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12" md="4">
              <div class="form-group">
                <label class="col-form-label" for>{{
                  $t("academicYear")
                }}</label>
                <div>
                  <v-select
                    :options="academicYearlist"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="Data.academicYearId"
                  ></v-select>
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="4">
              <div class="form-group">
                <label class="col-form-label" for>{{
                  $t("checkingAccount")
                }}</label>
                <div>
                  <v-select
                    :options="checkingAccountlist"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="bankName"
                    v-model="Data.checkingAccountId"
                  ></v-select>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-card>
        <b-card>
          <b-row>
            <b-col sm="12" md="6" lg="6" class="text-left"> </b-col>
            <b-col sm="12" md="6" lg="6" class="text-right">
              <b-button @click="SaveData" size="sm" variant="outline-success">
                <feather-icon icon="CheckIcon"></feather-icon> {{ $t("Save") }}
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </b-overlay>
</template>

<script>
import {
  BOverlay,
  BCard,
  BRow,
  BCol,
  BFormInput,
  BTabs,
  BTab,
  BButton,
  BTable,
  BLink,
  BFormGroup,
  VBTooltip,
  BModal,
  VBModal,
  BCardText,
  BInputGroup,
  BInputGroupAppend,
  BTr,
  BTd,
  BTh,
  BFormCheckbox,
  BFormFile,
  BAvatar,
  BSpinner,
  BTableSimple,
  BThead,
  BButtonGroup,
  BTbody,
} from "bootstrap-vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import Ripple from "vue-ripple-directive";
import flatPickr from "vue-flatpickr-component";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import ContractscheduleService from "@/services/info/contractschedule.service";
export default {
  components: {
    BOverlay,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BTabs,
    BTab,
    BButton,
    BTable,
    BLink,
    flatPickr,
    BFormGroup,
    BModal,
    BCardText,
    BInputGroup,
    BInputGroupAppend,
    BTr,
    BTd,
    BTh,
    CustomDatePicker,
    BFormCheckbox,
    BFormFile,
    BAvatar,
    BSpinner,
    BTableSimple,
    BThead,
    BButtonGroup,
    BTbody,
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      show: false,
      Data: {},
      academicYearlist: [],
      checkingAccountlist: [],
      lang: "ru",
      config: {
        dateFormat: "d.m.Y",
      },
    };
  },
  props: {},
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    ContractscheduleService.getAcademicYears(1, 20)
      .then((res) => {
        this.academicYearlist = res.data.content;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, "danger");
      });
    ContractscheduleService.getCheckingAccountList(1, 20)
      .then((res) => {
        this.checkingAccountlist = res.data.content;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, "danger");
      });
  },
  directives: {
    Ripple,
  },
  methods: {
    documentDateValue(value) {
      this.Data.documentDate = value;
    },
    makeToast(message, variant) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: message,
          icon: variant == "success" ? "CheckSquareIcon" : "AlertTriangleIcon",
          variant: variant,
        },
      });
    },
    SaveData() {
      ContractscheduleService.createContractDetail(this.Data)
        .then((res) => {
          this.makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: "contractschedule" });
        })
        .catch((err) => {
          this.makeToast(this.$t(err), "danger");
        });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
