<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="12" lg="12">
        <b-card>
          <b-row>
            <b-col sm="12" md="4">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("address") }}</label>
                <div>
                  <b-form-input :placeholder="$t('address')" v-model="Data.address" />
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="4">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("uniInfo") }}</label>
                <div>
                  <b-form-input :placeholder="$t('uniInfo')" v-model="Data.uniInfo" />
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="4">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("region") }}</label>
                <div>
                  <v-select :options="regionlist" :reduce="(item) => item.id" :placeholder="$t('ChooseBelow')"
                    label="name" v-model="Data.regionId"></v-select>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12" md="4">

              <label for>{{
                $t("startdate")
              }}</label>

              <custom-date-picker v-model="Data.startDate" @keyup="startDateValue" format="DD.MM.YYYY" type="date"
                :clearable="false" :placeholder="$t('startdate')">
              </custom-date-picker>
            </b-col>
          </b-row>
          <b-row class="mt-3">
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
} from "bootstrap-vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import Ripple from "vue-ripple-directive";
import flatPickr from "vue-flatpickr-component";
import UniversitiesService from "@/services/info/universities.service";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
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
    CustomDatePicker
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      show: false,
      Data: {},
      filter: {},
      lang: "ru",
      StateList: [],
      config: {
        dateFormat: "d.m.Y",
      },
    };
  },
  props: {},
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    UniversitiesService.getUniversityById(this.$route.params.id)
      .then((res) => {
        this.show = false;
        this.Data = res.data;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });
  },
  directives: {
    Ripple,
  },
  methods: {
    startDateValue(value) {
      this.Data.startDate = value;
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
      // CompetitionStagesService.Update(this.CompetitionStages)
      //   .then((res) => {
      //     this.makeToast(this.$t("SaveSuccess"), "success");
      //     this.$router.push({ name: "CompetitionStages" });
      //   })
      //   .catch((err) => {
      //     this.makeToast(this.$t(err), "danger");
      //   });
    },
  },
};
</script>
  
<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>