webpackJsonp([1],{"4GND":function(s,e){},LH0Z:function(s,e){},NHnr:function(s,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=t("7+uW"),a={render:function(){var s=this.$createElement,e=this._self._c||s;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var n=t("VU/8")({name:"App"},a,!1,function(s){t("d29T")},null,null).exports,c=t("/ocq"),o={name:"Login",data:function(){return{pwd:"",qq:""}},methods:{login:function(){if(!this.qq)return alert("qq号不能为空"),!1;if(!this.pwd)return alert("密码不能为空"),!1;var s={qq:this.qq,pwd:this.pwd,message_type:3};console.log(111),this.$emit("userlogin",s)},register:function(){console.log(1234),this.$emit("register","1234")}}},r={render:function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",[t("div",{staticClass:"login-panel-wraper"},[t("div",{staticClass:"login-panel"},[t("div",{staticClass:"title"},[s._v("web qq")]),s._v(" "),t("div",{staticClass:"input-wraper"},[s._v("\n        账号："),t("input",{directives:[{name:"model",rawName:"v-model",value:s.qq,expression:"qq"}],attrs:{type:"text"},domProps:{value:s.qq},on:{input:function(e){e.target.composing||(s.qq=e.target.value)}}})]),s._v(" "),t("div",{staticClass:"input-wraper"},[s._v("\n        密码："),t("input",{directives:[{name:"model",rawName:"v-model",value:s.pwd,expression:"pwd"}],attrs:{type:"password"},domProps:{value:s.pwd},on:{input:function(e){e.target.composing||(s.pwd=e.target.value)}}})]),s._v(" "),t("button",{staticClass:"login-button",on:{click:s.register}},[s._v("注册")]),s._v(" "),t("button",{staticClass:"login-button",on:{click:s.login}},[s._v("登录")])])])])},staticRenderFns:[]};var l=t("VU/8")(o,r,!1,function(s){t("LH0Z")},"data-v-d9c18c7e",null).exports,d=t("mtWM"),h=t.n(d),u=t("mw3O"),_=t.n(u),g={name:"Register",data:function(){return{nickname:"",pwd:"",face_img:[{src:"1.jpg",flag:1},{src:"2.jpg",flag:2},{src:"3.jpg",flag:3},{src:"4.jpg",flag:4},{src:"5.jpg",flag:5},{src:"6.jpg",flag:6},{src:"7.jpg",flag:7}],face_check:"face_checed",face_url:""}},methods:{comfirm:function(){var s={pwd:this.pwd,nickname:this.nickname,avatar:this.face_url};h.a.post("http://catteacher.cn:9501/users/register",_.a.stringify(s)).then(function(s){console.log(s);var e=s.data;alert("账号申请成功："+e.qq)}).catch(function(s){console.log(s)})},checkface:function(s){this.face_url=s},register_close:function(){this.$emit("registerclose","432")}},mounted:function(){}},v={render:function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",[t("div",{staticClass:"login-panel-wraper"},[t("div",{staticClass:"login-panel"},[t("div",{staticClass:"close",on:{click:s.register_close}}),s._v(" "),t("div",{staticClass:"title"},[s._v("注册")]),s._v(" "),t("div",{staticClass:"input-wraper"},[s._v("\n        昵称："),t("input",{directives:[{name:"model",rawName:"v-model",value:s.nickname,expression:"nickname"}],attrs:{type:"text"},domProps:{value:s.nickname},on:{input:function(e){e.target.composing||(s.nickname=e.target.value)}}})]),s._v(" "),t("div",{staticClass:"input-wraper"},[s._v("\n        密码："),t("input",{directives:[{name:"model",rawName:"v-model",value:s.pwd,expression:"pwd"}],attrs:{type:"password"},domProps:{value:s.pwd},on:{input:function(e){e.target.composing||(s.pwd=e.target.value)}}})]),s._v(" "),t("div",{staticClass:"input-wraper"},[s._v("头像：\n        "),t("ul",s._l(s.face_img,function(e,i){return t("li",[t("img",{class:{face_checed:s.face_url===e.flag},attrs:{src:"/static/img/"+e.src,alt:""},on:{click:function(t){s.checkface(e.flag)}}})])}),0)]),s._v(" "),t("div"),s._v(" "),t("div",{staticClass:"input-wraper"},[t("button",{staticClass:"login-button",on:{click:s.comfirm}},[s._v("提交")])])])])])},staticRenderFns:[]};var m=t("VU/8")(g,v,!1,function(s){t("xtWz")},"data-v-5015e72d",null).exports,p=t("mvHQ"),f=t.n(p),q={name:"Index",components:{Login:l,Register:m},data:function(){return{socket:"",friends:[],chatlist:{},chatpanel:[],chatpanelqq:[],message:"",loginshow:!1,registershow:!1,addfriendsshow:!1,logged:!1,islogout:!1,islogin:!1,userqq:"",userpwd:"",friend_qq:"",nickname:"",avatar:"/static/img/qq.jpeg",friendsshow:!0,groupshow:!1,messageshow:!1,header_active:"friends",chat_pannel_show:!1,current_qq:"",unread_num:"",online_unread:"",unread_list:[],chat_unread:[],user:{},groups:[],online_user_num:""}},methods:{create_socket:function(){var s=this.$cookies.get("session_id");s||(s=""),this.socket=new WebSocket("ws://catteacher.cn:9501?session_id="+s),this.socket.onopen=function(s){console.log("websocket is open now")};var e=this;this.socket.onmessage=function(s){var t=JSON.parse(s.data);if(console.log(t),1===t.code)return alert(t.msg),!1;if(1==t.message_type){e.current_qq!=t.to_qq&&(e.chat_unread[t.to_qq]||(e.chat_unread[t.to_qq]=0),e.chat_unread[t.to_qq]++);var i="",a="";2==t.chat_type?("all"!=e.current_qq&&e.online_unread++,i="/static/img/"+t.userinfo.avatar+".jpg",a=t.userinfo.nickname):(i="/static/img/"+e.friends[t.to_qq].avatar+".jpg",a=e.friends[t.to_qq].nickname);var n={img:i,datetime:t.datetime,nickname:a,message:t.msg,class:"",class_face_item_right:"chat-face-item-right",class_chat_list_ul_li_right:"chat-mine"};e.chatlist[t.to_qq]||(e.chatlist[t.to_qq]=[]),e.chatlist[t.to_qq].push(n),e.$forceUpdate(),e.current_qq&&e.scrollToBottom()}3==t.message_type&&(e.$cookies.set("session_id",t.session_id,"0"),e.$cookies.set("user",t.user,"0"),e.nickname=t.user.nickname,e.loginshow=!e.loginshow,e.islogin=!1,e.friends=t.friends,e.avatar="/static/img/"+t.user.avatar+".jpg",e.dealUnread(t.unread),e.check_login(),e.$forceUpdate()),4==t.message_type&&(e.friends=t.friends,e.online_user_num=t.unline_user_num,e.$forceUpdate()),5==t.message_type&&(0==t.code&&(this.addfriendsshow=!1),e.friends=t.friends,e.$forceUpdate()),t.message_type,7===t.message_type&&(e.online_user_num=t.unline_user_num)}},send:function(s,e){console.log(s,e);var t=this.$cookies.get("user");if(t){var i={to_qq:s,user_qq:t?t.qq:"",message_type:1,chat_type:1,msg:this.message};"all"==s&&(i.chat_type=2),this.socket.send(f()(i));var a={img:"/static/img/"+t.avatar+".jpg",datetime:"2019-10",nickname:t?t.nickname:"qq",message:this.message,class:"float-right",class_face_item_right:"",class_chat_list_ul_li_right:""};this.chatlist[s]||(this.chatlist[s]=[]),this.chatlist[s].push(a),this.message="",this.scrollToBottom()}else this.unlogin_send(s)},unlogin_send:function(s){var e={img:"/static/img/qq.jpeg",datetime:"2019-10",nickname:"登录后聊天",message:this.message,class:"float-right",class_face_item_right:"",class_chat_list_ul_li_right:""};this.chatlist[s]||(this.chatlist[s]=[]),this.chatlist[s].push(e),this.message="",this.scrollToBottom()},login:function(){this.loginshow=!this.loginshow,this.registershow=!1,this.current_qq=""},userlogin:function(s){this.socket.send(f()(s))},logout:function(){this.$cookies.remove("session_id"),this.$cookies.remove("user"),this.user="",this.islogout=!1,this.islogin=!0,this.friends=[],this.nickname="",this.current_qq="",this.avatar="/static/img/qq.jpeg"},check_login:function(){if(this.$cookies.get("session_id")){this.islogout=!0;var s=this.$cookies.get("user");this.nickname=s.nickname}else this.islogin=!0},register:function(s){this.loginshow=!1,this.registershow=!0},registerclose:function(){this.registershow=!1},loggedsuccess:function(){this.islogout=!0,this.islogin=!1},addfriends:function(){this.addfriendsshow=!this.addfriendsshow},doaddfriend:function(){var s={user_qq:this.$cookies.get("user").qq,friend_qq:this.friend_qq,message_type:5,session_id:this.$cookies.get("session_id")};this.socket.send(f()(s))},addtopanel:function(s){if(this.current_qq=s.qq,this.chat_unread[s.qq]){var e=this.$cookies.get("user");this.setRead(s.qq,e.qq)}this.chat_unread[s.qq]="",-1===this.chatpanelqq.indexOf(s.qq)&&(this.chatpanel.push(s),this.chatpanelqq.push(s.qq))},chatpanel_close:function(s){this.current_qq=!1},scrollToBottom:function(){this.$nextTick(function(){var s=document.querySelector("#chatmessage");s.scrollTop=s.scrollHeight})},switchpanel:function(s){"group"==s?(this.groupshow=!0,this.friendsshow=!1,this.messageshow=!1,this.header_active=s):"message"==s?(this.groupshow=!1,this.friendsshow=!1,this.messageshow=!0,this.header_active=s):"friends"==s&&(this.groupshow=!1,this.friendsshow=!0,this.messageshow=!1,this.header_active=s)},dealUnread:function(s){for(var e=0;e<s.length;e++)this.addMsg(s[e])},addMsg:function(s){this.chat_unread[s.qq]||(this.chat_unread[s.qq]=0),this.chat_unread[s.qq]++;var e={img:"/static/img/"+this.friends[s.qq].avatar+".jpg",datetime:"2019-01",nickname:this.friends[s.qq].nickname,message:s.message,class:"",class_face_item_right:"chat-face-item-left",class_chat_list_ul_li_right:"chat-list-ul-li-left"};this.$cookies.get("qq");this.chatlist[s.qq]||(this.chatlist[s.qq]=[]),this.chatlist[s.qq].push(e)},setRead:function(s,e){var t={qq:s,to_qq:e,message_type:6};this.socket.send(f()(t))},add_group_panel:function(){if(this.online_unread="",-1===this.chatpanelqq.indexOf("all")){this.chatpanel.push({qq:"all",nickname:"webqq在线用户"}),this.chatpanelqq.push("all")}this.current_qq="all"}},mounted:function(){this.socket||this.create_socket(),this.check_login(),this.$cookies.get("user")&&(this.user=this.$cookies.get("user"),this.avatar="/static/img/"+this.user.avatar+".jpg")},updated:function(){}},w={render:function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",[t("Login",{directives:[{name:"show",rawName:"v-show",value:s.loginshow,expression:"loginshow"}],on:{click:s.login,userlogin:s.userlogin,register:s.register}}),s._v(" "),t("Register",{directives:[{name:"show",rawName:"v-show",value:s.registershow,expression:"registershow"}],on:{registerclose:s.registerclose}}),s._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:s.addfriendsshow,expression:"addfriendsshow"}],staticClass:"addfriends"},[s._v("\n    输入好友qq号：\n    "),t("input",{directives:[{name:"model",rawName:"v-model",value:s.friend_qq,expression:"friend_qq"}],attrs:{type:"text"},domProps:{value:s.friend_qq},on:{input:function(e){e.target.composing||(s.friend_qq=e.target.value)}}}),s._v(" "),t("button",{staticStyle:{cursor:"pointer"},on:{click:s.doaddfriend}},[s._v("提交")])]),s._v(" "),t("div",{staticClass:"contenier"},[t("div",{staticClass:"header"},[s.islogin?t("div",{staticClass:"login-button",on:{click:s.login}},[s._v("登录")]):s._e(),s._v(" "),s.islogout?t("div",{staticClass:"login-button",on:{click:s.logout}},[s._v("退出")]):s._e(),s._v(" "),t("div",{staticClass:"close"}),s._v(" "),t("div",{staticClass:"header-img"},[t("img",{attrs:{src:s.avatar,alt:""}})]),s._v(" "),t("span",[s._v(s._s(s.nickname))]),s._v(" "),t("div",{staticClass:"header-box"},[t("div",{staticClass:"header-item",class:{header_item_active:"friends"==s.header_active},on:{click:function(e){s.switchpanel("friends")}}},[s._v("好友")]),s._v(" "),t("div",{staticClass:"header-item",class:{header_item_active:"group"==s.header_active},on:{click:function(e){s.switchpanel("group")}}},[s._v("群")]),s._v(" "),t("div",{staticClass:"header-item message",class:{header_item_active:"message"==s.header_active},on:{click:function(e){s.switchpanel("message")}}},[s._v("\n          消息\n          "),t("div",{staticClass:"unread"},[s._v(s._s(s.unread_num))])])])]),s._v(" "),t("div",{staticClass:"panel-content"},[t("div",{directives:[{name:"show",rawName:"v-show",value:s.friendsshow,expression:"friendsshow"}],staticClass:"friends"},[t("ul",{staticClass:"conent-list"},s._l(this.friends,function(e){return t("li",{staticClass:"friend",on:{click:function(t){s.addtopanel(e)}}},[t("img",{staticClass:"face",attrs:{src:"/static/img/"+e.avatar+".jpg",alt:""}}),s._v(s._s(e.nickname)+"\n            "),t("div",{staticClass:"friend_unread"},[s._v(s._s(s.chat_unread[e.qq]))])])}),0)]),s._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:s.groupshow,expression:"groupshow"}]},[t("ul",{staticClass:"conent-list"},[t("li",{staticClass:"friend qqgroup",on:{click:s.add_group_panel}},[s._v("\n            webqq在线用户\n            "),t("span",{staticStyle:{color:"#5fb878"}},[s._v("("+s._s(s.online_user_num)+")")]),s._v(" "),t("div",{staticClass:"friend_unread"},[s._v(s._s(s.online_unread))])]),s._v(" "),s._l(s.groups,function(e){return t("li",{staticClass:"friend qqgroup"},[s._v("\n            "+s._s(e.group_name)+"\n\n          ")])})],2)]),s._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:s.messageshow,expression:"messageshow"}]},[t("ul",s._l(s.unread_list,function(s){return t("li")}),0)])]),s._v(" "),t("div",{staticClass:"footer"},[t("span",{staticClass:"addfriends-button",on:{click:s.addfriends}},[s._v("添加好友")])])]),s._v(" "),s._l(s.chatpanel,function(e){return t("div",{directives:[{name:"show",rawName:"v-show",value:e.qq===s.current_qq,expression:"user.qq === current_qq"}],staticClass:"chat-panel",attrs:{id:"1"}},[t("div",{staticClass:"close",on:{click:function(t){s.chatpanel_close(e.qq)}}}),s._v(" "),t("div",{staticClass:"chat-title",attrs:{id:"5"}},[s._v(s._s(e.nickname))]),s._v(" "),t("div",{staticStyle:{display:"flex"}},[s._m(0,!0),s._v(" "),t("div",{staticClass:"chat-right"},[t("div",{staticClass:"chat-list",attrs:{id:"chatmessage"}},[t("ul",s._l(s.chatlist[e.qq],function(e){return t("li",{class:e.class_chat_list_ul_li_right},[t("div",{staticClass:"chat-face-item",class:e.class_face_item_right},[t("img",{staticClass:"chat-face",attrs:{src:e.img,alt:""}}),s._v(" "),t("cite",[s._v("\n                  "+s._s(e.datetime)+"\n                  "),t("i",[s._v(s._s(e.nickname))])])]),s._v(" "),t("div",{staticClass:"chat-list-text"},[s._v("\n                "+s._s(e.message)+"\n              ")])])}),0)]),s._v(" "),t("div",{staticClass:"chat-input"},[t("textarea",{directives:[{name:"model",rawName:"v-model",value:s.message,expression:"message"}],attrs:{name:"",id:"",cols:"50",rows:"5"},domProps:{value:s.message},on:{input:function(e){e.target.composing||(s.message=e.target.value)}}}),s._v(" "),t("div",{staticClass:"to-message",on:{click:function(t){s.send(e.qq,e.nickname)}}},[s._v("发送")])])])])])})],2)},staticRenderFns:[function(){var s=this.$createElement,e=this._self._c||s;return e("div",{staticClass:"chat-left"},[e("ul",[e("li",[e("img",{staticClass:"face",attrs:{src:"/static/img/1.jpg",alt:""}}),this._v(" 大花猫\n          ")])])])}]};var k=t("VU/8")(q,w,!1,function(s){t("4GND")},"data-v-c86ed070",null).exports;i.a.use(c.a);var C=new c.a({routes:[{path:"/register",name:"Register",component:m},{path:"/",name:"Index",component:k,children:[{path:"login",component:l}]}]}),x=t("ppUw"),$=t.n(x),y=(t("m0iu"),t("qJdI")),b=t.n(y);i.a.config.productionTip=!1,i.a.use($.a),i.a.use(b.a),new i.a({el:"#app",router:C,components:{App:n},template:"<App/>"})},d29T:function(s,e){},m0iu:function(s,e){},xtWz:function(s,e){}},["NHnr"]);
//# sourceMappingURL=app.ee31755de60a4a264ea7.js.map