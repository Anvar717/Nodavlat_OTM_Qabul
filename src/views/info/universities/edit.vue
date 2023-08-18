<template>
    <b-overlay :show="show">
    
     
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
  import HelperService from "@/services/others/helper.service";
  import Ripple from "vue-ripple-directive";
  import flatPickr from "vue-flatpickr-component";
  import UniversitiesService from "@/services/info/universities.service";
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
        TranslateModal: false,
        TranslateFields: [
          {
            key: "languagename",
            label: this.$t("languagename"),
            class: "text-center",
          },
          {
            key: "translatetext",
            label: this.$t("translatetext"),
            class: "text-center",
          },
          { key: "actions", label: this.$t("actions"), thClass: "text-center" },
        ],
        TranslateItem: {
          tableid: 0,
          tablerowid: 0,
          languageid: 0,
          languagename: "",
          columnname: "",
          translatetext: "",
        },
        LanguageList: [],
        TranslateItems: [],
        lang: "ru",
        StateList: [],
        ModalShow: false,
        editedIndex1: -1,
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
    //   HelperService.GetStateList()
    //     .then((res) => {
    //       this.StateList = res.data;
    //     })
    //     .catch((error) => {
    //       this.makeToast(error.response.data.error, "danger");
    //     });
    //   HelperService.GetLanguageList()
    //     .then((res) => {
    //       this.LanguageList = res.data;
    //     })
    //     .catch((error) => {
    //       this.makeToast(error.response.data.error, "danger");
    //     });
    },
    directives: {
      Ripple,
    },
    methods: {
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