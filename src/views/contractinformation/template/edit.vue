<template>
    <b-overlay :show="show">
        <b-row>
            <b-col sm="12" md="12" lg="12">
                <b-card>
                    <b-row>
                        <b-col sm="12" md="4" lg="4">
                            <div class="form-group">
                                <label class="col-form-label" for>{{ $t("ContractType") }}</label>
                                <div>
                                    <v-select :options="contracttypelist" :reduce="(item) => item.name"
                                        :placeholder="$t('ChooseBelow')" label="name" v-model="ContractType"></v-select>
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                </b-card>
                <b-card>
                    <!-- <SunEditor :id="suneditor" v-model="description" /> -->
                    <div id="app">
                        <editor api-key="1x21d8xsaamzgivy4oktlw2uwf5hezoo0o4gev2qk1qmqwzs" v-model="content"
                            :initial-value="initialValue" :init="{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \
                                                                                                                                                                                                                                                                                                                                                                                                       alignleft aligncenter alignright alignjustify | \
                                                                                                                                                                                                                                                                                                                                                                                                       bullist numlist outdent indent | removeformat | help'
                            }" />
                    </div>
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
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import ContractscheduleService from "@/services/info/contractschedule.service";
import SunEditor from "@/views/components/SunEditor.vue";
import Editor from '@tinymce/tinymce-vue'
import VueHtml2pdf from 'vue-html2pdf'
import ApplicationService from "@/services/info/application.service";
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
        SunEditor,
        Editor,
        VueHtml2pdf
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
            ContractType: 0,
            content: '',
            academicYearlist: [],
            contracttypelist: [
                {
                    id: 1,
                    name: 'Ikki tomonlama'
                },
                {
                    id: 2,
                    name: 'Uch tomonlama'
                }
            ],
            lang: "ru",
            config: {
                dateFormat: "d.m.Y",
            },
        };
    },
    props: {},
    created() {
        ContractscheduleService.readFromFile("https://talaba.e-edu.uz/api/public/download/TEMPLATE-Ici5y692164604.txt").
            then((res) => {
                this.content = res.data;
            }).
            catch(err => {
                this.makeToast(err, 'danger')
            })
        this.lang = localStorage.getItem("locale") || "ru";
        ContractscheduleService.getAcademicYears(1, 20)
            .then((res) => {
                this.academicYearlist = res.data.content;
            })
            .catch((error) => {
                this.$makeToast(error.response.data.error, "danger");
            });
        this.Refresh();
    },
    directives: {
        Ripple,
    },
    methods: {
        Refresh() {
            ApplicationService.getContractTemplate(this.$route.params.id)
                .then((res) => {
                    this.show = false;
                    this.Data = res.data;
                    this.ContractType = res.data.type
                    this.content = res.data.url
                })
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
            ContractscheduleService.Update(this.$route.params.id, {
                content: this.content,
                type: this.ContractType
            }).
                then(res => {
                    this.makeToast(this.$t("SaveSuccess"), "success");
                    this.$router.push({ name: "template" });
                })
                .catch((error) => {
                    this.makeToast(error.response.data.error, "danger");
                });
        },
    },
};
</script>
    
<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>