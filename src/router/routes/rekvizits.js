export default [
    {
      path: '/rekvizits/rekvizit',
      name: 'rekvizit',
      component: () => import('@/views/rekvizits/rekvizit/index.vue'),
      meta: {
        pageTitle: 'Rekvizit',
        breadcrumb: [
          {
            text: 'Rekvizit',
          },
          {
            text: 'Rekvizit',
            active: true,
          },
        ]
      },
    },
    {
      path: '/rekvizits/rekvizit/edit/id=:id',
      name: 'EditRekvizit',
      component: () => import('@/views/rekvizits/rekvizit/edit.vue'),
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
  