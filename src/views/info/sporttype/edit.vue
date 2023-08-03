<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="12" lg="12">
        <b-card>
          <b-row>
            <b-col sm="12" md="6">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("code") }}</label>
                <div>
                  <b-form-input
                    :placeholder="$t('code')"
                    v-model="SportType.code"
                  />
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="6">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("shortname") }}</label>
                <div>
                  <b-input-group>
                    <b-form-input
                      :placeholder="$t('shortname')"
                      v-model="SportType.shortname"
                    />
                    <b-input-group-append>
                      <b-button
                        variant="primary"
                        @click="OpenTranslateModal('shortname')"
                      >
                        <feather-icon icon="GlobeIcon"></feather-icon>
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="6">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("fullname") }}</label>
                <div>
                  <b-input-group>
                    <b-form-input
                      :placeholder="$t('fullname')"
                      v-model="SportType.fullname"
                    />
                    <b-input-group-append>
                      <b-button
                        variant="primary"
                        @click="OpenTranslateModal('fullname')"
                      >
                        <feather-icon icon="GlobeIcon"></feather-icon>
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="6">
              <div class="form-group">
                <label class="col-form-label" for>{{
                  $t("numberofattendees")
                }}</label>
                <div>
                  <b-form-input
                    type="number"
                    :placeholder="$t('numberofattendees')"
                    v-model="SportType.numberofattendees"
                  />
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="6">
              <div class="form-group">
                <label class="col-form-label" for>{{ $t("Status") }}</label>
                <div>
                  <v-select
                    :options="StateList"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="SportType.stateid"
                  ></v-select>
                </div>
              </div>
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
    <b-modal
      size="lg"
      :title="$t('Translates')"
      v-model="TranslateModal"
      hide-footer
      no-close-on-backdrop
    >
      <b-table
        :fields="TranslateFields"
        :items="TranslateItems"
        responsive="sm"
        striped
        bordered
        small
      >
        <template v-slot:thead-top>
          <b-tr>
            <b-td>
              <v-select
                :options="LanguageList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="TranslateItem.languageid"
                @input="ChangeTranslate"
              ></v-select>
            </b-td>
            <b-td>
              <b-form-input
                :placeholder="$t('fullname')"
                v-model="TranslateItem.translatetext"
              />
            </b-td>
            <b-td class="text-center">
              <b-button variant="primary" @click="AddTranslate">
                <feather-icon icon="PlusIcon"></feather-icon>
              </b-button>
            </b-td>
          </b-tr>
        </template>
        <template #cell(translatetext)="{ item }">
          <b-form-input
            :placeholder="$t('fullname')"
            v-model="item.translatetext"
          />
        </template>
      </b-table>
      <b-row>
        <b-col class="text-right">
          <b-button @click="TranslateModal = false" variant="success">
            {{ $t("Save") }}
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
} from "bootstrap-vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import HelperService from "@/services/others/helper.service";
import Ripple from "vue-ripple-directive";
import flatPickr from "vue-flatpickr-component";
import SportTypeService from '@/services/info/sporttype.service';
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
      SportType: {},
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
    this.show = true;
    SportTypeService.Get(this.$route.params.id).then((res) => {
      this.show = false;
      this.SportType = res.data.result;
    });
    HelperService.GetStateList()
      .then((res) => {
        this.StateList = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, "danger");
      });
    HelperService.GetLanguageList()
      .then((res) => {
        this.LanguageList = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, "danger");
      });
  },
  directives: {
    Ripple,
  },
  methods: {
    check(){
            if (
                this.SportType.code === 0 ||
                this.SportType.code === null ||
                this.SportType.code === undefined ||
                this.SportType.code === ""
            ) {
                this.makeToast(
                    this.$t("codeNotCorrect"),
                    "danger"
                );
                return false;
            }
            if (
                this.SportType.shortname === 0 ||
                this.SportType.shortname === null ||
                this.SportType.shortname === undefined ||
                this.SportType.shortname === ""
            ) {
                this.makeToast(
                    this.$t("shortnameNotCorrect"),
                    "danger"
                );
                return false;
            }
            if (
                this.SportType.fullname === 0 ||
                this.SportType.fullname === null ||
                this.SportType.fullname === undefined ||
                this.SportType.fullname === ""
            ) {
                this.makeToast(
                    this.$t("fullnameNotCorrect"),
                    "danger"
                );
                return false;
            }
            if (
                this.SportType.numberofattendees === 0 ||
                this.SportType.numberofattendees === null ||
                this.SportType.numberofattendees === undefined ||
                this.SportType.numberofattendees === ""
            ) {
                this.makeToast(
                    this.$t("numberofattendeesNotCorrect"),
                    "danger"
                );
                return false;
            }
            if (
                this.SportType.stateid === 0 ||
                this.SportType.stateid === null ||
                this.SportType.stateid === undefined ||
                this.SportType.stateid === ""
            ) {
                this.makeToast(
                    this.$t("stateNotSelected"),
                    "danger"
                );
                return false;
            }
            return true
        },
    ChangeTranslate() {
      this.TranslateItem.languagename = !!this.TranslateItem.languageid
        ? this.LanguageList.filter(
            (item) => item.id == this.TranslateItem.languageid
          )[0].name
        : "";
    },
    clearLangTable(columnname) {
      this.TranslateItem = {
        tableid: 0,
        tablerowid: 0,
        languageid: 0,
        languagename: "",
        columnname: columnname,
        translatetext: "",
      };
    },
    AddTranslate() {
      if (
        this.TranslateItem.languageid === null ||
        this.TranslateItem.languageid === undefined ||
        this.TranslateItem.languageid === 0 ||
        this.TranslateItem.languageid === ""
      ) {
        this.makeToast(this.$t("notSelectLang"), "danger");
        return false;
      }
      if (
        this.SportType.Translates.filter(
          (item) =>
            item.languageid === this.TranslateItem.languageid &&
            item.columnname == this.TranslateItem.columnname
        ).length > 0
      ) {
        this.makeToast(this.$t("AlreadySelectLang"), "danger");
        return false;
      }
      this.SportType.Translates.push(this.TranslateItem);
      this.GetTranslateItems(this.TranslateItem.columnname);
      this.clearLangTable(this.TranslateItem.columnname);
    },
    OpenTranslateModal(columnname) {
      this.TranslateModal = true;
      this.GetTranslateItems(columnname);
      this.clearLangTable(columnname);
    },
    GetTranslateItems(columnname) {
      this.TranslateItems = this.SportType.Translates.filter(
        (item) => item.columnname == columnname
      );
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
      SportTypeService.Update(this.SportType)
        .then((res) => {
          this.makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: "SportType" });
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