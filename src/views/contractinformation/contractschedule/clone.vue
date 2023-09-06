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
                    disabled
                    :placeholder="$t('documentNumber')"
                    v-model="Data.documentNumber"
                  />
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="4">
              <label class="col-form-label" for>{{ $t("documentDate") }}</label>
              <custom-date-picker
                disabled
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
                    disabled
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
                    disabled
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
                    label="bill"
                    v-model="Data.checkingAccountId"
                  ></v-select>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <b-button-group>
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
          <b-row class="mt-2">
            <b-col>
              <b-button-group>
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
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <b-table-simple
                bordered
                responsive
                sticky-header="80vh"
                no-border-collapse
              >
                <b-thead>
                  <b-tr>
                    <b-td rowspan="2" class="text-center bg-info text-white"
                      >Mutaxassislik</b-td
                    >
                    <b-td rowspan="2" class="text-center bg-info text-white"
                      >Til</b-td
                    >
                    <b-td
                      v-for="(item, index) in degrees"
                      :key="index + 'cell1'"
                      class="text-center bg-info text-white"
                      colspan="3"
                      >{{ item.name }}</b-td
                    >
                  </b-tr>
                  <b-tr>
                    <template v-for="(item, index) in degrees">
                      <b-td
                        :key="index + 'cell3' + 1"
                        class="text-center bg-info text-white"
                        >Koef</b-td
                      >
                      <b-td
                        :key="index + 'cell3' + 2"
                        style=""
                        class="text-center bg-info text-white"
                        >St-siz</b-td
                      >
                      <b-td
                        :key="index + 'cell3' + 3"
                        class="text-center bg-info text-white"
                        >St-li</b-td
                      >
                    </template>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <template v-for="(el, index) in ContractPrices">
                    <b-tr
                      :key="levelIndex + 'i' + index + 'row'"
                      v-for="(language, langIndex) in languages"
                    >
                      <b-td
                        v-if="langIndex === 0"
                        sticky-column
                        :rowspan="languages.length"
                      >
                        {{ el.specialityName }}
                      </b-td>
                      <b-td sticky-column>
                        {{ language.nameUz }}
                      </b-td>
                      <template v-for="degreeIndex in degrees.length">
                        <b-td>
                          <b-form-input
                            style="width: 100px !important"
                            v-model="
                              el.contractPriceResponses[
                                langIndex * degrees.length + degreeIndex - 1
                              ].coefficient
                            "
                          ></b-form-input>
                        </b-td>
                        <b-td>
                          <!-- {{ el.contractPriceResponses[langIndex * degrees.length + degreeIndex -
                                                        1].withScholarship }} -->
                          <b-form-input
                            style="width: 100px !important"
                            v-model="
                              el.contractPriceResponses[
                                langIndex * degrees.length + degreeIndex - 1
                              ].withScholarship
                            "
                          ></b-form-input>
                        </b-td>
                        <b-td>
                          <!-- {{ el.contractPriceResponses[langIndex * degrees.length + degreeIndex -
                                                        1].withoutScholarship }} -->
                          <b-form-input
                            style="width: 100px !important"
                            v-model="
                              el.contractPriceResponses[
                                langIndex * degrees.length + degreeIndex - 1
                              ].withoutScholarship
                            "
                          ></b-form-input>
                        </b-td>
                      </template>
                    </b-tr>
                  </template>
                </b-tbody>
              </b-table-simple>
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
      degrees: [],
      ContractPrices: [],
      languages: [],
      eduType: 11,
      educationLevel: 0,
      EduTypeList: [],
      checkingAccountlist: [],
      EducationLevels: [],
      lang: "ru",
      config: {
        dateFormat: "d.m.Y",
      },
    };
  },
  props: {},
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.Refresh();
    ContractscheduleService.getAcademicYears(1, 20)
      .then((res) => {
        this.academicYearlist = res.data.content;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, "danger");
      });
    ContractscheduleService.degrees()
      .then((res) => {
        this.degrees = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, "danger");
      });
    ContractscheduleService.getEduType()
      .then((res) => {
        this.EduTypeList = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, "danger");
      });
    ContractscheduleService.languages()
      .then((res) => {
        this.languages = res.data;
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
    this.GenerateContractPrices();
    this.GetEducationLevel();
  },
  directives: {
    Ripple,
  },
  methods: {
    GenerateContractPrices() {
      ContractscheduleService.generateContractPrices({
        eduTypeId: this.eduType,
        coefficient: 0,
      })
        .then((res) => {
          this.ContractPrices = res.data;
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    GetEducationLevel() {
      ContractscheduleService.getEducationLevel(this.eduType)
        .then((res) => {
          this.EducationLevels = res.data;
          this.educationLevel = this.EducationLevels[0].id;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, "danger");
        });
    },
    Refresh() {
      ContractscheduleService.getContractDetailById(this.$route.params.id)
        .then((res) => {
          this.show = false;
          this.Data = res.data;
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    ChangeEduType(item) {
      this.eduType = item.id;
      this.GenerateContractPrices();
      this.GetEducationLevel();
    },
    ChangeEducationLevel(item) {
      this.educationLevel = item.id;
    },
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
    rowClass(item, type) {
      if (item.Status === 3) return "d-none";
    },
    SaveData() {
      ContractscheduleService.createContractPrices({
        educationLevelId: this.eduType,
        contractDetailId: this.Data.id,
        checkingAccountId: this.Data.checkingAccountId,
        dtos: this.ContractPrices,
      })
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
