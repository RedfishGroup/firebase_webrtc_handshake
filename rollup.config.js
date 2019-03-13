// Rollup plugins.
import cjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

// import babel from "rollup-plugin-babel";

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/build.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'dist/build.cjs.js',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      commonjs(),
      globals(),
      resolve({ jsnext: true, main: true, browser: true }),
    ],
    external: [
      'simple-peer/simplepeer.min.js',
      'firebase/dist/index.esm',
      'msgpack-lite/dist/msgpack.min.js',
      'webrtc-adapter/src/js/adapter_core.js',
    ],
  },
];
