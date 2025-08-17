import { defineConfig } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import externals from "rollup-plugin-node-externals"
import json from "@rollup/plugin-json"
import terser from "@rollup/plugin-terser"
import typescript from 'rollup-plugin-typescript2'
import copy from 'rollup-plugin-copy'

export default defineConfig([
    {
        input: {
            index: 'src/index.ts'
        },
        output: {
            dir: 'dist',
            name: 'bundle',
            format: 'cjs',
            manualChunks: (id) => {
                if (id.includes('node_modules')) {
                    return 'vendor'
                }
                return null
            }
        },
        external: [
            'cpu-features'
        ],
        plugins: [
            nodeResolve({
                preferBuiltins: true
            }),
            commonjs(),
            externals({
                deps: false
            }),
            json(),
            typescript(),
            terser(),
            copy({
                targets: [
                    { src: 'src/templates/**/*', dest: 'dist/templates' }
                ]
            })
        ],

    }
])