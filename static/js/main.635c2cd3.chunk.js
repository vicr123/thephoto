(this["webpackJsonpthephoto-react"]=this["webpackJsonpthephoto-react"]||[]).push([[0],{18:function(e,t,n){},19:function(e,t,n){},21:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n(2),i=n.n(r),s=n(10),o=n.n(s),c=(n(18),n(3)),l=n(4),u=n(6),h=n(5),d=(n(19),n(9)),b=n.n(d),j=n(11),m=n(1),f=n(7),O=Object(f.a)("progress"),p=Object(f.a)("total"),v=Object(f.a)("imageData"),g=function(){function e(){Object(c.a)(this,e),Object.defineProperty(this,O,{writable:!0,value:void 0}),Object.defineProperty(this,p,{writable:!0,value:void 0}),Object.defineProperty(this,v,{writable:!0,value:void 0}),Object(m.a)(this,O)[O]=0,Object(m.a)(this,p)[p]=0}return Object(l.a)(e,[{key:"setProgress",value:function(e){Object(m.a)(this,O)[O]=e}},{key:"addProgress",value:function(e){Object(m.a)(this,O)[O]+=e}},{key:"setTotal",value:function(e){Object(m.a)(this,p)[p]=e}},{key:"setImageData",value:function(e){Object(m.a)(this,v)[v]=e}},{key:"progress",value:function(){return Object(m.a)(this,O)[O]}},{key:"total",value:function(){return Object(m.a)(this,p)[p]}}]),e}(),x=new(function(){function e(){Object(c.a)(this,e)}return Object(l.a)(e,[{key:"makeTransferJob",value:function(){return new g}}]),e}()),y=Object(f.a)("ws"),k=Object(f.a)("username"),w=Object(f.a)("wsStateChangeHandler"),C=Object(f.a)("connected"),S=Object(f.a)("userId"),P=Object(f.a)("seq"),E=Object(f.a)("replies"),N=new(function(){function e(){Object(c.a)(this,e),Object.defineProperty(this,y,{writable:!0,value:void 0}),Object.defineProperty(this,k,{writable:!0,value:void 0}),Object.defineProperty(this,w,{writable:!0,value:void 0}),Object.defineProperty(this,C,{writable:!0,value:void 0}),Object.defineProperty(this,S,{writable:!0,value:void 0}),Object.defineProperty(this,P,{writable:!0,value:void 0}),Object.defineProperty(this,E,{writable:!0,value:void 0}),Object(m.a)(this,y)[y]=null,Object(m.a)(this,P)[P]=0,Object(m.a)(this,E)[E]={}}return Object(l.a)(e,[{key:"setWsStateChangeHandler",value:function(e){Object(m.a)(this,w)[w]=e}},{key:"connect",value:function(e,t){var n=this;return new Promise((function(a,r){var i="ws://"+e+":26158/";Object(m.a)(n,y)[y]=new WebSocket(i),Object(m.a)(n,y)[y].onopen=function(e){n.sendMessage({type:"connect",username:t},(function(e){Object(m.a)(n,C)[C]=!0,Object(m.a)(n,S)[S]=e.user,Object(m.a)(n,w)[w](),a()}))},Object(m.a)(n,y)[y].onerror=function(e){Object(m.a)(n,y)[y]=null,Object(m.a)(n,C)[C]=!1,Object(m.a)(n,w)[w](),r()},Object(m.a)(n,y)[y].onclose=function(e){Object(m.a)(n,y)[y]=null,Object(m.a)(n,C)[C]=!1,Object(m.a)(n,S)[S]=null,Object(m.a)(n,w)[w]()},Object(m.a)(n,y)[y].onmessage=n.wsMessage.bind(n)}))}},{key:"wsMessage",value:function(){var e=Object(j.a)(b.a.mark((function e(t){var n,a,r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.data.arrayBuffer){e.next=6;break}return e.next=3,t.data.arrayBuffer();case 3:n=e.sent,e.next=9;break;case 6:return e.next=8,new Response(t.data).arrayBuffer();case 8:n=e.sent;case 9:a=new TextDecoder("utf-8"),null!==(r=JSON.parse(a.decode(n))).replyTo&&Object(m.a)(this,E)[E][r.replyTo](r);case 12:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"isConnected",value:function(){return Object(m.a)(this,C)[C]}},{key:"sendMessage",value:function(e,t){e.seq=Object(m.a)(this,P)[P]++,null!==Object(m.a)(this,S)[S]&&(e.userId=Object(m.a)(this,S)[S]);var n=(new TextEncoder).encode(JSON.stringify(e));return Object(m.a)(this,y)[y].send(n),null!==t&&(Object(m.a)(this,E)[E][e.seq]=t),e.seq}},{key:"disconnect",value:function(){var e=this;this.isConnected()&&this.sendMessage({type:"disconnect",userId:Object(m.a)(this,S)[S]},(function(){return Object(m.a)(e,y)[y].close.bind(e)})),Object(m.a)(this,y)[y].close()}},{key:"sendBase64Picture",value:function(e){var t=this,n=x.makeTransferJob();n.setImageData(e);var a=e.substring(5,e.indexOf(";"));e=e.substr(e.indexOf("base64,")+7),n.setTotal(e.length);!function r(i){var s=e.substr(n.progress(),4096),o={type:"picture",length:e.length,mimeType:a,data:s};null!==i&&(o.replyTo=i),t.sendMessage(o,(function(e){n.progress()>=n.total()||e.continue&&r(e.replyTo)})),n.addProgress(s.length)}()}}]),e}()),B=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).state={room:"",username:"",error:""},a}return Object(l.a)(n,[{key:"connect",value:function(){var e=this;""!==this.state.username?N.connect(this.state.room,this.state.username).catch((function(t){e.setState({error:"Check the room code and try again"})})):this.setState({error:"Enter a username"})}},{key:"renderError",value:function(){return""===this.state.error?null:Object(a.jsx)("span",{className:"error",children:this.state.error})}},{key:"render",value:function(){var e=this;return Object(a.jsx)("div",{className:"welcomeWrapper",children:Object(a.jsxs)("div",{className:"welcomeContainer",children:[Object(a.jsx)("h1",{children:"Welcome to thePhoto"}),Object(a.jsx)("p",{children:"For the best experience, grab the app:"}),Object(a.jsx)("hr",{}),Object(a.jsx)("h2",{children:"Connect"}),Object(a.jsx)("p",{children:"You can also connect using your web browser."}),Object(a.jsxs)("div",{class:"welcomeForm",children:[Object(a.jsx)("span",{children:"Room"}),Object(a.jsx)("input",{type:"text",value:this.state.room,onChange:function(t){return e.setState({room:t.target.value})}}),Object(a.jsx)("span",{children:"Username"}),Object(a.jsx)("input",{type:"text",value:this.state.username,onChange:function(t){return e.setState({username:t.target.value})}}),this.renderError(),Object(a.jsx)("button",{onClick:this.connect.bind(this),children:"Connect"})]})]})})}}]),n}(i.a.Component),M=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var e=this;return Object(a.jsxs)("div",{className:"header",children:[Object(a.jsx)("div",{className:"systemButton menu"}),Object(a.jsx)("div",{className:this.className("camera"),onClick:function(){return e.changePage("camera")},children:"Camera"}),Object(a.jsx)("div",{className:this.className("transfers"),onClick:function(){return e.changePage("transfers")},children:"Transfers"}),Object(a.jsx)("div",{className:this.className("upload"),onClick:function(){return e.changePage("upload")},children:"Upload"}),Object(a.jsx)("div",{className:"spacer"}),Object(a.jsx)("div",{className:"systemButton close",onClick:this.props.onExit})]})}},{key:"changePage",value:function(e){this.props.onChangePage(e)}},{key:"className",value:function(e){var t=["headerButton",e];return this.props.page===e&&t.push("selected"),t.join(" ")}}]),n}(i.a.Component),R=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(a.jsx)("div",{className:"cameraHud",children:Object(a.jsx)("div",{className:"captureButton",onClick:this.props.onCapture})})}}]),n}(i.a.Component),T=n(12),D=n.n(T);function I(){return(I=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function F(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var V=r.createElement("defs",{id:"defs2"});function W(e,t){var n=e.title,a=e.titleId,i=F(e,["title","titleId"]);return r.createElement("svg",I({width:128,height:128,viewBox:"0 0 33.866666 33.866668",id:"svg8",ref:t,"aria-labelledby":a},i),n?r.createElement("title",{id:a},n):null,V,r.createElement("g",{id:"layer1"},r.createElement("g",{id:"g855",transform:"matrix(6.8558595,0,0,6.8547919,-93.717829,-100.95504)",style:{strokeWidth:.145872,fill:"#000000",fillOpacity:.5}},r.createElement("path",{id:"rect841-6",style:{color:"#000000",fontStyle:"normal",fontVariant:"normal",fontWeight:"normal",fontStretch:"normal",fontSize:"medium",lineHeight:"normal",fontFamily:"sans-serif",fontVariantLigatures:"normal",fontVariantPosition:"normal",fontVariantCaps:"normal",fontVariantNumeric:"normal",fontVariantAlternates:"normal",fontFeatureSettings:"normal",textIndent:0,textAlign:"start",textDecoration:"none",textDecorationLine:"none",textDecorationStyle:"solid",textDecorationColor:"#000000",letterSpacing:"normal",wordSpacing:"normal",textTransform:"none",writingMode:"lr-tb",direction:"ltr",textOrientation:"mixed",dominantBaseline:"auto",baselineShift:"baseline",textAnchor:"start",whiteSpace:"normal",shapePadding:0,clipRule:"nonzero",display:"inline",overflow:"visible",visibility:"visible",opacity:1,isolation:"auto",mixBlendMode:"normal",colorInterpolation:"sRGB",colorInterpolationFilters:"linearRGB",solidColor:"#000000",solidOpacity:1,vectorEffect:"none",fill:"#000000",fillOpacity:.5,fillRule:"nonzero",stroke:"none",strokeWidth:.0385953,strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:4,strokeDasharray:"none",strokeDashoffset:0,strokeOpacity:1,colorRendering:"auto",imageRendering:"auto",shapeRendering:"auto",textRendering:"auto",enableBackground:"accumulate"},d:"m 15.610417,16.139584 c -0.265508,0 -0.505815,0.102097 -0.691948,0.264583 H 14.419792 A 0.1323049,0.1323049 0 0 0 14.2875,16.536459 v 1.322916 a 0.1323049,0.1323049 0 0 0 0.132292,0.132292 h 0.364835 l 0.249597,-0.249597 c -0.134065,-0.141993 -0.217557,-0.332417 -0.217557,-0.544153 0,-0.439943 0.353807,-0.79375 0.79375,-0.79375 0.211735,0 0.40216,0.08349 0.544152,0.217558 l 0.217558,-0.217558 h -0.06976 c -0.186133,-0.162486 -0.42644,-0.264583 -0.691947,-0.264583 z m 2.092378,0.05633 -0.472839,0.472839 h 0.364836 a 0.1323049,0.1323049 0 0 1 0.132291,0.132292 v 0.264583 a 0.1323049,0.1323049 0 0 1 -0.132291,0.132292 h -0.529167 a 0.1323049,0.1323049 0 0 1 -0.132292,-0.132292 v -0.100252 l -0.649572,0.649573 c -0.06458,0.104391 -0.151924,0.191739 -0.256316,0.256315 l -0.381372,0.381372 c 0.251017,-0.0089 0.478725,-0.105959 0.656291,-0.260966 h 1.557011 a 0.1323049,0.1323049 0 0 0 0.132292,-0.132292 V 16.536462 A 0.1323049,0.1323049 0 0 0 17.859375,16.40417 h -0.132292 v -0.132292 a 0.1323049,0.1323049 0 0 0 -0.02429,-0.07596 z"}),r.createElement("path",{style:{color:"#000000",fontStyle:"normal",fontVariant:"normal",fontWeight:"normal",fontStretch:"normal",fontSize:"medium",lineHeight:"normal",fontFamily:"sans-serif",fontVariantLigatures:"normal",fontVariantPosition:"normal",fontVariantCaps:"normal",fontVariantNumeric:"normal",fontVariantAlternates:"normal",fontVariantEastAsian:"normal",fontFeatureSettings:"normal",fontVariationSettings:"normal",textIndent:0,textAlign:"start",textDecoration:"none",textDecorationLine:"none",textDecorationStyle:"solid",textDecorationColor:"#000000",letterSpacing:"normal",wordSpacing:"normal",textTransform:"none",writingMode:"lr-tb",direction:"ltr",textOrientation:"mixed",dominantBaseline:"auto",baselineShift:"baseline",textAnchor:"start",whiteSpace:"normal",shapePadding:0,shapeMargin:0,inlineSize:0,clipRule:"nonzero",display:"inline",overflow:"visible",visibility:"visible",opacity:1,isolation:"auto",mixBlendMode:"normal",colorInterpolation:"sRGB",colorInterpolationFilters:"linearRGB",solidColor:"#000000",solidOpacity:1,vectorEffect:"none",fill:"#000000",fillOpacity:.5,fillRule:"nonzero",stroke:"none",strokeWidth:"0.0385953px",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:4,strokeDasharray:"none",strokeDashoffset:0,strokeOpacity:1,colorRendering:"auto",imageRendering:"auto",shapeRendering:"auto",textRendering:"auto",enableBackground:"accumulate",stopColor:"#000000",stopOpacity:1},d:"m 17.871094,15.345703 a 0.1322915,0.1322915 0 0 0 -0.105469,0.03906 l -3.439453,3.439453 a 0.1322915,0.1322915 0 0 0 0,0.1875 0.1322915,0.1322915 0 0 0 0.1875,0 l 3.439453,-3.439453 a 0.1322915,0.1322915 0 0 0 0,-0.1875 0.1322915,0.1322915 0 0 0 -0.08203,-0.03906 z",id:"path859"}))))}var A=r.forwardRef(W),z=(n.p,function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).webcam=i.a.createRef(),a.state={errorState:"noError",videoConstraints:{facingMode:"environment",width:4096,height:2160,frameRate:60}},a}return Object(l.a)(n,[{key:"renderPage",value:function(){switch(this.state.errorState){case"noError":return[Object(a.jsx)(D.a,{audio:!1,ref:this.webcam,onUserMedia:this.mediaStream.bind(this),onUserMediaError:this.mediaError.bind(this),videoConstraints:this.state.videoConstraints,screenshotFormat:"image/png",className:"cameraWebcam"},"webcam"),Object(a.jsx)(R,{onCapture:this.capture.bind(this)},"webcamHud")];case"noCamera":return Object(a.jsx)("div",{className:"cameraError",children:Object(a.jsxs)("div",{className:"cameraErrorContainer",children:[Object(a.jsx)(A,{className:"cameraErrorGlyph"}),Object(a.jsx)("h1",{children:"There is no camera on this device."})]})});case"noSupport":return Object(a.jsx)("div",{className:"cameraError",children:Object(a.jsxs)("div",{className:"cameraErrorContainer",children:[Object(a.jsx)(A,{className:"cameraErrorGlyph"}),Object(a.jsx)("h1",{children:"This browser is unsupported"}),Object(a.jsxs)("div",{children:[Object(a.jsx)("p",{children:"Use a browser that can access the camera. Possible options are:"}),Object(a.jsxs)("ul",{children:[Object(a.jsx)("li",{children:"Google Chrome"}),Object(a.jsx)("li",{children:"Firefox"}),Object(a.jsx)("li",{children:"Safari"}),Object(a.jsx)("li",{children:"Microsoft Edge"})]})]})]})});case"noPermission":return Object(a.jsx)("div",{className:"cameraError",children:Object(a.jsxs)("div",{className:"cameraErrorContainer",children:[Object(a.jsx)(A,{className:"cameraErrorGlyph"}),Object(a.jsx)("h1",{children:"Can't access the camera"}),Object(a.jsx)("div",{children:Object(a.jsx)("p",{children:"Check the permissions for this page, and then reload the page to try again."})})]})});case"genericError":default:return Object(a.jsx)("div",{className:"cameraError",children:Object(a.jsxs)("div",{className:"cameraErrorContainer",children:[Object(a.jsx)(A,{className:"cameraErrorGlyph"}),Object(a.jsx)("h1",{children:"Can't access the camera"})]})})}}},{key:"render",value:function(){return Object(a.jsx)("div",{className:"cameraPage",children:this.renderPage()})}},{key:"mediaStream",value:function(e){console.log(e)}},{key:"mediaError",value:function(e){if(console.log(e),"getUserMedia is not implemented in this browser"!==e.message)switch(e.name){case"NotFoundError":this.setState({errorState:"noCamera"});break;case"NotAllowedError":this.setState({errorState:"noPermission"});break;default:this.setState({errorState:"genericError"})}else this.setState({errorState:"noSupport"})}},{key:"capture",value:function(){var e=this.webcam.current.getScreenshot();N.sendBase64Picture(e)}}]),n}(i.a.Component)),L=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).state={page:"camera"},a}return Object(l.a)(n,[{key:"changePage",value:function(e){this.setState({page:e})}},{key:"exit",value:function(){N.disconnect()}},{key:"render",value:function(){return Object(a.jsxs)("div",{className:"mainWrapper",children:[Object(a.jsx)(M,{page:this.state.page,onChangePage:this.changePage.bind(this),onExit:this.exit.bind(this)}),this.renderPage()]})}},{key:"renderPage",value:function(){switch(this.state.page){case"camera":return Object(a.jsx)(z,{});case"transfers":return Object(a.jsx)("span",{children:"This is the Transfers page"});case"upload":return Object(a.jsx)("span",{children:"This is the Upload page"});default:return Object(a.jsx)("span",{children:"Please navigate to another page"})}}}]),n}(i.a.Component),G=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),a=t.call(this,e),N.setWsStateChangeHandler((function(){a.setState({isConnected:N.isConnected()})})),a.state={isConnected:!1},a}return Object(l.a)(n,[{key:"renderMainPage",value:function(){return this.state.isConnected?Object(a.jsx)(L,{}):Object(a.jsx)(B,{})}},{key:"render",value:function(){return Object(a.jsx)("div",{className:"App",children:this.renderMainPage()})}}]),n}(i.a.Component),H=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,22)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,i=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),i(e),s(e)}))};o.a.render(Object(a.jsx)(i.a.StrictMode,{children:Object(a.jsx)(G,{})}),document.getElementById("root")),H()}},[[21,1,2]]]);
//# sourceMappingURL=main.635c2cd3.chunk.js.map