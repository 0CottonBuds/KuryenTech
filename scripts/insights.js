import generateInsights from "./ai-consultation";

document.addEventListener("DOMContentLoaded", async () => {
    console.log("generating insights")
  document.getElementById("insight").innerHTML = await generateInsights();
});
