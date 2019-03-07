<template>
  <div>
    <el-table ref="tableRef" :data="cartList"
              @selection-change="selectionChange"
              @select="select"
              @select-all="selectAll">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="Name" prop="productName"></el-table-column>
      <el-table-column label="Quantity">
        <template slot-scope="scope">
          <el-button type="default" plain size="mini"
                     style="margin-right:10px;"
                     :disabled="scope.row.productNum==1"
                     @click="reduce(scope.row.productId)"
          >-</el-button>
          {{scope.row.productNum}}
          <el-button type="default" plain size="mini"
                     @click="increase(scope.row.productId)"
          >+</el-button>
        </template>
      </el-table-column>
      <el-table-column label="Price">
        <template slot-scope="scope">
          <!-- {{`$${scope.row.salePrice}`}} -->
          {{`$${scope.row.salePrice*scope.row.productNum}`}}
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="danger" plain size="small"
                     icon="el-icon-delete"
                     @click="deleteItem(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px;">
      <span>{{`Total: $${total}`}}</span>
      <el-button type="success" plain circle icon="el-icon-check"
                 style="float: right; margin-right: 200px;"
                 @click="$router.push('/')"
      ></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartList',
  data() {
    return {
      cartList: [],
      total: 0
    }
  },
  methods: {
    // 选择单行、全部都触发
    selectionChange(selection) {
      console.log('selection', selection)
      this.total = 0
      selection.map(item => {
        this.total += item.salePrice*item.productNum
      })
    },
    // 选择单行触发, 未选择的设为false
    select(select, row) {
      console.log('select', select, row)
      row.checked = !row.checked
    },
    // 选择全部触发, 未选择的设为false
    selectAll(selectAll) {
      console.log('selectAll', selectAll)
      if (selectAll.length == 0) {
        selectAll.map(item => {
          item.checked = false
        })
      } else {
        selectAll.map(item => {
          item.checked = true
        })
      }
    },
    increase(productId) {
      console.log(productId)
    },
    reduce(productId) {
      console.log(productId)
    },
    deleteItem(row) {
      console.log(row)
      this.$confirm('Continue?','Delete Warning', {
        type: 'error',
        confirmButtonText: 'Continue',
        cancelButtonText: 'Cancel'
      }).then(() => {
        this.$notify({
          type: 'success',
          message: `${row.productName} is Deleted!`,
          position: 'top-right'
        })
        this.deleteConfirm(row.productId)
      }).catch(() => {
        this.$notify({
          type: 'warning',
          message: 'Canceled!',
          position: 'top-right'
        })
      })
    },
    deleteConfirm(productId) {
      console.log(productId)
      this.axios.post('users/cartList/delete', {
        productId
      }).then(response => {
        console.log('del', response)
        this.query()
      })
    },
    async query() {
      await this.axios.get('users/cartList').then(response => {
        console.log('cartList', response)
        let res = response.data
        this.cartList = res.content.dataList
      })
      this.cartList.map((item,index) => {
        if (item.checked === true) {
          console.log('true')
          this.$refs.tableRef.toggleRowSelection(this.cartList[index])
        }
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
