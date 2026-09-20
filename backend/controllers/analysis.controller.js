const { GoogleGenAI } = require('@google/genai')
const { classifyWasteDemo } = require('../routes/services/demo.service')

const normalizeGeminiResult = (item, geminiData = {}) => {
  const safeCategory = geminiData.wasteCategory || geminiData.category || 'Mixed/Uncertain'
  const safeConfidence = geminiData.confidenceLevel || geminiData.confidence || 'Medium'
  const safeExplanation =
    geminiData.explanation || 'AI classification produced by Gemini for this waste item.'
  const safeSegregationGuidance =
    geminiData.disposalRecommendation || geminiData.segregationGuidance || 'Check local waste rules.'
  const safeSustainabilityTip =
    geminiData.sustainabilityTip || 'Reuse or recycle whenever possible.'
  const safeVerificationNote =
    geminiData.verificationNote || 'Local waste rules may differ by city and country.'
  const safeSafetyNote =
    geminiData.safetyNote || 'Handle hazardous or sharp waste with extra care.'

  return {
    item,
    category: safeCategory,
    confidence: safeConfidence,
    source: 'Gemini AI',
    likelyCategory: safeCategory,
    confidenceLevel: safeConfidence,
    explanation: safeExplanation,
    segregationGuidance: safeSegregationGuidance,
    sustainabilityTip: safeSustainabilityTip,
    verificationNote: safeVerificationNote,
    safetyNote: safeSafetyNote,
  }
}

const analyzeWithGemini = async (item) => {
  const apiKey = process.env.GEMINI_API_KEY
  const modelName = process.env.GEMINI_MODEL || 'gemini-3.6-flash'

  if (!apiKey) {
    throw new Error('Gemini API key is missing.')
  }

  console.log('Gemini request started')

  const ai = new GoogleGenAI({ apiKey })

  const prompt = `
You are a waste segregation assistant.
Classify this item: "${item}"

Return valid JSON only using the following structure:
{
  "wasteCategory": "Plastic|Paper|Organic|Glass|E-Waste|Metal|Hazardous/Special Handling|Mixed/Uncertain",
  "confidenceLevel": "High|Medium|Low",
  "explanation": "short explanation",
  "disposalRecommendation": "clear disposal guidance",
  "sustainabilityTip": "short sustainability recommendation",
  "verificationNote": "local rules note",
  "safetyNote": "safety or handling note"
}
`

  const response = await ai.models.generateContent({
    model: modelName,
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
    },
  })

  console.log('Gemini response received')

  const rawText = response?.text || response?.candidates?.[0]?.content?.parts?.[0]?.text

  if (!rawText) {
    throw new Error('Empty response from Gemini API.')
  }

  let parsed
  try {
    parsed = JSON.parse(rawText)
  } catch (parseError) {
    throw new Error('Invalid JSON returned by Gemini API.')
  }

  return normalizeGeminiResult(item, parsed)
}

const analyzeWaste = async (req, res) => {
  try {
    const { item } = req.body || {}

    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({
        message: 'Invalid request body.',
      })
    }

    if (item === undefined) {
      return res.status(400).json({
        message: 'Item is required.',
      })
    }

    if (typeof item !== 'string') {
      return res.status(400).json({
        message: 'Item must be a string.',
      })
    }

    const trimmedItem = item.trim()

    if (!trimmedItem) {
      return res.status(400).json({
        message: 'Item cannot be empty.',
      })
    }

    try {
      const geminiResult = await analyzeWithGemini(trimmedItem)
      return res.status(200).json(geminiResult)
    } catch (geminiError) {
      console.error('Gemini failed, using demo fallback:', geminiError.message)

      const fallbackResult = classifyWasteDemo(trimmedItem)
      return res.status(200).json({
        ...fallbackResult,
        item: trimmedItem,
        category: fallbackResult.likelyCategory,
        confidence: fallbackResult.confidenceLevel,
        source: 'Demo Mode',
        verificationNote: 'Gemini unavailable; demo fallback was used.',
      })
    }
  } catch (error) {
    console.error('Analyze waste error:', error.message)
    return res.status(500).json({
      message: 'Server error while analyzing waste.',
    })
  }
}

module.exports = {
  analyzeWaste,
}
