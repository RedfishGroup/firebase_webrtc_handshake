import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import nodeGlobals from 'rollup-plugin-node-globals'
import nodeBuiltins from 'rollup-plugin-node-builtins'
import nodePolyfills from 'rollup-plugin-polyfill-node'

export default [
    {
        input: './node_modules/simple-peer/index.js',
        plugins: [
            // nodeGlobals(),
            nodePolyfills(),
            resolve({
                mainFields: ['module', 'main', 'jsnext:main', 'browser'],
                preferBuiltins: true,
            }),
            // nodeBuiltins(),
            commonjs(),
        ],
        output: [
            {
                file: 'dist/simple-peer.test.js',
                format: 'esm',
                sourcemap: true,
            },
        ],
    },
]
