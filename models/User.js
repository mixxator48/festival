const {Schema, model, Types} = require('mongoose')
var mongoose = require('mongoose')

const schema = new Schema({
	email:{type: String, required:true, unique:true},
	password:{type: String, required:true},
	isAdmin:{type: Boolean, required:true},
	favouriteMusician:[mongoose.Schema.Types.ObjectId],
	passes:[mongoose.Schema.Types.ObjectId]
})

module.exports = model('User',schema)