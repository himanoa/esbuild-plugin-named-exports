import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'public',
  splitting: false,
  clean: true,
  dts: true,
})

