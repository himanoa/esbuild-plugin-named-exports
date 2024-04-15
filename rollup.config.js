import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";

export default [{
    input: 'src/index.ts',
      output: [{
          file: 'dist/index.js', // rollup支持的多种输出格式(有amd,cjs, es, iife 和 umd)
          format: 'cjs',
      }],
      plugins:[typescript(), terser({ ecma: 2015 })]
    },
    {
      input: 'src/index.ts',
      output: [{ file: 'dist/index.d.ts', format: 'cjs' }],
      plugins: [dts()]
    }
]
