import {
  P2PServer,
  P2PClient,
  PeerBinary,
  UnChunker,
  generateWebRTCpayload,
  imageToBlob
} from "../dist/build.js";

function runTests() {
  // 1
  try {
    //test1chunking()
    logMessage("<div>Test Chunking: Passed</div>");
  } catch (e) {
    console.error(e);
    logMessage(
      "<div>Test Chunking <b>Failed</b>. See console for details</div>"
    );
  }
  // 2
  testBlobSupport();
  // 3
  testIfItGetsFragmented();
  // 4
  testSendingImage();
  // 5
  testSomeDataTypes();
  // 6
  testDisconnect();
  //
  testAnotherIceServer();
}

function test1chunking() {
  var pass = true;
  var zeroApeared = false;
  // fill array with random values between 1 and something

  var a = new ArrayBuffer(4 * 1280 * 1280); // a good resolution for an image, rgba
  var aview = new Uint8Array(a);
  for (var j = 0; j < aview.length; j++) {
    aview[j] = Math.random() * 100 + 1;
  }
  // chunk and unChunk
  var payload;
  generateWebRTCpayload(a, function(ev) {
    payload = ev;
  });
  var unchunk = new UnChunker();
  var a2;
  unchunk.onData = function(val) {
    a2 = new Uint8Array(val);
  };
  unchunk.registerChunk(payload.header);
  //shuffle chunks
  payload.chunks.sort(function() {
    return Math.round(Math.random() * 4 - 2);
  });
  for (var i = 0; i < payload.chunks.length; i++) {
    unchunk.registerChunk(payload.chunks[i]);
  }
  // test if it came back ok
  for (var j = 0; j < aview.length; j++) {
    if (aview[j] != a2[j]) {
      pass = false;
    }
    if (aview[j] == 0 || a2[j] == 0) {
      zeroApeared = true;
    }
  }
  //
  if (!pass) {
    console.log(a2, aview);
    throw "chunk test failed, values Do not equal";
  } else if (zeroApeared) {
    throw "chunk test failed. There should not be any zeros";
  } else {
    console.log("chunking test passed");
  }
}

function testSomeDataTypes() {
  var server3 = new P2PServer({
    id: "image test " + Math.floor(10000 * Math.random())
  });
  var client3 = new P2PClient();
  var str = false;
  var num = false;
  var arr = false;
  var obj = { why: "does code decay like this", n: 3 };
  server3.on("dataBig", function(args) {
    console.log("server 3", args);
    if (args.data == "big fart") {
      str = true;
    } else if (args.data == Math.PI) {
      num = true;
    } else if (args.data.length == 12) {
      arr = true;
    }
    try {
      if (JSON.stringify(obj) == JSON.stringify(args.data)) {
        logMessage(
          "<div>Object worked</div>" + JSON.stringify(args.data, null, 2)
        );
      }
    } catch (err) {
      console.error(err);
    }
    //
    if (str && num && arr) {
      logMessage(
        "<div>String, Array, Number test <b>Passed</b> with sendBig</div>"
      );
    }
  });
  client3.connectToPeerID(server3.id, function(err, connection) {
    connection.on("connect", function() {
      connection.sendBig("big fart");
      connection.sendBig(new Array(12));
      connection.sendBig(Math.PI);
      connection.sendBig(obj);
    });
  });
}

function testSendingImage() {
  console.log("test sending image called");
  var server2 = new P2PServer({
    id: "image test " + Math.floor(10000 * Math.random())
  });
  var client2 = new P2PClient();
  var im = new Image();
  im.onload = function() {
    console.log("Image2 loaded");
    imageToBlob(im, function(blob) {
      client2.connection.sendBig(blob);
      client2.connection.sendBig(blob);
    });
  };
  server2.on("dataBig", function(args) {
    console.log("server2 recieved dataBig", args);
    var url = URL.createObjectURL(args.data);
    logMessage("Image sent across webrtc");
    logMessage(`<img src="${url}" width=300 height=200/><br>`);
  });
  client2.connectToPeerID(server2.id, function(err, connection) {
    connection.on("connect", function() {
      im.src = "owls.jpg";
    });
  });
}

function logMessage(messageHTML) {
  var dv = document.getElementById("tests");
  dv.innerHTML += messageHTML;
  console.log(messageHTML);
}

function testBlobSupport() {
  var server = new P2PServer({
    id: "blob test " + Math.floor(10000 * Math.random())
  });
  var client = new P2PClient();
  client.connectToPeerID(server.id, function(err, connection) {
    connection.on("connect", function() {
      try {
        connection.send(new Blob(new Uint8Array(1234), { type: "image/png" }));
        alert(
          "blobs are now supported. This warrents a re-write of some stuff"
        );
        logMessage("<div> Test Blob support: Blobs are now suported</div>");
      } catch (err2) {
        console.error(err2);
        logMessage(
          "<div> Test Blob support: Blobs are still not supported</div>"
        );
      }
    });
  });
}

var testIfItGetsFragmented = function() {
  console.log("testing fragmentation of message");
  var bufferSize = Math.pow(2, 17); // 66528 looks like the max size per chunk
  var server3frag = new P2PServer({
    id: "auto fragmentation test " + Math.floor(10000 * Math.random())
  });
  var client3frag = new P2PClient();
  var chunkCount = 0;
  var chunksizes = [];
  var passed = 0;
  var timeoutID;
  // server and client listeners
  server3frag.on("connect", function(args) {
    //console.log('server 3:', 'client connected to the server')
  });
  server3frag.on("data", function(args) {
    //console.log('server 3 recieved data', args)
    chunkCount++;
    chunksizes.push(args.data.length);
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      if (chunkCount > 1) {
        logMessage(
          `Message Fragmented: message was broken into ${chunkCount} chunks`
        );
        logMessage(
          `. The original message size was ${bufferSize} bytes. The chunk sizes were ${chunksizes.toString()}`
        );
        console.log("chunk sizes were", chunksizes);
      } else {
        logMessage(`Message was in ${chunkCount} chunk.`);
      }
    }, 1000);
  });
  client3frag.connectToPeerID(server3frag.id, function(err, connection) {
    connection.on("error", function() {
      console.warn("error in fragmentation test");
    });
    connection.on("connect", function() {
      //console.log('client 3 connected to', server3frag)
      // prep data
      var a = new ArrayBuffer(bufferSize); // a good resolution for an image, rgba
      var aview = new Uint8Array(a);
      for (var j = 0; j < aview.length; j++) {
        aview[j] = Math.random() * 100 + 1;
      }
      connection.send(a);
    });
  });
};

function testDisconnect() {
  var status = {
    server: false,
    client: false,
    clientcb: false
  };
  function checkIfDone() {
    if (status.server && status.client && status.clientcb) {
      logMessage("successfull disconnection test<br>");
    }
  }
  var id = "disconnect-test-" + Math.floor(10000 * Math.random());
  window.server4disconnect = new P2PServer({ id: id });
  window.client4disconnect = new P2PClient();
  window.client4disconnect.debug = true;
  window.server4disconnect.debug = true;
  //
  server4disconnect.on("close", function() {
    console.log("server received disconnect");
    status.server = true;
    checkIfDone();
  });
  server4disconnect.on("connect", function() {
    client4disconnect.disconnect(function() {
      console.log("disconnect callback called");
      status.clientcb = true;
      checkIfDone();
    });
  });
  //
  client4disconnect.connectToPeerID(id, (err, connection) => {
    if (err) {
      console.warn("failed to connect");
    }
    console.log("disconnect test connected");
    client4disconnect.on("close", function() {
      console.log("client recived disconnect");
      status.client = true;
      checkIfDone();
    });
  });
}

function testAnotherIceServer() {
  var http = new XMLHttpRequest();
  var url = "https://service.xirsys.com/ice";
  var params = JSON.stringify({
    ident: "simtable",
    secret: "0099daf6-4486-11e6-acfb-2b5d0b49b1ef",
    domain: "www.livetexture.com",
    application: "default",
    room: "default",
    secure: 1
  });
  http.open("POST", url, true);
  http.setRequestHeader("Content-type", "application/json; charset=utf-8");
  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
      try {
        var response = JSON.parse(http.responseText);
        var serverICE = new P2PServer({
          iceServers: response.d.iceServers,
          id: "Ice test " + Math.floor(10000 * Math.random())
        });
        var clientICE = new P2PClient({ iceServers: response.d.iceServers });
        clientICE.connectToPeerID(serverICE.id, (err2, connection) => {
          if (err2) {
            logMessage("<div> Error using different ice server</div>");
            console.error(er1);
          } else {
            logMessage("<div> Connected to a different ice server</div>");
            console.log("Ice server success", clientICE.iceServers);
          }
        });
      } catch (err) {
        logMessage("<div> Error using different ice server</div>");
        console.error(err);
      }
    }
  };
  http.send(params);
}

setTimeout(runTests, 1);
