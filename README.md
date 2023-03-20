# firebase_webrtc_handshake
Facilitate a webrtc connection using Firebase.

Uses simple-peer, which is a very nice WebRTC wrapper library.

Setup:
  1. install nodejs
  2. install yarn
  3. `cd firebase_webrtc_handshake`
  4. install dependencies `yarn install`  
  5. try some of the tests from chrome
   * for example: go to http://localhost/~hansolo/firebase_webrtc_handshake/tests/testPeerJS.html

Building:
  1. TODO make this better
  2. yarn build 
  
Usage Examples:
  * Look in the tests directory for in depth usage examples
  * [Streams](./tests/testStream.js)
  * [Simple Data Channel](./tests/testPeerJS.js)
  * [More Complicated Data Channel](./tests/testDataUtils.js)
  
  
