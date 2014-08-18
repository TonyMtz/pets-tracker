;(function() {
  'use strict';

  var App = this.App,
    Ember = this.Ember;

  App.PetsRoute = Ember.Route.extend({
    model: function() {
      return this.store.find('pet');
    },

    actions: {
      openCreateModal: function() {
        this._super.apply(this, arguments);

        this.render('pets.create', {
          into: 'application',
          outlet: 'modal',
          view: 'modal'
        });
      },

      delete: function(pet) {
        pet.deleteRecord();
        // pet.get('isDeleted');
        pet.save();
      },

      close: function() {
        this.disconnectOutlet({outlet: 'modal', parentView: 'application'});
      },
    }
  });

  // App.PetsCreateRoute = Ember.Route.extend({});

  App.PetEventsRoute = Ember.Route.extend({
    model: function() {
      return this.modelFor('pet').get('events');
    },

    setupController: function(controller, model) {
      this._super(controller, model);
      controller.set('pet', this.modelFor('pet'));
    }
  });
}.call(this));
