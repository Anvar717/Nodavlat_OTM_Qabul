<template>
    <b-overlay :show="show">
        <b-row>
            <b-col sm="12" md="12" lg="12">
                <b-card>
                </b-card>
                <b-card>
                    <!-- <b-row>
                        <b-col sm="12" md="6" lg="6" class="text-left"> </b-col>
                        <b-col sm="12" md="6" lg="6" class="text-right">
                            <b-button @click="SaveData" size="sm" variant="outline-success">
                                <feather-icon icon="CheckIcon"></feather-icon> {{ $t("Save") }}
                            </b-button>
                        </b-col>
                    </b-row> -->
                    <!-- <iframe src="https://talaba.e-edu.uz/api/public/download/TEMPLATE-Ici5y692164604.txt" width="1333px" height="700px"> -->
                    </iframe>
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
import ApplicationService from "@/services/info/application.service";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import ContractscheduleService from "@/services/info/contractschedule.service";
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
        BSpinner
    },
    directives: {
        "b-tooltip": VBTooltip,
        "b-modal": VBModal,
    },
    data() {
        return {
            show: false,
            Data: {},
            banklist: [],
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
        ContractscheduleService.readFromFile("https://talaba.e-edu.uz/api/public/download/TEMPLATE-Ici5y692164604.txt").
            then(res => {
                this.content = res.data
                this.content = this.content.replaceAll('{student}', 'Oybek Muzropov')
               
                const doc = new jsPDF();
                doc.text(this.content, 1, 1)
                // doc.save('template.pdf')

                console.log(this.content)
            }).
            catch(err => {
                this.makeToast(err, 'danger')
            })

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
                    this.Data = res.data;
                })
                .catch((error) => {
                    this.$makeToast(error.response.data.error, "danger");
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