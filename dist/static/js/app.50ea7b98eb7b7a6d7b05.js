webpackJsonp([1],{C9B2:function(s,t){},LH0Z:function(s,t){},N5EO:function(s,t){},NHnr:function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e("7+uW"),a={render:function(){var s=this.$createElement,t=this._self._c||s;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var n=e("VU/8")({name:"App"},a,!1,function(s){e("d29T")},null,null).exports,c=e("/ocq"),o={name:"Login",data:function(){return{pwd:"",qq:""}},methods:{login:function(){if(!this.qq)return alert("qq号不能为空"),!1;if(!this.pwd)return alert("密码不能为空"),!1;var s={qq:this.qq,pwd:this.pwd,message_type:3};console.log(111),this.$emit("userlogin",s)},register:function(){console.log(1234),this.$emit("register","1234")}}},r={render:function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",[e("div",{staticClass:"login-panel-wraper"},[e("div",{staticClass:"login-panel"},[e("div",{staticClass:"title"},[s._v("web qq")]),s._v(" "),e("div",{staticClass:"input-wraper"},[s._v("\n        账号："),e("input",{directives:[{name:"model",rawName:"v-model",value:s.qq,expression:"qq"}],attrs:{type:"text"},domProps:{value:s.qq},on:{input:function(t){t.target.composing||(s.qq=t.target.value)}}})]),s._v(" "),e("div",{staticClass:"input-wraper"},[s._v("\n        密码："),e("input",{directives:[{name:"model",rawName:"v-model",value:s.pwd,expression:"pwd"}],attrs:{type:"password"},domProps:{value:s.pwd},on:{input:function(t){t.target.composing||(s.pwd=t.target.value)}}})]),s._v(" "),e("button",{staticClass:"login-button",on:{click:s.register}},[s._v("注册")]),s._v(" "),e("button",{staticClass:"login-button",on:{click:s.login}},[s._v("登录")])])])])},staticRenderFns:[]};var l=e("VU/8")(o,r,!1,function(s){e("LH0Z")},"data-v-d9c18c7e",null).exports,d=e("mtWM"),h=e.n(d),u=e("mw3O"),_=e.n(u),g={name:"Register",data:function(){return{nickname:"",pwd:"",face_img:[{src:"1.jpg",flag:1},{src:"2.jpg",flag:2},{src:"3.jpg",flag:3},{src:"4.jpg",flag:4},{src:"5.jpg",flag:5},{src:"6.jpg",flag:6},{src:"7.jpg",flag:7}],face_check:"face_checed",face_url:""}},methods:{comfirm:function(){var s={pwd:this.pwd,nickname:this.nickname,avatar:this.face_url};h.a.post("http://localhost:9501/users/register",_.a.stringify(s)).then(function(s){console.log(s);var t=s.data;alert("账号申请成功："+t.qq)}).catch(function(s){console.log(s)})},checkface:function(s){this.face_url=s},register_close:function(){this.$emit("registerclose","432")}},mounted:function(){}},v={render:function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",[e("div",{staticClass:"login-panel-wraper"},[e("div",{staticClass:"login-panel"},[e("div",{staticClass:"close",on:{click:s.register_close}}),s._v(" "),e("div",{staticClass:"title"},[s._v("注册")]),s._v(" "),e("div",{staticClass:"input-wraper"},[s._v("\n        昵称："),e("input",{directives:[{name:"model",rawName:"v-model",value:s.nickname,expression:"nickname"}],attrs:{type:"text"},domProps:{value:s.nickname},on:{input:function(t){t.target.composing||(s.nickname=t.target.value)}}})]),s._v(" "),e("div",{staticClass:"input-wraper"},[s._v("\n        密码："),e("input",{directives:[{name:"model",rawName:"v-model",value:s.pwd,expression:"pwd"}],attrs:{type:"password"},domProps:{value:s.pwd},on:{input:function(t){t.target.composing||(s.pwd=t.target.value)}}})]),s._v(" "),e("div",{staticClass:"input-wraper"},[s._v("头像：\n        "),e("ul",s._l(s.face_img,function(t,i){return e("li",[e("img",{class:{face_checed:s.face_url===t.flag},attrs:{src:"/static/img/"+t.src,alt:""},on:{click:function(e){s.checkface(t.flag)}}})])}),0)]),s._v(" "),e("div"),s._v(" "),e("div",{staticClass:"input-wraper"},[e("button",{staticClass:"login-button",on:{click:s.comfirm}},[s._v("提交")])])])])])},staticRenderFns:[]};var m=e("VU/8")(g,v,!1,function(s){e("C9B2")},"data-v-5c21d573",null).exports,p=e("mvHQ"),f=e.n(p),q={name:"Index",components:{Login:l,Register:m},data:function(){return{socket:"",friends:[],chatlist:{},chatpanel:[],chatpanelqq:[],message:"",loginshow:!1,registershow:!1,addfriendsshow:!1,logged:!1,islogout:!1,islogin:!1,userqq:"",userpwd:"",friend_qq:"",nickname:"",avatar:"/static/img/qq.jpeg",friendsshow:!0,groupshow:!1,messageshow:!1,header_active:"friends",chat_pannel_show:!1,current_qq:"",unread_num:"",online_unread:"",unread_list:[],chat_unread:[],user:{},groups:[{group_avatar:"",group_name:"webqq在线用户"}]}},methods:{create_socket:function(){var s=this.$cookies.get("session_id");s||(s=""),this.socket=new WebSocket("ws://localhost:9501?session_id="+s),this.socket.onopen=function(s){console.log("websocket is open now")};var t=this;this.socket.onmessage=function(s){var e=JSON.parse(s.data);if(console.log(e),1===e.code)return alert(e.msg),!1;if(1==e.message_type){t.current_qq!=e.to_qq&&(t.chat_unread[e.to_qq]||(t.chat_unread[e.to_qq]=0),t.chat_unread[e.to_qq]++);var i="",a="";2==e.chat_type?("all"!=t.current_qq&&t.online_unread++,i="/static/img/"+e.userinfo.avatar+".jpg",a=e.userinfo.nickname):(i="/static/img/"+t.friends[e.to_qq].avatar+".jpg",a=t.friends[e.to_qq].nickname);var n={img:i,datetime:e.datetime,nickname:a,message:e.msg,class:"",class_face_item_right:"chat-face-item-right",class_chat_list_ul_li_right:"chat-mine"};t.chatlist[e.to_qq]||(t.chatlist[e.to_qq]=[]),t.chatlist[e.to_qq].push(n),t.$forceUpdate(),t.current_qq&&t.scrollToBottom()}3==e.message_type&&(t.$cookies.set("session_id",e.session_id,"0"),t.$cookies.set("user",e.user,"0"),t.nickname=e.user.nickname,t.loginshow=!t.loginshow,t.islogin=!1,t.friends=e.friends,t.avatar="/static/img/"+e.user.avatar+".jpg",t.dealUnread(e.unread),t.check_login(),t.$forceUpdate()),4==e.message_type&&(t.friends=e.friends,t.$forceUpdate()),5==e.message_type&&(0==e.code&&(this.addfriendsshow=!1),t.friends=e.friends,t.$forceUpdate()),e.message_type}},send:function(s,t){console.log(s,t);var e=this.$cookies.get("user");if(e){var i={to_qq:s,user_qq:e?e.qq:"",message_type:1,chat_type:1,msg:this.message};"all"==s&&(i.chat_type=2),this.socket.send(f()(i));var a={img:"/static/img/"+e.avatar+".jpg",datetime:"2019-10",nickname:e?e.nickname:"qq",message:this.message,class:"float-right",class_face_item_right:"",class_chat_list_ul_li_right:""};this.chatlist[s]||(this.chatlist[s]=[]),this.chatlist[s].push(a),this.message="",this.scrollToBottom()}else this.unlogin_send(s)},unlogin_send:function(s){var t={img:"/static/img/qq.jpeg",datetime:"2019-10",nickname:"登录后聊天",message:this.message,class:"float-right",class_face_item_right:"",class_chat_list_ul_li_right:""};this.chatlist[s]||(this.chatlist[s]=[]),this.chatlist[s].push(t),this.message="",this.scrollToBottom()},login:function(){this.loginshow=!this.loginshow,this.registershow=!1,this.current_qq=""},userlogin:function(s){this.socket.send(f()(s))},logout:function(){this.$cookies.remove("session_id"),this.$cookies.remove("user"),this.user="",this.islogout=!1,this.islogin=!0,this.friends=[],this.nickname="",this.current_qq="",this.avatar="/static/img/qq.jpeg"},check_login:function(){if(this.$cookies.get("session_id")){this.islogout=!0;var s=this.$cookies.get("user");this.nickname=s.nickname}else this.islogin=!0},register:function(s){this.loginshow=!1,this.registershow=!0},registerclose:function(){this.registershow=!1},loggedsuccess:function(){this.islogout=!0,this.islogin=!1},addfriends:function(){this.addfriendsshow=!this.addfriendsshow},doaddfriend:function(){var s={user_qq:this.$cookies.get("user").qq,friend_qq:this.friend_qq,message_type:5,session_id:this.$cookies.get("session_id")};this.socket.send(f()(s))},addtopanel:function(s){if(this.current_qq=s.qq,this.chat_unread[s.qq]){var t=this.$cookies.get("user");this.setRead(s.qq,t.qq)}this.chat_unread[s.qq]="",-1===this.chatpanelqq.indexOf(s.qq)&&(this.chatpanel.push(s),this.chatpanelqq.push(s.qq))},chatpanel_close:function(s){this.current_qq=!1},scrollToBottom:function(){this.$nextTick(function(){var s=document.querySelector("#chatmessage");s.scrollTop=s.scrollHeight})},switchpanel:function(s){"group"==s?(this.groupshow=!0,this.friendsshow=!1,this.messageshow=!1,this.header_active=s):"message"==s?(this.groupshow=!1,this.friendsshow=!1,this.messageshow=!0,this.header_active=s):"friends"==s&&(this.groupshow=!1,this.friendsshow=!0,this.messageshow=!1,this.header_active=s)},dealUnread:function(s){for(var t=0;t<s.length;t++)this.addMsg(s[t])},addMsg:function(s){this.chat_unread[s.qq]||(this.chat_unread[s.qq]=0),this.chat_unread[s.qq]++;var t={img:"/static/img/"+this.friends[s.qq].avatar+".jpg",datetime:"2019-01",nickname:this.friends[s.qq].nickname,message:s.message,class:"",class_face_item_right:"chat-face-item-left",class_chat_list_ul_li_right:"chat-list-ul-li-left"};this.$cookies.get("qq");this.chatlist[s.qq]||(this.chatlist[s.qq]=[]),this.chatlist[s.qq].push(t)},setRead:function(s,t){var e={qq:s,to_qq:t,message_type:6};this.socket.send(f()(e))},add_group_panel:function(){if(this.online_unread="",-1===this.chatpanelqq.indexOf("all")){this.chatpanel.push({qq:"all",nickname:"webqq在线用户"}),this.chatpanelqq.push("all")}this.current_qq="all"}},mounted:function(){this.socket||this.create_socket(),this.check_login(),this.$cookies.get("user")&&(this.user=this.$cookies.get("user"),this.avatar="/static/img/"+this.user.avatar+".jpg")},updated:function(){}},w={render:function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",[e("Login",{directives:[{name:"show",rawName:"v-show",value:s.loginshow,expression:"loginshow"}],on:{click:s.login,userlogin:s.userlogin,register:s.register}}),s._v(" "),e("Register",{directives:[{name:"show",rawName:"v-show",value:s.registershow,expression:"registershow"}],on:{registerclose:s.registerclose}}),s._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:s.addfriendsshow,expression:"addfriendsshow"}],staticClass:"addfriends"},[s._v("\n    输入好友qq号：\n    "),e("input",{directives:[{name:"model",rawName:"v-model",value:s.friend_qq,expression:"friend_qq"}],attrs:{type:"text"},domProps:{value:s.friend_qq},on:{input:function(t){t.target.composing||(s.friend_qq=t.target.value)}}}),s._v(" "),e("button",{staticStyle:{cursor:"pointer"},on:{click:s.doaddfriend}},[s._v("提交")])]),s._v(" "),e("div",{staticClass:"contenier"},[e("div",{staticClass:"header"},[s.islogin?e("div",{staticClass:"login-button",on:{click:s.login}},[s._v("登录")]):s._e(),s._v(" "),s.islogout?e("div",{staticClass:"login-button",on:{click:s.logout}},[s._v("退出")]):s._e(),s._v(" "),e("div",{staticClass:"close"}),s._v(" "),e("div",{staticClass:"header-img"},[e("img",{attrs:{src:s.avatar,alt:""}})]),s._v(" "),e("span",[s._v(s._s(s.nickname))]),s._v(" "),e("div",{staticClass:"header-box"},[e("div",{staticClass:"header-item",class:{header_item_active:"friends"==s.header_active},on:{click:function(t){s.switchpanel("friends")}}},[s._v("好友")]),s._v(" "),e("div",{staticClass:"header-item",class:{header_item_active:"group"==s.header_active},on:{click:function(t){s.switchpanel("group")}}},[s._v("群")]),s._v(" "),e("div",{staticClass:"header-item message",class:{header_item_active:"message"==s.header_active},on:{click:function(t){s.switchpanel("message")}}},[s._v("\n          消息\n          "),e("div",{staticClass:"unread"},[s._v(s._s(s.unread_num))])])])]),s._v(" "),e("div",{staticClass:"panel-content"},[e("div",{directives:[{name:"show",rawName:"v-show",value:s.friendsshow,expression:"friendsshow"}],staticClass:"friends"},[e("ul",{staticClass:"conent-list"},s._l(this.friends,function(t){return e("li",{staticClass:"friend",on:{click:function(e){s.addtopanel(t)}}},[e("img",{staticClass:"face",attrs:{src:"/static/img/"+t.avatar+".jpg",alt:""}}),s._v(s._s(t.nickname)+"\n            "),e("div",{staticClass:"friend_unread"},[s._v(s._s(s.chat_unread[t.qq]))])])}),0)]),s._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:s.groupshow,expression:"groupshow"}]},[e("ul",{staticClass:"conent-list"},s._l(s.groups,function(t){return e("li",{staticClass:"friend qqgroup",on:{click:s.add_group_panel}},[s._v("\n            "+s._s(t.group_name)+"\n            "),e("div",{staticClass:"friend_unread"},[s._v(s._s(s.online_unread))])])}),0)]),s._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:s.messageshow,expression:"messageshow"}]},[e("ul",s._l(s.unread_list,function(s){return e("li")}),0)])]),s._v(" "),e("div",{staticClass:"footer"},[e("span",{staticClass:"addfriends-button",on:{click:s.addfriends}},[s._v("添加好友")])])]),s._v(" "),s._l(s.chatpanel,function(t){return e("div",{directives:[{name:"show",rawName:"v-show",value:t.qq===s.current_qq,expression:"user.qq === current_qq"}],staticClass:"chat-panel",attrs:{id:"1"}},[e("div",{staticClass:"close",on:{click:function(e){s.chatpanel_close(t.qq)}}}),s._v(" "),e("div",{staticClass:"chat-title",attrs:{id:"5"}},[s._v(s._s(t.nickname))]),s._v(" "),e("div",{staticStyle:{display:"flex"}},[s._m(0,!0),s._v(" "),e("div",{staticClass:"chat-right"},[e("div",{staticClass:"chat-list",attrs:{id:"chatmessage"}},[e("ul",s._l(s.chatlist[t.qq],function(t){return e("li",{class:t.class_chat_list_ul_li_right},[e("div",{staticClass:"chat-face-item",class:t.class_face_item_right},[e("img",{staticClass:"chat-face",attrs:{src:t.img,alt:""}}),s._v(" "),e("cite",[s._v("\n                  "+s._s(t.datetime)+"\n                  "),e("i",[s._v(s._s(t.nickname))])])]),s._v(" "),e("div",{staticClass:"chat-list-text"},[s._v("\n                "+s._s(t.message)+"\n              ")])])}),0)]),s._v(" "),e("div",{staticClass:"chat-input"},[e("textarea",{directives:[{name:"model",rawName:"v-model",value:s.message,expression:"message"}],attrs:{name:"",id:"",cols:"50",rows:"5"},domProps:{value:s.message},on:{input:function(t){t.target.composing||(s.message=t.target.value)}}}),s._v(" "),e("div",{staticClass:"to-message",on:{click:function(e){s.send(t.qq,t.nickname)}}},[s._v("发送")])])])])])})],2)},staticRenderFns:[function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"chat-left"},[t("ul",[t("li",[t("img",{staticClass:"face",attrs:{src:"/static/img/1.jpg",alt:""}}),this._v(" 大花猫\n          ")])])])}]};var k=e("VU/8")(q,w,!1,function(s){e("N5EO")},"data-v-78e38619",null).exports;i.a.use(c.a);var C=new c.a({routes:[{path:"/register",name:"Register",component:m},{path:"/",name:"Index",component:k,children:[{path:"login",component:l}]}]}),x=e("ppUw"),$=e.n(x),y=(e("m0iu"),e("qJdI")),j=e.n(y);i.a.config.productionTip=!1,i.a.use($.a),i.a.use(j.a),new i.a({el:"#app",router:C,components:{App:n},template:"<App/>"})},d29T:function(s,t){},m0iu:function(s,t){}},["NHnr"]);
//# sourceMappingURL=app.50ea7b98eb7b7a6d7b05.js.map