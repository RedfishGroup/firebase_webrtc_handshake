// Rollup plugins.
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import nodeGlobals from 'rollup-plugin-node-globals'
import nodeBuiltins from 'rollup-plugin-node-builtins'

export default [
    {
        input: 'src/index.js',
        plugins: [
            resolve({
                mainFields: ['module', 'main', 'jsnext:main', 'browser'],
            }),
            commonjs(),
        ],
        output: [
            {
                file: 'dist/build.full.js',
                format: 'esm',
                sourcemap: true,
            },
        ],
    },
    {
        input: 'node_modules/simple-peer/simplepeer.min.js',
        plugins: [
            resolve({
                mainFields: ['module', 'main', 'jsnext:main', 'browser'],
            }),
            commonjs(),
        ],
        output: [
            {
                file: 'dist/simple-peer.mjs',
                format: 'esm',
                sourcemap: true,
            },
        ],
    },
    {
        input: 'src/index.js',
        external: ['firebase/app', 'firebase/database'],
        plugins: [
            resolve({
                mainFields: ['module', 'main', 'jsnext:main', 'browser'],
            }),
            commonjs(),
        ],
        output: [
            {
                file: 'dist/build.nofirebase.js',
                format: 'esm',
                sourcemap: true,
            },
        ],
    },
    {
        input: 'src/nodeIndex.mjs',
        external: ['firebase/app', 'firebase/database'],
        plugins: [
            nodeGlobals(),
            nodeBuiltins(),
            resolve({
                mainFields: ['module', 'main'],
                preferBuiltins: true,
            }),
            commonjs(),
        ],
        output: [
            {
                file: 'dist/build.full.cjs',
                format: 'cjs',
                sourcemap: true,
            },
        ],
    },
]
