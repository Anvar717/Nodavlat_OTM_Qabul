<template>
    <b-overlay :show="show">
        <b-row>
            <b-col sm="12" md="12" lg="12">
                <b-card>
                    <b-row>
                        <b-col sm="12" md="4">
                            <div class="form-group">
                                <label class="col-form-label" for>{{ $t("documentNumber") }}</label>
                                <div>
                                    <b-form-input disabled :placeholder="$t('documentNumber')"
                                        v-model="Data.documentNumber" />
                                </div>
                            </div>
                        </b-col>
                        <b-col sm="12" md="4">
                            <label class="col-form-label" for>{{
                                $t("documentDate")
                            }}</label>
                            <custom-date-picker disabled v-model="Data.documentDate" @keyup="documentDateValue"
                                format="DD.MM.YYYY" type="date" :clearable="false" :placeholder="$t('documentDate')">
                            </custom-date-picker>
                        </b-col>
                        <b-col sm="12" md="4">
                            <div class="form-group">
                                <label class="col-form-label" for>{{ $t("basis") }}</label>
                                <div>
                                    <b-form-input disabled :placeholder="$t('basis')" v-model="Data.basis" />
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12" md="4">
                            <div class="form-group">
                                <label class="col-form-label" for>{{ $t("academicYear") }}</label>
                                <div>
                                    <v-select disabled :options="academicYearlist" :reduce="(item) => item.id"
                                        :placeholder="$t('ChooseBelow')" label="name"
                                        v-model="Data.academicYearId"></v-select>
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row class="mt-2">
                        <b-col>
                            <b-button-group>
                                <b-button :variant="eduType == item.id ? 'primary' : 'outline-primary'
                                    " v-for="(item, index) in EduTypeList" @click="ChangeEduType(item)" :key="index">{{
        item.name }}</b-button>
                            </b-button-group>
                        </b-col>
                    </b-row>
                    <b-row class="mt-2">
                        <b-col>
                            <b-table-simple bordered responsive sticky-header="80vh" no-border-collapse>
                                <b-thead>
                                    <b-tr>
                                        <b-td rowspan="2" class="text-center bg-info text-white">Mutaxassislik</b-td>
                                        <b-td rowspan="2" class="text-center bg-info text-white">Til</b-td>
                                        <b-td v-for="(item, index) in degrees" :key="index + 'cell1'"
                                            class="text-center bg-info text-white" colspan="3">{{ item.name }}</b-td>
                                    </b-tr>
                                    <b-tr>
                                        <template v-for="(item, index) in degrees">
                                            <b-td :key="index + 'cell3' + 1"
                                                class="text-center bg-info text-white">Koef</b-td>
                                            <b-td :key="index + 'cell3' + 2" style=""
                                                class="text-center bg-info text-white">St-siz</b-td>
                                            <b-td :key="index + 'cell3' + 3"
                                                class="text-center bg-info text-white">St-li</b-td>
                                        </template>

                                    </b-tr>
                                </b-thead>
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
    BButtonGroup
} from "bootstrap-vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import Ripple from "vue-ripple-directive";
import flatPickr from "vue-flatpickr-component";
import RekvizitService from "@/services/info/rekvizit.service";
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
        BButtonGroup
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
            eduType: 12,
            EduTypeList: [],
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
                this.$makeToast(error.response.data.error, "danger");
            });
        ContractscheduleService.degrees()
            .then((res) => {
                this.degrees = res.data;
            })
            .catch((error) => {
                this.$makeToast(error.response.data.error, "danger");
            });
        ContractscheduleService.getEduType()
            .then((res) => {
                this.EduTypeList = res.data;
            })
            .catch((error) => {
                this.$makeToast(error.response.data.error, "danger");
            });
        this.GenerateContractPrices();
    },
    directives: {
        Ripple,
    },
    methods: {
        GenerateContractPrices() {
            ContractscheduleService.generateContractPrices({
                "eduTypeId": this.eduType,
                "coefficient": 0
            })
                .then((res) => {
                    this.ContractPrices = res.data;
                })
                .catch((error) => {
                    this.$makeToast(error.response.data.error, "danger");
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
            this.eduType = item.id
            this.GenerateContractPrices();
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
            ContractscheduleService.Update(this.$route.params.id, this.Data)
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