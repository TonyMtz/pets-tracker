/**
 * PetController
 *
 * @description :: Server-side logic for managing Pets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function (req, res) {
    // Grab attributes from request using Ember conventions
    var newAttributes = req.param('pet');

    // Create the user object in the datastore
    Pet.create(newAttributes, function (err, newPet) {
      // If there was an error, handle it
      if (err) return res.send(err, 500);

      // Respond with the user object using Ember conventions
      res.json(newPet);
    });
  },

  update: function (req, res, next) {
    var id = req.param('id'),
      criteria = req.param('pet');

    if (!id) {
      return res.badRequest('No id provided.');
    }

    Pet.find(id, function(err, pet) {
      if (err) {
        return res.send(err, 500);
      }

      res.json(pet);
    });

    // Pet.update(id, criteria, function (err, pet) {
    //   if(pet.length === 0) return res.notFound();

    //   if (err) return next(err);

    //   res.json(pet);
    // });
  },

  xupdate: function (req, res) {
    // Grab attributes from request using Ember conventions
    var newAttributes = req.param('pet'),
      pet_id = req.param('id');

    // Create the user object in the datastore
    console.log('newAttributes: ', pet_id);
    Pet.find({ where: { id: pet_id }}).done(function (err, pet) {
      // If there was an error, handle it
      if (err) return res.send(err, 500);

      pet = newAttributes;

      pet.save(function(err) {
        if (err) return res.send(err, 500);
        // Respond with the user object using Ember conventions
        res.json(pet);
      });
    });
  },

  xfind: function(req, res) {
    Pet.find(function(err, pets) {
      if (err) {
        return res.send(err, 500);
      }

      res.json({
        pets: pets
      });
    });
  }
};

