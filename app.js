const express = require('express')
const config = require('config')
const mongoose = require('mongoose');
const Role = require('./models/Roles')
const Musician = require('./models/Musician')
const Passes = require('./models/Passes')

const app = express()

app.use(express.json({extended:true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/musician', require('./routes/musician.routes'))
app.use('/api/pass',require('./routes/pass.routes'))
app.use('/api/app',require('./routes/app.routes'))

const PORT = config.get('port') || 5000



async function start(){
	try {
		await mongoose.connect(config.get('mongoUri'),{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}).then(() => console.log("Connection to DB - SUCCESS"))
		app.listen(PORT, () => {console.log(`Server is working at ${PORT}....`)})
		configureDB();
	} catch (error) {
		console.log(error.message)
	}
}

async function configureDB(){
	const admin = await Role.findOne({name:'admin'})
	const user = await Role.findOne({name:'user'})
	if (!admin) {
		const adminRole = new Role({name:'admin'}) 
		await adminRole.save()
	}
	if (!user) {
		const userRole = new Role({name:'user'}) 
		await userRole.save()
	}

	Musician.countDocuments({},async (err,count)=>{
		if (count == 0) {
			Musician.insertMany([
				{name: 'test1', links:'https://google.com', phone:'89021778101', imageUrl:'/images/1.jpg', description:'some text', date:Date.now()},
				{name: 'test2', links:'https://google.com', phone:'89021778101', imageUrl:'/images/2.jpg', description:'some text', date:Date.now()},
				{name: 'test3', links:'https://google.com', phone:'89021778101', imageUrl:'/images/3.jpg', description:'some text', date:Date.now()},
				{name: 'test4', links:'https://google.com', phone:'89021778101', imageUrl:'/images/4.jpg', description:'some text', date:Date.now()},
				{name: 'test5', links:'https://google.com', phone:'89021778101', imageUrl:'/images/5.jpg', description:'some text', date:Date.now()}
			]).then(()=>{console.log("Musicians inserted")})
		}
	})

	Passes.countDocuments({},async (err, count)=>{
		if (count == 0){
			Passes.insertMany([
				{name: 'pass1', cost: 1000, description: "Passes description!"},
				{name: 'pass2', cost: 2000, description: "Passes description!"},
				{name: 'pass3', cost: 3000, description: "Passes description!"},
				{name: 'pass4', cost: 4000, description: "Passes description!"},
			]).then(()=>console.log("Passes inserted"))
		}
	})

	console.log("DB was configured.")

}

start()