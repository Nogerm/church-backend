(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{105:function(e,t,n){},194:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(21),c=n.n(r),i=n(28),s=n(29),l=n(32),u=n(30),m=n(33),h=n(196),p=n(197),d=n(61),g=n.n(d),v=n(62),f=n.n(v),b=n(63),E=n.n(b),k=n(64),w=n.n(k),j=(n(105),n(65)),y=n.n(j),O=n(67),I=n.n(O),N=n(68),S=n.n(N),C=n(70),_=n.n(C),x=n(69),L=n.n(x),B=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).checkState=function(){},n.state={hasSendRequest:!1,hasLoggedIn:!1,userId:"",userName:"",userImage:""},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=f.a.parse(this.props.location.search),n=t.code,a=t.state;if(console.log("code: "+n+"\nstate: "+a),void 0!==n){var o={code:n,state:a};E.a.post("https://nogerm-demo-test.herokuapp.com/login",o,{"Content-Type":"application/json"}).then(function(t){var n=w()(t.data.id_token);console.log("[login]\nuser id: "+n.sub+"\nuser name: "+n.name+"\nuser image url: "+n.picture),e.setState({userId:n.sub||"",userName:n.name||"",userImageUrl:n.picture||""})}).catch(function(e){console.log("[login] error"+e)})}}},{key:"handleClick",value:function(){}},{key:"render",value:function(){var e=this.state.userName,t=this.state.userImage;return o.a.createElement("div",null,o.a.createElement(y.a,{position:"static"},o.a.createElement(I.a,null,o.a.createElement(S.a,{variant:"h6",color:"inherit"},"Settings"),o.a.createElement(L.a,{alt:"Remy Sharp",src:t}),o.a.createElement("p",null,e),o.a.createElement(_.a,{variant:"contained",color:"inherit",href:"https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1554176659&redirect_uri=https://nogerm.github.io/church-backend&state=1234&scope=openid%20profile"},"Login with LINE"))),o.a.createElement("img",{src:g.a,className:"App-logo",alt:"logo"}),o.a.createElement("p",null,"Home Page"))}}]),t}(a.Component),J=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement(h.a,null,o.a.createElement(p.a,{path:"/:code?/:state?",component:B,exact:!0}))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var R=n(195);c.a.render(o.a.createElement(R.a,null,o.a.createElement(J,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},61:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},73:function(e,t,n){e.exports=n(194)}},[[73,1,2]]]);
//# sourceMappingURL=main.4e92c8be.chunk.js.map