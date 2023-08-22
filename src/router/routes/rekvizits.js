export default [
    {
      path: '/rekvizits/rekvizit',
      name: 'universities',
      component: () => import('@/views/rekvizits/universities/index.vue'),
      meta: {
        pageTitle: 'Universities',
        breadcrumb: [
          {
            text: 'Rekvizit',
          },
          {
            text: 'Universities',
            active: true,
          },
        ]
      },
    },
    {
      path: '/rekvizits/rekvizit/edit/id=:id',
      name: 'EditRekvizit',
      component: () => import('@/views/rekvizits/universities/edit.vue'),
      meta: {
        pageTitle: 'EditRekvizit',
        breadcrumb: [
          {
            text: 'Rekvizit',
          },
          {
            text: 'EditRekvizit',
            active: true,
          },
        ]
      },
    },
  ]
  