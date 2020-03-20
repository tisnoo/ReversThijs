"use strict";

var apiUrl = 'url/super/duper/game';

var Game = function (url) {
  console.log(url); // Private function init

  var privateInit = function privateInit(callback) {
    console.log('Private information!');
    callback();
  };

  var _getCurrentGameState = function _getCurrentGameState() {
    stateMap.gameState = Game.Model.getGameState();
    console.log(stateMap.gameState);
  };

  var stateMap = {
    gameState: 0
  }; // Waarde/object geretourneerd aan de outer scope

  return {
    init: privateInit,
    getCurrentGameState: _getCurrentGameState
  };
}(apiUrl);

Game.Data = function () {
  //Api key: 91803eeba9eb3fb7b32c8f2aac031498
  var get = function get(url) {
    if (stateMap.environment == 'production') {
      return $.get(url).then(function (r) {
        return r;
      })["catch"](function (e) {
        console.log(e.message);
      });
    } else if (stateMap.environment == 'development') {
      return getMockData(url);
    }
  };

  var privateInit = function privateInit() {
    if (stateMap.environment != 'development' && stateMap.environment != 'production') {
      return new Error("De environment is niet development of production");
    } else {
      console.log("Hallo, vanuit de submodule data");
    }
  };

  var getMockData = function getMockData(url) {
    var mockData = configMap.mock;
    return new Promise(function (resolve, reject) {
      resolve(mockData);
    });
  };

  var stateMap = {
    environment: 'development'
  };
  var configMap = {
    api: "temp",
    apiKey: "91803eeba9eb3fb7b32c8f2aac031498",
    mock: [{
      url: "api/Spel/Beurt",
      data: 1
    }]
  };
  return {
    init: privateInit,
    get: get
  };
}();

Game.Model = function () {
  var privateInit = function privateInit() {
    console.log("Hallo, vanuit de submodule model");
  };

  var _getGameState = function _getGameState() {
    var spelerAanZet;
    Game.Data.get("test").then(function (data) {
      spelerAanZet = data[0].data;
    })["catch"](function (e) {
      return Error("Promise is niet goed");
    });

    if (spelerAanZet == 0 || spelerAanZet == 1 || spelerAanZet == 2) {
      return spelerAanZet;
    } else {
      return Error("Verkeerde gegeven");
    }
  };

  var configMap = {
    api: "temp"
  };
  return {
    getGameState: _getGameState,
    init: privateInit
  };
}();

Game.reversi = function () {
  var privateInit = function privateInit() {
    console.log("Hallo, vanuit de submodule reversi");
  };

  var configMap = {
    api: "temp"
  };
  return {
    init: privateInit
  };
}();