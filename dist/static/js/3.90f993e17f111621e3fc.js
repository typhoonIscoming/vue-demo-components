webpackJsonp([3],{"1y1d":function(t,e){},WIcR:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("CgWt"),c={name:"Selected",data:function(){return{}},methods:{eventA:function(){console.log("defined event a")},eventB:function(){console.log("defined event b")}}},s={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"selected-container"},[n("div",{staticClass:"child-components-a",on:{click:function(e){return e.stopPropagation(),t.eventA(e)}}},[t._v("事件A")]),t._v(" "),n("div",{staticClass:"child-components-b",on:{click:function(e){return e.stopPropagation(),t.eventB(e)}}},[t._v("事件B")])])},staticRenderFns:[]};var i=n("VU/8")(c,s,!1,function(t){n("1y1d")},"data-v-9967bd5c",null).exports,a=(o.a,{data:function(){return{linkPeople:"18502178364"}},components:{common:o.a,"select-item":i},methods:{comEvent:function(){console.log("this fathers components")}},created:function(){console.log("telphone hide","13558513096".replace(/^(\d{3})\d{4}(\d{4})$/,"$1****$2"))}}),l={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"B common"},[n("common",{attrs:{title:"b"}}),t._v(" "),n("div",{staticClass:"content"},[n("a",{attrs:{href:"sms:"+t.linkPeople}},[t._v(t._s(t.$t("m.sendSMS")))]),t._v(" "),n("select-item",{staticClass:"select-item",nativeOn:{click:function(e){return t.comEvent(e)}}})],1),t._v(" "),n("div",{staticClass:"bottom"},[t._v("\n      b"+t._s(t.$t("m.page"))+"\n    ")])],1)},staticRenderFns:[]};var r=n("VU/8")(a,l,!1,function(t){n("X57L")},"data-v-11406780",null);e.default=r.exports},X57L:function(t,e){}});
//# sourceMappingURL=3.90f993e17f111621e3fc.js.map