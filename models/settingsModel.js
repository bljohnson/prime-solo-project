var mongoose = require('mongoose');
var Schema = mongoose.Schema; // enable use of schema property

// create settingsSchema with chosen fields and data type, let MongoDB handle generating _id for each instance
var settingsSchema = new Schema ({
	status: {type: String},
      species: {type: String},
      age: {type: String},
	gender: {type: String},
      size: {type: String},
      location: {type: Number},
      radius: {type: Number},
      dogs: {type: String},
      cats: {type: String},
      kids: {type: String},
      energy: {type: String},
      breed: {type: String},
      housetrained: {type: String},
	cratetrained: {type: String}
}); // end settingsSchema

var Settings = mongoose.model('usersettings', settingsSchema); // creates model from settingsSchema called Settings, and stores in usersettings 'collection' of documents within adoptiondb

module.exports = Settings;
