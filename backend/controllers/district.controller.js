import { District } from '../models/district.model.js';
import axios from 'axios';

function parseGeminiSummary(text) {
//   const sections = {
//     goodPoints: [],
//     canBeBetter: [],
//     needsImprovement: []
//   };

//   // Normalize newlines
//   text = text.replace(/\r/g, "").trim();

//   // Extract each section using regex
//   const goodMatch = text.match(/\*\*(?:✅\s*)?Good Points(?:\s*✅)?\*\*([\s\S]*?)(?=\*\*(?:Can Be Better|🟡|Needs Improvement|🔴)|$)/);
//   const betterMatch = text.match(/\*\*(?:🟡\s*)?Can Be Better(?:\s*🟡)?\*\*([\s\S]*?)(?=\*\*(?:Needs Improvement|🔴)|$)/);
//   const badMatch = text.match(/\*\*(?:🔴\s*)?Needs Improvement(?:\s*🔴)?\*\*([\s\S]*)/);

//   const extractBullets = (section) =>
//     section ? section
//           .split("\n")
//           .map((line) => line?.replace(/^[*\-•\s]+/, "").trim())
//           .filter((line) => line.length > 0)
//       : [];

//   sections.goodPoints = extractBullets(goodMatch?.[1]);
//   sections.canBeBetter = extractBullets(betterMatch?.[1]);
//   sections.needsImprovement = extractBullets(badMatch?.[1]);

//   return sections;


const regex = /\*\*Good Points:\*\*([\s\S]*?)\*\*Can Be Better:\*\*([\s\S]*?)\*\*Needs Improvement:\*\*([\s\S]*)/;

const match = text.match(regex);

let summary = { goodPoints: [], canBeBetter: [], needsImprovement: [] };

if (match) {
  const [_, good, better, bad] = match;

  summary = {
    goodPoints: good.match(/\*\s+(.*)/g)?.map(s => s.replace(/^\*\s+/, '').trim()) || [],
    canBeBetter: better.match(/\*\s+(.*)/g)?.map(s => s.replace(/^\*\s+/, '').trim()) || [],
    needsImprovement: bad.match(/\*\s+(.*)/g)?.map(s => s.replace(/^\*\s+/, '').trim()) || []
  };
}

console.log(summary);
return summary;
}

// console.log('--- Parsing Gemini Summary Test ---');
// const text = `
// **Good Points:**
// *   High percentage of payments made within 15 days.
// *   Large number of workers employed.
// *   Significant women participation.

// **Can Be Better:**
// * Average wage rate can be better.
// *   Average employment days per household could be increased.

// **Needs Improvement:**
// *   Very few households completed 100 days of work in some months.
// `;
// console.log(parseGeminiSummary(text))
// Example usage:
const summaryText = `Here's a simplified summary of MGNREGA in Rajasthan's Ajmer district:

**✅ Good Points:**
* High percentage of payments made within 15 days.
* Large number of workers employed.
* Significant women participation.

**🟡 Can Be Better:**
* Average wage rate is relatively low.
* Average employment days per household vary across months.

**🔴 Needs Improvement:**
* Very few households completed 100 days of work in many months.
* Employment is low in some months.
`;

// console.log(parseGeminiSummary(summaryText));


const getSummaries = async (data) => {
    try {
        const prompt = `
            Based on this data, create a short MGNREGA summary divided into:
            1. Good Points
            2. Can Be Better
            3. Needs Improvement
            Keep it under 80 words, simple language and bullet points.

            Data: ${JSON.stringify(data)}
        `;

        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
            contents: [{ parts: [{ text: prompt }] }]
        },
        {
            headers: { 
                "Content-Type": "application/json",
                "X-goog-api-key": process.env.GEMINI_API_KEY 
            }
        }
        );

        // console.log('Summary response:', response.data);
        const summary = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        console.log("Summary:", summary || "No text generated");

        return summary || "No summary available.";
    } catch (error) {
        console.error('Error generating summary:', error);
    }
}

const getDistrictData = async (req, res) => {
    const { fin_year, district, state } = req.params;
    console.log(fin_year, district, state);
    if (!fin_year || !district || !state) {
        return res.status(400).json({ message: 'Financial year, district, and state are required for fetching data.' });
    }


    try {
        const districtData = await District.findOne(
            { district_name: district.toUpperCase() }
        );

        const summary = await getSummaries(districtData);
        const parsedSummary = summary ? parseGeminiSummary(summary) : {};
        console.log('Parsed Summary:', parsedSummary);

        if (!districtData) {
            return res.status(404).json({ message: 'Data not found for the specified district and financial year.' });
        }

        if (districtData.state_name.toUpperCase() !== state.toUpperCase()) {
            return res.status(404).json({ message: 'Data not found for the specified state and district.' });
        }

        const monthlyData = districtData.monthly_data.filter(data => data.fin_year === fin_year);

        if (!monthlyData.length) {
            console.log('No monthly data found for the specified financial year.');
            return res.status(404).json({ message: 'No data available for the specified financial year.' });
        }
        
        res.status(200).json({
            monthlyData,
            summary: parsedSummary
        });
    } catch (error) {
        console.error('Error fetching district data:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const compareDistricts = async (req, res) => {
    const { fin_year, district1, district2 } = req.params;
    
    if (!fin_year || !district1 || !district2) {
        return res.status(400).json({ message: 'Financial year and both districts are required for comparison.' });
    }

    try {
        const firstDistrictData = await District.findOne(
            { district_name: district1.toUpperCase() }
        );

        const secondDistrictData = await District.findOne(
            { district_name: district2.toUpperCase() }
        );
        
        if (!firstDistrictData || !secondDistrictData) {
            return res.status(404).json({ message: 'Data not found for one or both specified districts.' });
        }

        const firstMonthlyData = firstDistrictData.monthly_data.filter(data => data.fin_year === fin_year);

        const secondMonthlyData = secondDistrictData.monthly_data.filter(data => data.fin_year === fin_year);

        if (!firstMonthlyData.length && !secondMonthlyData.length) {
            return res.status(404).json({ message: 'No data available for the specified financial year in both districts.' });
        }

        res.status(200).json({
            district1: firstMonthlyData || { message: 'No data available for the specified financial year.' },
            district2: secondMonthlyData || { message: 'No data available for the specified financial year.' }
        });
    } catch (error) {
        console.error('Error comparing districts:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export { getDistrictData, compareDistricts };