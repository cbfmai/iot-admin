<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>


    <main-header v-on:loginOut="loginOut"
                 v-if="isLogin"
                 :headerData="headerData" :userInfo="userInfo" v-on:changeNav="changeNav" ></main-header>
    <login class="content" v-if="!isLogin" v-on:login="loginSuccess"></login>
    <div class="viewFramework-body"  v-else>
      <side-nav :navsData="navsData"></side-nav>
      <div class="viewFramework-product">
        <router-view class="content"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
