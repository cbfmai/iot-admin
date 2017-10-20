<template>
  <el-form :model="model" :rules="rules" ref="model" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="model.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="model.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="login" :loading="loading">登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {_getUser} from '../http/sitewhere-api-wrapper'

  export default {
    data() {
      return {
        loading: false,
        model: {
          account: 'admin',
          password: 'password'
        },
        rules: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'},
          ],
          checkPass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        },
        checked: true
      };
    },
    methods: {
      login() {
        this.loading = true;
        var component = this;
        var username = this.model.account;
        var password = this.model.password;
        var token = btoa(username + ':' + password);
        this.$store.commit('authToken', token);
        this.$store.commit('authTenants', 'sitewhere1234567890');
        console.log(this.$store)
        _getUser(this.$store, username)
          .then(function (response) {
            component.loading = false;
            component.$store.commit('user', response.data);
            component.$router.push('/map')
          }).catch(function (e) {
            console.error(e)
        })
      }
    }
  }

</script>

<style scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
</style>
