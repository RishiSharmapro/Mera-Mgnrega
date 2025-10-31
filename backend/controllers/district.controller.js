import { District } from '../models/district.model.js';
import axios from 'axios';
import { Summary } from '../models/summary.model.js';

function parseGeminiSummaries(text) {
  const englishRegex = /\*\*English\*\*([\s\S]*?)(?=\*\*Hindi\*\*|$)/;
  const hindiRegex = /\*\*Hindi\*\*([\s\S]*)/;

  const englishMatch = text.match(englishRegex);
  const hindiMatch = text.match(hindiRegex);

  const englishText = englishMatch ? englishMatch[1].trim() : "";
  const hindiText = hindiMatch ? hindiMatch[1].trim() : "";

  function parseSection(text, lang = "en") {
    const regex =
      lang === "hi"
        ? /\*\*अच्छे पहलू:\*\*([\s\S]*?)\*\*बेहतर किया जा सकता है:\*\*([\s\S]*?)\*\*सुधार की आवश्यकता:\*\*([\s\S]*)/
        : /\*\*Good Points:\*\*([\s\S]*?)\*\*Can Be Better:\*\*([\s\S]*?)\*\*Needs Improvement:\*\*([\s\S]*)/;

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

    return summary;
  }

  const englishSummary = englishText ? parseSection(englishText, "en") : null;
  const hindiSummary = hindiText ? parseSection(hindiText, "hi") : null;

  return { english: englishSummary, hindi: hindiSummary };
}

const getSummaries = async (data) => {
    try {
        const prompt = `
            Based on this data, create a short MGNREGA summary divided into:
            1. Good Points
            2. Can Be Better
            3. Needs Improvement
            Keep it under 80 words, simple language and bullet points.
            The output should be in 2 languages - English and Hindi.
            Provide the output in the following format:
            
            **Good Points:**
            * Point 1
            * Point 2

            **Can Be Better:**
            * Point 1
            * Point 2

            **Needs Improvement:**
            * Point 1
            * Point 2
            Example Output:
            **English**

            **Good Points:**
            * Provides rural employment opportunities.
            * Helps create rural infrastructure.

            **Can Be Better:**
            * Wage rates could be higher.
            * Timely payment of wages needs improvement.

            **Needs Improvement:**
            * Corruption and leakages need to be addressed.
            * Focus on creating more durable assets.

            **Hindi**

            **अच्छे पहलू:**
            * ग्रामीण रोजगार के अवसर प्रदान करता है।
            * ग्रामीण बुनियादी ढांचे के निर्माण में मदद करता है।

            **बेहतर किया जा सकता है:**
            * मजदूरी दरें अधिक हो सकती हैं।
            * मजदूरी का समय पर भुगतान में सुधार की आवश्यकता है।

            **सुधार की आवश्यकता:**
            * भ्रष्टाचार और रिसाव को दूर करने की जरूरत है।
            * अधिक टिकाऊ संपत्ति बनाने पर ध्यान दें।

            Data: ${JSON.stringify(data)}
        `;

        const response = await axios.post(
            process.env.GEMINI_API,
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

        const summary = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

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
        const data = await District.aggregate([
            {
                $match: {
                    district_name: district.toUpperCase(),
                    state_name: state.toUpperCase()
                }
            },
            {
                $lookup: {
                    from: "summaries",
                    localField: "state_code",
                    foreignField: "state_code",
                    as: "summaries"
                }
            },
            {
                $addFields: {
                    summary: {
                        $arrayElemAt: ["$summaries", 0]
                    }
                }
            }
        ]);

        const districtData = data[0];
        if (!districtData) {
            return res.status(404).json({ message: 'Data not found for the specified district or financial year.' });
        }

        if (!districtData.summary.summary?.english?.goodPoints) {
            const summary = await getSummaries(districtData);
            const parsedSummary = summary ? parseGeminiSummaries(summary) : {};
            console.log('Parsed Summary:', parsedSummary);
            districtData.summary = parsedSummary;
            // Save or update the summary in the database
            await Summary.create({
                state_code: districtData.state_code,
                fin_year: fin_year,
                summary: parsedSummary
            });
            console.log('Summary saved/updated in the database.');
        }

        const monthlyData = districtData.monthly_data.filter(data => data.fin_year === fin_year);

        if (!monthlyData.length) {
            return res.status(404).json({ message: 'No data available for the specified financial year.' });
        }

        res.status(200).json({
            monthlyData,
            summary: districtData.summary.summary
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