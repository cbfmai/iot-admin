<template>
  <!--头部区域-->
  <div class="header">
    <h1 class="logo">siteWay管理平台</h1>
    <a href="#" class="fullIcon"></a><!--收缩全屏样式改为　expandIcon-->
  </div>
</template>

<script>
  import './header.css';
  //import '../../styles/font-awesome.min.css';
  import '../../assets/styles/global_reset.css';

  export default {
    name: 'ElHeader',

    componentName: 'ElHeader',

    props: {
      height: {
        type: String,
        default: '60px'
      }
    }
  };
</script>
