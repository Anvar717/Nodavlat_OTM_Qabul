<template>
  <b-card
    v-if="data.length > 0"
    no-body
    
  >
    <b-card-header>
      <b-card-title class="ml-25">
        {{ $t('DocumentHistory') }}
      </b-card-title>
    </b-card-header>

    <b-card-body style="height:600px;overflow-y:auto">
      <app-timeline>
        <app-timeline-item v-for="(item,index) in data" :key="index" :variant="getColor(item)" >
          <div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
            <h6>{{ item.organizationinfo }}</h6>
            <small class="timeline-item-time text-nowrap text-muted ml-1">{{ item.dateofcreated }}</small>
          </div>
          <p>{{ item.userinfo }} - <b> {{ item.username }} </b> - <b-badge :variant="getColor(item)"> {{ item.statusname }} </b-badge>  </p>
          <p v-if="item.statusname === 'Не принято'"> <b-badge variant="light-danger"> {{ $t('ReasonOfCancel') }} </b-badge> : {{ item.adddata }} </p>
        </app-timeline-item>
      </app-timeline>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardBody, BCardHeader, BCardTitle, VBTooltip,BBadge
} from 'bootstrap-vue'
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'
/* eslint-disable global-require */
export default {
  components: {
    BCard,
    BCardBody,
    BCardHeader,
    BCardTitle,
    AppTimeline,
    AppTimelineItem,
    BBadge
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  props: {
    data: {
      type: Array,
      default: [],
    },
  },
  methods:{
      getColor(item){
          if(item.statusname === 'Создан'){
              return 'primary'
          }
          else if(item.statusname === 'Изменен'){
              return 'info'
          }
          else if(item.statusname === 'Не принято'){
              return 'danger'
          }
          else if(item.statusname === 'Отменено'){
              return 'danger'
          }
          else if(item.statusname === 'Утвержден'){
              return 'success'
          }
          else if(item.statusname === 'Отправлен'){
              return 'warning'
          }
          else{
              return 'primary'
          }
      }
  }
}
</script>
