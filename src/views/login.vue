
<style scoped>
  .bg-particles{position: fixed;top:0px;right: 0px;left:0px;bottom: 0px;}

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

<template>
<div>
      <div id="particles-js" class="bg-particles"></div>
      <el-form :model="model" :rules="rules" ref="model" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <h1 class="title" >IoT 物联网管理平台</h1>
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
</div>
  
</template>

<script>
  import {_getUser} from '../http/sitewhere-api-wrapper'
  import pJS from 'particles.js'

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
    },mounted(){


		this.$nextTick(()=>{

			particlesJS('particles-js',  {
			    "particles": {
			      "number": {
			        "value": 150,
			        "density": {
			          "enable": true,
			          "value_area": 800
			        }
			      },
			      "color": {
			        "value": "#ffffff"
			      },
			      "shape": {
			        "type": "circle",
			        "stroke": {
			          "width": 0,
			          "color": "#000000"
			        },
			        "polygon": {
			          "nb_sides": 5
			        },
			        "image": {
			          "src": "img/github.svg",
			          "width": 100,
			          "height": 100
			        }
			      },
			      "opacity": {
			        "value": 0.5,
			        "random": false,
			        "anim": {
			          "enable": true,
			          "speed": 1,
			          "opacity_min": 0.1,
			          "sync": false
			        }
			      },
			      "size": {
			        "value": 3,
			        "random": true,
			        "anim": {
			          "enable": false,
			          "speed": 40,
			          "size_min": 0.1,
			          "sync": false
			        }
			      },
			      "line_linked": {
			        "enable": true,
			        "distance": 150,
			        "color": "#ffffff",
			        "opacity": 0.4,
			        "width": 1
			      },
			      "move": {
			        "enable": true,
			        "speed": 1.5,
			        "direction": "none",
			        "random": true,
			        "straight": false,
			        "out_mode": "out",
			        "attract": {
			          "enable": false,
			          "rotateX": 600,
			          "rotateY": 1200
			        }
			      }
			    },
			    "interactivity": {
			      "detect_on": "canvas",
			      "events": {
			        "onhover": {
			          "enable": false,
			          "mode": "repulse"
			        },
			        "onclick": {
			          "enable": true,
			          "mode": "push"
			        },
			        "resize": true
			      },
			      "modes": {
			        "grab": {
			          "distance": 400,
			          "line_linked": {
			            "opacity": 1
			          }
			        },
			        "bubble": {
			          "distance": 400,
			          "size": 40,
			          "duration": 2,
			          "opacity": 8,
			          "speed": 3
			        },
			        "repulse": {
			          "distance": 200
			        },
			        "push": {
			          "particles_nb": 4
			        },
			        "remove": {
			          "particles_nb": 2
			        }
			      }
			    },
			    "retina_detect": true,
			    "config_demo": {
			      "hide_card": false,
			      "background_color": "#b61924",
			      "background_image": "",
			      "background_position": "50% 50%",
			      "background_repeat": "no-repeat",
			      "background_size": "cover"
			    }
			  }, function() {
			  console.log('particles.js loaded - callback');
			});
		})
	},
    methods: {
      login() {
        this.loading = true;
        var component = this;
        var username = this.model.account;
        var password = this.model.password;
        var token = btoa(username + ':' + password);
        this.$store.commit('authToken', token);
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