;(function() {
  'use strict';

  var App = this.App,
    DS = this.DS;

  App.Pet = DS.Model.extend({
    name: DS.attr('string'),
    genre: DS.attr('string'),
    sterilized: DS.attr('string'),
    comments: DS.attr('string'),
    img: DS.attr('string'),
    img_30: DS.attr('string'),
    img_100: DS.attr('string'),
    img_250: DS.attr('string'),
    isDeleted: DS.attr('boolean')
  });

  App.PetSerializer = DS.RESTSerializer.extend({
    normalizePayload: function(payload) {
      return {
        pets: payload
      };
    }
    // serialize: function(post, options) {
    //   var json = {
    //     name: post.get('name'),
    //     genre: post.get('genre'),
    //     sterilized: post.get('sterilized'),
    //     comments: post.get('comments'),
    //     img: post.get('img'),
    //     isDeleted: post.get('isDeleted')
    //   };

    //   return json;
    // }
  });
}.call(this));
