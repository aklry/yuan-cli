import { defineConfig } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import externals from "rollup-plugin-node-externals";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import typescript from 'rollup-plugin-typescript2';

export default defineConfig([
    {
        input: {
            index: 'src/index.ts'
        },
        output: {
            dir: 'dist',
            name: 'bundle',
            format: 'cjs'
        },
        plugins: [
            nodeResolve(),
            commonjs(),
            externals({
                deps: false
            }),
            json(),
            typescript(),
            terser()
        ],
        
    }
])