<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Brand logo-->
      <b-link class="brand-logo">
        <!-- <vuexy-logo style="z-index:9999;overflow:auto;width : 120px;height:40px" /> -->
        <h2 class="brand-text text-primary ml-1">Oliy Ta'lim muassasalari uchun <br> qabul va online to'lov kontrakt
          shartnomasi <br> shakllantirish shartnomasi</h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img fluid :src="imgUrl" alt="Login V2" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title title-tag="h2" class="font-weight-bold mb-1">
            {{ $t("auth") }}
          </b-card-title>
          <b-card-text class="mb-2">
            {{ $t("Sign In to your account") }}
          </b-card-text>

          <!-- form -->
          <validation-observer ref="loginValidation">
            <b-form class="auth-login-form mt-2" @submit.prevent>
              <!-- email -->
              <!-- <b-form-group :label="$t('username')" label-for="login-email">
                <validation-provider #default="{ errors }" name="username" rules="required">
                  <b-form-input id="login-email" v-model="login.phoneNumber" :state="errors.length > 0 ? false : null"
                    name="login-email" :placeholder="$t('username')" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group> -->

              <!-- forgot password -->
              <!-- <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password"> {{ $t("Password") }} </label>
                  <b-link :to="{ name: 'auth-forgot-password' }">
                    <small> {{ $t("ForgotPassword") }} </small>
                  </b-link>
                </div>
                <validation-provider #default="{ errors }" name="Password" rules="required">
                  <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                    <b-form-input id="login-password" v-model="login.password" :state="errors.length > 0 ? false : null"
                      class="form-control-merge" :type="passwordFieldType" name="login-password"
                      placeholder="············" />
                    <b-input-group-append is-text>
                      <feather-icon class="cursor-pointer" :icon="passwordToggleIcon" @click="togglePasswordVisibility" />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group> -->

              <!-- checkbox -->
              <!-- <b-form-group>
                <b-form-checkbox
                  id="remember-me"
                  v-model="status"
                  name="checkbox-1"
                >
                  Remember Me
                </b-form-checkbox>
              </b-form-group> -->

              <!-- submit buttons -->

              <!-- !!!!!!!!!  LOCAL BILAN SERVER AJRATILDI -->

              <!-- <b-button
                type="submit"
                variant="primary"
                block
                @click="validationForm"
                :disabled="Loading"
                v-if="isLocal"
              >
                <b-spinner v-if="Loading" small></b-spinner>
                {{ $t("SignIn") }}
              </b-button> -->
              <!-- <b-button type="submit" variant="primary" block @click="Sign" :disabled="Loading">
                <b-spinner v-if="Loading" small></b-spinner>
                {{ $t("SignIn") }}
              </b-button> -->
              <b-button type="submit" variant="primary" block @click="SignbyOneId" :disabled="Loading">
                <b-spinner v-if="Loading" small></b-spinner>
                {{ $t("OneId") }}
              </b-button>
            </b-form>
          </validation-observer>

          <!-- <b-card-text class="text-center mt-2">
            <span>New on our platform? </span>
            <b-link :to="{name:'page-auth-register-v2'}">
              <span>&nbsp;Create an account</span>
            </b-link>
          </b-card-text> -->

          <!-- divider -->
          <!-- <div class="divider my-2">
            <div class="divider-text">
              or
            </div>
          </div> -->

          <!-- social buttons -->
          <!-- <div class="auth-footer-btn d-flex justify-content-center">
            <b-button
              variant="facebook"
              href="javascript:void(0)"
            >
              <feather-icon icon="FacebookIcon" />
            </b-button>
            <b-button
              variant="twitter"
              href="javascript:void(0)"
            >
              <feather-icon icon="TwitterIcon" />
            </b-button>
            <b-button
              variant="google"
              href="javascript:void(0)"
            >
              <feather-icon icon="MailIcon" />
            </b-button>
            <b-button
              variant="github"
              href="javascript:void(0)"
            >
              <feather-icon icon="GithubIcon" />
            </b-button>
          </div> -->
          <b-modal v-model="sms.trusteddevice" hide-footer no-close-on-backdrop :title="$t('SmsCode')">
            <b-alert show variant="success">
              <p class="p-1">
                {{ $t("SendSmmYourPhone", { phonenumber: sms.phoneNumber }) }}
              </p>
            </b-alert>
            <b-row>
              <b-col>
                <label for=""> {{ $t("SmsCode") }} </label>
                <b-form-input maxlength="4" v-model="sms.smscode"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col class="text-center">
                <b-button variant="danger" @click="sms.trusteddevice = false" class="mr-2">
                  <feather-icon icon="XIcon"> </feather-icon> {{ $t("Cancel") }}
                </b-button>
                <b-button variant="success" @click="SignTwoFactor">
                  <b-spinner small v-if="SignTwoFactorLoading"></b-spinner>
                  <feather-icon v-if="!SignTwoFactorLoading" icon="CheckSquareIcon"></feather-icon>
                  {{ $t("SignIn") }}
                </b-button>
              </b-col>
            </b-row>
          </b-modal>
        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import {
  BSpinner,
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BImg,
  BForm,
  BButton,
  BModal,
  BAlert,
} from "bootstrap-vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import AccountService from "@/services/others/account.service";
import ApiService from "@/services/api.service";
export default {
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    VuexyLogo,
    ValidationProvider,
    BSpinner,
    ValidationObserver,
    BModal,
    BAlert,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: "",
      password: "",
      userEmail: "",
      sideImg: require("@/assets/images/pages/login-v2.svg"),
      // validation rulesimport store from '@/store/index'
      required,
      email,
      Loading: false,
      login: {
        phoneNumber: "",
        password: "",
      },
      sms: {  
        trusteddevice: false,
        phoneNumber: "",
      },
      SignTwoFactorLoading: false,
    };
  },
  created() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code')
    if (!!code) {
      localStorage.setItem('code', code)
    }
    console.log(code)
    const localCode = localStorage.getItem('code')
    if (!!localCode) {
      this.oneIdLoading = true
      AccountService.oneIdAdminSignIn(localCode).then(res => {
        this.oneIdLoading = false

        console.log('AAA', res.data)
      
        localStorage.setItem("auth_token", res.data.object.jwtToken);
        
        localStorage.setItem("user_info", JSON.stringify(res.data.object));
        ApiService.setHeader();
        this.$router.push(
          this.$route.query.redirectFrom || {
            path: "/",
          }
        );
      })
        .catch((error) => {
          // console.log(error)
          this.oneIdLoading = false
          this.makeToast(error.response.data, 'danger');
          console.log(error)
        });
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    isLocal() {
      if (window.location.href.indexOf("http://localhost") > -1) {
        return true;
      } else {
        return false;
      }
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/login-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
  methods: {
    SignbyOneId() {
      window.location.replace('https://nodavlat.e-edu.uz/api/public/oneId')
    },
    // validationForm() {
    //   this.$refs.loginValidation.validate().then((success) => {
    //     if (success) {
    //       this.Loading = true;
    //       AccountService.GenerateToken(this.login)
    //         .then((res) => {
    //           localStorage.setItem("auth_token", res.data.token);
    //           this.$store.dispatch(
    //             "auth/setOrganizationtype",
    //             res.data.userinfo.organizationtypeid
    //           );
    //           localStorage.setItem(
    //             "user_info",
    //             JSON.stringify(res.data.userinfo)
    //           );
    //           this.$store.dispatch("auth/login", res.data);
    //           ApiService.setHeader();
    //           this.Loading = false;
    //           this.$router.push("/");
    //         })
    //         .catch((error) => {
    //           this.Loading = false;
    //           this.makeToast(error.response.data.error, "danger");
    //         });
    //     }
    //   });
    // },
    // Sign() {
    //   this.$refs.loginValidation.validate().then((success) => {
    //     if (success) {
    //       this.Loading = true;
    //       AccountService.signIn(this.login)
    //         .then((res) => {
    //           if (res.data.userinfo) {
    //             localStorage.setItem(
    //               "user_info",
    //               JSON.stringify(res.data.userinfo)
    //             );
    //             this.$store.dispatch("auth/login", res.data);
    //           }
    //           this.Loading = false;

    //           if (res.data.trusteddevice) {
    //             this.$router.push("/");
    //           }
    //           if (!res.data.trusteddevice) {
    //             this.sms.trusteddevice = true;
    //             this.sms.phoneNumber = res.data.phoneNumber;
    //             this.sms.smscode = "";
    //           }
    //         })
    //         .catch((error) => {
    //           this.makeToast(error.response.data.error, "danger");
    //           this.Loading = false;
    //         });
    //     }
    //   });
    // },
    // OneId() {
    //   AccountService.oneId().then((res) => {

    //   })
    // },
    SignTwoFactor() {
      if (
        this.sms.smscode === undefined ||
        this.sms.smscode === null ||
        this.sms.smscode === ""
      ) {
        this.makeToast(this.$t("SmsCodeNotCorrect"), "danger");
        return false;
      }
      this.SignTwoFactorLoading = true;
      AccountService.SignInTwoFactor(this.sms)
        .then((res) => {
          this.SignTwoFactorLoading = false;
          if (res.data.userinfo) {
            localStorage.setItem(
              "user_info",
              JSON.stringify(res.data.userinfo)
            );
            this.$store.dispatch("auth/login", res.data);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, "danger");
          this.SignTwoFactorLoading = false;
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
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
