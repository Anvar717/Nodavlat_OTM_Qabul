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
  ]
  