var __defProp=Object.defineProperty,__defProps=Object.defineProperties,__getOwnPropDescs=Object.getOwnPropertyDescriptors,__getOwnPropSymbols=Object.getOwnPropertySymbols,__hasOwnProp=Object.prototype.hasOwnProperty,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(e,r,t)=>r in e?__defProp(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,__spreadValues=(e,r)=>{for(var t in r||(r={}))__hasOwnProp.call(r,t)&&__defNormalProp(e,t,r[t]);if(__getOwnPropSymbols)for(var t of __getOwnPropSymbols(r))__propIsEnum.call(r,t)&&__defNormalProp(e,t,r[t]);return e},__spreadProps=(e,r)=>__defProps(e,__getOwnPropDescs(r));!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r(require("react")):"function"==typeof define&&define.amd?define(["react"],r):(e="undefined"!=typeof globalThis?globalThis:e||self)["react-virtualized"]=r(e.React)}(this,(function(e){"use strict";function r(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var t=r(e);const o={position:"absolute"};return r=>{const[n,u]=e.useState(0),l=e.useRef(null),p=e.useRef([]),s=e.useRef(0),i=r.height,c=()=>{var e;const t=null!=(e=r.itemCount)?e:0,o=[0];let n=0;for(let u=0;u<t;u++)"function"==typeof r.itemSize?n+=r.itemSize(u):"number"==typeof r.itemSize&&(n+=r.itemSize),o.push(n);p.current=o,u((e=>e+1))};return e.useEffect((()=>{u((e=>e+1))}),[l.current]),e.useEffect((()=>{c()}),[r.reRenderCount]),t.default.createElement("div",{ref:l,style:{width:`${r.width}px`,height:`${r.height}px`,overflow:"auto"},onScroll:()=>{var e,r;const t=null!=(r=null==(e=l.current)?void 0:e.scrollTop)?r:0,o=t-s.current;o<i&&o>-i||(s.current=t,c())}},t.default.createElement("div",{style:{position:"relative",height:`${p.current[p.current.length-1]}px`}},(()=>{var e,t,n;const u=null!=(e=r.itemCount)?e:0,s=[];if(!l.current)return[];if(!r.renderItem)return[];const i=l.current.scrollTop+(1+(null!=(t=r.preRenderPageCount)?t:1))*r.height,c=l.current.scrollTop-(null!=(n=r.preRenderPageCount)?n:1)*r.height;for(let l=0;l<u;l++){const e=p.current[l],t=p.current[l+1];e<i&&t>c&&s.push(r.renderItem({index:l,style:__spreadProps(__spreadValues({},o),{top:`${e}px`})}))}return s})()))}}));
