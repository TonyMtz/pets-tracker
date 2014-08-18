;(function() {
  'use strict';

  var App = this.App,
    Ember = this.Ember;

  App.ExcerptTooltipComponent = Ember.Component.extend({
    content: '',
    max: 30,
    position: 'bottom',

    didInsertElement: function () {
      Ember.run.scheduleOnce('afterRender', this, this._scheduledEvents);
    },

    contentExcerpt: function() {
      var paragraph = this.get('content'),
        length = this.get('max'),
        excerpt = paragraph.substr(0, length);

      if (paragraph.length > length) {
        excerpt += '...';
      }

      return excerpt;
    }.property('content', 'max'),

    _scheduledEvents: function () {
      this.$().find('p').tooltip();
    }
  });
}.call(this));
