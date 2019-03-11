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
  setTimeout(startClient, 2000);
}

function startClient() {
  client1 = new P2PClient();
  client1.on("stream", function(descript) {
    var video = document.getElementById("client2Video");
    console.log("client stream", descript.stream);
    video.srcObject = descript.stream;
  });
  client1.connectToPeerID(gServer.id, function(err, connection) {
    connection.on("connect", function() {
      console.log("connected");
    });
  });
}

startCamera();

//
// canvas stream
//
function startCanvas() {
  let canv = document.getElementById("canv1");
  setInterval(() => {
    let ctx = canv.getContext("2d");
    ctx.fillStyle = "#27f";
    ctx.strokeStyle = "#a7f";
    ctx.fillRect(Math.random() * 300, Math.random() * 300, 20, 20);
    ctx.moveTo(Math.random() * 300, Math.random() * 300);
    ctx.lineTo(Math.random() * 300, Math.random() * 300);
    ctx.stroke();
  }, 200);
  var stream = canv.captureStream();
  console.log(stream);
  startCanvasServer(stream);
}

function startCanvasServer(stream) {
  console.log("start canvas servre called with", stream);
  var canServer = new P2PServer({
    id: "Main Canvas Stream Server" + Math.floor(10000 * Math.random()),
    stream: stream
  });
  setTimeout(startCanvasClient, 1000, canServer.id);
}

function startCanvasClient(id) {
  console.log("start canvas client called with", id);
  client1 = new P2PClient();
  client1.on("stream", function(descript) {
    var video = document.getElementById("clientCanvasVideo");
    video.muted = "muted"; // Muted is essential for autoplay!!!
    console.log("client canvas stream", video, descript.stream);
    video.oncanplay = function() {
      video
        .play()
        .then(() => {
          console.log("play");
        })
        .catch(err => {
          console.error(err);
        });
    };
    video.srcObject = descript.stream;
    // setTimeout(() => {
    //   video.play();
    // }, 2000);
  });
  client1.connectToPeerID(id, function(err, connection) {
    connection.on("connect canvas", function() {
      console.log("connected");
    });
  });
}

startCanvas();
