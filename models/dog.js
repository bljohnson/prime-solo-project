var mongoose = require('mongoose');
var Schema = mongoose.Schema; // enable use of schema property

// create dogSchema with chosen fields and data type, let MongoDB handle generating _id for each instance
var dogSchema = new Schema ({
	name: {type: String},
      age: {type: String},
      breed: {type: String},
	gender: {type: String}
}); // end dogSchema

var Dog = mongoose.model('favoritedogs', dogSchema); // creates model from dogSchema called Dog, and stores in favoritedogs 'collection' of documents within adoptiondb

module.exports = Dog;
