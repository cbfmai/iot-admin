<template>
  <!--左侧导航-->
  <div class="leftNav">
    <ul>
      <li class="first">
        <a :class="{cur:show === 'position'}" @click="show='position'" href="#/map"><em class="fa fa-map-marker"></em><span>位置</span>
          <div class="innerArrow"></div>
        </a>
      </li>
      <li>
        <a :class="{cur:show ==='device'}" @click="show='device'" href="#/devices"><em class="fa fa-cube"></em><span>设备</span>
          <div class="innerArrow"></div>
        </a>
      </li>
      <li>
        <a :class="{cur:show ==='alarm'}" @click="show='alarm'" href="#/alerts"><em class="fa fa-bell"></em><span>告警</span>
          <div class="innerArrow"></div>
        </a>
      </li>
      <li class="last">
        <a :class="{cur:show ==='survey'}" @click="show='survey'"  href="#/dashboard"><em class="fa fa-pie-chart"></em><span>概况</span>
          <div class="innerArrow"></div>
        </a>
      </li>
    </ul>
  </div>
</template>


<script>


  import './aside.css';
  import '../../assets/styles/font-awesome/css/font-awesome.min.css';

  export default {
    data() {
        return {
            show : 'position'
        }
    },
    name: 'IOT-Aside',
    componentName: 'IOT-Aside'
  };
</script>
