<template>
  <div id="app">
    <iot-header v-if="isLogin"></iot-header>

    <iot-login class="content" v-if="!isLogin" v-on:user="loginSuccess"></iot-login>
    <!--外层框架-->
    <div v-else>
      <div class="outerWrap">
        <iot-aside></iot-aside>
        <!--内容面板-->
        <div class="mainContent">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import header from './components/header/header.vue';
  import aside from './components/aside/aside.vue';
  import login from './views/login.vue'


  export default {
    name: 'app',
    components: {
      "iot-header": header,
      "iot-aside": aside,
      "iot-login": login
    },

    data() {
      return {
        token: ''
      }
    },

    mounted() {
      let token = window.sessionStorage.getItem("token");
      if (token) {
        this.token = JSON.parse(token)
      } else {
        this.$router.push("/login")
      }
    },

    computed: {
      isLogin() {
        return this.$route.path.split('/')[1] != 'login'
      }
    },

    methods :{
      loginSuccess(data) {
        window.sessionStorage.setItem("user", JSON.stringify(data))
        this.token = data;
        this.$router.push("/map")
      },
    }

  }
</script>

<style scoped>
  .call-progress {
    position: fixed;
    height: 100px;
    z-index: 1000;
  }
</style>


<style>
  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;*/

    /*background-color:#3d3d3d;*/
    font-family: Microsoft YaHei, Tahoma, sans-serif;
    font-size: 12px;
    color: #333;
    overflow: hidden;
  }

  /*右侧主内容*/
  .mainContent {
    /*border-right: 1px solid #fefefe;*/
    margin: 0 0 10px 70px;
    background-color: #fafafa;
    border-radius: 0 0 0 3px;
  }

  .mainContent .mapWrap {
    position: relative;
  }

  .mainContent .mapArea {
    border-radius: 0 0 0 3px;
  }

  .mainContent .titleBar {
    overflow: hidden;
    margin-bottom: 15px;
  }

  .mainContent .leftPanel::before {
    bottom: 15px;
    content: "";
    display: block;
    position: fixed;
    top: 50px;
    width: 400px;
    z-index: 0;
    /*box-shadow:1px 0 2px rgba(0, 0, 0, 0.1);*/
    border-right: 1px solid #d4d4d4;
  }

  .mainContent .leftPanel {
    float: left;
    width: 400px;
  }
</style>
