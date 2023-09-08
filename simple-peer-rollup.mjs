import commonjs from '@rollup/plugin-commonjs'

export default [
    {
        input: './node_modules/simple-peer/simplepeer.min.js',
        plugins: [commonjs()],
        output: [
            {
                file: 'dist/simple-peer.es6.js',
                format: 'esm',
                sourcemap: true,
            },
        ],
    },
]
