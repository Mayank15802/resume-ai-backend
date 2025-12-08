// Helper
const clamp = (v, max) => (v < 0 ? 0 : v > max ? max : v);

export const calculateFairAtsScore = (analysis) => {
  const kw = analysis.keyword_match || { matched: [], missing: [] };
  const grammar = analysis.grammar_issues || [];

  const matched = kw.matched.length;
  const missing = kw.missing.length;
  const total = matched + missing;

  // -------- 1) Keyword score (30 pts)
  let keywordScore = 0;
  if (total === 0) keywordScore = 18;
  else {
    const r = matched / total;
    if (r >= 0.8) keywordScore = 27 + (r - 0.8) * 15;
    else if (r >= 0.6) keywordScore = 22 + (r - 0.6) * 15;
    else keywordScore = 15 + r * 10;
  }
  keywordScore = clamp(Math.round(keywordScore), 30);

  // -------- 2) Experience (20 pts)
  const expText = String(analysis.experience_strength || "").toLowerCase();
  let experienceScore = expText.includes("excellent") ? 20 :
                        expText.includes("good") ? 17 :
                        expText.includes("average") ? 14 :
                        10;

  // -------- 3) Skills/Summary (15 pts)
  const skillText = String(analysis.skills_strength || "").toLowerCase();
  let skillsScore = skillText.includes("excellent") ? 15 :
                    skillText.includes("good") ? 12 :
                    skillText.includes("average") ? 10 :
                    8;

  // -------- 4) Grammar (10 pts)
  let grammarScore = grammar.length === 0 ? 10 :
                     grammar.length <= 3 ? 9 :
                     grammar.length <= 7 ? 8 : 6;

  // -------- 5) ATS readability (5 pts)
  const atsReadabilityScore = 4;

  // -------- 6) Formatting (20 pts)
  let formattingScore = 14;
  if (keywordScore > 26 && experienceScore > 16) formattingScore = 18;
  if (keywordScore > 28) formattingScore = 20;

  const totalScore =
    keywordScore +
    experienceScore +
    skillsScore +
    grammarScore +
    atsReadabilityScore +
    formattingScore;

  // Smooth like NovoResume (no extreme jumps)
  let final = totalScore;
  if (final < 40) final = 40;
  if (final > 95) final = 95;

  const label =
    final >= 85 ? "Excellent" :
    final >= 70 ? "Good" :
    final >= 50 ? "Fair" : "Needs Improvement";

  return {
    finalScore: Math.round(final),
    label,
    breakdown: {
      keywordScore,
      experienceScore,
      skillsScore,
      grammarScore,
      atsReadabilityScore,
      formattingScore,
    }
  };
};
