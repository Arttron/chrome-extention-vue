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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/website/website.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/website/website.js":
/*!********************************!*\
  !*** ./src/website/website.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var appEl = document.getElementById('app');\nvar buttons;\nvar alert;\nvar timeout1;\nvar timeout2;\nvar areButtonsDisabled = false; // Set attribute for preventing redirect to the store for add button\n\nif (appEl) {\n  appEl.setAttribute('data-extension-installed', '');\n  appEl.setAttribute('data-extension-id', chrome.runtime.id);\n}\n\nchrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {\n  if (msg.event === 'logos-loaded') {\n    addClickListeners();\n  } else if (msg.event === 'page-loaded') {\n    alert = document.querySelector('.cl-logo-alert__success');\n  } else if (msg.event === 'image-added') {\n    // Added timeout for smooth button transition\n    setTimeout(function () {\n      alert = document.querySelector('.cl-logo-alert__success');\n\n      if (alert) {\n        alert.classList.add('active');\n      }\n\n      timeout1 = removeAlert();\n    }, 500);\n  } else if (msg.event === 'image-error') {\n    // Added timeout for smooth button transition\n    setTimeout(function () {\n      alert = document.querySelector('.cl-logo-alert__error');\n\n      if (alert) {\n        alert.classList.add('active');\n      }\n\n      timeout1 = removeAlert();\n    }, 500);\n  }\n});\nvar alertRemoveTimeout = 3000;\nvar alertTransitionTimeout = 300;\n\nvar removeAlert = function removeAlert() {\n  // Remove disable attribute from all buttons\n  areButtonsDisabled = false;\n  [].forEach.call(buttons, function (button) {\n    button.removeAttribute('disabled');\n  });\n  return setTimeout(function () {\n    if (alert) {\n      alert.classList.add('active-remove-transition');\n    }\n\n    timeout2 = setTimeout(function () {\n      if (alert) {\n        alert.classList.remove('active-remove-transition');\n        alert.classList.remove('active');\n      }\n    }, alertTransitionTimeout);\n  }, alertRemoveTimeout);\n};\n\nvar loadImage = function loadImage(src) {\n  chrome.runtime.sendMessage({\n    event: 'save-image',\n    // src: 'https://mondrian.mashable.com/wp-content%252Fuploads%252F2013%252F06%252FAladdin.gif%252Ffull-fit-in__1200x2000.gif?signature=u33JKEa7nZzg_CK0hdaMve9QMw8=&source=http%3A%2F%2Fmashable.com',\n    src: src\n  });\n};\n\nvar onClick = function onClick(e) {\n  var imageSrc = e.currentTarget.getAttribute('data-image');\n\n  if (!alert) {\n    alert = document.querySelector('.cl-logo-alert__success');\n  } // Add disable attribute from all buttons\n\n\n  areButtonsDisabled = true;\n  [].forEach.call(buttons, function (button) {\n    if (button) {\n      button.setAttribute('disabled', true);\n    }\n  });\n\n  if (alert && !alert.classList.contains('active')) {\n    loadImage(imageSrc);\n  } else {\n    clearTimeout(timeout2);\n    clearTimeout(timeout1);\n    alert.classList.remove('active');\n    loadImage(imageSrc);\n  }\n}; // Add image functionality\n\n\nvar addClickListeners = function addClickListeners() {\n  buttons = document.getElementsByClassName('cl-add-image');\n  [].forEach.call(buttons, function (button) {\n    button.addEventListener('click', onClick, true);\n\n    if (areButtonsDisabled) {\n      if (button) {\n        button.setAttribute('disabled', true);\n      }\n    }\n  });\n};\n\naddClickListeners();\n\n//# sourceURL=webpack:///./src/website/website.js?");

/***/ })

/******/ });