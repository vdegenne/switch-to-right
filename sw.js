if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let d={};const c=e=>n(e,o),t={module:{uri:o},exports:d,require:c};i[o]=Promise.all(r.map((e=>t[e]||c(e)))).then((e=>(s(...e),d)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-BY2icPVA.js",revision:null},{url:"assets/index-CqUd-HVW.js",revision:null},{url:"index.html",revision:"d8bce05518becf45099aa1a222b83cbb"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"apple-touch-icon-180x180.png",revision:"b38048323c25816433f2faa59544d402"},{url:"favicon.ico",revision:"5eab081ab7d44b007248721b317777a5"},{url:"maskable-icon-512x512.png",revision:"4b323bd1729db5ed3ebd52ec3dd8a196"},{url:"pwa-192x192.png",revision:"ba6f51b5a3d17d2114d3ec1311f81782"},{url:"pwa-512x512.png",revision:"beba88dd153cfd30306bb62ed740d639"},{url:"pwa-64x64.png",revision:"4cf9c8500b9ddb77c5f91dd2239ae090"},{url:"manifest.webmanifest",revision:"11c2a5957065b8987e1b9c3100eaffe2"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
