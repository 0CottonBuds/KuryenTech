import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function generateInsights(){
    const genAI = new GoogleGenerativeAI("AIzaSyCwAqtEJGHHUuDQSgyhyLHW7kAAXF6l7CA");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Write a story about a magic backpack.";

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
}