const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
require('dotenv').config({path:__dirname+'/.env'})

const openAiRoutes=require('../models/routes/openai')

const app=express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api/openai',openAiRoutes)



const PORT=process.env.PORT || 5000

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))