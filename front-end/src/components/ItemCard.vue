<template>
  <div class="card">
    <el-card>
      <div style="padding: 14px;">
        <img alt="cardImage" src="../assets/logo.png" class="image">
        <span>{{name}}</span>
        <div class="bottom clearfix">
          <span class="sub-title">{{`$${price}`}}</span>
          <el-button type="primary" class="button">Add</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ItemCard',
  props: {
    name: String,
    price: Number
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card {
    width: 500px;
    margin: 10px;
  }
  .sub-title {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    float: right;
  }

  .image {
    width: 50px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>
