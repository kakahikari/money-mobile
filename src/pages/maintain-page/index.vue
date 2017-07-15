<template lang="html">
  <div class="maintain-page">
    <aside class="maintenance" v-if="$store.state.AUTH.isOutOfOrderStatus">
      <img src="static/images/maintenance.png">
      <h3>{{ $root.i18n('Under Maintenance') }}</h3>
      <h3>{{ $store.state.AUTH.isOutOfOrderMSG }}</h3>
    </aside>
    <aside class="loading-svg" v-else>
      <svg width="100%" height="100%" viewBox="0 0 120 45" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
        <g v-if="onload">
          <g>
            <animate attributeName="opacity" dur="2s" repeatCount="indefinite" begin="0s" keyTimes="0;0.33;1" values="1;1;0"></animate>
            <circle cx="60" cy="0" r="0" class="circle1">
                <animate attributeName="r" dur="2s" repeatCount="indefinite" begin="0s" keyTimes="0;0.33;1" values="0; 2; 12"></animate>
            </circle>
          </g>
          <g>
            <animate attributeName="opacity" dur="2s" repeatCount="indefinite" begin="1s" keyTimes="0;0.33;1" values="1;1;0"></animate>
            <circle cx="60" cy="0" r="0" class="circle2">
                <animate attributeName="r" dur="2s" repeatCount="indefinite" begin="1s" keyTimes="0;0.33;1" values="0; 2; 12"></animate>
            </circle>
          </g>
        </g>
        <text v-else-if="!onload && (!$store.state.AUTH.OutOfOrderChecked || $store.state.AUTH.isOutOfOrderStatus)" style="fill: #eee" text-anchor="middle" x="60" y="38">{{ errorText }}</text>
        <defs>
          <linearGradient id="yellow" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0,55.004,-55.004,0,62.2502,95.4856)">
            <stop offset="0%" style="stop-color:rgb(255,214,0);stop-opacity:1"/><stop offset="100%" style="stop-color:rgb(255,152,0);stop-opacity:1"/>
          </linearGradient>
          <linearGradient id="yellow2" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0,55.004,-55.004,0,121.113,95.4856)">
            <stop offset="0%" style="stop-color:rgb(255,214,0);stop-opacity:1"/><stop offset="100%" style="stop-color:rgb(255,152,0);stop-opacity:1"/>
          </linearGradient>
        </defs>
      </svg>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'maintain-page',

  data () {
    return {
      onload: false,
      score: 0,
      underScore: 0,
      needScore: 4,
      result: {}
    }
  },

  watch: {
    score (val) {
      if (!onload && val >= this.needScore) {
        return window.setTimeout(() => {
          return this.$store.commit('SET_OUT_OF_ORDER', this.result)
        }, 600)
      }

      if (val + this.underScore >= this.needScore) {
        return window.setTimeout(() => {
          this.onload = false
          return this.onload
        }, 1200)
      }
    },
    underScore (val) {
      if (val + this.score >= this.needScore) {
        this.onload = false
        return this.onload
      }
    }
  },

  computed: {
    errorText () {
      const storeMSG = this.$store.state.AUTH.isOutOfOrderMSG
      return storeMSG || this.$root.i18n('unknown error')
    }
  },

  created () {
    this.checkMaintain()
  },

  methods: {
    checkMaintain () {
      this.score = 0
      this.underScore = 0
      this.onload = true
      return this.$store.dispatch('checkOutOfOrder', {context: this}).then((res) => {
        this.score++
        this.underScore++
        this.setOutOfOrder(res)
        if (res.status === 0) throw res
        this.getUserInfo()
        this.getGameGroup()
      }).catch((err) => {
        this.underScore += this.needScore
        this.setOutOfOrder(err)
      })
    },
    async setOutOfOrder (res) {
      this.result = await res
      this.$store.commit('SET_OUT_OF_ORDER', await res)
      this.score++
    },
    getUserInfo () {
      return this.$store.dispatch('setUser', {context: this}).then((res) => {
        return this.score++
      }).catch((err) => {
        if (err === 'v-no-token') {
          return this.score++
        }
        this.underScore++
      })
    },
    // getServiceLink () {
    //   return this.$store.dispatch('getServiceLink', {context: this}).then((res) => {
    //     return this.score++
    //   }).catch(() => {
    //     this.underScore++
    //   })
    // },
    getGameGroup () {
      this.$store.dispatch('getGroup', {context: this}).then((res) => {
        return this.score++
      }).catch(() => {
        this.underScore++
      })
    }
    // getShowBoxes () {
    //   this.$store.dispatch('getBroadcasts', {context: this}).then((res) => {
    //     return this.score++
    //   }).catch(() => {
    //     this.underScore++
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
  @import './style';
</style>
