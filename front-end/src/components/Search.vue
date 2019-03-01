<template>
  <div class="search">
    <el-select v-model="search.range" @change="rangeChange" clearable placeholder="价格范围">
      <el-option v-for="item in rangeOptions"
                :key="item.value"
                :value="item.value"
                :label="item.label">
      </el-option>
    </el-select>
    <el-button :type="search.sort?'primary':'warning'" @click="sortChange">{{search.sort ? '升序' : '降序'}}</el-button>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      search: {
        sort: true
      },
      rangeOptions: [
        {value: '0', label: '0-500'},
        {value: '1', label: '500-1000'},
        {value: '2', label: '1000-1500'}
      ],
      sortOptions: [
        {value: true, label: '升序'},
        {value: false, label: '降序'}
      ]
    }
  },
  methods: {
    rangeChange() {
      console.log(this.search.range)
      this.$emit("rangeChangeChild", this.search.range)
    },
    sortChange() {
      console.log(this.search.sort)
      this.search.sort = !this.search.sort
      this.$emit("sortChangeChild", this.search.sort)
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  .el-button{
    margin: 10px;
  }
}
</style>
