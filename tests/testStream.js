import { P2PServer, P2PClient } from "../dist/build.js";

var gStream = undefined;
var gServer = undefined;
var client1 = undefined;

window.startCamera = function() {
  var p = navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  p.then(function(mediaStream) {
    var video = document.getElementById("serverVideo");
    video.srcObject = mediaStream;
    video.onloadedmetadata = function(e) {
      gStream = mediaStream;
      startServer(mediaStream);
    };
  });
  p.catch(function(err) {
    console.log(err.name);
  }); // always check for errors at the end.
  return p;
};

function startServer(stream) {
  gServer = new P2PServer({
    id: "Main Stream Server" + Math.floor(10000 * Math.random()),
    stream: stream
  });
  startClient();
}

function startClient() {
  client1 = new P2PClient();
  client1.connectToPeerID(gServer.id, function(err, connection) {
    connection.on("connect", function() {
      console.log("connected");
    });
    connection.on("stream", function(stream2) {
      var video = document.getElementById("client2Video");
      console.log("client stream", stream2);
      video.srcObject = stream2;
    });
  });
}

startCamera();
