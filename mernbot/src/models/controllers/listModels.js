const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: __dirname + '/../.env' });

const openai = new GoogleGenerativeAI(process.env.my_api_key);

async function listModels() {
  try {
    const models = await openai.listModels();
    console.log('Available models:', models);
  } catch (e) {
    console.error('Error listing models:', e);
  }
}

listModels();