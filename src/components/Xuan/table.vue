<template>
  <div class="app-container">
    <!--  左上角按钮区  -->
    <div class="operation-container">
      <el-button type="primary" plain icon="el-icon-plus">新增</el-button>
    </div>
    <!--  右上角工具栏区  -->
    <div class="tool-container">
      <el-button-group>
        <el-tooltip class="item" effect="dark" content="查询" placement="top">
          <el-button icon="el-icon-search" />
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button icon="el-icon-refresh" />
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="显隐" placement="top">
          <el-button icon="el-icon-s-operation" />
        </el-tooltip>
      </el-button-group>
    </div>
    <!--  数据表格  -->
    <el-table
      border
      fit
      highlight-current-row
      row-key="id"
      :data="tableData"
      :lazy="lazy"
      :load="load"
      :tree-props="{hasChildren: 'hasChildren'}"
      style="width: 100%"
    >
      <el-table-column v-if="realOptions.selection" type="selection" width="55" />
      <el-table-column
        v-for="column in realOptions.columns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :formatter="column.formatter"
      >
        <template v-if="column.slot" v-slot:default="scope">
          <slot :name="column.prop" :row="scope.row" :column="scope.column" :$index="scope.$index" />
        </template>

      </el-table-column>
    </el-table>
    <!--  分页组件  -->
    <el-pagination
      :current-page="page.current"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'XuanTable',
  props: {
    lazy: { type: Boolean, default: () => false },
    load: {
      type: Function, default: () => {
        return () => null
      }
    },
    tableData: { type: Array, default: () => [] },
    onLoad: {
      type: Function, default: () => {
        return () => null
      }
    },
    options: {
      type: Object, default: () => {
        return {}
      }
    },
    page: {
      type: Object, default: () => {
        return {
          current: 1,
          size: 20
        }
      }
    }
  },
  computed: {
    realOptions() {
      const defaultOptions = { selection: true }
      const result = Object.assign(defaultOptions, this.options)
      console.log(result)
      return result
    }

  },
  created() {
    this.onLoad(this.page)
  },
  methods: {
    handleSizeChange(size) {
      this.$emit('size-change', size)
    },
    handleCurrentChange(current) {
      this.$emit('current-change', current)
    }
  }
}
</script>

<style scoped>

</style>
