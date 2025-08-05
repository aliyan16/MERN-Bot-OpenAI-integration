const express=require('express')
const router=express.Router()
const {summarizeText}=require('../controllers/openAiController')

router.post('/summarize',summarizeText)
module.exports=router
