const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
require('dotenv').config({path:__dirname+'/.env'})

const RegisterAccounts=require('./schema/register')
const bcrypt=require('bcrypt')

const openAiRoutes=require('../models/routes/openai')

const app=express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api/openai',openAiRoutes)




app.post('/register',async(req,res)=>{
    try{
        const {firstName,lastName,email,password,gender}=req.body
        const user=await RegisterAccounts.findOne({email})
        if(user){
            return res.status(400).json({error:'User already exists'})
        }
        const hashing=20
        const hashedPassword=await bcrypt.hash(password,hashing)
        const newUser=new RegisterAccounts({firstName,lastName,email,password:hashedPassword,gender})
        await newUser.save()
        res.status(201).json({message:'Account created successfully'})
    }catch(e){
        console.error(e)
        res.status(500).json({error:'Server error'})

    }
})




const PORT=process.env.PORT || 5000

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))