;(function() {
  'use strict';

  var App = this.App,
    Ember = this.Ember;

  App.ModalView = Ember.View.extend({
    didInsertElement: function() {
      Ember.run.next(this, function() {
        this.$('.modal, .modal-backdrop').addClass('in');
      });
    },

    layoutName: 'modal_layout',

    actions: {
      close: function() {
        var self = this;

        this.$('.modal, .modal-backdrop').one('transitionend', function() {
          self.controller.send('close');
        });

        this.$('.modal').removeClass('in');
      }
    }
  });
}.call(this));
