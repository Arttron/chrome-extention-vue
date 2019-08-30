/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/background/background.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/utyls/index.js":
/*!********************************!*\
  !*** ./src/app/utyls/index.js ***!
  \********************************/
/*! exports provided: getDataUri, getDataURIFile, refreshAllGoogleTabs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getDataUri\", function() { return getDataUri; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getDataURIFile\", function() { return getDataURIFile; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"refreshAllGoogleTabs\", function() { return refreshAllGoogleTabs; });\nfunction getDataUri(url, callback) {\n  var image = new Image();\n\n  image.onload = function () {\n    var canvas = document.createElement('canvas');\n    canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size\n\n    canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size\n\n    canvas.getContext('2d').drawImage(this, 0, 0); // Get raw image data\n\n    callback(canvas.toDataURL('image/png'));\n  };\n\n  image.src = url;\n}\nfunction getDataURIFile(fileName) {\n  var fileReader = new FileReader();\n  return new Promise(function (resolve, reject) {\n    fileReader.onloadend = function () {\n      resolve({\n        data: fileReader.result,\n        src: chrome.extension.getURL(fileName)\n      });\n    };\n\n    fileReader.onerror = function (err) {\n      return reject(err);\n    };\n\n    fetch(fileName).then(function (response) {\n      if (response.status !== 200) {\n        return reject('Fetch image error');\n      }\n\n      return response.blob();\n    }).then(function (blob) {\n      fileReader.readAsDataURL(blob);\n    }).catch(function (err) {\n      return reject(err);\n    });\n  });\n}\nfunction refreshAllGoogleTabs() {\n  chrome.tabs.query({}, function (tabs) {\n    for (var i = 0; i < tabs.length; ++i) {\n      var tab = tabs[i];\n\n      if (tab.url.indexOf(\"www.google\") != -1 || tab.url.indexOf(\"chrome://newtab\") != -1 || tab.url.indexOf(\"https://custom-logo\") != -1) {\n        chrome.tabs.reload(tab.id);\n      }\n    }\n  });\n}\n\n//# sourceURL=webpack:///./src/app/utyls/index.js?");

/***/ }),

/***/ "./src/app/utyls/storaje.js":
/*!**********************************!*\
  !*** ./src/app/utyls/storaje.js ***!
  \**********************************/
/*! exports provided: saveValue, getValue, removeValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveValue\", function() { return saveValue; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getValue\", function() { return getValue; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeValue\", function() { return removeValue; });\n/**\n localStorage vs chrome storage key differences:\n User data can be automatically synced with Chrome sync (using storage.sync).\n Your extension's content scripts can directly access user data without the need for a background page.\n A user's extension settings can be persisted even when using split incognito behavior.\n It's asynchronous with bulk read and write operations, and therefore faster than the blocking and serial localStorage API.\n User data can be stored as objects (the localStorage API stores data in strings).\n Enterprise policies configured by the administrator for the extension can be read (using storage.managed with a schema).\n */\n\n/**\n * Storage type \"sync\" is only supported in CHROME\n * @see https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/sync\n * @type {string}\n */\nvar targetBrowser = 'chrome1';\nvar STORAGE_TYPE = targetBrowser == \"chrome\" ? \"sync\" : \"local\";\n/**\n * Save value to chrome storage\n * @param value  A single key to get, list of keys to get, or a dictionary specifying default values\n * An empty list or object will return an empty result object. Pass in null to get the entire contents of storage.\n * @param storageType {String} Storage type\n * @returns {Promise<Object>}\n */\n\nvar saveValue = function saveValue(value) {\n  var storageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : STORAGE_TYPE;\n  return new Promise(function (resolve, reject) {\n    chrome.storage[storageType].set(value, function () {\n      if (chrome.runtime.lastError) {\n        reject(chrome.runtime.lastError);\n      }\n\n      resolve();\n    });\n  });\n};\n/**\n * Get value from chrome storage\n * @param value {Object} An object which gives each key/value pair to update storage with.\n * Any other key/value pairs in storage will not be affected.\n * Primitive values such as numbers will serialize as expected. Values with a typeof \"object\" and \"function\"\n * will typically serialize to {}, with the exception of Array (serializes as expected),\n * Date, and Regex (serialize using their String representation).\n * @param storageType {String} Storage type\n * @returns {Promise}\n */\n\nvar getValue = function getValue(value) {\n  var storageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : STORAGE_TYPE;\n  return new Promise(function (resolve, reject) {\n    chrome.storage[storageType].get(value, function (items) {\n      if (chrome.runtime.lastError) {\n        reject(chrome.runtime.lastError);\n      }\n\n      resolve(items);\n    });\n  });\n};\n/**\n * Removes one or more items from storage.\n * @param value string or array of string keys A single key or a list of keys for items to remove.\n * @param storageType {String} Storage type\n * @returns {Promise}\n */\n\n/* exported removeValue */\n\nvar removeValue = function removeValue(value) {\n  var storageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : STORAGE_TYPE;\n  return new Promise(function (resolve, reject) {\n    chrome.storage[storageType].remove(value, function () {\n      if (chrome.runtime.lastError) {\n        reject(chrome.runtime.lastError);\n      }\n\n      resolve();\n    });\n  });\n};\n\n//# sourceURL=webpack:///./src/app/utyls/storaje.js?");

/***/ }),

/***/ "./src/background/background.js":
/*!**************************************!*\
  !*** ./src/background/background.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app_utyls_storaje__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app/utyls/storaje */ \"./src/app/utyls/storaje.js\");\n/* harmony import */ var _app_utyls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app/utyls */ \"./src/app/utyls/index.js\");\n// import googleUrls from './googleUrls';\n\n\n\nvar sendImageMessage = function sendImageMessage(data) {\n  chrome.tabs.query({\n    url: [\"https://custom-logo.loogl.net/*\", \"http://localhost:8080/*\"]\n  }, function (tabs) {\n    tabs.forEach(function (tab) {\n      chrome.tabs.sendMessage(tab.id, data);\n    });\n  });\n};\n\nchrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {\n  chrome.tabs.query({\n    active: true,\n    currentWindow: true\n  }, function (tabs) {\n    if (tabs.length) {\n      chrome.tabs.sendMessage(tabs[0].id, request);\n    }\n  });\n});\nchrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {\n  if (request.event === 'save-image') {\n    Object(_app_utyls__WEBPACK_IMPORTED_MODULE_1__[\"getDataURIFile\"])(request.src).then(function (uri) {\n      Object(_app_utyls_storaje__WEBPACK_IMPORTED_MODULE_0__[\"saveValue\"])({\n        isDisabledCustomLogo: false,\n        customLogo: uri.data\n      }).then(function () {\n        sendImageMessage({\n          event: 'image-added'\n        });\n      });\n    }, function (reason) {\n      sendImageMessage({\n        event: 'image-error'\n      });\n    });\n  }\n});\nchrome.tabs.onUpdated.addListener(function (tabId) {\n  chrome.tabs.query({\n    active: true,\n    currentWindow: true\n  }, function (tabs) {\n    if (tabs[0] && (/^https:\\/\\/custom-logo/.test(tabs[0].url) || /.+[^www]\\.google\\./.test(tabs[0].url))) {\n      chrome.pageAction.setIcon({\n        path: './images/icons/inactive.png',\n        tabId: tabs[0].id\n      });\n    }\n  });\n});\nchrome.tabs.onActivated.addListener(function (tab) {\n  chrome.tabs.query({\n    active: true,\n    currentWindow: true\n  }, function (tabs) {\n    if (tabs[0] && (/^https:\\/\\/custom-logo/.test(tabs[0].url) || /.+[^www]\\.google\\./.test(tabs[0].url))) {\n      chrome.pageAction.setIcon({\n        path: './images/icons/inactive.png',\n        tabId: tabs[0].id\n      });\n    }\n  });\n});\n\n//# sourceURL=webpack:///./src/background/background.js?");

/***/ })

/******/ });