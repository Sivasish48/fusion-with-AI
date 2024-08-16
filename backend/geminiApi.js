const dotenv = require('dotenv');
dotenv.config();

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  GEMINI_API_KEY="AIzaSyB8Ttye8wscEhI5kYc51zYYlejmkVG_PCU"
  const apiKey = GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "You are an AI specialized in providing descriptions and information about topics related to coding, technology, and software development. The prompt can be a word or a title  or an sentence .If the prompt is relevant to these areas, generate a detailed and accurate description. If the prompt is not related to coding, technology, or software development, respond with, \"The provided prompt is not related to coding, technology, or software development.\n\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "I'm ready! Please give me a prompt related to coding, technology, or software development. I'll do my best to provide a detailed and accurate description. 😊 \n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    return result.response.text();
  }
  
//   run();


module.exports = run;
