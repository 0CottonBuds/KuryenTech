import { GoogleGenerativeAI } from "@google/generative-ai";
import { getAppliancesOfUser, getBillsOfUser } from "./firebase";

export default async function generateInsights() {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyCwAqtEJGHHUuDQSgyhyLHW7kAAXF6l7CA"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

  var prompt =
    "I've got a data of my appliances their killo watt hour. hours per day used. and days in a week used. I also have a record of my past bills the number of killowatt our per month and its total costs. Can you give insights on my electricity consumption. Any advice will do. The following json is the data of my electricity consumption";

  prompt += "My Appliances \n";
  prompt += "Appliances : [\n";

  const appliances = await getAppliancesOfUser(
    localStorage.getItem("username")
  );

  appliances.forEach((doc) => {
    const data = doc.data();
    prompt += "{\n";
    prompt += "appliance name: " + data.name + ",\n";
    prompt += "Kilo watt per hour: " + data.KW_HR + ",\n";
    prompt += "Hours used Per Day: " + data.HR_per_day + ",\n";
    prompt += "Days used in a week: " + data.days_per_week + ",\n";
    prompt += "},\n";
  });
  prompt += "]\n";

  prompt += "My Bills: ";
  prompt += "bills: [";

  const bills = await getBillsOfUser(localStorage.getItem("username"));
  bills.forEach((doc) => {
    const data = doc.data();
    prompt += "{\n";

    prompt += "Date (MM YYYY): " + data.date + ",\n";
    prompt += "total cost PHP: " + data.total_cost + ",\n";
    prompt += "total kwh: " + data.kwH + ",\n";
    prompt += "},\n";
  });

  prompt += "]\n";

  prompt +=
    "please tell me your insight so I could improve my energy efficiency";

  console.log("finish setting up prompt: ");
  console.log(prompt);
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
}
