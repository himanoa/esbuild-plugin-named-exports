"use strict";var e=require("util"),t=require("enhanced-resolve"),r=require("cjs-module-lexer"),a=require("fs"),n=require("path");function o(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function u(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var a=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,a.get?a:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var s=o(t),c=u(r),i=o(a),f=o(n);const l=e.promisify(s.default.create({mainFields:["browser","module","main"]}));let p=!1;const d={name:"cjs-to-esm",setup(e){e.onResolve({filter:/.*/},(e=>{if(""===e.importer)return{path:e.path,namespace:"c2e"}})),e.onLoad({filter:/.*/,namespace:"c2e"},(async e=>({contents:`export { ${await async function(e){p||(await c.init(),p=!0);try{const t=[],r=[];for(r.push(await l(process.cwd(),e));r.length>0;){const e=r.pop(),a=c.parse(await i.default.readFileSync(e,"utf8"));t.push(...a.exports);for(const t of a.reexports)r.push(await l(f.default.dirname(e),t))}return t.includes("default")||t.push("default"),t.join(", ")}catch(e){return console.log(e),"default"}}(e.path)} } from ${JSON.stringify(e.path)}`,resolveDir:process.cwd()})))}};module.exports=d;