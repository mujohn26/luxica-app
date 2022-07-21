const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accSchema = new Schema({
	name:{
		type: String,
		required: true
	},
	manufacturer:{
		type: String,
		required: true
	},
	price:{
		type: String,
		required: true
	},
	inventory:{
		type: String,
		required: true
	},
	status:{
		type: String,
		required: true
	}
}, {timestamps: true});

const Accessory = mongoose.model('Accessory', accSchema);
module.exports = Accessory;