import { useState } from 'react'
import './App.css'

const API_URL = 'http://localhost:5000/api/analyze'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleAnalyze = async () => {
    const value = input.trim()

    if (!value) {
      setError('Please enter a waste item before analyzing.')
      setResult(null)
      return
    }

    setError('')
    setResult(null)
    setIsLoading(true)

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item: value }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || 'Unable to analyze waste item right now.')
      }

      const data = await response.json()

      if (!data || typeof data !== 'object') {
        throw new Error('Invalid response from the EcoSort AI server.')
      }

      setResult(data)
    } catch (fetchError) {
      const message =
        fetchError instanceof TypeError || fetchError.message === 'Failed to fetch'
          ? 'Unable to connect to the EcoSort AI server. Please check whether the backend is running.'
          : fetchError.message || 'Unable to analyze waste item right now.'

      setError(message)
      setResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setInput('')
    setResult(null)
    setError('')
    setIsLoading(false)
  }

  const openAnalyzer = () => {
    setCurrentPage('analyzer')
  }

  const renderHomePage = () => (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">SDG 12 • Responsible Consumption</p>
          <h1>Make Every Waste Decision Smarter</h1>
          <p className="subtitle">
            EcoSort AI helps households, students, and communities identify waste streams
            and learn better disposal habits.
          </p>

          <div className="sdg-box">
            <strong>SDG 12:</strong> Promote sustainable consumption and production by
            reducing waste, increasing sorting accuracy, and supporting circular habits.
          </div>

          <div className="hero-actions">
            <button type="button" className="primary-button" onClick={openAnalyzer}>
              Start Analyzing
            </button>
            <button type="button" className="secondary-button" onClick={() => setCurrentPage('impact')}>
              Explore Impact
            </button>
          </div>
        </div>

        <div className="hero-visual" aria-label="EcoSort dashboard illustration">
          <div className="leaf-badge">🌿</div>
          <div className="visual-card card-top">
            <span className="mini-label">Waste awareness</span>
            <strong>92%</strong>
            <small>Community score</small>
          </div>
          <div className="visual-card card-bottom">
            <span className="mini-label">Next step</span>
            <strong>Sort smarter</strong>
            <small>Reduce contamination</small>
          </div>
        </div>
      </section>

      <section className="feature-panel">
        <div className="section-heading">
          <p className="eyebrow">Why it matters</p>
          <h2>Turning waste awareness into action</h2>
        </div>

        <div className="features-grid">
          <article className="feature-card">
            <span className="feature-icon">♻️</span>
            <h3>Cleaner sorting</h3>
            <p>Helps people correctly identify recyclable, compostable, and hazardous waste.</p>
          </article>

          <article className="feature-card">
            <span className="feature-icon">📦</span>
            <h3>Less contamination</h3>
            <p>Better segregation reduces contamination and improves recycling quality.</p>
          </article>

          <article className="feature-card">
            <span className="feature-icon">🌍</span>
            <h3>SDG impact</h3>
            <p>Supports sustainable habits that align with environmental responsibility.</p>
          </article>
        </div>
      </section>
    </>
  )

  const renderAnalyzerPage = () => (
    <>
      <section className="analysis-card" id="analysis-card">
        <div className="card-header">
          <h2>Waste Analysis</h2>
        </div>

        <label className="input-label" htmlFor="waste-input">
          Waste item
        </label>

        <div className="input-row">
          <input
            id="waste-input"
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Enter a waste item, e.g. plastic bottle"
            aria-label="Enter a waste item"
          />

          <button type="button" className="primary-button" onClick={handleAnalyze} disabled={isLoading}>
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>

          <button type="button" className="secondary-button" onClick={handleClear}>
            Clear
          </button>
        </div>

        {error && (
          <div className="message error-message" role="alert">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="message loading-message" aria-live="polite">
            Checking local waste categories...
          </div>
        )}

        {!isLoading && !result && !error && (
          <div className="empty-state">Enter an item to see a demo waste classification.</div>
        )}
      </section>

      {result && (
        <section className="result-card" aria-live="polite">
          <div className="result-top">
            <div>
              <p className="result-label">Waste category</p>
              <h3>{result.likelyCategory}</h3>
            </div>

            <div className="result-meta">
              <span className="confidence-tag">{result.confidenceLevel} confidence</span>
            </div>
          </div>

          <div className="result-grid">
            <div className="result-item">
              <h4>Explanation</h4>
              <p>{result.explanation}</p>
            </div>

            <div className="result-item">
              <h4>Segregation guidance</h4>
              <p>{result.segregationGuidance}</p>
            </div>

            <div className="result-item">
              <h4>Sustainability tip</h4>
              <p>{result.sustainabilityTip}</p>
            </div>

            <div className="result-item">
              <h4>Verification note</h4>
              <p>{result.verificationNote}</p>
            </div>
          </div>

          <p className="safety-note">
            <strong>Safety note:</strong> {result.safetyNote}
          </p>
        </section>
      )}
    </>
  )

  const renderImpactPage = () => (
    <section className="page-panel">
      <div className="section-heading">
        <p className="eyebrow">Impact</p>
        <h2>Why sustainable sorting matters</h2>
      </div>

      <div className="impact-grid">
        <article className="impact-card impact-primary">
          <span className="impact-number">78%</span>
          <h3>Waste reduction potential</h3>
          <p>Smarter sorting can help communities reduce recyclable contamination and landfill waste.</p>
        </article>

        <article className="impact-card">
          <span className="impact-number">4x</span>
          <h3>Better recovery</h3>
          <p>Cleaner material streams improve the efficiency of recycling systems and processing.</p>
        </article>

        <article className="impact-card">
          <span className="impact-number">SDG 12</span>
          <h3>Global goal</h3>
          <p>EcoSort AI promotes sustainable consumption and responsible waste behavior.</p>
        </article>
      </div>

      <div className="timeline">
        <div className="timeline-item">
          <strong>01</strong>
          <div>
            <h4>Sort</h4>
            <p>Detect and separate waste accurately before disposal.</p>
          </div>
        </div>

        <div className="timeline-item">
          <strong>02</strong>
          <div>
            <h4>Reuse</h4>
            <p>Encourage repair, recycling, and circular consumption habits.</p>
          </div>
        </div>

        <div className="timeline-item">
          <strong>03</strong>
          <div>
            <h4>Reduce</h4>
            <p>Lower landfill pressure and encourage mindful waste decisions.</p>
          </div>
        </div>
      </div>
    </section>
  )

  const renderResponsiblePage = () => (
    <section className="responsible-ai" id="responsible-ai">
      <h2>Responsible AI</h2>

      <div className="responsible-grid">
        <article className="responsible-item">
          <h3>Transparency</h3>
          <p>Outputs are clearly labeled as demo or AI-based guidance so users understand the result.</p>
        </article>

        <article className="responsible-item">
          <h3>Uncertainty</h3>
          <p>Mixed or unclear waste items are flagged for caution and local rule validation.</p>
        </article>

        <article className="responsible-item">
          <h3>Privacy</h3>
          <p>No personal data or surveillance is used for the prototype experience.</p>
        </article>

        <article className="responsible-item">
          <h3>Safety</h3>
          <p>Hazardous waste is treated carefully with local disposal pathways and safety notes.</p>
        </article>

        <article className="responsible-item">
          <h3>Local rules</h3>
          <p>Recycling practices vary across cities, so local collection rules should always be considered.</p>
        </article>
      </div>
    </section>
  )

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return renderHomePage()
      case 'analyzer':
        return renderAnalyzerPage()
      case 'impact':
        return renderImpactPage()
      case 'responsible':
        return renderResponsiblePage()
      default:
        return renderHomePage()
    }
  }

  return (
    <div className="page-shell">
      <header className="navbar">
        <button type="button" className="brand-button" onClick={() => setCurrentPage('home')}>
          <span className="brand-mark">♻</span>
          <span>EcoSort AI</span>
        </button>

        <nav className="nav-links" aria-label="Main navigation">
          <button type="button" className={currentPage === 'home' ? 'nav-button active' : 'nav-button'} onClick={() => setCurrentPage('home')}>
            Home
          </button>
          <button type="button" className={currentPage === 'analyzer' ? 'nav-button active' : 'nav-button'} onClick={() => setCurrentPage('analyzer')}>
            Analyzer
          </button>
          <button type="button" className={currentPage === 'impact' ? 'nav-button active' : 'nav-button'} onClick={() => setCurrentPage('impact')}>
            Impact
          </button>
          <button type="button" className={currentPage === 'responsible' ? 'nav-button active' : 'nav-button'} onClick={() => setCurrentPage('responsible')}>
            Responsible AI
          </button>
        </nav>

      </header>

      <main className="dashboard">{renderPage()}</main>

      <footer className="footer">EcoSort AI | Built for SDG 12 | Sustainability Awareness Prototype</footer>
    </div>
  )
}

export default App
