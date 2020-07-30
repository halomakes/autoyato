"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AutoYato = function AutoYato() {
  var _this = this;

  _classCallCheck(this, AutoYato);

  _defineProperty(this, "topic", void 0);

  _defineProperty(this, "sources", void 0);

  _defineProperty(this, "binder", void 0);

  _defineProperty(this, "subject", void 0);

  _defineProperty(this, "derogatory", void 0);

  _defineProperty(this, "alternative", void 0);

  _defineProperty(this, "ticks", void 0);

  _defineProperty(this, "initialize", function (topic) {
    console.info("Initializing for topic ".concat(topic));
    _this.binder = new GravyBinder(_this);

    _this.loadSources(topic);
  });

  _defineProperty(this, "setTextFields", function () {
    _this.subject = _this.topic.topic;
    _this.derogatory = _this.pickArray(_this.topic.derogatory);
    _this.alternative = _this.pickArray(_this.topic.alternative);

    _this.showFields(969, 5);
  });

  _defineProperty(this, "showFields", function (delay, max) {
    _this.ticks = 0;

    _this.binder.updateOutwardBindings();

    var interval = window.setInterval(function () {
      _this.ticks++;

      if (_this.ticks >= max) {
        window.clearInterval(interval);
      }

      _this.binder.updateOutwardBindings();
    }, delay);
  });

  _defineProperty(this, "getRandomTopic", function () {
    return _this.pickDict(_this.sources);
  });

  _defineProperty(this, "getTopic", function (topicName) {
    return _this.sources[topicName];
  });

  _defineProperty(this, "loadSources", function (topic) {
    return fetch('/topics.json').then(function (r) {
      return r.json().then(function (j) {
        _this.sources = j;
        _this.topic = topic && _this.containsKey(_this.sources, topic) ? _this.getTopic(topic) : _this.getRandomTopic();

        _this.setTextFields();
      });
    });
  });

  _defineProperty(this, "pickArray", function (array) {
    return array[Math.floor(Math.random() * array.length)];
  });

  _defineProperty(this, "pickDict", function (dictionary) {
    return dictionary[_this.pickArray(Object.keys(dictionary))];
  });

  _defineProperty(this, "containsKey", function (dictionary, key) {
    return Object.keys(dictionary).includes(key);
  });
};

var ay = new AutoYato();
ay.initialize(window.location.pathname.toLocaleLowerCase().replace(/\W/g, ''));
