export var settings={
  firebaseURL : "https://torrid-torch-716.firebaseio.com/",
  // Was having a bug where the WIFI router would crash if the chunk size was bigger than 2^10
  CHUNK_SIZE : Math.pow(2,10), // size in bytes of the chunks. 2^16 is just under the limit in chrome.
  ICE_SERVERS: [
    {
      "url": "stun:23.21.150.121",
      "urls": "stun:23.21.150.121"
    },
    {
      "url": "turn:global.turn.twilio.com:3478?transport=udp",
      "username": "508d1e639868dc17f5da97a75b1d3b43bf2fc6d11e4e863678501db568b5665c",
      "credential": "W5GTdhQQ6DqOD7k6bS8+xZVNQXm+fgLXSEQpN8bTe70=",
      "urls": "turn:global.turn.twilio.com:3478?transport=udp"
    }
  ]

}
