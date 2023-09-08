<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="9" lg="10">
        <b-card>
          <b-row class="text-center">
            <b-col>
              <h5>{{ $t("Abiturient ma'lumotlari") }}</h5>
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
                          :src="userResponse.photo"
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
                    <b>{{ userResponse.fullName }}</b>
                  </span>
                </b-list-group-item>
                <b-list-group-item
                  style="display: flex; justify-content: space-between"
                >
                  <span> {{ $t("GenderAndYearOfbirth") }}: </span>
                  <span>
                    <b
                      >{{ userResponse.gender == 1 ? "Erkak" : "Ayol" }},
                      {{ userResponse.birthDate }}</b
                    >
                  </span>
                </b-list-group-item>
                <b-list-group-item
                  style="display: flex; justify-content: space-between"
                >
                  <span> {{ $t("Citizenship") }}: </span>
                  <span>
                    <b>{{ userResponse.citizenship }}</b>
                  </span>
                </b-list-group-item>
                <b-list-group-item
                  style="display: flex; justify-content: space-between"
                >
                  <span> {{ $t("PermanentResidenceAddress") }}: </span>
                  <span>
                    <b>{{ userResponse.permanentAddress }}</b>
                  </span>
                </b-list-group-item>
                <b-list-group-item
                  style="display: flex; justify-content: space-between"
                >
                  <span> {{ $t("pinfl") }}: </span>
                  <span>
                    <b>{{ userResponse.pinfl }}</b>
                  </span>
                </b-list-group-item>
                <b-list-group-item
                  style="display: flex; justify-content: space-between"
                >
                  <span> {{ $t("callNumber") }}: </span>
                  <span>
                    <b>+{{ userResponse.phoneNumber }}</b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
          </b-row>
        </b-card>
        <b-card>
          <b-row class="text-center">
            <b-col>
              <h5>{{ $t("InformationOfTheApplicantApplication") }}</h5>
            </b-col>
          </b-row>
        </b-card>
        <b-card>
          <b-row>
            <b-col sm="12" md="6" lg="6">
              <b-list-group>
                <b-list-group-item
                  style="display: flex; justify-content: space-between"
                >
                  <span> {{ $t("districtName") }}: </span>
                  <span>
                    <b>{{ eduFinished.districtName }}</b>
                  </span>
                </b-list-group-item>
                <b-list-group-item
                  style="display: flex; justify-content: space-between"
                >
                  <span> {{ $t("eduFinishName") }}: </span>
                  <span>
                    <b>{{ eduFinished.eduFinishName }}</b>
                  </span>
                </b-list-group-item>
                <b-list-group-item
                  style="display: flex; justify-content: space-between"
                >
                  <span> {{ $t("eduInstitutionTypeName") }}: </span>
                  <span>
                    <b>{{ eduFinished.eduInstitutionTypeName }}</b>
                  </span>
                </b-list-group-item>
                <b-list-group-item
                  style="display: flex; justify-content: space-between"
                >
                  <span> {{ $t("regionName") }}: </span>
                  <span>
                    <b>{{ eduFinished.regionName }}</b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col sm="12" md="6" lg="6">
              <b-list-group>
                <b-list-group-item
                  style="display: flex; justify-content: space-between"
                >
                  <span> {{ $t("diplomaSerialAndNumber") }}: </span>
                  <span>
                    <b>{{ eduFinished.diplomaSerialAndNumber }}</b>
                  </span>
                </b-list-group-item>
                <b-list-group-item
                  style="display: flex; justify-content: space-between"
                >
                  <span> {{ $t("eduFinishYear") }}: </span>
                  <span>
                    <b>{{ eduFinished.eduFinishYear }}</b>
                  </span>
                </b-list-group-item>
                <b-list-group-item
                  style="display: flex; justify-content: space-between"
                >
                  <span> {{ $t("eduLanguage") }}: </span>
                  <span>
                    <b>{{ eduFinished.eduLanguage }}</b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col sm="12" md="6" lg="6"> </b-col>
          </b-row>
        </b-card>
        <b-card>
          <b-row class="text-center">
            <b-col>
              <h5>Abiturient arizasining ma'lumotlari</h5>
            </b-col>
          </b-row>
        </b-card>
        <b-card>
          <b-row>
            <b-col sm="12" md="6" lg="6">
              <b-list-group>
                <b-list-group-item
                  style="display: flex; justify-content: space-between"
                >
                  <span> {{ $t("degreeName") }}: </span>
                  <span>
                    <b>{{ contractPriceResponse.degreeName }}</b>
                  </span>
                </b-list-group-item>
                <b-list-group-item
                  style="display: flex; justify-content: space-between"
                >
                  <span> {{ $t("eduTypeName") }}: </span>
                  <span>
                    <b>{{ contractPriceResponse.eduTypeName }}</b>
                  </span>
                </b-list-group-item>
                <b-list-group-item
                  style="display: flex; justify-content: space-between"
                >
                  <span> {{ $t("specialityName") }}: </span>
                  <span>
                    <b>{{ contractPriceResponse.specialityName }}</b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col sm="12" md="6" lg="6">
              <b-list-group>
                <b-list-group-item
                  style="display: flex; justify-content: space-between"
                >
                  <span> {{ $t("eduLevelName") }}: </span>
                  <span>
                    <b>{{ contractPriceResponse.eduLevelName }}</b>
                  </span>
                </b-list-group-item>
                <b-list-group-item
                  style="display: flex; justify-content: space-between"
                >
                  <span> {{ $t("languageName") }}: </span>
                  <span>
                    <b>{{ contractPriceResponse.languageName }}</b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
          </b-row>
        </b-card>
        <b-card>
          <b-row class="text-center">
            <b-col>
              <h5>DTM ma'lumotlari</h5>
            </b-col>
          </b-row>
        </b-card>
        <b-card>
          <b-row>
            <b-col sm="12" md="6" lg="6">
              <b-list-group-item
                style="display: flex; justify-content: space-between"
              >
                <span> {{ $t("resultMessage") }}: </span>
                <span>
                  <b>{{
                    dtmResultResponse == null
                      ? ""
                      : dtmResultResponse.resultMessage
                  }}</b>
                </span>
              </b-list-group-item>
              <b-list-group-item
                style="display: flex; justify-content: space-between"
              >
                <span> {{ $t("speciality") }}: </span>
                <span>
                  <b>{{
                    dtmResultResponse == null
                      ? ""
                      : dtmResultResponse.speciality
                  }}</b>
                </span>
              </b-list-group-item>
              <b-list-group-item
                style="display: flex; justify-content: space-between"
              >
                <span> {{ $t("Biologiya") }}: </span>
                <span>
                  <b>{{ subjectResults.Biologiya }}</b>
                </span>
              </b-list-group-item>
              <b-list-group-item
                style="display: flex; justify-content: space-between"
              >
                <span> {{ $t("Kimyo") }}: </span>
                <span>
                  <b>{{ subjectResults.Kimyo }}</b>
                </span>
              </b-list-group-item>
            </b-col>
            <b-col sm="12" md="6" lg="6">
              <b-list-group-item
                style="display: flex; justify-content: space-between"
              >
                <span> {{ $t("Matematika") }}: </span>
                <span>
                  <b>{{ subjectResults.Matematika }}</b>
                </span>
              </b-list-group-item>
              <b-list-group-item
                style="display: flex; justify-content: space-between"
              >
                <span> {{ $t("Ona tili") }}: </span>
                <span>
                  <b>{{ subjectResults.Onatili }}</b>
                </span>
              </b-list-group-item>
              <b-list-group-item
                style="display: flex; justify-content: space-between"
              >
                <span> {{ $t("Tarix") }}: </span>
                <span>
                  <b>{{ subjectResults.Tarix }}</b>
                </span>
              </b-list-group-item>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col>
        <b-button
          v-if="Data.status != 'APPROVED'"
          @click="OpenApproveModal"
          variant="success"
          block
        >
          {{ $t("Approve") }}
        </b-button>
      </b-col>
    </b-row>
    <b-modal
      v-model="ApproveModal"
      no-close-on-backdrop
      hide-footer
      :title="$t('Approve')"
    >
      <h4>{{ $t("WantApprove") }}</h4>
      <b-row>
        <b-col class="text-right">
          <b-button variant="danger" @click="ApproveModal = false" class="mr-1">
            {{ $t("no") }}
          </b-button>
          <b-button @click="Approve" variant="success">
            {{ $t("yes") }}
          </b-button>
        </b-col>
      </b-row>
    </b-modal>
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
import ApplicationService from "@/services/info/application.service";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
// import ContractscheduleService from "@/services/info/contractschedule.service";
import UniversitiesService from "@/services/info/universities.service";
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
      banklist: [],
      userResponse: {},
      eduFinished: {},
      contractPriceResponse: {},
      universitysInfo: {},
      dtmResultResponse: {},
      subjectResults: {},
      ApproveModal: false,
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
      ApplicationService.getApplicationById(this.$route.params.id)
        .then((res) => {
          this.show = false;
          this.userResponse = res.data.userResponse;
          this.eduFinished = res.data.eduFinished;
          this.contractPriceResponse = res.data.contractPriceResponse;
          this.Data = res.data;
          this.dtmResultResponse = res.data.dtmResultResponse;
          this.subjectResults = res.data.dtmResultResponse.subjectResults;
          UniversitiesService.getUniversityById(this.Data.universityId).then(
            (res) => {
              this.universitysInfo = res.data;
            }
          );
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    OpenApproveModal() {
      this.ApproveModal = true;
    },
    Approve() {
      ApplicationService.changeApplicationStatus({
        appId: this.$route.params.id,
        status: "APPROVED",
      })
        .then((res) => {
          this.makeToast(this.$t("SuccessCancel"), "success");
          this.$router.push({ name: "application" });
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, "danger");
        });

      // var todaydate = new Date();
      // var dd = String(todaydate.getDate()).padStart(2, "0");
      // var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      // var yyyy = todaydate.getFullYear();
      // var contractDate = dd + "." + mm + "." + yyyy;
      // ApplicationService.getContractTemplates(
      //     1,
      //     20
      // ).then((res) => {

      // });
      // ContractscheduleService.readFromFile("https://nodavlat.e-edu.uz/api/public/download/TEMPLATE-Ici5y692164604.txt").
      //     then((res) => {
      //         this.content = res.data
      //         this.content = this.content.replaceAll('{address}', this.universitysInfo.address)
      //         this.content = this.content.replaceAll('{contract_date}', contractDate)
      //         this.content = this.content.replaceAll('{univerName}', this.universitysInfo.name)
      //         this.content = this.content.replaceAll('{rector}', this.universitysInfo.directorFullName)
      //         this.content = this.content.replaceAll('{student}', this.userResponse.fullName)
      //         this.content = this.content.replaceAll('{educationType}', this.contractPriceResponse.eduTypeName)
      //         this.content = this.content.replaceAll('{educationForm}', this.contractPriceResponse.eduFormName)
      //         this.content = this.content.replaceAll('{curriculumEducationPeriod}',)
      //         this.content = this.content.replaceAll('{education_period}', '')
      //         this.content = this.content.replaceAll('{level}', this.contractPriceResponse.eduLevelName)
      //         this.content = this.content.replaceAll('{specialty}', this.contractPriceResponse.specialityName)
      //         this.content = this.content.replaceAll('{realSumma}', this.contractPriceResponse.withScholarship)
      //         this.content = this.content.replaceAll('{contractSummaType}', this.contractPriceResponse.contractSummaType)
      //         this.content = this.content.replaceAll('{discountInfo}',)
      //         this.content = this.content.replaceAll('{startDateDay}',)
      //         this.content = this.content.replaceAll('{endDateDay}', '')
      //         this.content = this.content.replaceAll('{endDateM}', '')
      //         this.content = this.content.replaceAll('{mailing_address}', '')
      //         this.content = this.content.replaceAll('{bank_details}', '')
      //         this.content = this.content.replaceAll('{student_address}', this.userResponse.permanentAddress)
      //         this.content = this.content.replaceAll('{passport}', this.userResponse.passport)
      //         this.content = this.content.replaceAll('{phone}', this.userResponse.phoneNumber)
      //         ApplicationService.generateContractTemplate({
      //             text: this.content
      //         }).then((res) => {

      //         })

      //     }).
      //     catch(err => {
      //         this.makeToast(err, 'danger')
      //     })
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
