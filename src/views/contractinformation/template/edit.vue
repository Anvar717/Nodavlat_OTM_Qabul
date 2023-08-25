<template>
    <b-overlay :show="show">
        <b-row>
            <b-col sm="12" md="12" lg="12">
                <b-card>
                    <SunEditor :id="suneditor" v-model="description" />
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
    BSpinner
} from "bootstrap-vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import Ripple from "vue-ripple-directive";
import flatPickr from "vue-flatpickr-component";
import RekvizitService from "@/services/info/rekvizit.service";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import ContractscheduleService from "@/services/info/contractschedule.service";
import SunEditor from "@/views/components/SunEditor.vue";
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
        SunEditor
    },
    directives: {
        "b-tooltip": VBTooltip,
        "b-modal": VBModal,
    },
    data() {
        return {
            description: "Shokirov Anvarjon",
            show: false,
            Data: {},
            academicYearlist: [],
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
    },
    directives: {
        Ripple,
    },
    methods: {
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