<template>
    <div>

      <!--登录框-->
     <Login v-show="loginshow" @click="login" @userlogin = "userlogin" @register="register"></Login>

      <!--注册-->
      <Register v-show="registershow" @registerclose="registerclose" ></Register>

      <div v-show="addfriendsshow" class="addfriends">
        <div class="close" @click="addfriends_close()"></div>
        输入好友qq号：
        <input v-model="friend_qq" type="text">
        <button @click="doaddfriend" style="cursor: pointer;">提交</button>
      </div>
      <div v-show="panel_small" class="main_panel_small" @click="switch_main_panel">
        <img src="/static/img/qq.jpeg" alt="">
      </div>

      <audio src="/static/audio/msg.mp3" ref="msgwav" id="msgwav"></audio>
      <!--主面板-->
      <div class="contenier" v-show="main_panel_show">
        <div class="header">
          <div v-if="islogin" @click="login" class="login-button">登录</div>
          <div @click="logout" v-if="islogout" class="login-button">退出</div>
          <div class="close" @click="switch_main_panel">

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
          <div class="friends" v-show="panelshow==='friends'">
            <ul class="conent-list">
              <li v-for="friend of this.friends" class="friend" @click="addtopanel(friend)">
                <img class="face" :src="'/static/img/'+ friend.avatar +'.jpg'" alt="">{{friend.nickname}}
                <div class="friend_unread">{{chat_unread[friend.qq]}}</div>
              </li>
            </ul>
          </div>
          <div v-show="panelshow==='group'">
            <ul class="conent-list">
              <li class="friend qqgroup" @click="add_group_panel">
                <img class="face" src="/static/img/group.jpg" alt="">
                当前在线
                <span style="color: #5fb878" >({{online_user_num}})</span>
                <div class="friend_unread">{{online_unread}}</div>
              </li>
              <li v-for="group of groups"  class="friend qqgroup">
                {{group.group_name}}
              </li>
            </ul>
          </div>
          <div v-show="panelshow==='message'">
           <ul>
             <li v-for="data of unread_list">

             </li>
           </ul>
          </div>
        </div>
        <div class="footer">
          <span @click="addfriends" class="addfriends-button">+</span>
        </div>
      </div>

      <!--聊天面板-->
      <div v-for="user of chatpanel" v-show="user.qq === current_qq" class="chat-panel" id ="1">
        <div class="close" @click="chatpanel_close(user.qq)"></div>
        <div class="chat-title" id="5" >{{user.nickname}}</div>
        <div style="display: flex">
          <div class="chat-left">
            <ul>
              <li
                v-for="item of pannel_side"
                :class="{pannel_side_list:item.qq === current_qq}"
                @mouseenter="showclose(item.qq)"
                @mouseleave="closeshow"
                @click="switch_chat_side(item.qq)"
              >
                <div class="pannel-side-close"
                     v-show="panel_close_show==item.qq"
                     @click="pannel_side_close(item.qq)"
                     @click.stop
                >
                  <span class="iconfont">&#xe670;</span>
                </div>
                <img class="face" :src="'/static/img/'+item.avatar+'.jpg'" alt=""> {{item.nickname}}
              </li>
            </ul>
          </div>
          <div class="chat-right">
            <div class="chat-list" >
              <ul :id="'abc' + user.qq " class="chatbox">
                <li
                  v-for="item of chatlist[user.qq]"
                  :class="item.class"
                >
                  <div class="chat-face-item">
                    <img  class="chat-face" :src="item.img" alt="">
                    <cite>
                      {{item.datetime}}
                      <i>{{item.nickname}}</i>
                    </cite>
                  </div>
                  <div class="chat-list-text" v-html="item.message">
                  </div>
                </li>
              </ul>
            </div>
            <div class="emoji-box" v-show="emoji_show">
              <ul>
                <li
                  v-for="emoji of emojis"
                  @click="emoji_select(user.qq, emoji)"
                >
                  <img :src="'/static/img/emoji/emoji'+ ' (' + emoji +').png'" alt="">
                </li>
              </ul>
            </div>
            <div class="tool_bar">
              <span class="iconfont iconfont-emoji" @click="emojiclick">&#xe64e;</span>
            </div>
            <div class="chat-input">
              <textarea
                v-model="message[user.qq]"
                @keyup.ctrl.enter="send(user.qq, user.nickname)"
                name=""
                autofocus="autofocus"
                v-focus="chatfocus"
                cols="50"
                rows="5">

              </textarea>
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
  import chatConfig from '@/assets/js/chatConfig.js'
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
          chatlist: [],
          chatpanel: [],
          chatpanelqq: [],
          message: [],
          loginshow: false,
          registershow: false,
          addfriendsshow: false,
          logged: false,
          islogout: false,
          islogin: false,
          friend_qq: '',
          nickname: '',
          avatar: '/static/img/qq.jpeg',
          panelshow: 'friends',
          header_active: 'friends',
          chat_pannel_show: false,
          current_qq: '',
          unread_num: '',
          online_unread: '',
          unread_list: [],
          chat_unread: [],
          user: {},
          groups: [],
          online_user_num: '', // 当前在线人数
          chatfocus: true, // 聊天输入聚焦
          pannel_side: [], // 聊天对话框左侧
          panel_close_show: '',
          pannel_side_qq: [],
          panel_small: false,
          main_panel_show: true,
          emojis: [],
          emoji_show: false
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
          };

          let _this = this;
          this.socket.onmessage = function(ev) {

            let data = JSON.parse(ev.data);
            console.log(data);
            if (data.code === 1) {
              alert(data.msg);
              return false;
            }
            data = data.data;
            switch (data.message_type) {
              // 处理聊天相关
              case chatConfig.MESSAGE_TYPE_CHAT:
                _this.handleChat(data);
                break;
              // case chatConfig.MESSAGE_TYPE_REGISTER:
              //   break;
                    // 处理登录
              case chatConfig.MESSAGE_TYPE_LOGIN:
                _this.handleLogin(data);
                break;
              // case chatConfig.MESSAGE_TYPE_FRIENDS:
              //   break;
                    // 添加好友
              case chatConfig.MESSAGE_TYPE_ADD_FRIENDS:
                _this.handleAddFriends(data);
                break;
              // case chatConfig.MESSAGE_TYPE_READ:
              //   break;
              // case chatConfig.MESSAGE_TYPE_ONLINE_USER_NUM:
              //   break;
              // default:
              //   break;
            }
            // 接收服务端发送过来的好友列表
            if(data.message_type == 4) {
              _this.friends = data.friends;
              _this.online_user_num = data.unline_user_num;
              _this.$forceUpdate();
            }

            // 设置消息已读
            if (data.message_type == 6) {

            }

            if (data.message_type === 7) {
              _this.online_user_num = data.unline_user_num;
            }

            if (data.message_type === 8) {
              _this.friends = data.friends
              _this.online_user_num = data.unline_user_num;
            }

          }
        },
        send: function (qq, nickname) {
          //console.log(this.$refs.msgwav)
          // 没有消息直接返回
          console.log(this.message);
          if(!this.message[qq]) {
            this.chatfocus= true;
            return;
          }
          let imghtml = "<img src='/static/img/emoji/emoji (1).png'>";
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
            msg: this.message[qq]
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
              message: this.message[qq],
              class: 'chat-mine'
          };
          if (! this.chatlist[qq]) {
            this.chatlist[qq] = [];
          }

          this.chatlist[qq].push(itme);

          this.message[qq] = ''
          this.$forceUpdate();
          this.scrollToBottom();
        },
        unlogin_send: function (qq) {
          if (true){
            let imghtml = "<img src='/static/img/emoji/emoji (1).png'>";
            this.message[qq] = imghtml;
          }
          let itme =   {
            img: '/static/img/qq.jpeg',
            datetime: '2019-10',
            nickname: '登录后聊天',
            message: this.message[qq],
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
        //
        logout: function () {
          let data = {
            message_type: chatConfig.MESSAGE_TYPE_LOGOUT,
            qq:this.user.qq
          }
          this.socket.send(JSON.stringify(data));

          this.$cookies.remove('session_id');
          this.$cookies.remove('user');
          this.user = '';
          this.islogout = false;
          this.islogin = true;
          this.friends = [];
          this.nickname = '';
          this.current_qq = '';
          this.avatar = '/static/img/qq.jpeg';
          this.pannel_side_qq = [];
          this.pannel_side = [];
          this.chatpanelqq = [];
          this.chatpanel = [];
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
          let session_id = this.$cookies.get('session_id');
          if (!session_id) {
            alert('未登录');
            return false;
          }
          this.current_qq ='';
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

          // 隐藏其它面板
          this.addfriendsshow = false;
          this.loginshow = false;

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
          // 判断是否添加 side bar
          if (this.pannel_side_qq.indexOf(fr.qq) === -1) {
            this.pannel_side.push(fr);
            this.pannel_side_qq.push(fr.qq);
          }

          //
          this.scrollToBottom();
          this.$forceUpdate();
        },
        chatpanel_close: function (qq) {
          this.current_qq = false;
        },
        scrollToBottom() {
          this.$nextTick(() => {
            //var container = document.querySelector("#abc"+this.current_qq);
            let container = document.getElementById("abc"+this.current_qq);

            container.scrollTop = container.scrollHeight;
          })},
        switchpanel: function (tab) {
          this.panelshow = tab;
          this.header_active = tab;
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
            class: ''
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
          let alluser = {
            qq: 'all',
            nickname: '当前在线',
            avatar: 'group'
          };
          // 判断是否已经添加pannel
          if (this.chatpanelqq.indexOf('all') === -1) {
            this.chatpanel.push(alluser);
            this.chatpanelqq.push('all');
          }
          console.log(this.pannel_side_qq);
          console.log(this.chatpanel);
          if (this.pannel_side_qq.indexOf('all') === -1) {
            this.pannel_side.push(alluser)
            this.pannel_side_qq.push('all')
          }

          // 显示
          this.current_qq = 'all';

          this.scrollToBottom();

        },
        addfriends_close: function () {
          this.addfriendsshow = false;
        },
        handleChat: function (data) {
          this.$refs.msgwav.play();
          // 判断是否打开当前聊天窗口
          if (this.current_qq != data.to_qq) {
            if (!this.chat_unread[data.to_qq]) {
              this.chat_unread[data.to_qq] = 0
            }
            this.chat_unread[data.to_qq]++;
            // _this.unread_num++;
          }
          let img = '';
          let nickname = ''
          if (data.chat_type == 2) {
            if (this.current_qq != 'all') {
              this.online_unread ++;
            }
            img = '/static/img/' + data.userinfo.avatar + '.jpg';
            nickname = data.userinfo.nickname;
          } else  {
            img =  '/static/img/' + this.friends[data.to_qq].avatar + '.jpg';
            nickname = this.friends[data.to_qq].nickname;
          }
          let item = {
            img: img,
            datetime: data.datetime,
            nickname: nickname,
            message: data.msg,
            class: '',
            class_face_item_right: 'chat-face-item-right',
            class_chat_list_ul_li_right: ''
          };

          if (!this.chatlist[data.to_qq]) {
            this.chatlist[data.to_qq] = [];
          }
          this.chatlist[data.to_qq].push(item)
          this.$forceUpdate();
          if (this.current_qq) {
            this.scrollToBottom();
          }
        },
        handleLogin: function (data) {
          this.$cookies.set('session_id', data.session_id, '0');
          this.$cookies.set('user', data.user, '0');
          this.nickname = data.user.nickname
          this.loginshow = !this.loginshow;
          this.islogin = false;
          this.friends = data.friends;
          this.avatar = '/static/img/' + data.user.avatar + '.jpg'
          this.dealUnread(data.unread);
          this.check_login();
          this.$forceUpdate();
        },
        handleAddFriends: function (data) {
          alert('添加成功');
          // 关闭添加框
          this.addfriendsshow = false;
          // 重新刷新好友列表
          this.friends = data.friends
          this.$forceUpdate();
        },
        pannel_side_close: function (qq) {
          for (let i=0; i<this.pannel_side.length; i++) {
            let item = this.pannel_side[i];
            if (item.qq == qq) {
              // 删除
              this.pannel_side.splice(i, 1);
              // 删除
              let index = this.pannel_side_qq.indexOf(qq);
              this.pannel_side_qq.splice(index, 1);
              if (qq == this.current_qq) {
                this.current_qq = this.pannel_side_qq.pop();
              }
              break;
            }
          }
        },
        showclose: function (qq) {
          this.panel_close_show = qq;
        },
        closeshow: function () {
          this.panel_close_show = ''
        },
        switch_chat_side: function (qq) {
          this.current_qq = qq;
        },
        switch_main_panel: function () {
          this.main_panel_show = !this.main_panel_show;
          this.panel_small = !this.panel_small;
        },
        emojiclick: function () {
          this.emoji_show = !this.emoji_show;
        },
        emoji_init:function () {
          for (let i=1;i<=141;i++) {
            this.emojis.push(i);
          }
        },
        emoji_select: function (qq, emoji) {
          // [emoji50]
          this.emojiclick();
          this.message[qq] = '[emoji'+emoji+']';
          this.$forceUpdate();
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
        };
        this.emoji_init();
      },
      updated() {
        // this.scrollToBottom()
      },
      directives: {
        focus: {
          update: function (el, {value}) {
            if (value) {
              el.focus()
            }
          }
        }
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
    position: relative;
    padding-left: 28px;
    height: 40px;
    line-height: 40px;
    text-align: left;
  }
  .chat-left ul li:hover {
    background: #f5f5f5;
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
    right: 360px;
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
    /*height:350px;*/
    /*overflow-y:scroll;*/
  }
  .chatbox {
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
    outline: none;
    padding-left: 10px;
    padding-top: 5px;
    box-sizing: border-box;
    font-family: "Microsoft YaHei";
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
    border-top: 1px solid gainsboro;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 20px;
    line-height: 20px;
    /*background: #cacaca;*/
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
    text-align: center;
    height: 80px;
    line-height: 80px;
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
    display: inline-block;
    margin-left: 10px;
    font-size: 18px;
  }
  .pannel_side_list {
    background: #f5f5f5;
  }
  .pannel-side-close {
    /*color: white;*/
    width: 30px;
    height: 30px;
    line-height: 20px;
    position: absolute;
    right: -6px;top: 10px;
    cursor: pointer;
  }
  .pannel-side-close:hover{
    color: red;
  }
  .main_panel_small {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .main_panel_small img {
    width: 30px;
    height: 30px;
  }
  .tool_bar {
    height: 21px;
  }
  .iconfont-emoji {
    font-size: 22px;
    cursor: pointer;
  }
  .emoji-box {
    position: absolute;
    bottom: 150px;
    width: 300px;
    height: 100px;
    overflow-y: scroll;
  }
  .emoji-box ul li {
    width: 26px;
    height: 26px;
    display: inline-block;
    cursor: pointer;
  }
  .emoji-box li img {
    width: 20px;
    height: 20px;
  }
</style>
