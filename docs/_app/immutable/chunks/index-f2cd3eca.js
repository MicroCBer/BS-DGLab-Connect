function $(){}function K(t,e){for(const n in e)t[n]=e[n];return t}function P(t){return t()}function M(){return Object.create(null)}function p(t){t.forEach(P)}function D(t){return typeof t=="function"}function dt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function Q(t){return Object.keys(t).length===0}function R(t,...e){if(t==null)return $;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function _t(t,e,n){t.$$.on_destroy.push(R(e,n))}function ht(t,e,n,i){if(t){const r=L(t,e,n,i);return t[0](r)}}function L(t,e,n,i){return t[1]&&i?K(n.ctx.slice(),t[1](i(e))):n.ctx}function mt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const c=[],s=Math.max(e.dirty.length,r.length);for(let l=0;l<s;l+=1)c[l]=e.dirty[l]|r[l];return c}return e.dirty|r}return e.dirty}function pt(t,e,n,i,r,c){if(r){const s=L(e,n,i,c);t.p(s,r)}}function yt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function gt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function bt(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function xt(t){return t&&D(t.destroy)?t.destroy:$}let v=!1;function U(){v=!0}function V(){v=!1}function X(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function Y(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let u=0;u<e.length;u++){const f=e[u];f.claim_order!==void 0&&o.push(f)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let o=0;o<e.length;o++){const u=e[o].claim_order,f=(r>0&&e[n[r]].claim_order<=u?r+1:X(1,r,y=>e[n[y]].claim_order,u))-1;i[o]=n[f]+1;const a=f+1;n[a]=o,r=Math.max(a,r)}const c=[],s=[];let l=e.length-1;for(let o=n[r]+1;o!=0;o=i[o-1]){for(c.push(e[o-1]);l>=o;l--)s.push(e[l]);l--}for(;l>=0;l--)s.push(e[l]);c.reverse(),s.sort((o,u)=>o.claim_order-u.claim_order);for(let o=0,u=0;o<s.length;o++){for(;u<c.length&&s[o].claim_order>=c[u].claim_order;)u++;const f=u<c.length?c[u]:null;t.insertBefore(s[o],f)}}function Z(t,e){t.appendChild(e)}function tt(t,e){if(v){for(Y(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function wt(t,e,n){v&&!n?tt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function W(t){t.parentNode.removeChild(t)}function $t(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function B(t){return document.createElement(t)}function et(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function N(t){return document.createTextNode(t)}function vt(){return N(" ")}function Et(){return N("")}function z(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function kt(t){return function(e){return e.preventDefault(),t.call(this,e)}}function I(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function At(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set?t[i]=e[i]:I(t,i,e[i])}function St(t,e){for(const n in e)I(t,n,e[n])}function nt(t){return Array.from(t.childNodes)}function it(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function q(t,e,n,i,r=!1){it(t);const c=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const l=t[s];if(e(l)){const o=n(l);return o===void 0?t.splice(s,1):t[s]=o,r||(t.claim_info.last_index=s),l}}for(let s=t.claim_info.last_index-1;s>=0;s--){const l=t[s];if(e(l)){const o=n(l);return o===void 0?t.splice(s,1):t[s]=o,r?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,l}}return i()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function F(t,e,n,i){return q(t,r=>r.nodeName===e,r=>{const c=[];for(let s=0;s<r.attributes.length;s++){const l=r.attributes[s];n[l.name]||c.push(l.name)}c.forEach(s=>r.removeAttribute(s))},()=>i(e))}function Nt(t,e,n){return F(t,e,n,B)}function Ct(t,e,n){return F(t,e,n,et)}function rt(t,e){return q(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>N(e),!0)}function jt(t){return rt(t," ")}function Tt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Mt(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}let g;function st(){if(g===void 0){g=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{g=!0}}return g}function zt(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=B("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const r=st();let c;return r?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",c=z(window,"message",s=>{s.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{c=z(i.contentWindow,"resize",e)}),Z(t,i),()=>{(r||c&&i.contentWindow)&&c(),W(i)}}function Ot(t,e,n){t.classList[n?"add":"remove"](e)}function ot(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,i,e),r}let m;function h(t){m=t}function C(){if(!m)throw new Error("Function called outside component initialization");return m}function Pt(t){C().$$.on_mount.push(t)}function Dt(t){C().$$.after_update.push(t)}function Lt(){const t=C();return(e,n,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[e];if(r){const c=ot(e,n,{cancelable:i});return r.slice().forEach(s=>{s.call(t,c)}),!c.defaultPrevented}return!0}}function Wt(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const _=[],O=[],x=[],k=[],H=Promise.resolve();let A=!1;function G(){A||(A=!0,H.then(J))}function Bt(){return G(),H}function S(t){x.push(t)}function It(t){k.push(t)}const E=new Set;let b=0;function J(){const t=m;do{for(;b<_.length;){const e=_[b];b++,h(e),ct(e.$$)}for(h(null),_.length=0,b=0;O.length;)O.pop()();for(let e=0;e<x.length;e+=1){const n=x[e];E.has(n)||(E.add(n),n())}x.length=0}while(_.length);for(;k.length;)k.pop()();A=!1,E.clear(),h(t)}function ct(t){if(t.fragment!==null){t.update(),p(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(S)}}const w=new Set;let d;function qt(){d={r:0,c:[],p:d}}function Ft(){d.r||p(d.c),d=d.p}function lt(t,e){t&&t.i&&(w.delete(t),t.i(e))}function Ht(t,e,n,i){if(t&&t.o){if(w.has(t))return;w.add(t),d.c.push(()=>{w.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const Gt=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function Jt(t,e){const n={},i={},r={$$scope:1};let c=t.length;for(;c--;){const s=t[c],l=e[c];if(l){for(const o in s)o in l||(i[o]=1);for(const o in l)r[o]||(n[o]=l[o],r[o]=1);t[c]=l}else for(const o in s)r[o]=1}for(const s in i)s in n||(n[s]=void 0);return n}function Kt(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function Qt(t){t&&t.c()}function Rt(t,e){t&&t.l(e)}function ut(t,e,n,i){const{fragment:r,on_mount:c,on_destroy:s,after_update:l}=t.$$;r&&r.m(e,n),i||S(()=>{const o=c.map(P).filter(D);s?s.push(...o):p(o),t.$$.on_mount=[]}),l.forEach(S)}function at(t,e){const n=t.$$;n.fragment!==null&&(p(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function ft(t,e){t.$$.dirty[0]===-1&&(_.push(t),G(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Ut(t,e,n,i,r,c,s,l=[-1]){const o=m;h(t);const u=t.$$={fragment:null,ctx:null,props:c,update:$,not_equal:r,bound:M(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:M(),dirty:l,skip_bound:!1,root:e.target||o.$$.root};s&&s(u.root);let f=!1;if(u.ctx=n?n(t,e.props||{},(a,y,...j)=>{const T=j.length?j[0]:y;return u.ctx&&r(u.ctx[a],u.ctx[a]=T)&&(!u.skip_bound&&u.bound[a]&&u.bound[a](T),f&&ft(t,a)),y}):[],u.update(),f=!0,p(u.before_update),u.fragment=i?i(u.ctx):!1,e.target){if(e.hydrate){U();const a=nt(e.target);u.fragment&&u.fragment.l(a),a.forEach(W)}else u.fragment&&u.fragment.c();e.intro&&lt(t.$$.fragment),ut(t,e.target,e.anchor,e.customElement),V(),J()}h(o)}class Vt{$destroy(){at(this,1),this.$destroy=$}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!Q(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{Gt as $,$ as A,ht as B,pt as C,yt as D,mt as E,tt as F,_t as G,K as H,At as I,Ot as J,xt as K,Jt as L,bt as M,C as N,gt as O,O as P,z as Q,Wt as R,Vt as S,et as T,Ct as U,St as V,Lt as W,S as X,zt as Y,kt as Z,p as _,vt as a,$t as a0,Kt as a1,It as a2,wt as b,jt as c,Ft as d,Et as e,lt as f,qt as g,W as h,Ut as i,Dt as j,B as k,Nt as l,nt as m,I as n,Pt as o,Mt as p,N as q,rt as r,dt as s,Ht as t,Tt as u,Qt as v,Rt as w,ut as x,at as y,Bt as z};