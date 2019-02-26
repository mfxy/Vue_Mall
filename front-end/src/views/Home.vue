<template>
  <div>
    <ItemCard v-for="item in productsList" :key="item.productId"
    :name="item.productName" :price="item.salePrice" class="item-card"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ItemCard from '@/components/ItemCard.vue'
import axios from 'axios'

export default {
  name: 'home',
  components: {
    ItemCard
  },
  data() {
    return {
      productsList: []
    }
  },
  methods: {
    query() {
      axios.get("/products").then(response => {
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

