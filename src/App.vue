<template>
  <div id="app">
    <iot-header></iot-header>
    <!--外层框架-->
    <div class="outerWrap">
      <iot-aside></iot-aside>

      <!--内容面板-->
      <div class="mainContent">
        <router-view></router-view>
      </div>

    </div>
  </div>
</template>

<script>

  import header from './components/header/header.vue';
  import aside from './components/aside/aside.vue';

  export default {
    name: 'app',
    components: {
      "iot-header": header,
      "iot-aside": aside
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
  .mainContent{
    /*border-right: 1px solid #fefefe;*/
    margin: 0 0 10px 70px;
    background-color:#fafafa;
    border-radius:0 0 0 3px;
  }
  .mainContent .mapWrap{
    position:relative;
  }
  .mainContent .mapArea{
    border-radius:0 0 0 3px;
  }
  .mainContent .titleBar{
    overflow:hidden;
    margin-bottom:15px;
  }
  .mainContent .leftPanel::before {
    bottom:15px;
    content: "";
    display: block;
    position: fixed;
    top: 50px;
    width: 400px;
    z-index: 0;
    /*box-shadow:1px 0 2px rgba(0, 0, 0, 0.1);*/
    border-right: 1px solid #d4d4d4;
  }
  .mainContent .leftPanel{
    float:left;
    width:400px;
  }
</style>
