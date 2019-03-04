<template>
  <div>
    <el-table :data="cartList">
      <el-table-column label="名称" prop="productName"></el-table-column>
      <el-table-column label="数量" prop="productNum"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'CartList',
  data() {
    return {
      cartList: []
    }
  },
  methods: {
    query() {
      this.axios.get('users/cartList').then(response => {
        console.log('cartList', response)
        let res = response.data
        this.cartList = res.content.dataList
      })
    }
  },
  mounted() {
    this.query()
  }
}
</script>

<style>

</style>
