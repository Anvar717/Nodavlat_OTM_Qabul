export default [
  {
    path: '/contractinformation/contractschedule',
    name: 'contractschedule',
    component: () => import('@/views/contractinformation/contractschedule/index.vue'),
    meta: {
      pageTitle: 'Contractschedule',
      breadcrumb: [
        {
          text: 'Contractinformation',
        },
        {
          text: 'Contractschedule',
          active: true,
        },
      ]
    },
  },
  {
    path: '/contractinformation/contractschedule/edit/id=:id',
    name: 'EditContractschedule',
    component: () => import('@/views/contractinformation/contractschedule/edit.vue'),
    meta: {
      pageTitle: 'EditContractschedule',
      breadcrumb: [
        {
          text: 'Contractinformation',
        },
        {
          text: 'EditContractschedule',
          active: true,
        },
      ]
    },
  },
  {
    path: '/contractinformation/contractschedule/clone/id=:id',
    name: 'Contractscheduleclone',
    component: () => import('@/views/contractinformation/contractschedule/clone.vue'),
    meta: {
      pageTitle: 'Contractschedule',
      breadcrumb: [
        {
          text: 'Contractinformation',
        },
        {
          text: 'Contractschedule',
          active: true,
        },
      ]
    },
  },
  {
    path: '/contractinformation/application',
    name: 'application',
    component: () => import('@/views/contractinformation/application/index.vue'),
    meta: {
      pageTitle: 'Application',
      breadcrumb: [
        {
          text: 'Contractinformation',
        },
        {
          text: 'Application',
          active: true,
        },
      ]
    },
  },
  {
    path: '/contractinformation/application/view/id=:id',
    name: 'ViewApplication',
    component: () => import('@/views/contractinformation/application/view.vue'),
    meta: {
      pageTitle: 'Appliaction',
      breadcrumb: [
        {
          text: 'Contractinformation',
        },
        {
          text: 'Appliaction',
          active: true,
        },
      ]
    },
  },
  {
    path: '/contractinformation/template',
    name: 'template',
    component: () => import('@/views/contractinformation/template/index.vue'),
    meta: {
      pageTitle: 'Template',
      breadcrumb: [
        {
          text: 'Contractinformation',
        },
        {
          text: 'Template',
          active: true,
        },
      ]
    },
  },
  {
    path: '/contractinformation/template/edit/id=:id',
    name: 'EditTemplate',
    component: () => import('@/views/contractinformation/template/edit.vue'),
    meta: {
      pageTitle: 'EditTemplate',
      breadcrumb: [
        {
          text: 'Contractinformation',
        },
        {
          text: 'EditTemplate',
          active: true,
        },
      ]
    },
  },
]
