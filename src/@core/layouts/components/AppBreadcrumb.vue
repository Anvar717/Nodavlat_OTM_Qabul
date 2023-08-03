<template>
  <b-row
    v-if="$route.meta.breadcrumb || $route.meta.pageTitle"
    class="content-header"
  >
    <!-- Content Left -->
    <b-col
      class="content-header-left mb-2"
      cols="12"
      md="9"
    >
      <b-row class="breadcrumbs-top">
        <b-col cols="12">
          <h2 class="content-header-title float-left pr-1 mb-0">
            {{ $t($route.meta.pageTitle) }}
          </h2>
          <div class="breadcrumb-wrapper">
            <b-breadcrumb>
              <b-breadcrumb-item to="/">
                <feather-icon
                  icon="HomeIcon"
                  size="16"
                  class="align-text-top"
                />
              </b-breadcrumb-item>
              <b-breadcrumb-item
                v-for="item in $route.meta.breadcrumb"
                :key="item.text"
                :active="item.active"
                :to="item.to"
              >
                {{ $t(item.text) }}
              </b-breadcrumb-item>
            </b-breadcrumb>
          </div>
        </b-col>
      </b-row>
    </b-col>

    <!-- Content Right -->
    <b-col
      class="content-header-right text-md-right d-md-block d-none mb-1"
      md="3"
      cols="12"
    >
      <b-button variant="outline-danger" size="sm" @click="BackButton">
        <feather-icon icon="ArrowLeftIcon">  </feather-icon> {{ $t('back') }}
      </b-button>
      <!-- <b-dropdown
        variant="link"
        no-caret
        toggle-class="p-0"
        right
      >

        <template #button-content>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="btn-icon"
          >
            <feather-icon icon="SettingsIcon" />
          </b-button>
        </template>

        <b-dropdown-item :to="{ name: 'apps-todo' }">
          <feather-icon
            icon="CheckSquareIcon"
            size="16"
          />
          <span class="align-middle ml-50">Todo</span>
        </b-dropdown-item>

        <b-dropdown-item :to="{ name: 'apps-chat' }">
          <feather-icon
            icon="MessageSquareIcon"
            size="16"
          />
          <span class="align-middle ml-50">Chat</span>
        </b-dropdown-item>

        <b-dropdown-item :to="{ name: 'apps-email' }">
          <feather-icon
            icon="MailIcon"
            size="16"
          />
          <span class="align-middle ml-50">Email</span>
        </b-dropdown-item>

        <b-dropdown-item :to="{ name: 'apps-calendar' }">
          <feather-icon
            icon="CalendarIcon"
            size="16"
          />
          <span class="align-middle ml-50">Calendar</span>
        </b-dropdown-item>
      </b-dropdown> -->
    </b-col>
  </b-row>
</template>

<script>
import {
  BBreadcrumb, BBreadcrumbItem, BRow, BCol, BDropdown, BDropdownItem, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    Ripple,
  },
  components: {
    BBreadcrumb,
    BBreadcrumbItem,
    BRow,
    BCol,
    BDropdown,
    BDropdownItem,
    BButton,
  },
  methods:{
    BackButton(){
      if(this.$route.name == "Viewmicroterritory"){
        this.$router.push({
          name : "microterritory",
          query : {
            oblastid : this.$store.state.verticalMenu.MicroterritoryFilter.oblastid,
            regionid : this.$store.state.verticalMenu.MicroterritoryFilter.regionid,
            mfyid : this.$store.state.verticalMenu.MicroterritoryFilter.mfyid,
            streetid : this.$store.state.verticalMenu.MicroterritoryFilter.streetid,
            Search : this.$store.state.verticalMenu.MicroterritoryFilter.Search
          }
        })
      } else
      if(this.$route.name == "ViewAllStatements"){
        this.$router.push({
          name : "allstatements",
          query : {
            oblastid : this.$store.state.verticalMenu.StatementFilter.oblastid,
            regionid : this.$store.state.verticalMenu.StatementFilter.regionid,
            organizationid : this.$store.state.verticalMenu.StatementFilter.organizationid,
            Search : this.$store.state.verticalMenu.StatementFilter.Search,
            statusid : this.$store.state.verticalMenu.StatementFilter.statusid
          }
        })
      } else
      if(this.$route.name == "ViewTestResult"){
        this.$router.push({
          name : "testresult",
          query : {
            oblastId : this.$store.state.verticalMenu.TestResultFilter.oblastId,
            regionId : this.$store.state.verticalMenu.TestResultFilter.regionId,
            admissionTypeId : this.$store.state.verticalMenu.TestResultFilter.admissionTypeId,
            organizationId : this.$store.state.verticalMenu.TestResultFilter.organizationId,
            educationDirectionId : this.$store.state.verticalMenu.TestResultFilter.educationDirectionId,
            schoolSubjectId : this.$store.state.verticalMenu.TestResultFilter.schoolSubjectId,
            educationLanguageId : this.$store.state.verticalMenu.TestResultFilter.educationLanguageId,
          }
        })
      } else{
        this.$router.back()
      }
    }

  }
}
</script>
