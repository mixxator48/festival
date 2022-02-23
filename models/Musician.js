const {Schema, model, Types} = require('mongoose')

const MusicianSchema = new Schema({
	name:{type: String, required:true, unique:true},
	links:[{type:String}],
	phone:{type: String},
	userId:{type: Types.ObjectId, ref: 'User'},
	imageUrl:{type: String},
	description:{type:String},
	date: {type: Date},
	city:{type:String}
})

module.exports = model('Musician', MusicianSchema)