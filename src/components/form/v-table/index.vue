<template>
  <table>
      <thead>
        <tr>
          <th
          v-for="key in columnsKeys"
          @click.prevent="sortBy(key)"
          :style="columns[key].style"
          :class="{ 'active': sortKey == key }"
          > {{ columns[key].legend | capitalize }}
          <icon name="arrow_drop_down" v-if="sortKey == key && order == -1"></icon>
          <icon name="arrow_drop_up" v-if="sortKey == key && order == 1"></icon>
          </th>
        </tr>
      </thead>
      <template v-for="nodes in filteredData">
        <tr key="item">
          <td v-for="key in columnsKeys" :style="columns[key].style">
            <template v-if="key == 'status'">
              <span v-if="nodes.status == 0">{{ $root.i18n('not validation') }}</span>
              <span v-if="nodes.status == 1">{{ $root.i18n('validation') }}</span>
              <icon name='check' v-if="nodes.status == 3"></icon>
              <icon name='close' v-if="nodes.status == 2" class="error"></icon>
            </template>
            <template v-else-if="key == 'amount'">
              <span class="amount">
                {{ nodes[key].toString() | currency }}
              </span>
            </template>
            <template v-else-if="key == 'bet' || key == 'win'">
              <span class="amount">
                {{ Number(nodes[key]).toString() | currency }}
              </span>
            </template>
            <template v-else>
              {{ nodes[key] }}
            </template>
          </td>
        </tr>
      </template>
      <template v-if="totalPage > 1">
        <tr>
          <td :colspan="columnsKeys.length">
            <div class="pager">
              <a @click="pageChange(0)" class="pager-item">
                <icon name="skip_previous" v-if="nowPage!=0"></icon>
              </a>
              <a @click="pageChange(nowPage-1)" class="pager-item">
                <icon name="arrow_back" v-if="nowPage!=0"></icon>
              </a>
              <div class="pager-item">
                {{ nowPage+1 }} / {{ totalPage }}
              </div>
              <a @click="pageChange(nowPage+1)" class="pager-item">
                <icon name="arrow_forward" v-if="nowPage!=(totalPage-1)"></icon>
              </a>
              <a @click="pageChange(totalPage-1)" class="pager-item">
                <icon name="skip_next" v-if="nowPage!=(totalPage-1)"></icon>
              </a>
            </div>
          </td>
        </tr>
      </template>
    </table>
</template>

<script>
  export default {
    name: 'v-table',

    data () {
      return {
        sortKey: '',
        order: 1,
        nowPage: 0
      }
    },

    props: {
      data: Array,
      columns: Object,
      pageSize: Number
    },

    computed: {
      totalPage () {
        const length = Math.ceil(this.data.length / this.pageSize)
        return length
      },
      columnsKeys () {
        const keys = Object.keys(this.columns)
        return keys
      },
      filteredData () {
        const sortKey = this.sortKey
        const order = this.order
        let data = this.data.slice(this.nowPage * this.pageSize, (this.nowPage * this.pageSize) + this.pageSize)

        if (sortKey) {
          data = data.slice().sort((a, b) => {
            a = a[sortKey]
            b = b[sortKey]
            return (a === b ? 0 : a > b ? 1 : -1) * order
          })
        }
        return data
      }
    },

    watch: {
      totalPage (newVal, oldVal) {
        this.nowPage = 0
      }
    },

    methods: {
      pageChange (key) {
        if (key >= this.totalPage) key = this.totalPage - 1
        if (key < 0) key = 0
        this.nowPage = key
      },
      sortBy (key) {
        this.order = this.order === 1 ? -1 : 1
        this.sortKey = key
      }
    },

    filters: {
      capitalize (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
