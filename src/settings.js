export var settings={
  firebaseURL : "https://torrid-torch-716.firebaseio.com/"
  // Was having a bug where the WIFI router would crash if the chunk size was bigger than 2^10
  CHUNK_SIZE : Math.pow(2,10) // size in bytes of the chunks. 2^16 is just under the limit in chrome.
                            // Was
}
