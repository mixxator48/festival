const Router = require('express')
const Musician = require('../models/Musician')
const User = require('../models/User')
const ObjectId = require('mongoose')

const router = Router()

//api/musician/list
router.get('/list/:id', async (req, res) => {
	try {
		const data = await Musician.find()
		const userId = req.params.id
		console.log(typeof data)

		if(userId != "null"){
			console.log("UserID:",userId)
			const user = await User.findOne({_id: userId})
			const favoriteList = user.favouriteMusician
			return res.status(201).json({musician:data,favList:favoriteList})
		}else{
			console.log("USerID wasnt given...")
		}

		return res.status(201).json({musician:data})
	} catch (error) {
		res.status(500).json({message: 'Something went wrong!'})
	}
})

router.get('/favorite/:id', async(req, res) =>{
	try {
		const userId = req.params.id
		const user = await User.findOne({_id:userId})
		const favoriteList = user.favouriteMusician

		Musician.find({
			"_id":{ $in :favoriteList }
		}, function (error, result){
			if(error){
				console.log(err)
				res.send(error)
			} else{
				console.log(result)
				res.status(201).json(result)
			}
		})
		
	} catch (error) {
		res.status(500).json({message: 'Something went wrong!'})
	}
})

router.put('/setFavorite/:id', async(req, res) =>{
	try {
		const userId = req.params.id
		const musicianId = req.body.musicianId

		console.log(req.body)

		console.log('MusicianID:',musicianId)
		console.log(typeof musicianId)
		console.log('UserID:',userId)
		User.findOneAndUpdate(
			{_id:userId},
			{$push: {favouriteMusician : [musicianId]}},
			{upsert: true, new: true},
				function(err, result){
					if(err){
						console.log("update error!")
						res.send(err)
					} else{
						console.log("update success!")
						res.send(result)
					}
				}
		)
	} catch (error) {
		res.status(500).json({message: 'Something went wrong!'})
	}
})

router.put('/resetFavorite/:id', async(req, res) =>{
	try {
		const userId = req.params.id
		const musicianId = req.body.musicianId

		console.log(req.body)

		console.log('MusicianID:',musicianId)
		console.log(typeof musicianId)
		console.log('UserID:',userId)
		User.findOneAndUpdate(
			{_id:userId},
			{$pull: {favouriteMusician : musicianId}},
			{upsert: true, new: true},
				function(err, result){
					if(err){
						console.log("update error!")
						res.send(err)
					} else{
						console.log("update success!")
						res.send(result)
					}
				}
		)
	} catch (error) {
		res.status(500).json({message: 'Something went wrong!'})
	}
})

module.exports = router