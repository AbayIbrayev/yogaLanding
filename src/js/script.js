require('nodelist-foreach-polyfill'); //for forEach method in old IE browsers
require('formdata-polyfill'); //for the forms data in the old browsers
/* --------------- checks for the whole DOM tree to be loaded --------------- */
window.addEventListener('DOMContentLoaded', function() {
  'use strict';
  let calc = require('./parts/calculator.js'),
      form = require('./parts/form.js'),
      slider = require('./parts/slider.js'),
      tabs = require('./parts/tabs.js'),
      timer = require('./parts/timer.js'),
      modal = require('./parts/modal.js');

  calc();
  form();
  slider();
  tabs();
  timer();
  modal();
});