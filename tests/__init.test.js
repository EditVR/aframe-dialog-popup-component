/* global sinon, setup, teardown */

/**
 * __init.test.js is run before every test case.
 */
window.debug = true;
const { AScene } = require('aframe');

navigator.getVRDisplays = function getVRDisplays() {
  const resolvePromise = Promise.resolve();
  const mockVRDisplay = {
    requestPresent: resolvePromise,
    exitPresent: resolvePromise,
    getPose() {
      return { orientation: null, position: null };
    },
    requestAnimationFrame() {
      return 1;
    }
  };
  return Promise.resolve([mockVRDisplay]);
};

setup(function setup() {
  this.sinon = sinon.sandbox.create();
  // Stubs to not create a WebGL context since Travis CI runs headless.
  this.sinon.stub(AScene.prototype, 'render');
  this.sinon.stub(AScene.prototype, 'resize');
  this.sinon.stub(AScene.prototype, 'setupRenderer');
});

teardown(function teardown() {
  // Clean up any attached elements.
  const attachedEls = ['canvas', 'a-assets', 'a-scene'];
  const els = document.querySelectorAll(attachedEls.join(','));
  for (let i = 0; i < els.length; i++) {
    els[i].parentNode.removeChild(els[i]);
  }
  this.sinon.restore();
});
