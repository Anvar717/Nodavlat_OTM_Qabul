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
              <label class="col-form-label" for>{{
                $t("startdate")
              }}</label>
              <custom-date-picker v-model="Data.startDate" @keyup="startDateValue" format="DD.MM.YYYY" type="date"
                :clearable="false" :placeholder="$t('startdate')">
              </custom-date-picker>
            </b-col>
            <b-col sm="12" md="4">
              <label class="col-form-label" for>{{
                $t("enddate")
              }}</label>
              <custom-date-picker v-model="Data.endDate" @keyup="endDateValue" format="DD.MM.YYYY" type="date"
                :clearable="false" :placeholder="$t('enddate')">
              </custom-date-picker>
            </b-col>
            <b-col sm="12" md="4">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("avgContractSum") }}</label>
                <div>
                  <b-form-input type="number" :placeholder="$t('avgContractSum')" v-model="Data.avgContractSum" />
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12" md="4">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("minContractSum") }}</label>
                <div>
                  <b-form-input type="number" :placeholder="$t('minContractSum')" v-model="Data.minContractSum" />
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="4">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("maxContractSum") }}</label>
                <div>
                  <b-form-input type="number" :placeholder="$t('maxContractSum')" v-model="Data.maxContractSum" />
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="4">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("routeCount") }}</label>
                <div>
                  <b-form-input type="number" :placeholder="$t('routeCount')" v-model="Data.routeCount" />
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12" md="4">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("mapUrl") }}</label>
                <div>
                  <b-form-input type="number" :placeholder="$t('mapUrl')" v-model="Data.mapUrl" />
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="4">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("mashrut") }}</label>
                <div>
                  <b-form-input :placeholder="$t('mashrut')" v-model="Data.mashrut" />
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="4">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("callNumber") }}</label>
                <div>
                  <b-form-input v-mask="'+998-##-###-##-##'" :placeholder="$t('callNumber')" v-model="Data.callNumber" />
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12" md="4">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("metro") }}</label>
                <div>
                  <b-form-input :placeholder="$t('metro')" v-model="Data.metro" />
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="4">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("website") }}</label>
                <div>
                  <b-form-input :placeholder="$t('website')" v-model="Data.website" />
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="4">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("facilities") }}</label>
                <div>
                  <v-select :options="facilitieslist" :reduce="(item) => item.name" multiple
                    :placeholder="$t('ChooseBelow')" label="name" v-model="Data.facilities"></v-select>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12" md="4">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("photoUrl") }}</label>
                <div>
                  <b-form-file v-model="file" :placeholder="$t('importfile')" drop-placeholder="Drop file here..."
                    @change="ChangeFile" accept=".pdf,.jpg,.png,.jpeg" :browse-text="$t('select')" />
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="4">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("dormitory") }}</label>
                <div>
                  <b-form-checkbox v-model="Data.dormitory" class="mr-0 mt-50" name="is-rtl" switch inline />
                </div>
              </div>
            </b-col>
          </b-row>
        </b-card>
        <b-row>
          <b-col sm="6" md="3" lg="2" v-for="(item, index) in Data.fileResponses" :key="index">
            <b-card class="text-center">
              <b-avatar class="mb-1" variant="light-primary" size="45">
                <feather-icon size="21" icon="PaperclipIcon" />
              </b-avatar>
              <div class="truncate">
                <h3 class="mb-25 font-weight-bolder">
                  {{ item.fileName }}
                </h3>
                <div>
                  <feather-icon v-if="!item.DownloadLoading" class="cursor-pointer mr-1" @click="DownLoad(item)" size="20"
                    icon="DownloadIcon"></feather-icon>
                  <b-spinner v-if="item.DownloadLoading" small></b-spinner>
                  <feather-icon class="cursor-pointer" @click="OpenDeleteModal(item)" size="20"
                    icon="TrashIcon"></feather-icon>
                </div>
              </div>
            </b-card>
          </b-col>
        </b-row>
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
    <b-modal v-model="DeleteModal" :title="$t('Delete')" no-close-on-backdrop hide-footer>
      <b-card-text>
        <!-- <h5>{{ DeleteItem.projectfiletext }}</h5> -->
        <h5>{{ $t("WantDelete") }}</h5>
      </b-card-text>
      <b-row>
        <b-col class="text-right">
          <b-button @click="DeleteModal = false" class="mr-1" variant="danger">
            {{ $t("no") }}
          </b-button>
          <b-button @click="Delete(DeleteItem)" variant="success">
            <b-spinner v-if="DeleteLoading" small></b-spinner> {{ $t("yes") }}
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
  BSpinner
} from "bootstrap-vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import Ripple from "vue-ripple-directive";
import flatPickr from "vue-flatpickr-component";
import UniversitiesService from "@/services/info/universities.service";
import RegionService from "@/services/info/region.service";
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
    CustomDatePicker,
    BFormCheckbox,
    BFormFile,
    BAvatar,
    BSpinner
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      show: false,
      file: [],
      Data: {},
      filter: {},
      key: "photo",
      DeleteModal: false,
      DeleteLoading: false,
      lang: "ru",
      StateList: [],
      regionlist: [],
      facilitieslist: [],
      config: {
        dateFormat: "d.m.Y",
      },
    };
  },
  props: {},
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.Refresh();
    RegionService.regions(1, 0, 20)
      .then((res) => {
        this.regionlist = res.data.content;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });
    UniversitiesService.getFacilities()
      .then((res) => {
        this.facilitieslist = res.data;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });
  },
  directives: {
    Ripple,
  },
  methods: {
    Refresh() {
      UniversitiesService.getUniversityById(this.$route.params.id)
        .then((res) => {
          this.show = false;
          this.Data = res.data;
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    ChangeFile(data) {
      var formData = new FormData();
      formData.append("file", data.target.files[0]);
      this.show = true;
      UniversitiesService.uploadFile(this.key, formData)
        .then((res) => {
          this.show = false;
          this.Data.fileResponses.push({
            url: res.data.object.url,
            fileName: res.data.object.fileName
          })
        })
        .catch((error) => {
          this.show = false;
          this.$makeToast(error.response.data.error, "danger");
        });
      this.file = [];
    },
    Delete(item) {
      this.DeleteLoading = true;
      UniversitiesService.Delete(item.fileName)
        .then((res) => {
          this.DeleteLoading = false;
          this.DeleteModal = false;
          this.Refresh()
          this.makeToast(this.$t("DeleteSuccess"), "success");
        })
        .catch((error) => {
          this.DeleteLoading = false;
          this.makeToast(error.response.data.error, "danger");
        });
    },
    DownLoad(item) {
      item.DownloadLoading = true;
      AdmImageService.Get(item.projectfileid)
        .then((res) => {
          item.DownloadLoading = false;
          this.downloadFile(res, item);
        })
        .catch((error) => {
          item.DownloadLoading = false;
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    OpenDeleteModal(item) {
      this.DeleteModal = true;
      this.DeleteItem = item;
    },
    startDateValue(value) {
      this.Data.startDate = value;
    },
    endDateValue(value) {
      this.Data.endDate = value;
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
      UniversitiesService.updateUniversity(this.Data)
        .then((res) => {
          this.makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: "universities" });
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