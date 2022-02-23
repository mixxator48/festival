const {Schema, model, Types} = require('mongoose')

const RolesSchema = new Schema({
	name:{type:String, required:true, unique:true}
})

module.exports = model('Role',RolesSchema)