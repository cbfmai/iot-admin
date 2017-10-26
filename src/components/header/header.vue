<template>
  <!--头部区域-->
  <div class="header">
    <h1 class="logo">siteWay管理平台</h1>
    <!-- @click.native="toggleDropdownList" -->
    <div class="selBox mb_30 fr" v-on:click="toggleDropdownList()">
      <div class="selWrap">
        <div class="selVal">{{tenantName}}</div>
        <a class="selBtn"></a>
      </div>
      <div v-show="isShow" class="selList">
        <ul v-for="item in tenantNames">
          <li v-on:click='switchTenant(item.key)'>{{item.name}}</li>
        </ul>
      </div>
    </div>
    <a href="#" class="fullIcon"></a><!--收缩全屏样式改为　expandIcon-->
  </div>
</template>

<script>
  import './header.css';
  import '../../assets/styles/zteict_reset.css';

  export default {
    name: 'ElHeader',

    componentName: 'ElHeader',

    data() {
      return {
        isShow: false,
        tenantName: '衡阳物联网试验局',
        tenantKey: 'sitewhere1234567890',
        tenantNames: [{
          'key': 'sitewhere1234567890',
          'name': '衡阳物联网试验局'
        }, {
          'key': '2',
          'name': '杭州路边停车项目'
        }, {
          'key': '3',
          'name': '济南智慧停车试点'
        }
        ]
      }
    },

    watch: {
      tenantName: {
        handler: function (val, oldVal) {
          console.log(val + '-' + oldVal + this.$route.path)
          //this.$router.push(this.$route.path)
        }
      },
    },

    props: {
      height: {
        type: String,
        default: '60px'
      }
    },

    methods: {
      toggleDropdownList() {
        this.isShow = !this.isShow;
      },

      switchTenant(key) {
        this.getTenantNameByKey(key)
      },

      getTenantNameByKey(key) {
        let length = this.tenantNames.length;
        for (let i = 0; i < length; i++) {
          if (key === this.tenantNames[i].key) {
            this.tenantName = this.tenantNames[i].name
            this.$store.commit('authTenants', key);
            return;
          }
        }
      }
    },

    mounted() {
      this.$store.commit('authTenants', this.tenantKey);
    }

  };
</script>
