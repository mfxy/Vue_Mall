<template>
  <el-select v-model="search.range" @change="rangeChange">
    <el-option v-for="item in rangeOptions"
               :key="item.value"
               :value="item.value"
               :label="item.label">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      search: {},
      rangeOptions: [
        {value: '0', label: '0-500'},
        {value: '1', label: '500-1000'},
        {value: '2', label: '1000-1500'},
      ]
    }
  },
  methods: {
    rangeChange() {
      console.log(this.search.range)
      this.$emit("rangeChangeChild", this.search.range)
    }
  }
}
</script>

<style>

</style>
