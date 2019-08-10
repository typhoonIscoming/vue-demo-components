webpackJsonp([6],{"62KO":function(t,e,n){"use strict";var i=n("JkZY"),o=(i.a,Boolean,String,String,Number,String,String,Boolean,Object,Boolean,{mixins:[i.a],name:"x-dialog",model:{prop:"show",event:"change"},props:{show:{type:Boolean,default:!1},maskTransition:{type:String,default:"vux-mask"},maskZIndex:[String,Number],dialogTransition:{type:String,default:"vux-dialog"},dialogClass:{type:String,default:"weui-dialog"},hideOnBlur:Boolean,dialogStyle:Object,scroll:{type:Boolean,default:!0,validator:function(t){return!0}}},computed:{maskStyle:function(){if(void 0!==this.maskZIndex)return{zIndex:this.maskZIndex}}},mounted:function(){"undefined"!=typeof window&&window.VUX_CONFIG&&"VIEW_BOX"===window.VUX_CONFIG.$layout&&(this.layout="VIEW_BOX")},watch:{show:function(t){this.$emit("update:show",t),this.$emit(t?"on-show":"on-hide"),t?this.addModalClassName():this.removeModalClassName()}},methods:{shouldPreventScroll:function(){var t=/iPad|iPhone|iPod/i.test(window.navigator.userAgent),e=this.$el.querySelector("input")||this.$el.querySelector("textarea");if(t&&e)return!0},hide:function(){this.hideOnBlur&&(this.$emit("update:show",!1),this.$emit("change",!1),this.$emit("on-click-mask"))}},data:function(){return{layout:""}}}),a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-x-dialog",class:{"vux-x-dialog-absolute":"VIEW_BOX"===t.layout}},[n("transition",{attrs:{name:t.maskTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-mask",style:t.maskStyle,on:{click:t.hide}})]),t._v(" "),n("transition",{attrs:{name:t.dialogTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],class:t.dialogClass,style:t.dialogStyle},[t._t("default")],2)])],1)},staticRenderFns:[]};var s=n("VU/8")(o,a,!1,function(t){n("6Erz")},null,null).exports,r=(Boolean,Boolean,String,String,Boolean,String,String,String,String,Number,String,String,String,Boolean,Object,Boolean,String,Boolean,Boolean,{name:"confirm",components:{XDialog:s},props:{value:{type:Boolean,default:!1},showInput:{type:Boolean,default:!1},placeholder:{type:String,default:""},theme:{type:String,default:"ios"},hideOnBlur:{type:Boolean,default:!1},title:String,confirmText:String,cancelText:String,maskTransition:{type:String,default:"vux-fade"},maskZIndex:[Number,String],dialogTransition:{type:String,default:"vux-dialog"},content:String,closeOnConfirm:{type:Boolean,default:!0},inputAttrs:Object,showContent:{type:Boolean,default:!0},confirmType:{type:String,default:"primary"},showCancelButton:{type:Boolean,default:!0},showConfirmButton:{type:Boolean,default:!0}},created:function(){this.showValue=this.show,this.value&&(this.showValue=this.value)},watch:{value:function(t){this.showValue=t},showValue:function(t){var e=this;this.$emit("input",t),t&&(this.showInput&&(this.msg="",setTimeout(function(){e.$refs.input&&e.setInputFocus()},300)),this.$emit("on-show"))}},data:function(){return{msg:"",showValue:!1}},methods:{getInputAttrs:function(){return this.inputAttrs||{type:"text"}},setInputValue:function(t){this.msg=t},setInputFocus:function(t){t&&t.preventDefault(),this.$refs.input.focus()},_onConfirm:function(){this.showValue&&(this.closeOnConfirm&&(this.showValue=!1),this.$emit("on-confirm",this.msg))},_onCancel:function(){this.showValue&&(this.showValue=!1,this.$emit("on-cancel"))}}}),l={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-confirm"},[n("x-dialog",{attrs:{"dialog-class":"android"===t.theme?"weui-dialog weui-skin_android":"weui-dialog","mask-transition":t.maskTransition,"dialog-transition":"android"===t.theme?"vux-fade":t.dialogTransition,"hide-on-blur":t.hideOnBlur,"mask-z-index":t.maskZIndex},on:{"on-hide":function(e){t.$emit("on-hide")}},model:{value:t.showValue,callback:function(e){t.showValue=e},expression:"showValue"}},[t.title?n("div",{staticClass:"weui-dialog__hd",class:{"with-no-content":!t.showContent}},[n("strong",{staticClass:"weui-dialog__title"},[t._v(t._s(t.title))])]):t._e(),t._v(" "),t.showContent?[t.showInput?n("div",{staticClass:"vux-prompt"},["checkbox"===t.getInputAttrs().type?n("input",t._b({directives:[{name:"model",rawName:"v-model",value:t.msg,expression:"msg"}],ref:"input",staticClass:"vux-prompt-msgbox",attrs:{placeholder:t.placeholder,type:"checkbox"},domProps:{checked:Array.isArray(t.msg)?t._i(t.msg,null)>-1:t.msg},on:{touchend:t.setInputFocus,change:function(e){var n=t.msg,i=e.target,o=!!i.checked;if(Array.isArray(n)){var a=t._i(n,null);i.checked?a<0&&(t.msg=n.concat([null])):a>-1&&(t.msg=n.slice(0,a).concat(n.slice(a+1)))}else t.msg=o}}},"input",t.getInputAttrs(),!1)):"radio"===t.getInputAttrs().type?n("input",t._b({directives:[{name:"model",rawName:"v-model",value:t.msg,expression:"msg"}],ref:"input",staticClass:"vux-prompt-msgbox",attrs:{placeholder:t.placeholder,type:"radio"},domProps:{checked:t._q(t.msg,null)},on:{touchend:t.setInputFocus,change:function(e){t.msg=null}}},"input",t.getInputAttrs(),!1)):n("input",t._b({directives:[{name:"model",rawName:"v-model",value:t.msg,expression:"msg"}],ref:"input",staticClass:"vux-prompt-msgbox",attrs:{placeholder:t.placeholder,type:t.getInputAttrs().type},domProps:{value:t.msg},on:{touchend:t.setInputFocus,input:function(e){e.target.composing||(t.msg=e.target.value)}}},"input",t.getInputAttrs(),!1))]):n("div",{staticClass:"weui-dialog__bd"},[t._t("default",[n("div",{domProps:{innerHTML:t._s(t.content)}})])],2)]:t._e(),t._v(" "),n("div",{staticClass:"weui-dialog__ft"},[t.showCancelButton?n("a",{staticClass:"weui-dialog__btn weui-dialog__btn_default",attrs:{href:"javascript:;"},on:{click:t._onCancel}},[t._v(t._s(t.cancelText||"undefined"))]):t._e(),t._v(" "),t.showConfirmButton?n("a",{staticClass:"weui-dialog__btn",class:"weui-dialog__btn_"+t.confirmType,attrs:{href:"javascript:;"},on:{click:t._onConfirm}},[t._v(t._s(t.confirmText||"undefined"))]):t._e()])],2)],1)},staticRenderFns:[]};var u=n("VU/8")(r,l,!1,function(t){n("PgbK")},null,null);e.a=u.exports},"6Erz":function(t,e){},"C86/":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n.d(e,"m",function(){return i});var i={back:"back",bottom:"bottom",top:"top",changeLanguage:"change-language",sendSMS:"send message",show:"show",frame:"frame",title:"title",confirm:"confirm",cancel:"cancel",content:"content",page:"page"}},GIVh:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n.d(e,"m",function(){return i});var i={back:"后退",bottom:"底部",top:"顶部",changeLanguage:"切换语言",sendSMS:"发送信息",show:"显示",frame:"弹框",title:"标题",confirm:"确认",cancel:"取消",content:"内容",page:"页面"}},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("7+uW"),o={name:"App",data:function(){return{trsnsname:"turn-on"}},methods:{clickLink:function(){this.trsnsname="turn-on"}},mounted:function(){var t=this;window.addEventListener("popstate",function(e){t.trsnsname="turn-off"},!1)}},a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"nav-bar"},[n("router-link",{attrs:{to:"/A"},nativeOn:{click:function(e){return t.clickLink(e)}}},[t._v("A")]),t._v(" "),n("router-link",{attrs:{to:"/B"},nativeOn:{click:function(e){return t.clickLink(e)}}},[t._v("B")]),t._v(" "),n("router-link",{attrs:{to:"/C"},nativeOn:{click:function(e){return t.clickLink(e)}}},[t._v("C")]),t._v(" "),n("router-link",{attrs:{to:"/D"},nativeOn:{click:function(e){return t.clickLink(e)}}},[t._v("D")])],1),t._v(" "),n("transition",{attrs:{name:t.trsnsname}},[n("router-view")],1)],1)},staticRenderFns:[]};var s=n("VU/8")(o,a,!1,function(t){n("RZsY")},null,null).exports,r=n("/ocq");i.a.use(r.a);var l=new r.a({mode:"history",base:"/home",linkActiveClass:"is-active",routes:[{path:"/",name:"HelloWorld",redirect:{name:"pageA"}},{path:"/A",name:"pageA",component:function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"2KRR"))}},{path:"/B",name:"pageB",component:function(){return Promise.all([n.e(0),n.e(3)]).then(n.bind(null,"WIcR"))}},{path:"/C",name:"pageC",component:function(){return Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"PbcL"))}},{path:"/D",name:"pageD",component:function(t){return Promise.all([n.e(0),n.e(4)]).then(function(){var e=[n("5+Nr")];t.apply(null,e)}.bind(this)).catch(n.oe)}}]}),u=n("TXmL"),c=n("NXWw");console.log("process.env.NODE_ENV","production"),i.a.use(c.a),i.a.use(u.a);var d=new u.a({locale:"zh-CN",messages:{en:n("C86/"),"zh-CN":n("GIVh")}});i.a.config.productionTip=!1,new i.a({el:"#app",router:l,i18n:d,components:{App:s},template:"<App/>"})},PgbK:function(t,e){},RZsY:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.6cca11a1e1c74bfe2591.js.map