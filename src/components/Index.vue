<template>
    <div>
      <!--登录框-->
     <Login v-show="loginshow" @click="login" @userlogin = "userlogin" @register="register"></Login>

      <!--注册-->
      <Register v-show="registershow" @registerclose="registerclose" ></Register>

      <div v-show="addfriendsshow" class="addfriends">
        输入好友qq号：
        <input v-model="friend_qq" type="text">
        <button @click="doaddfriend" style="cursor: pointer;">提交</button>
      </div>

      <!--主面板-->
      <div class="contenier">
        <div class="header">
          <div v-if="islogin" @click="login" class="login-button">登录</div>
          <div @click="logout" v-if="islogout" class="login-button">退出</div>
          <div class="close">

          </div>
          <div class="header-img">
            <img :src="avatar" alt="">
          </div>
          <span>{{nickname}}</span>
          <div class="header-box">
            <div class="header-item" :class="{header_item_active: header_active =='friends'}" @click="switchpanel('friends')">好友</div>
            <div class="header-item" :class="{header_item_active: header_active =='group'}" @click="switchpanel('group')">群</div>
            <div class="header-item message" :class="{header_item_active: header_active =='message'}" @click="switchpanel('message')">
              消息
              <div class="unread">{{unread_num}}</div>
            </div>
          </div>
        </div>
        <div class="panel-content">
          <div class="friends" v-show="friendsshow">
            <ul class="conent-list">
              <li v-for="friend of this.friends" class="friend" @click="addtopanel(friend)">
                <img class="face" :src="'/static/img/'+ friend.avatar +'.jpg'" alt="">{{friend.nickname}}
                <div class="friend_unread">{{chat_unread[friend.qq]}}</div>
              </li>
            </ul>
          </div>
          <div v-show="groupshow">
            <ul class="conent-list">
              <li v-for="group of groups" @click="add_group_panel" class="friend qqgroup">
                {{group.group_name}}
                <div class="friend_unread">{{online_unread}}</div>
              </li>
            </ul>
          </div>
          <div v-show="messageshow">
           <ul>
             <li v-for="data of unread_list">

             </li>
           </ul>
          </div>
        </div>
        <div class="footer">
          <span @click="addfriends" class="addfriends-button">添加好友</span>
        </div>
      </div>

      <!--聊天面板-->
      <div v-for="user of chatpanel" v-show="user.qq === current_qq" class="chat-panel" id ="1">
        <div class="close" @click="chatpanel_close(user.qq)"></div>
        <div class="chat-title" id="5" >{{user.nickname}}</div>
        <div style="display: flex">
          <div class="chat-left">
            <ul>
              <li>
                <img class="face" src="/static/img/1.jpg" alt=""> 大花猫
              </li>
            </ul>
          </div>
          <div class="chat-right">
            <div class="chat-list" id="chatmessage">
              <ul>
                <li v-for="item of chatlist[user.qq]" :class="item.class_chat_list_ul_li_right">
                  <div class="chat-face-item" :class="item.class_face_item_right">
                    <img  class="chat-face" :src="item.img" alt="">
                    <cite>
                      {{item.datetime}}
                      <i>{{item.nickname}}</i>
                    </cite>
                  </div>
                  <div class="chat-list-text">
                    {{item.message}}
                  </div>
                </li>
              </ul>
            </div>
            <div class="chat-input">
              <textarea v-model="message" name="" id="" cols="50" rows="5"></textarea>
              <div @click="send(user.qq, user.nickname)" class="to-message">发送</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Login from './Login';
  import Register from './Register';
    export default {
      name: "Index",
      components: {
        Login: Login,
        Register: Register
      },
      data() {
        return {
          socket: '',
          friends: [],
          chatlist: {
          },
          chatpanel: [],
          chatpanelqq: [],
          message: '',
          loginshow: false,
          registershow: false,
          addfriendsshow: false,
          logged: false,
          islogout: false,
          islogin: false,
          userqq: '',
          userpwd: '',
          friend_qq: '',
          nickname: '',
          avatar: '/static/img/qq.jpeg',
          friendsshow: true,
          groupshow: false,
          messageshow: false,
          header_active: 'friends',
          chat_pannel_show: false,
          current_qq: '',
          unread_num: '',
          online_unread: '',
          unread_list: [],
          chat_unread: [],
          user: {},
          groups: [
            {
              group_avatar: '',
              group_name: 'webqq在线用户'
            }
          ]
        }

      },
      methods: {
        create_socket: function () {
          let session_id = this.$cookies.get('session_id');
          if (!session_id) {
            session_id = ''
          }
          this.socket = new WebSocket("ws://localhost:9501?session_id="+session_id)
          this.socket.onopen = function(ev) {
            console.log('websocket is open now');
          }
          let _this = this;
          this.socket.onmessage = function(ev) {

            let data = JSON.parse(ev.data);
            console.log(data);
            if (data.code === 1) {
              alert(data.msg);
              return false;
            }
            // 如果是聊天
            if (data.message_type == 1) {

              // 判断是否打开当前聊天窗口
              if (_this.current_qq != data.to_qq) {
                if (!_this.chat_unread[data.to_qq]) {
                  _this.chat_unread[data.to_qq] = 0
                }
                _this.chat_unread[data.to_qq]++;
                // _this.unread_num++;
              }
              let img = '';
              let nickname = ''
              if (data.chat_type == 2) {
                if (_this.current_qq != 'all') {
                  _this.online_unread ++;
                }
                img = '/static/img/' + data.userinfo.avatar + '.jpg';
                 nickname = data.userinfo.nickname;
              } else  {
                img =  '/static/img/' + _this.friends[data.to_qq].avatar + '.jpg';
                nickname = _this.friends[data.to_qq].nickname;
              }
              let item = {
                img: img,
                datetime: data.datetime,
                nickname: nickname,
                message: data.msg,
                class: '',
                class_face_item_right: 'chat-face-item-right',
                class_chat_list_ul_li_right: 'chat-mine'
              };

              if (!_this.chatlist[data.to_qq]) {
                _this.chatlist[data.to_qq] = [];
              }
              _this.chatlist[data.to_qq].push(item)
              _this.$forceUpdate();
              if (_this.current_qq) {
                _this.scrollToBottom();
              }

            }
            // 登录番返回，
            if(data.message_type == 3) {
              _this.$cookies.set('session_id', data.session_id, '0');
              _this.$cookies.set('user', data.user, '0');
              _this.nickname = data.user.nickname
              _this.loginshow = !_this.loginshow;
              _this.islogin = false;
              _this.friends = data.friends;
              _this.avatar = '/static/img/' + data.user.avatar + '.jpg'
              _this.dealUnread(data.unread);
              _this.check_login();
              _this.$forceUpdate();
            }

            // 接收服务端发送过来的好友列表
            if(data.message_type == 4) {
              _this.friends = data.friends
              _this.$forceUpdate();
            }

            // 添加好友
            if (data.message_type == 5) {

               if (data.code == 0) {
                 this.addfriendsshow = false;
               }

               // 重新刷新好友列表
              _this.friends = data.friends
              _this.$forceUpdate();
            }
            // 设置消息已读
            if (data.message_type == 6) {

            }

          }
        },
        send: function (qq, nickname) {
          console.log(qq,nickname);
          let user = this.$cookies.get('user');
          // 未登录，不发送消息
          if (!user) {
            this.unlogin_send(qq);
            return;
          }
          let data = {
            to_qq: qq,
            user_qq: user ? user.qq : '',
            message_type: 1,
            chat_type:1,
            msg: this.message
          };
          // 发送所有在线用户
          if (qq == 'all') {
            // 群聊
            data.chat_type = 2;
          }

          this.socket.send(JSON.stringify(data));
          let itme =   {
              img: '/static/img/'+ user.avatar+'.jpg',
              datetime: '2019-10',
              nickname: user ? user.nickname: 'qq',
              message: this.message,
              class: 'float-right',
              class_face_item_right: '',
              class_chat_list_ul_li_right: ''
          };
          if (! this.chatlist[qq]) {
            this.chatlist[qq] = [];
          }

          this.chatlist[qq].push(itme);

          this.message = ''
          this.scrollToBottom();
        },
        unlogin_send: function (qq) {
          let itme =   {
            img: '/static/img/qq.jpeg',
            datetime: '2019-10',
            nickname: '登录后聊天',
            message: this.message,
            class: 'float-right',
            class_face_item_right: '',
            class_chat_list_ul_li_right: ''
          };
          if (! this.chatlist[qq]) {
            this.chatlist[qq] = [];
          }

          this.chatlist[qq].push(itme);

          this.message = ''
          this.scrollToBottom();
        },
        login: function () {
          this.loginshow = !this.loginshow;
          this.registershow = false;
          this.current_qq='';
        },
        userlogin: function (data) {
          this.socket.send(JSON.stringify(data));
        },
        logout: function () {
          this.$cookies.remove('session_id');
          this.$cookies.remove('user');
          this.user = '';
          this.islogout = false;
          this.islogin = true;
          this.friends = [];
          this.nickname = '';
          this.current_qq = '';
          this.avatar = '/static/img/qq.jpeg';
        },
        check_login() {
          let session_id = this.$cookies.get('session_id');
          if (session_id) {
            this.islogout = true
            let user = this.$cookies.get('user');
            this.nickname = user.nickname
          } else  {
            this.islogin = true
          }
        },
        register: function(data) {
          this.loginshow = false;
          this.registershow = true;
        },
        registerclose: function () {
          this.registershow = false;
        },
        loggedsuccess: function () {
          this.islogout = true
          this.islogin = false
        },
        addfriends: function () {
          this.addfriendsshow = !this.addfriendsshow
        },
        // 添加好友操作
        doaddfriend: function() {
          let data = {
            user_qq: this.$cookies.get('user').qq,
            friend_qq: this.friend_qq,
            message_type: 5,
            session_id: this.$cookies.get('session_id')
          };
          this.socket.send(JSON.stringify(data))
        },
        addtopanel: function (fr) {

          this.current_qq = fr.qq;
          // 如果有未读消息
          if (this.chat_unread[fr.qq]) {
            let user = this.$cookies.get('user');
            this.setRead(fr.qq, user.qq)
          }
          this.chat_unread[fr.qq] = '';

          // 判断是否已经添加pannel
          if (this.chatpanelqq.indexOf(fr.qq) === -1) {
            this.chatpanel.push(fr);
            this.chatpanelqq.push(fr.qq);
          }
        },
        chatpanel_close: function (qq) {
          this.current_qq = false;
        },
        scrollToBottom() {
          this.$nextTick(() => {
            var container = document.querySelector("#chatmessage");
            container.scrollTop = container.scrollHeight;
          })},
        switchpanel: function (tab) {
          if (tab == 'group') {
            this.groupshow = true;
            this.friendsshow = false;
            this.messageshow = false;
            this.header_active = tab
          } else if (tab == 'message') {
            this.groupshow = false;
            this.friendsshow = false;
            this.messageshow = true;
            this.header_active = tab
          } else if (tab == 'friends') {
            this.groupshow = false;
            this.friendsshow = true;
            this.messageshow = false;
            this.header_active = tab
          }
        },
        dealUnread: function (data) {
          for (let i=0;i<data.length;i++) {
            this.addMsg(data[i]);
          }
        },
        addMsg: function (data) {

          if (!this.chat_unread[data.qq]) {
            this.chat_unread[data.qq] = 0
          }
          this.chat_unread[data.qq]++;
          let item = {
            img: '/static/img/' + this.friends[data.qq].avatar + '.jpg',
            datetime: '2019-01',
            nickname: this.friends[data.qq].nickname,
            message: data.message,
            class: '',
            class_face_item_right: 'chat-face-item-left',
            class_chat_list_ul_li_right: 'chat-list-ul-li-left'
          };
          let qq = this.$cookies.get('qq');
          if (!this.chatlist[data.qq]) {
            this.chatlist[data.qq] = [];
          }
          // 添加聊天消息
          this.chatlist[data.qq].push(item);
        },
        // 设置已经阅读了，判断规则，只要打开聊天窗口就算已经阅读了,
        setRead: function (qq, to_qq) {
          let data = {
            qq: qq,
            to_qq: to_qq,
            message_type: 6
          };
          this.socket.send(JSON.stringify(data))
        },
        add_group_panel: function () {
          this.online_unread = ''
          // 判断是否已经添加pannel
          if (this.chatpanelqq.indexOf('all') === -1) {

            let alluser = {
              qq: 'all',
              nickname: 'webqq在线用户'
            };

            this.chatpanel.push(alluser);
            this.chatpanelqq.push('all');
          }

          // 显示
          this.current_qq = 'all';

        }
      },
      mounted() {
        if(!this.socket) {
          this.create_socket()
        }
        this.check_login();
        if (this.$cookies.get('user')) {
          this.user = this.$cookies.get('user');
          this.avatar = '/static/img/' + this.user.avatar + '.jpg'
        }
      },
      updated() {
        // this.scrollToBottom()
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
    border: 1px solid gainsboro;
    border-radius: 3px;
  }
  .header {
    background: #F5F5F5;
  }
  .conent-list {
    /*padding-left: 20px;*/
  }
  .conent-list img {
    margin-left: 20px;
    margin-right: 5px;
  }
  .login-button {
  }
  .header-box {
    display: flex;
    margin-top: 30px;
  }
  .header-item {
    flex: 1;
    text-align: center;
    cursor: pointer;
    padding: 10px 5px;
    border-bottom: 1px solid gainsboro;
  }
  .message {
    position: relative;
  }
  .unread {
    color: white;
    width: 20px;
    border-radius: 3px;
    position: absolute;
    right: 10px;
    top: 5px;
    background: red;
  }
  .header_item_active {
    border-bottom: 1px solid green;
  }
  .face {
    width: 20px;
    height: 20px;
    /*border-radius: 10px;*/
  }
  .chat-face {
    width: 30px;
    height: 30px;
  }
  .chat-left ul li {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  .conent-list ul li:hover {
    background: #cacaca;
  }
  .chat-list ul {
    margin-top: 0;
    /*margin-bottom: 10px;*/
    padding: 0;
  }
  .chat-list ul li {
    position: relative;
    font-size: 0;
    margin-bottom: 10px;
    padding-left: 60px;
    min-height: 40px;
  }
  .chat-face-item cite {
    position: absolute;
    left: 60px;
    top: -2px;
    width: 400px;
    line-height: 24px;
    font-size: 12px;
    white-space: nowrap;
    color: #999;
    text-align: left;
    font-style: normal;
  }
  .chat-face-item cite i {
    padding-left: 15px;
    font-style: normal;
  }
  .chat-face-item {
    position: absolute;
    left: 3px;
  }
  .chat-list-text, .chat-face-item {
    display: inline-block;
    vertical-align: top;
    font-size: 14px;
  }
  .chat-list-text {
    position: relative;
    line-height: 22px;
    margin-top: 25px;
    padding: 8px 15px;
    background-color: #e2e2e2;
    border-radius: 3px;
    color: #333;
    word-break: break-all;
  }
  .chat-list-text::after {
    content: '';
    position: absolute;
    left: -10px;
    top: 13px;
    width: 0;
    height: 0;
    border-style: solid dashed dashed;
    border-color: #e2e2e2 transparent transparent;
    overflow: hidden;
    border-width: 10px;
  }
  .chat-list ul .chat-mine {
    text-align: right;
    padding-left: 0;
    padding-right: 60px;
  }
  .chat-mine .chat-face-item {
    left: auto;
    right: 3px;
  }
  .chat-mine .chat-list-text {
    margin-left: 0;
    text-align: left;
    background-color: #5FB878;
    color: #fff;
  }
  .chat-mine .chat-list-text:after {
    left: auto;
    right: -10px;
    border-top-color: #5FB878;
  }
  .chat-mine .chat-face-item cite {
    left: auto;
    right: 60px;
    text-align: right;
  }
  .chat-panel {
    position: absolute;
    right: 500px;
    top: 50px;
    border: 1px solid gainsboro;
    border-radius: 3px;
    /*z-index: 999;*/
  }
  .chat-title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: gainsboro;
  }
  .chat-list {
    width: auto;
    height: 350px;
    border-bottom: 1px solid gainsboro;
    overflow-y: scroll;
  }
 .chat-left {
   width: 150px;
   height: 500px;
   border-right: 1px solid gainsboro;
 }
 .chat-right {
   width: 550px;
   height: 500px;
   /*background: green;*/
 }
  textarea {
    width: 100%;
    height: 100%;
    resize: none;
    padding-left: 10px;
    padding-top: 5px;
    box-sizing: border-box;
    font-family:"Times New Roman",Georgia,Serif;
  }
  .to-message {
    position: absolute;
    right: 10px;
    bottom: 10px;
    border: 1px solid green;
    border-radius: 2px;
    padding: 6px 16px;
    background: green;
    color: white;
    cursor: pointer;
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
    position: relative;
    height: 40px;
    line-height: 40px;
  }
  .friend:hover {
    background: #cacaca;
  }

  .login-panel-wraper {
    display: flex;
    min-height: 100vh;
    margin: 0;
    margin-right: 200px;
  }
  .login-panel {
    margin: auto;
    height: 400px;
    width: 600px;
    border: 1px solid rebeccapurple;
    text-align: center;
    background: #cacaca;
  }
  .login-panel input {
    border: 1px solid rebeccapurple;
    margin-bottom: 10px;
  }
  .addfriends {
    position: absolute;
    top: 66px;
    right: 500px;
    width: 300px;
    height: 50px;
    line-height: 50px;
    border: 1px solid gainsboro;
  }
  .addfriends input {
    border: 2px solid gainsboro;
    border-radius: 3px;
  }
  .friend_unread {
    position: absolute;
    font-size: 13px;
    right: 10px;
    top: 10px;
    width: 15px;
    line-height: 15px;
    background: red;
    color: white;
    border-radius: 3px;
    text-align: center;
  }
  .header-img {
    height: 50px;
    width: 46px;
    margin-left: 10px;
    margin-top: 10px;
  }
  .header-img img {
    width: 50px;
    height: 46px;
  }
  .close {
    width: 20px;
    height: 20px;
    position: absolute; right: 1px;top: 5px;
    background: url("/static/img/icon.png") no-repeat;
    background-position:4px -40px;
    cursor: pointer;
  }
  .addfriends-button {
    cursor: pointer;
  }
</style>
