<template>
  <div>
    <div class="login-panel-wraper">

      <div class="login-panel">
        <div class="close" @click="register_close"></div>
        <div class="title">注册</div>
        <div class="input-wraper">
          昵称：<input v-model="nickname" type="text">
        </div>
        <div class="input-wraper">
          密码：<input v-model="pwd" type="password">
        </div>
        <div class="input-wraper">头像：
          <ul>
            <li v-for="(face, ind) of face_img"><img :src="'/static/img/'+face.src" :class="{ face_checed: face_url === face.flag }" @click="checkface(face.flag)" alt=""></li>
          </ul>
        </div>
        <div></div>
        <div class="input-wraper">
          <button @click="comfirm" class="login-button">提交</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import qs from 'qs';
  export default {
    name: "Register",
    data() {
      return {
        nickname: '',
        pwd: '',
        face_img: [
          {
            src: '1.jpg',
            flag: 1
          },
          {
            src: '2.jpg',
            flag: 2
          },
          {
            src: '3.jpg',
            flag: 3
          },
          {
            src: '4.jpg',
            flag: 4
          },
          {
            src: '5.jpg',
            flag: 5
          },
          {
            src: '6.jpg',
            flag: 6
          },
          {
            src: '7.jpg',
            flag: 7
          },
          {
            src: '8.jpg',
            flag: 8
          }
        ],
        face_check: 'face_checed',
        face_url: ''
      }
    },
    methods: {
      comfirm: function () {
        let data = {
          pwd: this.pwd,
          nickname: this.nickname,
          avatar: this.face_url
        };
        axios.post('http://localhost:9501/users/register', qs.stringify(data))
          .then(function (response) {
            console.log(response);
            let data = response.data;
            alert('账号申请成功：' + data.qq);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      checkface: function (flag) {
       this.face_url = flag
      },
      register_close: function () {
        this.$emit('registerclose', '432')
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .login-panel-wraper {
    display: flex;
    min-height: 100vh;
    margin: 0;
    /*height: 100%;*/
    margin-right: 200px;
  }
  .title {
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 26px;
  }
  .input-wraper {
    height: 50px;
    /*line-height: 50px;*/
    padding-left: 130px;
  }
  ul {
    display: inline-block;
  }
  .input-wraper input {
    height: 30px;
    width: 200px;
    border: 2px solid silver;
    border-radius: 5px;
  }
  .login-panel {
    position: relative;
    margin: auto;
    height: 400px;
    width: 600px;
    border: 1px solid silver;
    border-radius: 5px  ;
    background: white;
  }
  .login-button {
    padding: 6px 20px;
    margin-left: 40px;
    background: #5FB878;
    color: white;
    border-radius: 5px;
  }
  li {
    display: inline-block;
    margin-left: 10px;
  }
  li img {
    width: 30px;
    height: 30px;
  }
  .face_checed {
    border: 2px solid green;
  }
  .close {
    width: 20px;
    height: 20px;
    position: absolute; right: 1px;top: 5px;
    background: url("/static/img/icon.png") no-repeat;
    background-position:4px -40px;
    cursor: pointer;
    /*color: white;*/

  }
</style>
