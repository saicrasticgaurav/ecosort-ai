const demoRules = [
  {
    keywords: ['plastic bottle', 'plastic bag', 'plastic wrapper', 'plastic'],
    likelyCategory: 'Plastic Waste',
    confidenceLevel: 'Medium',
    explanation: 'This item is likely made from plastic.',
    segregationGuidance:
      'Place it in the appropriate recyclable waste collection stream after checking local rules.',
    sustainabilityTip: 'Reuse or recycle the item whenever possible.',
    safetyNote: 'Do not handle hazardous waste without proper guidance.',
  },
  {
    keywords: ['paper', 'newspaper', 'cardboard', 'notebook', 'box'],
    likelyCategory: 'Paper Waste',
    confidenceLevel: 'High',
    explanation: 'This item is likely paper-based and recyclable.',
    segregationGuidance:
      'Place clean paper in the paper recycling stream and keep it dry.',
    sustainabilityTip: 'Recycling paper helps save trees and energy.',
    safetyNote: 'Do not mix wet or contaminated paper with clean recyclables.',
  },
  {
    keywords: ['banana peel', 'food waste', 'vegetable waste', 'orange peel', 'apple core'],
    likelyCategory: 'Organic Waste',
    confidenceLevel: 'High',
    explanation: 'This item is likely compostable organic waste.',
    segregationGuidance:
      'Place it in the compost or organic waste bin if local rules allow.',
    sustainabilityTip: 'Composting reduces landfill waste and returns nutrients to the soil.',
    safetyNote: 'Avoid mixing plastic or chemical waste into compost.',
  },
  {
    keywords: ['glass jar', 'glass bottle', 'glass'],
    likelyCategory: 'Glass Waste',
    confidenceLevel: 'High',
    explanation: 'This item is likely glass and may be recyclable.',
    segregationGuidance:
      'Place clean glass into the glass recycling bin or the designated collection stream.',
    sustainabilityTip: 'Glass recycling reduces energy use and preserves raw materials.',
    safetyNote: 'Handle broken glass carefully and keep it away from general waste.',
  },
  {
    keywords: ['old mobile', 'computer', 'laptop', 'charger', 'mobile phone', 'phone'],
    likelyCategory: 'E-Waste',
    confidenceLevel: 'High',
    explanation: 'This item is likely electronic waste and should be handled with care.',
    segregationGuidance:
      'Take it to an e-waste drop-off or an electronics recycling center.',
    sustainabilityTip: 'Repairing and reusing electronics can reduce mining and manufacturing demand.',
    safetyNote: 'Keep devices away from moisture and do not place batteries in regular bins.',
  },
  {
    keywords: ['battery', 'chemical', 'medicine', 'paint', 'solvent'],
    likelyCategory: 'Hazardous or Special Handling',
    confidenceLevel: 'High',
    explanation: 'This item may contain hazardous or chemical material.',
    segregationGuidance:
      'Use local hazardous waste channels or collection points for safe disposal.',
    sustainabilityTip: 'Proper disposal reduces toxic pollution and protects health.',
    safetyNote: 'Never throw hazardous waste into normal household bins.',
  },
  {
    keywords: ['metal can', 'steel can', 'aluminium', 'aluminum', 'tin can'],
    likelyCategory: 'Metal Waste',
    confidenceLevel: 'High',
    explanation: 'This item is likely metal and may be recyclable.',
    segregationGuidance:
      'Rinse the item and place it into the appropriate metal recycling stream.',
    sustainabilityTip: 'Recycling metal saves natural resources and reduces energy demand.',
    safetyNote: 'Be careful with sharp or rusted metal edges.',
  },
]

function classifyWasteDemo(item) {
  const normalizedItem = item.toLowerCase()
  const match = demoRules.find((rule) =>
    rule.keywords.some((keyword) => normalizedItem.includes(keyword)),
  )

  if (match) {
    return {
      source: 'demo',
      likelyCategory: match.likelyCategory,
      confidenceLevel: match.confidenceLevel,
      explanation: match.explanation,
      segregationGuidance: match.segregationGuidance,
      sustainabilityTip: match.sustainabilityTip,
      verificationNote: 'Local waste collection rules may differ.',
      safetyNote: match.safetyNote,
    }
  }

  return {
    source: 'demo',
    likelyCategory: 'Mixed or Uncertain',
    confidenceLevel: 'Low',
    explanation: 'This item does not match the demo classification rules clearly.',
    segregationGuidance:
      'If unsure, separate the item from recyclables and check local disposal guidelines.',
    sustainabilityTip: 'Sorting carefully improves recycling quality and reduces contamination.',
    verificationNote: 'Local waste collection rules may differ.',
    safetyNote: 'Do not handle hazardous waste without proper guidance.',
  }
}

module.exports = {
  classifyWasteDemo,
}
