<template>
  <!--头部区域-->
  <div class="header">
    <h1 class="logo">siteWay管理平台</h1>
    <!--<div class="selBox mb_30 fr">
      <div class="selWrap">
        <div class="selVal">衡阳物联网试验局</div>
        <a href="javascript:void(0)" class="selBtn"></a>
      </div>
      <div class="selList">
        <ul>
          <li>衡阳物联网试验局</li>
          <li>杭州路边停车项目</li>
          <li>济南智慧停车试点</li>
        </ul>
      </div>
    </div>-->
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
