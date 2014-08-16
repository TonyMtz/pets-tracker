;(function() {
  'use strict';

  var App = this.App;
  App.Router.map(function() {
    this.resource('pets', { path: '/' });
  });
}.call(this));
