// Rollup plugins.
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
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
        input: 'src/nodeIndex.js',
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
