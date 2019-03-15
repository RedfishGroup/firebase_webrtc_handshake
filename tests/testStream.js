import { P2PServer, P2PClient, firebase } from "../dist/build.full.js";
import { getICEservers } from "../src/getIceServers.js";
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

window.strartCamera = startCamera;
//startCamera();

//
// canvas stream
//
function startCanvas() {
  let canv = document.getElementById("canv1");
  let ctx = canv.getContext("2d");
  ctx.beginPath();
  setInterval(() => {
    ctx.fillStyle = "#27f";
    ctx.strokeStyle = "#a7f";
    ctx.fillRect(Math.random() * 300, Math.random() * 300, 20, 20);
    ctx.fillStyle = "#f7f";
    ctx.fillRect(Math.random() * 300, Math.random() * 300, 20, 20);
  }, 200);
  var stream = canv.captureStream();
  console.log(stream);
  return stream;
}

function startCanvasServer(stream) {
  getICEservers().then(iceServers => {
    _startCanvasServer(stream, iceServers);
  });
}

function _startCanvasServer(stream, iceServers) {
  console.log("start canvas servre called with", stream);
  var canServer = new P2PServer({
    id: "Main Canvas Stream Server" + Math.floor(10000 * Math.random()),
    stream: stream,
    iceServers
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
  });
  client1.connectToPeerID(id, function(err, connection) {
    connection.on("connect canvas", function() {
      console.log("connected");
    });
  });
}

function startRTEServer(stream) {
  getICEservers().then(iceServers => {
    _startRTEServer(stream, iceServers);
  });
}

function _startRTEServer(stream, iceServers) {
  let app;
  if (firebase.apps.length > 0) {
    app = firebase.apps[0];
  } else {
    app = firebase.initializeApp(
      {
        apiKey: "AIzaSyBI-Js8EBS6pe2GmTG0IGpxgeIbtGJkbIA",
        databaseURL: "https://livetexture.firebaseio.com",
        authDomain: "livetexture.firebaseapp.com",
        projectId: "firebase-livetexture"
      },
      "livetexture"
    );
  }
  let database = app.database("https://livetexture.firebaseio.com");
  let ref = database
    .ref("/")
    .child("cameras")
    .child("peers");

  let myID = "RTECanvasStreamServer" + Math.floor(10000 * Math.random());
  var canServer = new P2PServer({
    id: myID,
    stream: stream,
    database: ref,
    iceServers,
    debug: true
  });
  canServer.on("updateTimeStamp", () => {
    ref
      .child(canServer.id)
      .child("displayName")
      .set("test of canvas stream");
  });
  canServer.on("dataBig", ev => {
    console.log("databig", ev);
  });
  document.getElementById(
    "myID"
  ).innerHTML = `<a target='blank' href='./connectToStream.html?id=${myID}'>${myID}</a>`;
}

let stream = startCanvas();
startCanvasServer(stream);
startRTEServer(stream);
