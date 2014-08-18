/**
* Pet.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: 'string',
    genre: 'string',
    sterilized: 'string',
    comments: 'string',
    img: 'string',
    img_30: 'string',
    img_100: 'string',
    img_250: 'string',
    isDeleted: 'boolean'
  }
};

// sample
// http://localhost:1337/pets/create?name=Vivi&genre=female&sterilized=true&comments=Hembra Chihuahueña de Pelo Corto SOLO para Mascota (OVH) esterilizada.&img_100=http://i.imgur.com/vN7d9TT&img_250=http://i.imgur.com/yoPZ9DW&img=http://i.imgur.com/l69gQxv


// {
//   "name": "Vivi",
//   "genre": "female",
//   "sterilized": true,
//   "comments": "Hembra Chihuahueña de Pelo Corto SOLO para Mascota (OVH) esterilizada.",
//   "img": "http://i.imgur.com/l69gQxv",
//   "img_100": "http://i.imgur.com/vN7d9TT",
//   "img_250": "http://i.imgur.com/yoPZ9DW"
// }