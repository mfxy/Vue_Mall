<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/cartList">Cart</router-link>
      <router-link to="/address">Address</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
a {
  margin-right: 20px;
}
</style>
