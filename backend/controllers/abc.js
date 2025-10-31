const text = `
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
`;

console.log(parseGeminiSummaries(text));


function parseGeminiSummaries(text) {
  // --- Extract English and Hindi sections ---
  const englishRegex = /\*\*English\*\*([\s\S]*?)(?=\*\*Hindi\*\*|$)/;
  const hindiRegex = /\*\*Hindi\*\*([\s\S]*)/;

  const englishMatch = text.match(englishRegex);
  const hindiMatch = text.match(hindiRegex);

  const englishText = englishMatch ? englishMatch[1].trim() : "";
  const hindiText = hindiMatch ? hindiMatch[1].trim() : "";

  // --- Helper function to parse a section ---
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

  // --- Parse both sections ---
  const englishSummary = englishText ? parseSection(englishText, "en") : null;
  const hindiSummary = hindiText ? parseSection(hindiText, "hi") : null;

  return { english: englishSummary, hindi: hindiSummary };
}
