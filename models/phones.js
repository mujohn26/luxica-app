const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phoneSchema = new Schema({
	name:{
		type: String,
		required: true
	},
	specs:{
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

const Phone = mongoose.model('Phone', phoneSchema);
module.exports = Phone;