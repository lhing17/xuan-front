<template>
  <el-dialog title="新增" :visible.sync="dialogVisible" :before-close="handleClose">
    <el-form :model="form">
      <el-col v-for="column in formColumns" :key="column.prop" :span="12">
        <el-form-item :label="column.label" label-width="80px">
          <el-input v-model="form[column.prop]" @input="handleInput" />
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
      return this.realOptions.columns
    },
    dialogVisible() {
      return this.visible
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
      this.$emit()
    }
  }

}
</script>

<style scoped>
  .xuan-submit-button-group {
    text-align: right;
  }
</style>
