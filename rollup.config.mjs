// Rollup plugins.
// import cjs from 'rollup-plugin-commonjs';
// import globals from 'rollup-plugin-node-globals'
// import replace from 'rollup-plugin-replace';
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

// import babel from "rollup-plugin-babel";

export default [
    {
        input: 'src/index.js',
        external: [
            'simple-peer/simplepeer.min.js',
            'msgpack-lite/dist/msgpack.min.js',
            'webrtc-adapter/src/js/adapter_core.js',
            'firebase/app',
            'firebase/database',
        ],
        plugins: [
            // globals(),
            resolve({
                mainFields: ['module', 'main', 'jsnext:main', 'browser'],
                preferBuiltins: true,
            }),
            commonjs(),
            // nodePollyfills(),
        ],
        output: [
            {
                file: 'dist/build.js',
                format: 'esm',
                sourcemap: true,
                globals: {
                    'simple-peer': 'simple-peer',
                    'msgpack-lite': 'msgpack-lite',
                    'webrtc-adapter': 'webrtc-adapter',
                    firebase: 'firebase',
                },
            },
        ],
    },
]
