export default [
    // Info Area Settings

    {
      path: '/info/competitionstages',
      name: 'competitionstages',
      component: () => import('@/views/info/competitionstages/index.vue'),
      meta: {
        pageTitle: 'CompetitionStages',
        breadcrumb: [
          {
            text: 'Info',
          },
          {
            text: 'CompetitionStages',
            active: true,
          },
        ]
      },
    },
    {
      path: '/info/competitionstages/edit/id=:id',
      name: 'EditCompetitionStages',
      component: () => import('@/views/info/competitionstages/edit.vue'),
      meta: {
        pageTitle: 'EditCompetitionStages',
        breadcrumb: [
          {
            text: 'Info',
          },
          {
            text: 'EditCompetitionStages',
            active: true,
          },
        ]
      },
    },
  ]
  