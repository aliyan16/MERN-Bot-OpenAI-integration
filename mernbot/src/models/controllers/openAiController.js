// const {OpenAI}=require('openai')
const {GoogleGenerativeAI}=require('@google/generative-ai')
// const openai=new OpenAI({apiKey:process.env.my_api_key})
const openai=new GoogleGenerativeAI(process.env.my_api_key)

exports.summarizeText=async(req,res)=>{
    try{
        const {userInput}=req.body
        if(!userInput){
            return res.status(400).json({error:'missing input text'})
        }
        const model=openai.getGenerativeModel({model:'gemini-2.0-flash'})
        const result=await model.generateContent({
            contents:[
                {
                    role:'user',
                    parts:[
                        {
                            text:userInput
                        }
                    ]
                }
            ]
        })
        const response=await result.response
        const text=response.text()
        res.json({result:text})
    }catch(e){
        console.error(e)
        res.status(500).json({error:'Failed to get summary from OpenAI'})
    }
}