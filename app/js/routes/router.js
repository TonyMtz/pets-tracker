;(function() {
  'use strict';

  var App = this.App;
    // Ember = this.Ember;

  App.Router.map(function() {
    // this.route('home');
    // this.resource('dashboard');
    this.route('dashboard', { path: 'dashboard' });
    this.resource('pets', function() {
      this.resource('pet', { path: ':pet_id' }, function() {
        this.route('events');
      });
    });
  });

  // App.IndexRoute = Ember.Route.extend({
  //   redirect: function() {
  //     this.transitionTo('dashboard');
  //   }
  // });
}.call(this));
