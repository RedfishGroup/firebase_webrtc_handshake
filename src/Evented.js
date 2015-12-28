import "../bower_components/underscore/underscore-min.js"

export class Evented {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (typeof callback !== "function") return;
    if (! this.events.hasOwnProperty(eventName)) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  off(eventName, callback) {
    if (this.events.hasOwnProperty(eventName)) {
      if (typeof callback === "function") {
        this.events[eventName] = _.without(this.events[eventName], callback);
      } else {
        delete this.events[eventName];
      }
    }
  }

  fire(eventName, argument) {
    _.each(this.events[eventName], (cb) => setTimeout(() => cb(argument)));
  }

  fireAll(argument) {
    for (var k in this.events) {
      this.fire(k, argument);
    }
  }
}
