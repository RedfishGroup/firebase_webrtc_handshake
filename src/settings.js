export var settings = {
    // Get a reference to the database service

    // Was having a bug where the WIFI router would crash if the chunk size was bigger than 2^10
    CHUNK_SIZE: Math.pow(2, 14), // size in bytes of the chunks. 2^14 is just under the limit in chrome.
    ICE_SERVERS: [
        {
            url: 'stun:23.21.150.121',
            urls: 'stun:23.21.150.121',
        },
        {
            url: 'turn:global.turn.twilio.com:3478?transport=udp',
            username:
                'f98c05f3b1e0096319172bc9e94782fd417b5128f8921ed1b77ac9b4e73b3ce2',
            urls: 'turn:global.turn.twilio.com:3478?transport=udp',
            credential: '5eyxPwW/ubyxf0u1zuLhhqNdRxM3oFqGvYnxJw7uYxQ=',
        },
        {
            url: 'turn:global.turn.twilio.com:3478?transport=tcp',
            username:
                'f98c05f3b1e0096319172bc9e94782fd417b5128f8921ed1b77ac9b4e73b3ce2',
            urls: 'turn:global.turn.twilio.com:3478?transport=tcp',
            credential: '5eyxPwW/ubyxf0u1zuLhhqNdRxM3oFqGvYnxJw7uYxQ=',
        },
        {
            url: 'turn:global.turn.twilio.com:443?transport=tcp',
            username:
                'f98c05f3b1e0096319172bc9e94782fd417b5128f8921ed1b77ac9b4e73b3ce2',
            urls: 'turn:global.turn.twilio.com:443?transport=tcp',
            credential: '5eyxPwW/ubyxf0u1zuLhhqNdRxM3oFqGvYnxJw7uYxQ=',
        },
    ],
    POLLING_FREQUENCY: 30000,
    debug: false,
}

