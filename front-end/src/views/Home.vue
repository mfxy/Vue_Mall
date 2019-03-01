<template>
  <div>
    <Search @rangeChangeChild="rangeChangeParent" @sortChangeChild="sortChangeParent"/>
    <ItemCard v-for="item in productsList" :key="item.productId"
              :name="item.productName" :price="item.salePrice"
              :productId="item.productId" class="item-card"
              @addItemChild="addItemParent"/>
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
        pageSize: 4,
        sort: 1
      }
    }
  },
  methods: {
    rangeChangeParent(data) {
      if (data) {
        this.params.range = data
      } else {
        delete this.params.range
      }
      this.params.page =  1
      this.query()
    },
    sortChangeParent(data) {
      console.log(data)
      this.params.sort = data ? 1 : -1
      this.params.page =  1
      this.query()
    },
    addItemParent(data) {
      console.log(data)
      this.axios.post("/products/addItem", {
        productId: data
      }).then(response => {
        let res = response.data
        console.log(res)
      })
    },
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

