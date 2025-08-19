import { GoogleGenAI, Type } from "@google/genai";
import type { CakeIdea } from '../types.ts';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    ideas: {
      type: Type.ARRAY,
      description: "An array of 2-3 creative and appealing cake ideas.",
      items: {
        type: Type.OBJECT,
        required: ["name", "description", "flavors"],
        properties: {
          name: {
            type: Type.STRING,
            description: "A creative and appealing name for the cake concept in Persian.",
          },
          description: {
            type: Type.STRING,
            description: "A detailed and imaginative visual description of the cake's design, textures, and decorative elements in Persian.",
          },
          flavors: {
            type: Type.ARRAY,
            description: "An array of 3 creative and complementary flavor combinations in Persian (e.g., 'موس شکلات سفید با ژله توت‌فرنگی و کرم وانیل').",
            items: { type: Type.STRING },
          },
        },
      },
    },
  },
};

export const generateCakeIdeas = async (prompt: string): Promise<CakeIdea[]> => {
  try {
    const systemInstruction = `You are an expert cake designer AI assistant for a luxury cake brand named "کیک‌آرت" (Cake Art). Your goal is to help users brainstorm beautiful and unique cake ideas based on their preferences (occasion, style, color).
Provide 2-3 distinct, creative, and appealing cake concepts.
Your tone should be inspiring, elegant, and professional, while still being creative.
All output MUST be in Persian.
For each concept, provide:
1.  A creative and appealing name ('name').
2.  A detailed visual description ('description') of the cake's design, textures, and decorative elements.
3.  An array of three interesting and complementary flavor combinations ('flavors').`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });
    
    const responseText = response.text;
    const parsedJson = JSON.parse(responseText);
    
    return parsedJson.ideas || [];

  } catch (e: unknown) {
    console.error("Error generating cake ideas:", e);
    throw new Error("متاسفانه در استودیو طراحی مشکلی پیش آمده. لطفا لحظاتی دیگر دوباره تلاش کنید.");
  }
};