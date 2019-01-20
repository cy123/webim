<template>
    <div v-if="this.isshow">
      <div class="login-panel-wraper">
        <div class="login-panel">
          <div class="title">web qq</div>
          <div class="input-wraper">
            账号：<input id="account" type="text">
          </div>
          <div class="input-wraper">
            密码：<input id="pwd" type="password">
          </div>
          <router-link to="/register"><button class="login-button">注册</button></router-link>
            <button @click="login" class="login-button">登录</button>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "Login",
      props: [
        'socket'
      ],
      data() {
        return {
          isshow: true
        }
      },
      methods: {
          login: function () {
            console.log(this.$cookies.get('session_id'));
            let account = document.getElementById('account').value;
            let pwd = document.getElementById('pwd').value;
            let data = {
              qq: account,
              pwd: pwd,
              message_type: 3
            };
            //登录操作
            let _this = this
            this.socket.onmessage = function(ev) {
              let data = JSON.parse(ev.data);
              // alert(data.msg);
              console.log(data);
              if (data.code == 0) {
                _this.isshow = false
                _this.$cookies.set('session_id', data.session_id, '0');
                _this.$cookies.set('qq', account, '0');
                _this.$emit('loggedsuccess')
              }

            }
            this.socket.send(JSON.stringify(data));
          }
      }
    }
</script>

<style scoped>
  .login-panel-wraper {
    display: flex;
    min-height: 100vh;
    margin: 0;
    margin-right: 200px;
  }
  .title {
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 26px;
  }
  .input-wraper {
    height: 50px;
    line-height: 50px;
  }
  .login-panel {
    margin: auto;
    height: 400px;
    width: 600px;
    border: 1px solid rebeccapurple;
    text-align: center;
  }
  .login-button {
    margin-left: 40px;
  }
</style>
