var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,l=(t,r,n)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n,u=(e,t)=>{for(var r in t||(t={}))o.call(t,r)&&l(e,r,t[r]);if(n)for(var r of n(t))i.call(t,r)&&l(e,r,t[r]);return e};import p,{useState as a,useCallback as c,useEffect as s}from"react";const h={position:"absolute"};export default e=>{const[n,o]=a(0),[i,l]=a([]),m=c((n=>{var o,l,p;const a=null!=(o=e.itemCount)?o:0,c=[];if(!e.renderItem)return[];const s=n+(1+(null!=(l=e.preRenderPageCount)?l:1))*e.height,m=n-(null!=(p=e.preRenderPageCount)?p:1)*e.height;for(let g=0;g<a;g++){const n=i[g],o=i[g+1];if(n<s&&o>m)c.push(e.renderItem({index:g,style:(f=u({},h),d={top:`${n}px`},t(f,r(d)))}));else if(c.length>0)break}var f,d;return c}),[i,e.height,e.itemCount,e.renderItem,e.preRenderPageCount]),f=c((()=>{var t;const r=null!=(t=e.itemCount)?t:0,n=[0];let o=0;for(let i=0;i<r;i++)"function"==typeof e.itemSize?o+=e.itemSize(i):"number"==typeof e.itemSize&&(o+=e.itemSize),n.push(o);l(n)}),[e.itemCount,e.itemSize]),d=c((t=>{var r,n;const i=null!=(n=null==(r=t.target)?void 0:r.scrollTop)?n:0;o((t=>{const r=i-t,n=e.height/2;return r<n&&r>-n?t:i}))}),[]);return s((()=>{f()}),[e.reRenderCount,f]),p.createElement("div",{style:{width:`${e.width}px`,height:`${e.height}px`,overflow:"auto"},onScroll:d},p.createElement("div",{style:{position:"relative",height:`${i[i.length-1]}px`}},m(n)))};