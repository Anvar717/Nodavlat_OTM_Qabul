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
    path: '/contractinformation/contractschedule/create/id=:id',
    name: 'CreateContractschedule',
    component: () => import('@/views/contractinformation/contractschedule/create.vue'),
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
  {
    path: '/contractinformation/contractapplications',
    name: 'contractapplications',
    component: () => import('@/views/contractinformation/contractapplications/index.vue'),
    meta: {
      pageTitle: 'ContractApplications',
      breadcrumb: [
        {
          text: 'Contractinformation',
        },
        {
          text: 'ContractApplications',
          active: true,
        },
      ]
    },
  },
  {
    path: '/contractinformation/contractapplications/view/id=:id',
    name: 'ViewContractApplications',
    component: () => import('@/views/contractinformation/contractapplications/view.vue'),
    meta: {
        pageTitle: 'ContractApplications',
        breadcrumb: [
            {
                text: 'Contractinformation',
            },
            {
                text: 'ContractApplications',
                active: true,
            },
        ]
    },
},
{
  path: '/contractinformation/otmuser',
  name: 'otmuser',
  component: () => import('@/views/contractinformation/otmuser/index.vue'),
  meta: {
    pageTitle: 'OtmUser',
    breadcrumb: [
      {
        text: 'Contractinformation',
      },
      {
        text: 'OtmUser',
        active: true,
      },
    ]
  },
},
{
  path: '/contractinformation/otmuser/view/id=:id',
  name: 'ViewOtmUser',
  component: () => import('@/views/contractinformation/otmuser/view.vue'),
  meta: {
      pageTitle: 'OtmUser',
      breadcrumb: [
          {
              text: 'Contractinformation',
          },
          {
              text: 'OtmUser',
              active: true,
          },
      ]
  },
},
]
