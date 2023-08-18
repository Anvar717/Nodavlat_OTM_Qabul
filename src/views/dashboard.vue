<template>
  <div>
    
      <!-- Dashboard {{ $can('SchoolInfoView','permissions') }} -->

  </div>
</template>

<script>
import { BCard,BRow,BCol } from 'bootstrap-vue'
//import OblastService from '@/services/info/oblast.service'
//import RegionService from '@/services/info/region.service'
//import OrganizationService from '@/services/managment/organization.service'
//import DashboardService from '@/services/dashboard.service'
import vSelect from 'vue-select'
import customSelect from './components/customSelect.vue'
export default {
  components : { BCard,vSelect,BRow,BCol,customSelect },
  data(){
    return{
      filter : {
        obalstid : 0,
        regionid : 0,
        organizationid : 0
      },
      OblastList : [],
      RegionList : [],
      OrganizationList : [],
      center : {
        lat : 41,
        lng : 69
      },
      paths : [],
      Locations : []
    }
  },
  created(){
    // OblastService.GetAll(this.lang).then(res => {
    //     this.OblastList = res.data
    // })
  },
  methods:{
    getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    ChangeOblast(){
        this.filter.regionid = 0
        this.filter.organizationid = 0
        if(!!this.filter.oblastid){
            RegionService.GetAll(this.lang,this.filter.oblastid).then(res => {
                this.RegionList = res.data
            })
            this.GetLocation()
        }
    },
    GetLocation(){
      // DashboardService.GetMicroTerritoryListInDashboard(this.filter.oblastid,this.filter.regionid,this.filter.organizationid).then(res => {
      //   this.Locations = res.data.result
      // })
    },
    ChangeRegion(){
      // this.filter.organizationid = 0
      //   if(!!this.filter.regionid){
      //       OrganizationService.GetAll(this.filter.oblastid,this.filter.regionid).then(res => {
      //           this.OrganizationList = res.data
      //       })
      //       this.GetLocation()

      //   }
    },
    ChangeOrg(){
      // if(!!this.filter.organizationid){
            this.GetLocation()
        // }
    }
  }
}
</script>

<style>

</style>