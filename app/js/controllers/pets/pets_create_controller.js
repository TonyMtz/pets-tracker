;(function() {
  'use strict';

  var App = this.App,
    Ember = this.Ember;

  App.PetsCreateController = Ember.ArrayController.extend({
    actions: {
      save: function() {
        var newPet = this.store.createRecord('pet', {
          name: this.get('name'),
          genre: this.get('genre'),
          sterilized: this.get('sterilized') || false,
          comments: this.get('comments'),
          img: this.get('img'),
          isDeleted: false
        });
        newPet.save();
      }
    }
  });
}.call(this));
