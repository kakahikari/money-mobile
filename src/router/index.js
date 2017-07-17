import Vue from 'vue'
import Router from 'vue-router'
import store from 'hq-money-stores'
import { routes } from './map'
import { errorCodes } from '@/xhrConfig'

Vue.use(Router)

const router = new Router({
  routes,
  linkActiveClass: 'active'
})

const beforeEach = async (to, from, next) => {
  await !!router.app.$root.init
  return beforeEachAuth(to, from, next)
}

const beforeEachAuth = (to, from, next) => {
  const { status, token } = store.state.AUTH
  const isAuth = status === 1 && !!token

  if (to.meta.requiresAuth && !isAuth) {
    router.app.$root.showToast && router.app.$root.showToast({type: 'warning', content: errorCodes['v-need-login']})
    return next({path: '/'})
  }

  next()
}

router.beforeEach((to, from, next) => {
  beforeEach(to, from, next)
})

export default router
