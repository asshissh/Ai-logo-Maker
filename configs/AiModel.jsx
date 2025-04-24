const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");


const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-pro-exp-03-25",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,

    responseMimeType: "application/json",
};

export const AIDesignIdea = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                {
                    // The user's previous request
                    text: "Based on Logo of type Modern Mascot Generate a text prompt to create Logo for Logo title/Brand name :Indian spices with decription: Indian Resturant and refering to prompt: Create a minimalist and modern logo design that is clean, simple, and visually appealing. The logo should be easy to recognize and remember, and it should be versatile enough to be used in a variety of contexts. Use a combination of typography and simple geometric shapes to create a visually striking and memorable design. The logo should be timeless and elegant, and it should convey a sense of professionalism and sophistication.. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format wihtout any text description"
                }
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"ideas\": [\n    \"Friendly Elephant Chef Mascot\",\n    \"Stylized Dancing Spice Character\",\n    \"Modern Peacock Mascot Logo\",\n    \"Smiling Turbaned Spice Mascot\",\n    \"Minimalist Tiger Chef Mascot\"\n  ]\n}\n```" }
            ],

        },

    ],
});
   
export const AILogoPrompt = model.startChat({
  generationConfig,
  history: [
      {
          role: "user",
          parts: [{ text: "Vintage circular logo for 'indian army' (force theme) in soft purples. JSON: {prompt:''}" }],
      },
      {
          role: "model",
          parts: [{ text: `{"prompt":"Vintage circular 'indian army' logo with force emblem (swords/lion) in soft purples, decorative text, hand-drawn style"}` }],
      },
  ],
});