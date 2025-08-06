const { type } = require('@testing-library/user-event/dist/type')
const mongoose=require('mongoose')

const RegisterAccountsSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    gender:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
})


module.exports=mongoose.model('RegisterAccounts',RegisterAccountsSchema)