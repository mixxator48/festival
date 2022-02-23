const Router = require('express')
const Pass = require('../models/Passes')
const User = require('../models/User')

const router = Router()

//api/pass/list
router.get('/list/:id', async (req, res) => {
	try {
		const data = await Pass.find()
		const userId = req.params.id
		
		if (userId != "null") {
			const user = await User.findOne({_id:userId})
			const usersPasses = user.passes
			return res.status(201).json({passes:data,boughtList:usersPasses})
		}else{
			console.log("UserId wasnt given..")
		}
		return res.status(201).json({passes:data})
	} catch (error) {
		res.status(500).json({message: 'Something went wrong!'})
	}
})

//api/pass/:id
router.get('/:id', async(req, res)=>{
	try {
		const userId = req.params.id
		const user = await User.findOne({_id: userId})

		const usersPasses = user.passes

	} catch (error) {
		res.status(500).json({message: 'Something went wrong!'})
	}
})

//api/pass/buy/:id
router.put('/buy/:id', async (req, res) => {
	try {
		const userId = req.params.id
		const passId = req.body.passId
		console.log(passId)
		User.findOneAndUpdate(
			{_id:userId},
			{$push: {passes: [passId]}},
			{upsert: true, new: true},
				function(err, result){
					if(err){
						console.log("update error!")
						res.send(err)
					}else{
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