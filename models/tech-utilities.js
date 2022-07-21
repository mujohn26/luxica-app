const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const utilSchema = new Schema({
	name:{
		type: String,
		required: true
	},
	type:{
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

const TechUtil = mongoose.model('TechUtil', utilSchema);
module.exports = TechUtil;