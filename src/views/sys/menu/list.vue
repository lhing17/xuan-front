<template>
  <div class="app-container">
    <div class="filter-container">
      <el-checkbox-group v-model="checkboxVal">
        <el-checkbox label="apple">
          apple
        </el-checkbox>
        <el-checkbox label="banana">
          banana
        </el-checkbox>
        <el-checkbox label="orange">
          orange
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <xuan-table
      :table-data="tableData"
      :options="options"
      :page="page"
      lazy
      :load="load"
      :on-load="onLoad"
    >
      <template v-slot:icon="scope">
        <svg-icon :icon-class="scope.row.icon" />
      </template>
    </xuan-table>
  </div>
</template>

<script>
import XuanTable from '@/components/Xuan/table'

const defaultFormThead = ['apple', 'banana']
import { getList, getSublist } from '@/api/menu'
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
      key: 1, // table key
      formTheadOptions: ['apple', 'banana', 'orange'],
      checkboxVal: defaultFormThead, // checkboxVal
      options: {
        columns: [
          {
            prop: 'name',
            label: '名称'
          },
          {
            prop: 'url',
            label: 'url'
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
  watch: {
    checkboxVal(valArr) {
      this.key = this.key + 1// 为了保证table 每次都会重渲 In order to ensure the table will be re-rendered each time
    }
  },
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
    }
  }
}
</script>

<style scoped>

</style>
