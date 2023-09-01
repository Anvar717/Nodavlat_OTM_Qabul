export default [
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
]