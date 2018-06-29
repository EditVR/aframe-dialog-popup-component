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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error(
    'Component attempted to register before AFRAME was available.'
  );
}

/**
 * Dialog Popup component for A-Frame.
 */
AFRAME.registerComponent('dialog-popup', {
  schema: {
    title: {
      type: 'string',
      defailt: 'New Dialog'
    },
    body: {
      type: 'string',
      defailt: 'This dialog has no body yet.'
    },
    image: {
      type: 'string',
      default: ''
    },
    openOn: {
      type: 'string',
      default: 'click'
    },
    openIconImage: {
      type: 'asset',
      default: './assets/info.jpg'
    },
    openIconRadius: {
      type: 'number',
      default: 0.3
    },
    openIconColor: {
      type: 'string',
      default: 'white'
    },
    closeIconImage: {
      type: 'asset',
      default: './assets/close.jpg'
    },
    closeIconRadius: {
      type: 'number',
      default: 0.3
    },
    closeIconColor: {
      type: 'string',
      default: 'white'
    },
    dialogBoxWidth: {
      type: 'number',
      default: 4
    },
    dialogBoxHeight: {
      type: 'number',
      default: 4
    },
    dialogBoxColor: {
      type: 'string',
      default: 'white'
    }
  },
  multiple: true,
  isOpen: false,
  dialogPlane: null,
  /**
   * Spawns the entities required to support this dialog.
   */
  init() {
    this.spawnEntities();
  },
  /**
   * Handles opening and closing the dialog plane.
   */
  toggleDialogOpen() {
    this.isOpen = !this.isOpen;
    if (this.dialogPlane) {
      this.dialogPlane.setAttribute('visible', this.isOpen);
    }
  },
  /**
   * Generates the open icon.
   */
  generateOpenIcon() {
    const openIcon = document.createElement('a-entity');
    openIcon.setAttribute('id', `${this.el.getAttribute('id')}--open-icon`);
    openIcon.setAttribute('position', this.el.getAttribute('position'));
    openIcon.setAttribute('geometry', {
      primitive: 'circle',
      radius: this.data.openIconRadius
    });
    openIcon.setAttribute('material', {
      color: this.data.openIconColor,
      src: this.data.openIconImage
    });

    openIcon.addEventListener(
      this.data.openOn,
      this.toggleDialogOpen.bind(this)
    );
    return openIcon;
  },
  /**
   * Generates the close icon.
   */
  generateCloseIcon() {
    const closeIcon = document.createElement('a-entity');
    closeIcon.setAttribute('id', `${this.el.getAttribute('id')}--close-icon`);
    closeIcon.setAttribute('position', {
      x: this.data.dialogBoxWidth / 2,
      y: this.data.dialogBoxHeight / 2,
      z: 0.01
    });
    closeIcon.setAttribute('geometry', {
      primitive: 'circle',
      radius: this.data.closeIconRadius
    });
    closeIcon.setAttribute('material', {
      color: this.data.closeIconColor,
      src: this.data.closeIconImage
    });

    closeIcon.addEventListener(
      this.data.openOn,
      this.toggleDialogOpen.bind(this)
    );
    return closeIcon;
  },
  /**
   * Generates the dialog plane.
   */
  generateDialogPlane() {
    const plane = document.createElement('a-entity');

    // The dialog should always be a little closer to the camera than the icon.
    const position = Object.assign({}, this.el.getAttribute('position'));
    position.z += 1;

    plane.setAttribute('visible', false);
    plane.setAttribute('position', position);
    plane.setAttribute('geometry', {
      primitive: 'plane',
      width: this.data.dialogBoxWidth,
      height: this.data.dialogBoxHeight
    });

    plane.setAttribute('material', {
      color: this.data.dialogBoxColor
    });

    plane.appendChild(this.generateCloseIcon());
    this.dialogPlane = plane;
    return plane;
  },
  spawnEntities() {
    const wrapper = document.createElement('a-entity');
    wrapper.setAttribute('id', `${this.el.getAttribute('id')}--wrapper`);
    wrapper.appendChild(this.generateOpenIcon());
    wrapper.appendChild(this.generateDialogPlane());
    this.el.sceneEl.appendChild(wrapper);
  },
  update() {},
  remove() {}
});


/***/ })
/******/ ]);