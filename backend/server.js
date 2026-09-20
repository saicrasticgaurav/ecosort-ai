const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const analysisRoutes = require('./routes/analysis.routes')

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'EcoSort AI Demo Backend is running',
    status: 'ok',
  })
})

app.use('/api', analysisRoutes)

app.use((err, req, res, next) => {
  console.error('Server error:', err.message)
  res.status(500).json({
    message: 'Something went wrong on the server.',
  })
})

app.listen(port, () => {
  console.log(`EcoSort AI backend running on http://localhost:${port}`)
})
