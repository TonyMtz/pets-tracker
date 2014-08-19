;(function() {
  'use strict';

  var App = this.App,
    Ember = this.Ember;

  App.PetsCreateController = Ember.ArrayController.extend({
    _setDefaults: function() {
      this.set('name', '');
      this.set('genre', '');
      this.set('sterilized', false);
      this.set('comments', '');
      this.set('img', '');
    },

    actions: {
      save: function() {
        var self = this,
          newPet = this.store.createRecord('pet', {
            name: this.get('name'),
            genre: this.get('genre'),
            sterilized: this.get('sterilized') || false,
            comments: this.get('comments'),
            img: this.get('img'),
            isDeleted: false
          });
        newPet.save().then(function() {
          self.send('close');
          self._setDefaults();
        });
      }
    }
  });
}.call(this));
