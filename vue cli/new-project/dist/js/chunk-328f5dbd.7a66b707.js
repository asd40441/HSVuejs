(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-328f5dbd"],{"1dde":function(t,r,n){var o=n("d039"),e=n("b622"),c=n("2d00"),u=e("species");t.exports=function(t){return c>=51||!o((function(){var r=[],n=r.constructor={};return n[u]=function(){return{foo:1}},1!==r[t](Boolean).foo}))}},"65f0":function(t,r,n){var o=n("861d"),e=n("e8b5"),c=n("b622"),u=c("species");t.exports=function(t,r){var n;return e(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!e(n.prototype)?o(n)&&(n=n[u],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===r?0:r)}},8418:function(t,r,n){"use strict";var o=n("c04e"),e=n("9bf2"),c=n("5c6c");t.exports=function(t,r,n){var u=o(r);u in t?e.f(t,u,c(0,n)):t[u]=n}},"99af":function(t,r,n){"use strict";var o=n("23e7"),e=n("d039"),c=n("e8b5"),u=n("861d"),a=n("7b0b"),i=n("50c4"),f=n("8418"),d=n("65f0"),s=n("1dde"),p=n("b622"),b=n("2d00"),v=p("isConcatSpreadable"),l=9007199254740991,h="Maximum allowed index exceeded",w=b>=51||!e((function(){var t=[];return t[v]=!1,t.concat()[0]!==t})),y=s("concat"),x=function(t){if(!u(t))return!1;var r=t[v];return void 0!==r?!!r:c(t)},g=!w||!y;o({target:"Array",proto:!0,forced:g},{concat:function(t){var r,n,o,e,c,u=a(this),s=d(u,0),p=0;for(r=-1,o=arguments.length;r<o;r++)if(c=-1===r?u:arguments[r],x(c)){if(e=i(c.length),p+e>l)throw TypeError(h);for(n=0;n<e;n++,p++)n in c&&f(s,p,c[n])}else{if(p>=l)throw TypeError(h);f(s,p++,c)}return s.length=p,s}})},d2f1:function(t,r,n){"use strict";n.r(r);var o=n("7a23"),e=Object(o["g"])("h1",null,"單一產品頁面",-1);function c(t,r,n,c,u,a){return Object(o["p"])(),Object(o["d"])(o["a"],null,[e,Object(o["f"])(" "+Object(o["w"])(u.product),1)],64)}n("99af");var u={data:function(){return{product:[]}},mounted:function(){var t=this,r=this.$route.params.id,n="".concat("https://vue3-course-api.hexschool.io","/api/").concat("asd40441","/product/").concat(r);this.$http.get(n).then((function(r){console.log("單一產品",r),t.product=r.data.product}))}};u.render=c;r["default"]=u},e8b5:function(t,r,n){var o=n("c6b6");t.exports=Array.isArray||function(t){return"Array"==o(t)}}}]);
//# sourceMappingURL=chunk-328f5dbd.7a66b707.js.map