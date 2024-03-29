// Rollup plugins.
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// import nodeGlobals from 'rollup-plugin-node-globals'
import nodeBuiltins from 'rollup-plugin-node-builtins'

export default [
    {
        input: 'src/index.js',
        plugins: [
            // nodeGlobals(),
            resolve({
                mainFields: ['module', 'main', 'jsnext:main', 'browser'],
                preferBuiltins: true,
            }),
            nodeBuiltins(),
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
        input: 'src/index.js',
        external: ['firebase/app', 'firebase/database', 'firebase/storage'],
        plugins: [
            // nodeGlobals(),
            // nodeBuiltins(),
            resolve({
                mainFields: ['module', 'main', 'jsnext:main', 'browser'],
                preferBuiltins: true,
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
        external: ['firebase/app', 'firebase/database', 'firebase/storage'],
        plugins: [
            // nodeGlobals(),
            commonjs(),
            resolve({
                mainFields: ['module', 'main'],
                preferBuiltins: true,
            }),
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