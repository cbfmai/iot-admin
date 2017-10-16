<template>
  <!--左侧导航-->
  <div class="leftNav">
    <ul>
      <li class="first">
        <a class="cur" href="#/map"><em class="fa fa-map-marker"></em><span>位置</span>
          <div class="innerArrow"></div>
        </a>
      </li>
      <li>
        <a href="#/devices"><em class="fa fa-cube"></em><span>设备</span>
          <div class="innerArrow"></div>
        </a>
      </li>
      <li>
        <a href="#/alerts"><em class="fa fa-bell"></em><span>告警</span>
          <div class="innerArrow"></div>
        </a>
      </li>
      <li class="last">
        <a href="#/dashboard"><em class="fa fa-pie-chart"></em><span>概况</span>
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
    name: 'IOT-Aside',
    componentName: 'IOT-Aside'
  };
</script>
