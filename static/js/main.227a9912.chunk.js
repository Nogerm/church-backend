(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{151:function(e,t,a){e.exports=a(316)},156:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},183:function(e,t,a){},316:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),c=a(28),i=a.n(c),r=a(53),l=a(54),s=a(59),m=a(55),u=a(61),h=a(328),d=a(329),p=(a(156),a(127)),g=a.n(p),E=a(128),w=a.n(E),v=a(129),k=a.n(v),f=(a(183),a(327)),b=a(323),C=a(325),I=a(324),y=a(141),j=a(322),x=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).handleLoginClicked=function(){window.location.href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1554176659&redirect_uri=https://nogerm.github.io/church-backend&state=1234&scope=openid%20profile"},a.renderBody=function(){var e=a.state.activeItem;return a.state.hasLoggedIn?o.a.createElement(f.a.Row,{columns:2},o.a.createElement(f.a.Column,{width:3},o.a.createElement(b.a,{fluid:!0,vertical:!0,tabular:!0},o.a.createElement(b.a.Item,{name:"bio",active:"bio"===e,onClick:a.handleItemClick}),o.a.createElement(b.a.Item,{name:"pics",active:"pics"===e,onClick:a.handleItemClick}),o.a.createElement(b.a.Item,{name:"companies",active:"companies"===e,onClick:a.handleItemClick}),o.a.createElement(b.a.Item,{name:"links",active:"links"===e,onClick:a.handleItemClick}))),o.a.createElement(f.a.Column,{stretched:!0,width:12},o.a.createElement(C.a,null,"This is an stretched grid column. This segment will always match the tab height"))):o.a.createElement(I.a,{as:"H1",style:{color:"white"}},"\u8acb\u5148\u767b\u5165")},a.state={activeItem:"bio",hasSendRequest:!1,hasLoggedIn:!1,userId:"",userName:"",userImageUrl:""},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=g.a.parse(this.props.location.search),a=t.code,n=t.state;if(console.log("code: "+a+"\nstate: "+n),void 0!==a){this.setState({hasSendRequest:!0});var o={code:a,state:n};w.a.post("https://nogerm-demo-test.herokuapp.com/login",o,{"Content-Type":"application/json"}).then(function(t){var a=k()(t.data.id_token);console.log("[login]\nuser id: "+a.sub+"\nuser name: "+a.name+"\nuser image url: "+a.picture),e.setState({userId:a.sub||"",userName:a.name||"",userImageUrl:a.picture||"",hasLoggedIn:!0})}).catch(function(e){console.log("[login] error"+e)})}}},{key:"render",value:function(){var e=this.renderBody,t=this.state.userName,a=this.state.userImageUrl;return o.a.createElement(f.a,null,o.a.createElement(f.a.Row,{columns:1,style:{padding:"0px"}},o.a.createElement(C.a,{raised:!0,style:{background:"#9ccc65",margin:"0px",flex:1}},o.a.createElement(f.a,{columns:5},o.a.createElement(f.a.Column,{width:1},o.a.createElement(y.a,{style:{height:"40px"},src:"https://886point.com/wp-content/uploads/2018/07/icon512-2x-600x600.png"})),o.a.createElement(f.a.Column,{stretched:!0},o.a.createElement(I.a,{as:"H1",style:{color:"white"}},"LINE Console")),o.a.createElement(f.a.Column,{width:1},o.a.createElement(y.a,{avatar:!0,src:a,style:{width:"40px",height:"40px"}})),o.a.createElement(f.a.Column,{width:2},o.a.createElement(I.a,{as:"H1",style:{color:"white"}},t)),o.a.createElement(f.a.Column,{width:2},o.a.createElement(j.a,{floated:"right",onClick:this.handleLoginClicked},"LINE LOGIN"))))),e())}}]),t}(n.Component),O=function(e){function t(){return Object(r.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement(h.a,null,o.a.createElement(d.a,{path:"/:code?/:state?",component:x,exact:!0}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var L=a(321);a(315);i.a.render(o.a.createElement(L.a,null,o.a.createElement(O,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[151,1,2]]]);
//# sourceMappingURL=main.227a9912.chunk.js.map