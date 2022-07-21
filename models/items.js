const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
	name:{
		type: String,
		required: true
	},
	brand:{
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

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;