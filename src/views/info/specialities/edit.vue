<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="12" lg="12">
        <b-card>
          <b-row>
            <b-col sm="12" md="4">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("code") }}</label>
                <div>
                  <b-form-input :placeholder="$t('code')" v-model="Data.code" />
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="4">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("eduType") }}</label>
                <div>
                  <v-select
                    :options="eduTypelist"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="Data.eduTypeId"
                  ></v-select>
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="4">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("facultyCode") }}</label>
                <div>
                  <b-form-input :placeholder="$t('facultyCode')" v-model="Data.facultyCode" />
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12" md="4">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("facultyName") }}</label>
                <div>
                  <b-form-input
                    :placeholder="$t('facultyName')"
                    v-model="Data.facultyName"
                  />
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="4">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("formEducation") }}</label>
                <div>
                  <v-select
                  :options="formEducationlist"
                    :reduce="(item) => item.name"
                    multiple
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="Data.formEducations"
                  ></v-select>
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="4">
              <div class="form-group">
                <label class="col-form-label" for>{{
                  $t("hemisId")
                }}</label>
                <div>
                  <b-form-input
                    :placeholder="$t('hemisId')"
                    v-model="Data.hemisId"
                  />
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12" md="4">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("speciality") }}</label>
                <div>
                  <v-select
                    :options="specialitylist"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="specialityName"
                    v-model="Data.specialityId"
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
  BFormCheckbox,
  BFormFile,
  BAvatar,
  BSpinner,
} from "bootstrap-vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import Ripple from "vue-ripple-directive";
import flatPickr from "vue-flatpickr-component";
import SpecialitiesService from "@/services/info/specialities.service";
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
    CustomDatePicker,
    BFormCheckbox,
    BFormFile,
    BAvatar,
    BSpinner,
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      show: false,
      Data: {},
      eduTypelist: [],
      formEducationlist: [],
      specialitylist: [],
      lang: "ru",
      config: {
        dateFormat: "d.m.Y",
      },
    };
  },
  props: {},
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    ContractscheduleService.getEduType()
      .then((res) => {
        this.eduTypelist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, "danger");
      });
      SpecialitiesService.getAllFormEdu()
      .then((res) => {
        this.formEducationlist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, "danger");
      });
      SpecialitiesService.getSpecialities(1,20,'')
      .then((res) => {
        this.specialitylist = res.data.content;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, "danger");
      });
    this.Refresh();
  },
  directives: {
    Ripple,
  },
  methods: {
    Refresh() {
      SpecialitiesService.getSpecialityById(this.$route.params.id)
        .then((res) => {
          this.show = false;
          this.Data = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, "danger");
        });
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
      RekvizitService.Update(this.$route.params.id, this.Data)
        .then((res) => {
          this.makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: "rekvizit" });
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
