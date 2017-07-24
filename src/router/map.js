export const routes = [
  {
    path: '/',
    redirect: { name: 'index' },
    components: require('@/components/body-contents'),
    children: [
      { path: 'index', name: 'index', components: require('@/pages/index') },
      { path: 'login', name: 'Login', components: require('@/pages/login'), meta: { noMenu: true } },
      { path: 'register', name: 'Register', components: require('@/pages/register'), meta: { noMenu: true } },
      { path: 'terms', name: 'Terms', components: require('@/pages/terms') },
      { path: 'notice-list', name: 'Notice-list', components: require('@/pages/notice-list'), meta: { isLastPage: true } },
      { path: 'promotions', name: 'Promotions', components: require('@/pages/promotions') },
      { path: 'promotions/detail/:legend', name: 'Promotions-detail', components: require('@/pages/promotions/detail'), meta: { isLastPage: true } },
      { path: 'games', name: 'Games', components: require('@/pages/games') },
      { path: 'account',
        components: require('@/pages/account'),
        children:
        [
          { path: '/', name: 'My-account', components: require('@/pages/account/landing'), meta: { requiresAuth: true } },
          { path: 'edit-profile', name: 'Edit-profile', components: require('@/pages/account/edit-profile'), meta: { noMenu: true, isLastPage: true, requiresAuth: true } },
          { path: 'edit-password', name: 'Edit-password', components: require('@/pages/account/edit-password'), meta: { noMenu: true, isLastPage: true, requiresAuth: true } },
          { path: 'edit-withdrawPW', name: 'Edit-withdrawPW', components: require('@/pages/account/edit-withdrawPW'), meta: { noMenu: true, isLastPage: true, requiresAuth: true } },
          { path: 'transfer', name: 'Transfer', components: require('@/pages/account/transfer'), meta: { noMenu: true, isLastPage: true, requiresAuth: true } },
          { path: 'deposit', name: 'Deposit', components: require('@/pages/account/deposit'), meta: { noMenu: true, isLastPage: true, requiresAuth: true } },
          { path: 'withdraw', name: 'Withdraw', components: require('@/pages/account/withdraw'), meta: { noMenu: true, isLastPage: true, requiresAuth: true, requiresWithdrawPW: true } },
          { path: 'bankcard', name: 'Bankcard', components: require('@/pages/account/bankcard'), meta: { noMenu: true, isLastPage: true, requiresAuth: true } },
          { path: 'mails', name: 'Mails', components: require('@/pages/account/mails'), meta: { noMenu: true, isLastPage: true, requiresAuth: true } },
          { path: 'history', name: 'History', components: require('@/pages/account/history'), meta: { noMenu: true, isLastPage: true, requiresAuth: true } }
        ]
      }
    ]
  },

  { path: '*', redirect: { name: 'index' } }
]
