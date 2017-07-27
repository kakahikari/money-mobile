import helper from '@/helper'
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
  return auth(to, from, next)
}

const auth = (to, from, next) => {
  const { status, token } = store.state.AUTH
  const isAuth = status === 1 && !!token

  if (to.meta.requiresAuth && !isAuth) {
    return next({name: 'index'})
  }

  profile(to, from, next)
}

const profile = (to, from, next) => {
  const { ProfileFilledChcked, isProfileFilled } = store.state.AUTH

  if (to.meta.requiresProfile && !isProfileFilled) {
    if (ProfileFilledChcked) {
      router.app.$root.showToast && router.app.$root.showToast({type: 'warning', content: router.app.$root.i18n(errorCodes['v-need-profile'])})
      return next({name: 'Edit-profile'})
    }

    return router.app.$root.init().then((res) => {
      return profile(to, from, next)
    })
  }

  return withdrawPW(to, from, next)
}

const withdrawPW = (to, from, next) => {
  const { withdrawPWChecked, isWithdrawPW } = store.state.AUTH

  if (to.meta.requiresWithdrawPW && !isWithdrawPW) {
    if (withdrawPWChecked) {
      router.app.$root.showToast && router.app.$root.showToast({type: 'warning', content: router.app.$root.i18n(errorCodes['v-need-withdrawPW'])})
      return next({name: 'Edit-withdrawPW'})
    }

    return router.app.$root.init().then((res) => {
      return withdrawPW(to, from, next)
    })
  }

  next()
}

router.beforeEach((to, from, next) => {
  helper.log(`from=${from.fullPath}, to=${to.fullPath}`)
  beforeEach(to, from, next)
})

export default router
