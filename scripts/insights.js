import generateInsights from "./ai-consultation";
// import DOMPurify from "dompurify";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

document.addEventListener("DOMContentLoaded", async () => {
    console.log("generating insights")
    const ai_response = await generateInsights();
    document.getElementById("insight").innerHTML = marked.parse(ai_response);
});
