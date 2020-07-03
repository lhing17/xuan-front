<template>
  <div class="xuan-container">
    <!-- 搜索条 -->
    <div class="xuan-search-container">
      <el-collapse v-model="collapse">
        <el-collapse-item name="search">
          <el-form :model="query">
            <el-col v-for="column in searchColumns" :key="column.prop" :span="4">
              <el-form-item :label="column.label" label-width="80px">
                <el-input v-model="query[column.prop]" @input="handleInput" />
              </el-form-item>
            </el-col>
            <el-col :span="8" class="xuan-search-button-group">
              <el-form-item>
                <el-button type="primary" plain @click="handleSearch">搜索</el-button>
              </el-form-item>
              <!--<el-button>清空</el-button>-->
            </el-col>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-row class="up-table-container">
      <!--  左上角按钮区  -->
      <el-col :span="12" class="operation-container">
        <el-button type="primary" plain icon="el-icon-plus">新增</el-button>
      </el-col>
      <!--  右上角工具栏区  -->
      <el-col :span="12" class="tool-container">
        <el-button-group>
          <el-tooltip class="item" effect="dark" content="查询" placement="top">
            <el-button icon="el-icon-search" @click="handleToggleSearch" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="刷新" placement="top">
            <el-button icon="el-icon-refresh" @click="handleRefresh" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="显隐" placement="top">
            <el-button icon="el-icon-s-operation" @click="handleToggleFields" />
          </el-tooltip>
        </el-button-group>
      </el-col>
    </el-row>
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
      class="xuan-table"
      header-cell-class-name="xuan-header-cell"
      height="650"
      max-height="650"
    >
      <el-table-column v-if="realOptions.selection" type="selection" width="55" />
      <el-table-column
        v-for="column in showColumns"
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
    <div class="pagination-container">
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
    <!-- 字段显隐 -->
    <el-dialog
      title="显隐"
      :visible.sync="dialogVisible"
      width="35%"
    >
      <el-transfer
        v-model="fields"
        :titles="titles"
        :data="transferData"
        @change="handleTransfer"
      />
    </el-dialog>
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
    query: {
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
  data() {
    return {
      collapse: [],
      titles: ['隐藏', '显示'],
      fields: [],
      transferData: [],
      dialogVisible: false
    }
  },
  computed: {
    realOptions() {
      const defaultOptions = { selection: true }
      return Object.assign(defaultOptions, this.options)
    },
    showColumns() {
      return this.realOptions.columns.filter(
        column => {
          return column.show === undefined || column.show
        }
      )
    },
    searchColumns() {
      return this.realOptions.columns.filter(
        column => column.search
      )
    }

  },
  created() {
    this.onLoad(this.page)
    this.transferData = this.realOptions.columns.map(column => {
      return {
        key: column.prop,
        label: column.label
      }
    })
    this.fields = this.realOptions.columns.filter(
      column => {
        return (column.show !== undefined) ? column.show : true
      }
    ).map(column => column.prop)
  },
  methods: {
    handleSizeChange(size) {
      this.$emit('size-change', size)
    },
    handleCurrentChange(current) {
      this.$emit('current-change', current)
    },
    handleRefresh() {
      this.$emit('refresh')
    },
    handleTransfer(value, direction, keys) {
      console.log(value, direction, keys)
      for (let i = 0; i < this.options.columns.length; i++) {
        const column = this.options.columns[i]
        if (keys.includes(column.prop)) {
          if (direction === 'left') {
            this.$set(this.options.columns[i], 'show', false)
          } else {
            this.$set(this.options.columns[i], 'show', true)
          }
        }
      }
      console.log(this.options)
    },
    handleToggleFields() {
      this.dialogVisible = true
    },
    handleToggleSearch() {
      if (this.collapse.length === 0) {
        this.collapse = ['search']
      } else {
        this.collapse = []
      }
    },
    handleInput() {
      this.$emit('update:query', this.query)
    },
    handleSearch() {
      this.$emit('search')
    }
  }
}
</script>

<style scoped>
  .tool-container {
    text-align: right;
  }

  .up-table-container {
    margin-bottom: 10px;
  }

  .pagination-container {
    text-align: right;
  }

  .xuan-container {
    margin: 10px 10px 0 10px;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 5px;
  }

  .xuan-search-button-group {
    padding-left: 10px;
    /*text-align: center;*/
  }
</style>
