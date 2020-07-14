<template>
  <el-dialog title="新增" :visible.sync="dialogVisible" :before-close="handleClose">
    <el-form ref="form" :model="form" :rules="rules">
      <el-col v-for="column in formColumns" :key="column.prop" :span="12">
        <el-form-item :label="column.label" label-width="80px" :prop="column.prop">
          <el-input v-model="form[column.prop]" :placeholder="column.placeholder" @input="handleInput" />
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="16" class="xuan-submit-button-group">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleCancel">取消</el-button>
        <!--<el-button>清空</el-button>-->
      </el-col>
      <div class="clearfix" />
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'XuanForm',
  props: {
    form: {
      type: Object,
      default() {
        return {}
      }
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    visible: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    realOptions() {
      const defaultOptions = { type: 'input' }
      return Object.assign(defaultOptions, this.options)
    },
    formColumns() {
      const columns = this.realOptions.columns
      for (const column of columns) {
        if (!column.placeholder) {
          column.placeholder = '请输入' + column.label
        }
      }
      return columns
    },
    dialogVisible() {
      return this.visible
    },
    rules() {
      const data = {}
      for (const column of this.formColumns) {
        const key = column.prop
        data[key] = column.rules
      }
      return data
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible')
    },
    handleInput() {
      this.$emit('update:form', this.form)
    },
    handleCancel() {
      this.handleClose()
    },
    handleSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$emit('add')
        } else {
          return false
        }
      })
    }
  }

}
</script>

<style scoped>
  .xuan-submit-button-group {
    text-align: right;
  }
</style>
