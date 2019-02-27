<template>
  <div>
    <Search @rangeChangeChild="rangeChangeParent"/>
    <ItemCard v-for="item in productsList" :key="item.productId"
    :name="item.productName" :price="item.salePrice" class="item-card"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Search from '@/components/Search';
import ItemCard from '@/components/ItemCard'

export default {
  name: 'home',
  components: {
    Search,
    ItemCard
  },
  data() {
    return {
      productsList: [],
      params: {
        page: 2,
        pageSize: 5,
        sort: -1
      }
    }
  },
  methods: {
    rangeChangeParent() {},
    query() {
      this.axios.get("/products", {
        params: this.params
      }).then(response => {
        let res = response.data
        if (res.code == '0') {
          console.log(res.content.dataList)
          this.productsList = res.content.dataList
        } else {
          console.log(res.msg)
        }
      })
    }
  },
  mounted() {
    this.query()
  }
}
</script>

<style scoped>
.item-card {
  display: inline-block;
}
</style>

