;(function() {
  'use strict';

  var App = this.App,
    Ember = this.Ember;

  App.PetsController = Ember.ArrayController.extend({
    actions: {
      delete: function(pet) {
        var self = this;
        pet.set('isDeleted', true);
        pet.save().then(function() {
          self.get('model').removeObject(pet);
        });
      }
    }
  });
}.call(this));
