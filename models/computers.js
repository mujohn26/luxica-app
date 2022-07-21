const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const compSchema = new Schema({
	brand:{
		type: String,
		required: true
	},
	model:{
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

const Computer = mongoose.model('Computer', compSchema);
module.exports = Computer;