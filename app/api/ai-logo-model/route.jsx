import { AILogoPrompt } from "@/configs/AiModel";
import { NextResponse } from "next/server";
import axios from "axios";
import { db } from "@/configs/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export async function  POST(req){

    const {prompt,email,title,desc}=await req.json();

    try{
        //Generate ai text prompt for logo 
        
        const AiPromptResult=await AILogoPrompt.sendMessage(prompt);
        console.log(JSON.parse(AiPromptResult.response.text()))
        const AIPrompt = JSON.parse(AiPromptResult.response.text()).prompt;


        //Generate ai image for logo

        const BASE_URL = 'https://aigurulab.tech';
        const imageResponse = await axios.post(
            `${BASE_URL}/api/generate-image`,
            {
                width: 1024,
                height: 1024,
                input: AIPrompt, 
                model: 'sdxl', 
                aspectRatio: "1:1"
            },
            {
                headers: {
                    'x-api-key': process.env.AI_GURU_LAB_API_KEY,
                    'Content-Type': 'application/json',
                }
            }
        );
        const base64Image = imageResponse.data.image;
        try{
         await setDoc(doc(db,"users",email,"logos",Date.now().toString()),{
            image:base64Image,
            title:title,
            desc:desc
         })

        }
        catch(e){

        }

        // Return both the prompt and the image
        return NextResponse.json({
            prompt: AIPrompt,
            image: base64Image
        });

          
    }
    catch(e)
    {
        console.error("Error in image generation:", e);
        return NextResponse.json(
            { 
                error: "Failed to generate image",
                details: e.message 
            },
            
        );
    }


}