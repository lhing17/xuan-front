<template>
  <div>
    <xuan-table
      :table-data="tableData"
      :options="options"
      :page="page"
      :on-load="onLoad"
      :query.sync="query"
      @refresh="handleRefresh"
      @search="handleSearch"
      @show-form="handleShowForm"
      @delete="handleDelete"
    />
    <xuan-form
      :visible.sync="dialogVisible"
      :form.sync="form"
      :options="options"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import XuanTable from '@/components/Xuan/table'
import { addRole, updateRole, getRole, getList, deleteRole } from '@/api/sys/role'
import XuanForm from '@/components/Xuan/form'

export default {
  name: 'RoleList',
  components: { XuanForm, XuanTable },
  data() {
    return {
      dialogVisible: false,
      form: {},
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
            search: true,
            rules: [{
              required: true,
              message: '请输入角色名称',
              trigger: 'blur'
            }]
          },
          {
            prop: 'description',
            label: '描述',
            rules: [
              {
                required: true,
                message: '请输入角色描述',
                trigger: 'blur'
              }
            ]
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
    },
    handleShowForm(row) {
      this.dialogVisible = true
      if (row) {
        getRole(row.id).then(
          res => {
            this.form = res.data
          }
        )
      }
    },
    handleDelete(row) {
      this.$confirm('确定将选择数据删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return deleteRole(row.id)
        })
        .then(() => {
          this.onLoad(this.page)
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        })
    },
    handleSubmit() {
      this.loading = true
      const submit = this.form.id ? updateRole : addRole
      submit(this.form).then(
        () => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.onLoad(this.page)
          this.loading = false
          this.dialogVisible = false
        }
      ).catch(() => {
        this.loading = false
        this.dialogVisible = false
      })
    }
  }
}
</script>

<style scoped>

</style>
