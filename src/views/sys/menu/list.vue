<template>
  <xuan-table
    :table-data="tableData"
    :options="options"
    :page="page"
    lazy
    :load="load"
    :on-load="onLoad"
    :query.sync="query"
    @refresh="handleRefresh"
    @search="handleSearch"
  >
    <template v-slot:icon="scope">
      <svg-icon :icon-class="scope.row.icon" />
    </template>
  </xuan-table>
</template>

<script>
import XuanTable from '@/components/Xuan/table'

import { getList, getSublist } from '@/api/sys/menu'
import { menuType } from '@/utils/enum'

export default {
  name: 'MenuList',
  components: { XuanTable },
  data() {
    return {
      page: {
        current: 1,
        size: 20,
        total: 100
      },
      // 查询参数
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
            prop: 'url',
            label: 'url',
            search: true
          },
          {
            prop: 'icon',
            label: '图标',
            slot: true
          },
          {
            prop: 'type',
            label: '类型',
            formatter: (row, column, cellValue) => {
              return menuType[cellValue]
            }
          },
          {
            prop: 'order',
            label: '排序',
            show: false
          },
          {
            prop: 'permission',
            label: '权限',
            formatter: (row, column, cellValue) => {
              return cellValue && cellValue.name || ''
            }
          }
        ]
      }
    }
  },
  watch: {},
  created() {

  },
  methods: {
    load(row, node, resolve) {
      console.log(row)
      console.log(node)
      getSublist({ parent: row.id }).then(
        res => resolve(res.data)
      )
    },
    handleSizeChange() {

    },
    handleCurrentChange(current) {
      console.log(current)
    },
    onLoad(page, params = {}) {
      getList(page.current, page.size, Object.assign(params, this.query)).then(
        res => {
          console.log(res)
          this.tableData = res.data.content
          this.$set(this.page, 'total', res.data.totalElements)
        }
      )
    },
    handleRefresh() {
      this.onLoad(this.page)
    },
    handleSearch() {
      console.log(this.query)
      this.onLoad(this.page)
    }
  }
}
</script>

<style scoped>

</style>
