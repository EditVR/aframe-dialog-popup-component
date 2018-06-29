/* global assert, setup, suite, test */
require('aframe');
require('../index.js');
const { entityFactory } = require('./helpers');

suite('dialog-popup component', () => {
  let component;
  let el;

  setup(done => {
    el = entityFactory();
    el.addEventListener('componentinitialized', evt => {
      if (evt.detail.name !== 'dialog-popup') {
        return;
      }
      component = el.components['dialog-popup'];
      done();
    });
    el.setAttribute('dialog-popup', {});
  });

  suite('foo property', () => {
    test('is good', () => {
      assert.equal(1, 1);
    });
  });
});
