;(function() {
  'use strict';

  var DS = this.DS,
    Ember = this.Ember;

  this.App = Ember.Application.create();
  this.App.ApplicationAdapter = DS.RESTAdapter.extend({
    host: 'http://localhost:1337',
  });
}.call(this));
