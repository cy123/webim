<template>
    <div>
      <div class="login-panel-wraper">
        <div class="login-panel">
          <div class="title">web qq</div>
          <div class="input-wraper">
            账号：<input v-model="qq" type="text">
          </div>
          <div class="input-wraper">
            密码：<input v-model="pwd" type="password">
          </div>
          <button @click="register" class="login-button">注册</button>
          <button @click="login" class="login-button">登录</button>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "Login",
      data() {
        return {
          pwd: '',
          qq: ''
        }
      },
      methods: {
          login: function () {

            if (!this.qq){
              alert('qq号不能为空');
              return false;
            }
            if (!this.pwd){
              alert('密码不能为空');
              return false;
            }
            let data = {
              qq: this.qq,
              pwd: this.pwd,
              message_type: 3
            };
            console.log(111);
            this.$emit('userlogin', data);
          },
        register: function () {
            console.log(1234)
          this.$emit('register', '1234');
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
  .input-wraper input {
    height: 30px;
    width: 200px;
    border: 2px solid silver;
    border-radius: 5px;
  }
  .login-panel {
    margin: auto;
    height: 400px;
    width: 600px;
    border: 1px solid silver;
    border-radius: 5px  ;
    text-align: center;
  }
  .login-button {
    padding: 6px 20px;
    margin-left: 40px;
    background: #5FB878;
    color: white;
    border-radius: 5px;
  }
</style>
