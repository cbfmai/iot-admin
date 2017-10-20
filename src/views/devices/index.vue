<style scoped>
  .navList {
    /*min-width: 287px;
    position: fixed;
    left: 80px;
    z-index: 20;
    height: 100%;*/

    position: fixed;
    top: 50px;
    width: 200px;
    bottom: 0px;
    z-index: 13;
    background-color: #eef1f6;
    overflow-x: hidden;
    margin-right: 5px;
  }

  .small .navList {
    width: 200px;
  }

  .small .writeText {
    padding-left: 200px;
  }

  .inner {
    width: 99%;
    margin: 0 auto;
    position: relative;
    background-color: #0ca9cf;
  }

</style>
<template>
  <div class="small">
    <div class="navList">
      <el-row class="tac">
        <el-col>
          <el-menu default-active="1" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <template v-for="(item,index) in navMenu">
              <el-submenu :key="item.path" :index="index + ''">
                <template slot="title">
                  <i :class="item.iconCls"></i> {{item.name}}
                </template>
                <el-menu-item v-for="child in item.groups" :index="child.path"
                              :key="child.path" @click="$router.push(child.path)">{{child.name}}
                </el-menu-item>
              </el-submenu>
            </template>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="writeText">
      <div class="inner">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

  import {navData} from "../../router/nav.devices.json";

  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },

    watch: {
      screenWidth(val) {
        if (!this.timer) {
          this.screenWidth = val
          this.timer = true
          let that = this
          setTimeout(function () {
            // that.screenWidth = that.$store.state.canvasWidth
            console.log(that.screenWidth)
            // that.init()
            that.timer = false
          }, 400)
        }
      }
    },
    data() {
      return {
        screenWidth: document.body.clientWidth,
        parkingShow: false,
        isCollapse: false,
        navMenu: navData.children
      }

    },
    mounted() {
      console.log(JSON.stringify(this.navMenu));


      //  this.navMenu = navData.filter(function(item) {
      //    return item.path == '/devices';
      // });

      //  this.navMenu = this.navMenu[0].children;

      // console.log(JSON.stringify(this.navMenu))

      // const that = this;
      // window.onresize = () => {
      //   return (() => {
      //     window.screenWidth = document.body.clientWidth
      //     that.screenWidth = window.screenWidth
      //   })()
      // }
    }

  }
</script>
