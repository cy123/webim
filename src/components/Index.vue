<template>
    <div>
      <Login v-show="loginshow" :socket="this.socket" v-on:loggedsuccess="loggedsuccess"></Login>
      <div class="contenier">
        <div class="header">
          <div @click="login" v-if="islogin" class="login-button">登录</div>
          <div @click="logout" v-if="islogout" class="login-button">退出</div>

          <div class="header-box">
            <div class="header-item">好友</div>
            <div class="header-item">群</div>
            <div class="header-item">空间</div>
          </div>
        </div>
        <div class="friends">
          <ul class="friends-list">
           <li v-for="friednd of this.friends" class="friend" @click="addtopanel(friednd)">
             <img class="face" :src="friednd.face" alt="">{{friednd.nickname}}
           </li>
          </ul>
        </div>
        <!--聊天面板-->
        <div v-for="panel of chatpanel" v-show="panel.show" class="chat-panel" id ="1">
          <div class="chat-title" id="5">{{panel.nickname}}</div>
          <div class="chat-list">
            <ul>
              <li v-for="item of chatlist[panel.qq]" :class="item.class">
                <img  class="face" :src="item.img" alt="">
                <span>{{item.datetime}}</span>
                <div>{{item.message}}</div>
              </li>
            </ul>
          </div>
          <div class="chat-input">
            <textarea v-model="message" name="" id="" cols="50" rows="5"></textarea>
            <div @click="send(panel.qq)" class="to-message">发送</div>
          </div>
        </div>


        <div class="footer">
          <span @click="addfriends" class="addfriends">添加好友</span>
        </div>
      </div>

    </div>
</template>

<script>
  import Login from './Login'
    export default {
      name: "Index",
      components: {
        Login: Login
      },
      data() {
        return {
          socket: '',
          friends: [
            {
              qq: '25',
              nickname: '大黄狗',
              face: 'http://img5.duitang.com/uploads/item/201410/05/20141005082835_2RTzn.thumb.700_0.jpeg'
            },
            {
              qq: '26',
              nickname: 'hhh',
              face: 'http://img5.duitang.com/uploads/item/201410/05/20141005082835_2RTzn.thumb.700_0.jpeg'
            }
          ],
          chatlist: {
          },
          chatpanel: [],
          message: '',
          loginshow: false,
          logged: false,
          islogout: false,
          islogin: false
        }

      },
      methods: {
        create_socket: function () {
          let session_id = this.$cookies.get('session_id');
          this.socket = new WebSocket("ws://localhost:9501?session_id="+session_id)
          this.socket.onopen = function(ev) {
            console.log('websocket is open now');
          }
          var _this = this;
          this.socket.onmessage = function(ev) {

            let data = JSON.parse(ev.data);
            console.log(data);
            // 如果是聊天
            if (data.chat_type == 1) {
              let item = {
                img: 'http://img5.duitang.com/uploads/item/201410/05/20141005082835_2RTzn.thumb.700_0.jpeg',
                datetime: '2019-10',
                nickname: '大黄狗',
                message: data.msg,
                class: ''
              };
              let qq = _this.$cookies.get('qq');
              console.log(_this.chatlist);
              _this.chatlist[qq].push(item)
            }
            // 朋友列表
            if(data.message_type == 4) {
              _this.friends = data.msg
            }

          }
        },
        send: function (qq) {
          let data = {
            to_qq: qq,
            message_type: 1,
            chat_type:1,
            msg: this.message
          };
          this.socket.send(JSON.stringify(data));
          let itme =   {
              img: 'http://pic43.photophoto.cn/20170403/0005081864232270_b.jpg',
              datetime: '2019-10',
              nickname: '大黄狗',
              message: this.message,
              class: 'chat-right'
          };
          this.chatlist[qq].push(itme);
          this.message = ''
        },
        login: function () {
          this.loginshow = !this.loginshow
          //console.log(this.$cookies.get('username'));
        },
        logout: function () {
          this.$cookies.remove('session_id');
          this.islogout = false
          this.islogin = true
        },
        check_login()
        {
          let session_id = this.$cookies.get('session_id');
          if (session_id) {
            this.islogout = true
          } else  {
            this.islogin = true
          }
        },
        loggedsuccess: function () {
          this.islogout = true
          this.islogin = false
        },
        addfriends: function () {

        },
        addtopanel: function (fr) {
          // console.log(fr);

          let flag = false;
          for(let index in this.chatpanel) {
            if  (this.chatpanel[index].qq !== fr.qq) {
              this.chatpanel[index].show = false;
            }

            if (this.chatpanel[index].qq === fr.qq) {
              this.chatpanel[index].show = true;
              flag = true;
            }
          }

          if  (flag) {
            this.$forceUpdate()
            return;
          }

          this.chatlist[fr.qq]=[];
          fr.show = true;

          this.chatpanel.push(fr);
          console.log(this.chatpanel);
        }
      },
      mounted() {
        this.create_socket()
        this.check_login()
      }
    }
</script>

<style scoped>
  .contenier {
    width: 300px;
    height: 600px;
    position: absolute;
    right: 0;
    bottom: 0;
    border: 1px solid rebeccapurple;
  }
  .header {
    background: #F5F5F5;
  }
  .login-button {
  }
  .header-box {
    display: flex;
    margin-top: 50px;
    border-bottom: 1px solid rebeccapurple;
  }
  .header-item {
    flex: 1;
    text-align: center;
  }
  .face {
    width: 20px;
    height: 20px;
    border-radius: 10px;
  }
  ul li {
    height: 40px;
    /*line-height: 40px;*/
  }
  .chat-panel {
    position: absolute;
    right: 400px;
    top: 50px;
    height: 500px;
    width: 600px;
    border: 1px solid rebeccapurple;
  }
  .chat-title {
    background: #cacaca;
  }
  .chat-list {
    width: 100%;
    height: 350px;
    border-bottom: 1px solid rebeccapurple;
    overflow: scroll;
  }
  .chat-right {
    text-align: right;
  }
  textarea {
    width: 100%;
    height: 100%;
  }
  .to-message {
    position: absolute;
    right: 10px;
    border: 1px solid green;
    border-radius: 2px;
    padding: 2px 8px;
  }
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 20px;
    line-height: 20px;
    background: #cacaca;
  }
  .friend {
    height: 40px;
    line-height: 40px;
  }
  .friend:hover {
    background: #cacaca;
  }
</style>
