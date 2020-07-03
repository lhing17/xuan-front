<template>
  <xuan-table
    :table-data="tableData"
    :options="options"
    :page="page"
    :on-load="onLoad"
    :query.sync="query"
    @refresh="handleRefresh"
    @search="handleSearch"
  />
</template>

<script>
import XuanTable from '@/components/Xuan/table'
import { getList } from '@/api/sys/role'

export default {
  name: 'RoleList',
  components: { XuanTable },
  data() {
    return {
      page: {
        current: 1,
        size: 20,
        total: 100
      },
      query: {},
      tableData: [],
      options: {
        columns: [
          {
            prop: 'name',
            label: '名称',
            search: true
          },
          {
            prop: 'description',
            label: '描述'
          }
        ]
      }
    }
  },
  methods: {
    onLoad(page, params = {}) {
      getList(page.current, page.size, Object.assign(params, this.query)).then(
        res => {
          this.tableData = res.data.content
          this.$set(this.page, 'total', res.data.totalElements)
        }
      )
    },
    handleRefresh() {
      this.onLoad(this.page)
    },
    handleSearch() {
      this.onLoad(this.page)
    }
  }
}
</script>

<style scoped>

</style>
