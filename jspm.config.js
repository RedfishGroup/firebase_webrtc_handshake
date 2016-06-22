SystemJS.config({
  transpiler: "plugin-babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  map: {
    "babel": "npm:babel-core@5.8.38"
  },
  packages: {
    "app": {
      "format": "esm",
      "main": "app.js"
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "agektmr/binarize.js.git": "github:agektmr/binarize.js@master",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "core-js": "npm:core-js@1.2.6",
    "feross/simple-peer.git": "github:feross/simple-peer@6.0.4",
    "firebase": "github:firebase/firebase-bower@2.4.2",
    "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
    "path": "github:jspm/nodelibs-path@0.2.0-alpha",
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.10",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha",
    "webrtc-adapter": "npm:webrtc-adapter@1.4.0"
  },
  packages: {
    "npm:babel-runtime@5.8.38": {
      "map": {}
    },
    "npm:core-js@1.2.6": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:webrtc-adapter@1.4.0": {
      "map": {
        "sdp": "npm:sdp@1.0.1"
      }
    }
  }
});
