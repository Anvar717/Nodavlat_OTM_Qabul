<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="9" lg="10">
        <b-card>
          <b-row class="text-center">
            <b-col>
              <h5>{{ $t("Foydalanuvchi ma'lumotlari") }}</h5>
            </b-col>
          </b-row>
        </b-card>
        <b-card>
          <b-row class="mt-1">
            <b-col sm="12" md="3" lg="3">
              <div>
                <fieldset>
                  <b-row>
                    <b-col sm="12" md="12" lg="12">
                      <div class="image-container">
                        <b-img
                          thumbnail
                          fluid
                          style="width: 240px; height: 240px"
                          class="thumbnail ml-auto mr-auto"
                          :src="Data.photo"
                        />
                      </div>
                    </b-col>
                  </b-row>
                </fieldset>
              </div>
            </b-col>
            <b-col sm="12" md="9" lg="9">
              <b-list-group>
                <b-list-group-item
                  style="display: flex; justify-content: space-between"
                >
                  <span> {{ $t("fullName") }}: </span>
                  <span>
                    <b>{{ Data.fullName }}</b>
                  </span>
                </b-list-group-item>
                <b-list-group-item
                  style="display: flex; justify-content: space-between"
                >
                  <span> {{ $t("GenderAndYearOfbirth") }}: </span>
                  <span>
                    <b
                      >{{ Data.gender == 1 ? "Erkak" : "Ayol" }},
                      {{ Data.birthDate }}</b
                    >
                  </span>
                </b-list-group-item>
                <b-list-group-item
                  style="display: flex; justify-content: space-between"
                >
                  <span> {{ $t("Citizenship") }}: </span>
                  <span>
                    <b>{{ Data.citizenship }}</b>
                  </span>
                </b-list-group-item>
                <b-list-group-item
                  style="display: flex; justify-content: space-between"
                >
                  <span> {{ $t("PermanentResidenceAddress") }}: </span>
                  <span>
                    <b>{{ Data.permanentAddress }}</b>
                  </span>
                </b-list-group-item>
                <b-list-group-item
                  style="display: flex; justify-content: space-between"
                >
                  <span> {{ $t("pinfl") }}: </span>
                  <span>
                    <b>{{ Data.pinfl }}</b>
                  </span>
                </b-list-group-item>
                <b-list-group-item
                  style="display: flex; justify-content: space-between"
                >
                  <span> {{ $t("callNumber") }}: </span>
                  <span>
                    <b>+{{ Data.phoneNumber }}</b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col> </b-col>
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
  BListGroup,
  BListGroupItem,
  BImg,
} from "bootstrap-vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import Ripple from "vue-ripple-directive";
import flatPickr from "vue-flatpickr-component";
import OtmUserService from "@/services/info/otmuser.service";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import ContractscheduleService from "@/services/info/contractschedule.service";
// import UniversitiesService from "@/services/info/universities.service";
const { jsPDF } = require("jspdf");
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
    BListGroup,
    BListGroupItem,
    BImg,
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      Data: {},
      show: false,
      //   banklist: [],
      //   eduFinished: {},
      //   contractPriceResponse: {},
      //   universitysInfo: {},
      //   ApproveModal: false,
      lang: "ru",
      config: {
        dateFormat: "d.m.Y",
      },
      content: "",
    };
  },
  props: {},
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.Refresh();
  },
  directives: {
    Ripple,
  },
  methods: {
    Refresh() {
      OtmUserService.userOTMAdminById(this.$route.params.id)
        .then((res) => {
          this.show = false;
          this.Data = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, "danger");
        });
    },
    // OpenApproveModal() {
    //   this.ApproveModal = true;
    // },
    // Approve() {
    //   ApplicationService.changeApplicationStatus({
    //     appId: this.$route.params.id,
    //     status: "APPROVED",
    //   })
    //     .then((res) => {
    //       this.makeToast(this.$t("SuccessCancel"), "success");
    //       this.$router.push({ name: "application" });
    //     })
    //     .catch((error) => {
    //       this.makeToast(error.response.data.error, "danger");
    //     });
    // },
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
    // SaveData() {
    //     ApplicationService.Update(this.$route.params.id, this.Data)
    //         .then((res) => {
    //             this.makeToast(this.$t("SaveSuccess"), "success");
    //             this.$router.push({ name: "rekvizit" });
    //         })
    //         .catch((err) => {
    //             this.makeToast(this.$t(err), "danger");
    //         });
    // },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
