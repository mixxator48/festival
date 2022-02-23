const {Schema, model, Types} = require('mongoose')

const PassesSchema = new Schema({
	name:{type: String, required:true, unique:true},
	cost: {type: Number, required:true},
	description: {type: String}
})

module.exports = model('Pass', PassesSchema)