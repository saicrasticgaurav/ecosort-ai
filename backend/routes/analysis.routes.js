const express = require('express')
const { analyzeWaste } = require('../controllers/analysis.controller')

const router = express.Router()

router.post('/analyze', analyzeWaste)

module.exports = router
