const Router = require('express')
const {check, validationResult} = require('express-validator')
const Application = require('../models/Application.js')

const router = Router()

//api/app/submit
router.post(
	'sub',
	[
		check('phone','Неверно указан номер').isLength({min:11, max:11}),
		check('name','Неверно указано название').isLength({min:1}),
		check('links','Неверно указаны ссылки').isLength({min:0}),
		check('city','Неверно указан город').isLength({min:0}),
		check('description','Неверно указано описание').isLength({min:0}),
	],
	async(req, res)=>{
		try {
			const errors = validationResult(req)

			if(!errors.isEmpty()){
				return res.status(400).json({
					errors:errors.array(),
					message: 'Некорректные данные'
				})
			}

			const {name, phone, links, city, description} = req.body;

			const tempApp = await Application.findOne({artist: {name, phone}})

			if(tempApp){
				return res.status(400).json({message:'Такая заявка уже существует'})
			}

			const app = new Application({artist:{
											name:name,
											links:links,
											phone:phone,
											description:description,
											city:city}, status:"Новая заявка"})

			await app.save()

			res.status(201).json({message: 'Заявка была создана'})

		} catch (error) {
			res.status(500).json({message:'something went wrong!'})
		}
	}
)

module.exports = router