export const routes = [
  {
    path: '/',
    redirect: { name: 'index' },
    components: require('@/components/body-contents'),
    children: [
      { path: 'index', name: 'index', components: require('@/pages/index') },
      { path: 'login', name: 'Login', components: require('@/pages/login') },
      { path: 'terms', name: 'Terms', components: require('@/pages/terms') },
      { path: 'register', name: 'Register', components: require('@/pages/register') }
    ]
  },

  { path: '*', redirect: { name: 'index' } }
]
