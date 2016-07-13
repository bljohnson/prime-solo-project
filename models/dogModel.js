var mongoose = require('mongoose');
var Schema = mongoose.Schema; // enable use of schema property

// create dogSchema with chosen fields and data type, let MongoDB handle generating _id for each instance
var dogSchema = new Schema ({
	name: {type: String},
      age: {type: String},
	exact_birthdate: {type: String},
	gender: {type: String},
	breed: {type: String},
	primary_breed: {type: String},
	size: {type: String},
	location: {type: Number},
	energy: {type: String},
	dog_friendly: {type: String},
	cat_friendly: {type: String},
	kid_friendly: {type: String},
	housetrained: {type: String},
	cratetrained: {type: String},
	description: {type: String},
	adoption_fee: {type: Number},
	animal_url: {type: String},
	images: {type: String}
}); // end dogSchema

var Dog = mongoose.model('favoritedogs', dogSchema); // creates model from dogSchema called Dog, and stores in favoritedogs 'collection' of documents within adoptiondb

module.exports = Dog;
