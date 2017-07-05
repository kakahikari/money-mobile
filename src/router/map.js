export const routes = [
  {
    path: '/',
    redirect: { name: 'index' },
    components: require('@/pages/body-contents'),
    children: [
      { path: 'index', name: 'index', components: require('@/pages/index') }
    ]
  },

  { path: '*', redirect: { name: 'index' } }
]
