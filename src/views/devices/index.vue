<style scoped>
.viewFramework-sidebar {
  position: absolute;
  top: 0;
  width: 230px;
  bottom: 0px;
  z-index: 13;
  background-color: #eef1f6;
  overflow-x: hidden;
  margin-right: 5px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
<template>
  <div>
    <div class="viewFramework-sidebar">
      <el-row class="tac">
        <el-col class="leftPanel">
            <div class="inner">
          <el-menu default-active="1" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <el-submenu index="1">
                <template slot="title"><i class="fa fa-car"></i> 车位检测器</template>
                <el-menu-item index="1-1" @click="$router.push('/devices/parking')"><i class="fa fa-database"> 实时数据</i></el-menu-item>
                <el-menu-item index="1-2" @click="$router.push('/devices/parking/status')"><i class="fa fa fa-hourglass-3"> 设备状态</i></el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="fa fa-fire"></i> 烟感</template>
                <el-menu-item index="2-1" @click="$router.push('/devices/parking')"><i class="fa fa-database"> 实时数据</i></el-menu-item>
                <el-menu-item index="2-2" @click="$router.push('/devices/parking/status')"><i class="fa fa fa-hourglass-3"> 设备状态</i></el-menu-item>
            </el-submenu>

           <el-submenu index="3">
                <template slot="title"><i class="fa fa-life-buoy"></i> 井盖</template>
                <el-menu-item index="3-1" @click="$router.push('/devices/parking')"><i class="fa fa-database"> 实时数据</i></el-menu-item>
                <el-menu-item index="3-2" @click="$router.push('/devices/parking/status')"><i class="fa fa fa-hourglass-3"> 设备状态</i></el-menu-item>
            </el-submenu>

            <el-submenu index="4">
                <template slot="title"><i class="fa fa-dashboard"></i> 路灯控制器</template>
                <el-menu-item index="4-1" @click="$router.push('/devices/parking')"><i class="fa fa-database"> 实时数据</i></el-menu-item>
                <el-menu-item index="4-2" @click="$router.push('/devices/parking/status')"><i class="fa fa fa-hourglass-3"> 设备状态</i></el-menu-item>
            </el-submenu>
          </el-menu>
            </div>
        </el-col>
      </el-row>
    </div>
    <!-- <div class="writeText">
      <div class="inner">
        <router-view></router-view>
      </div>
    </div> -->

    <div class="subMainContent ml_230">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { navData } from "../../router/nav.devices.json";
import "../../assets/styles/layout.css";

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
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          // that.screenWidth = that.$store.state.canvasWidth
          console.log(that.screenWidth);
          // that.init()
          that.timer = false;
        }, 400);
      }
    }
  },
  data() {
    return {
      screenWidth: document.body.clientWidth,
      parkingShow: false,
      isCollapse: false,
      navMenu: navData.children
    };
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
};
</script>
