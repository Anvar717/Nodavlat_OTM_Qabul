<template>
    <b-overlay :show="show">
        <b-row>
            <b-col sm="12" md="12" lg="12">
                <b-card>
                    <b-row>
                        <b-col sm="12" md="4">
                            <div class="form-group">
                                <label class="col-form-label" for>{{ $t("bill") }}</label>
                                <div>
                                    <b-form-input :placeholder="$t('bill')" v-model="Data.bill" />
                                </div>
                            </div>
                        </b-col>
                        <b-col sm="12" md="4">
                            <div class="form-group">
                                <label class="col-form-label" for>{{ $t("billName") }}</label>
                                <div>
                                    <b-form-input :placeholder="$t('billName')" v-model="Data.billName" />
                                </div>
                            </div>
                        </b-col>
                        <b-col sm="12" md="4">
                            <div class="form-group">
                                <label class="col-form-label" for>{{ $t("stir") }}</label>
                                <div>
                                    <b-form-input :placeholder="$t('stir')" v-model="Data.stir" />
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12" md="4">
                            <div class="form-group">
                                <label class="col-form-label" for>{{ $t("okonx") }}</label>
                                <div>
                                    <b-form-input :placeholder="$t('okonx')" v-model="Data.okonx" />
                                </div>
                            </div>
                        </b-col>
                        <b-col sm="12" md="4">
                            <div class="form-group">
                                <label class="col-form-label" for>{{ $t("orgName") }}</label>
                                <div>
                                    <b-form-input :placeholder="$t('orgName')" v-model="Data.orgName" />
                                </div>
                            </div>
                        </b-col>
                        <b-col sm="12" md="4">
                            <div class="form-group">
                                <label class="col-form-label" for>{{ $t("directorFullName") }}</label>
                                <div>
                                    <b-form-input :placeholder="$t('directorFullName')" v-model="Data.directorFullName" />
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12" md="4">
                            <div class="form-group">
                                <label class="col-form-label" for>{{ $t("bank") }}</label>
                                <div>
                                    <v-select :options="banklist" :reduce="(item) => item.id"
                                        :placeholder="$t('ChooseBelow')" label="name" v-model="Data.bankId"></v-select>
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
    BSpinner
} from "bootstrap-vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import Ripple from "vue-ripple-directive";
import flatPickr from "vue-flatpickr-component";
import RekvizitService from "@/services/info/rekvizit.service";
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
            Data: {},
            banklist: [],
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
        RekvizitService.getBanks()
            .then((res) => {
                this.banklist = res.data;
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
            RekvizitService.getCheckingAccountById(this.$route.params.id)
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
        SaveData() {
            RekvizitService.Update(this.$route.params.id, this.Data)
                .then((res) => {
                    this.makeToast(this.$t("SaveSuccess"), "success");
                    this.$router.push({ name: "rekvizit" });
                })
                .catch((err) => {
                    this.makeToast(this.$t(err), "danger");
                });
            // if (this.$route.params.id > 0) {
            //     RekvizitService.updateCheckingAccount(this.$route.params.id, this.Data)
            //         .then((res) => {
            //             this.makeToast(this.$t("SaveSuccess"),    "success");
            //             this.$router.push({ name: "rekvizit" });
            //         })
            //         .catch((err) => {
            //             this.makeToast(this.$t(err), "danger");
            //         });
            // } else if (this.$route.params.id === 0) {

            // }
        },
    },
};
</script>
    
<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>