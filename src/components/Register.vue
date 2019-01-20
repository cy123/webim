<template>
    <div>
      <div class="login-panel-wraper">
      <div class="register">
        <div class="title">申请qq</div>
        <div class="input-wraper">
          昵称: <input id="nickname" type="text">
        </div>
        <div class="input-wraper">
          密码: <input id="pwd" type="password">
        </div>
        <router-link to="/"><button>返回</button></router-link>
        <button @click="register" class="login-button">提交</button>
      </div>
    </div>
    </div>
</template>

<script>
    export default {
      name: "Register",
      methods: {
        register: function () {
          let nickname = document.getElementById('nickname').value
          let pwd = document.getElementById('pwd').value
          // console.log(account.value);
          // console.log(pwd.value);
          axios.post('webqq.cn/register', {
            nickname: nickname,
            pwd: pwd
          })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    }
</script>

<style scoped>
  .login-panel-wraper {
    display: flex;
    min-height: 100vh;
    margin: 0;
  }
  .title {
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 26px;
  }
  .register {
    margin: auto;
    height: 400px;
    width: 600px;
    border: 1px solid rebeccapurple;
    text-align: center;
  }
  .input-wraper {
    height: 50px;
    line-height: 50px;
  }
</style>
