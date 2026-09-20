
# 🌱 EcoSort AI

### AI-Powered Waste Segregation Assistant

EcoSort AI is a full-stack AI-powered web application that helps users identify waste categories and understand responsible disposal practices using Google Gemini AI.

The project combines **Artificial Intelligence, Full-Stack Development, and Sustainability** to promote better waste-management awareness.

---

## 🚀 Features

- ♻️ AI-powered waste classification
- 📝 Waste classification explanations
- 🗑️ Disposal and segregation guidance
- 🌱 Sustainability tips
- ⚠️ Safety recommendations
- 🔄 Demo Mode fallback
- 🔗 Frontend and backend REST API integration

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Vite, JavaScript |
| Backend | Node.js, Express.js |
| AI | Google Gemini AI API |
| Communication | REST API |
| Tools | Git, GitHub, VS Code |

---

## 🔄 How It Works

```text
User Input
    ↓
React Frontend
    ↓
Express.js Backend
    ↓
Google Gemini AI
    ↓
Waste Analysis Result
    ↓
Guidance Displayed to User
```

If the AI service is temporarily unavailable, the application uses Demo Mode fallback guidance.

---

## 📂 Project Structure

```text
AI PROJECT/
├── frontend/
│   └── ecosort-ai/
├── backend/
├── .gitignore
└── README.md
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone YOUR_REPOSITORY_URL
cd ecosort-ai
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
GEMINI_MODEL=YOUR_CONFIGURED_GEMINI_MODEL
```

### 3. Frontend Setup

```bash
cd frontend/ecosort-ai
npm install
```

### 4. Run Application

**Backend:**

```bash
npm run dev
```

**Frontend:**

```bash
npm run dev
```

---

## 🔌 API

### Analyze Waste

```http
POST /api/analyze
```

Request:

```json
{
  "item": "plastic bottle"
}
```

---

## 🌍 Sustainability Impact

EcoSort AI aims to:

- Promote responsible waste segregation
- Improve recycling awareness
- Encourage sustainable habits
- Support environmental education

**Related SDGs:**

- SDG 12 – Responsible Consumption and Production
- SDG 11 – Sustainable Cities and Communities
- SDG 13 – Climate Action

---

## 🔮 Future Improvements

- Image-based waste recognition
- Multilingual support
- Location-based disposal guidance
- Recycling center integration

---

## 📌 Project Status

**Working Prototype**

The application includes React frontend, Express backend, Google Gemini AI integration, waste analysis, and Demo Mode fallback.

---

## 👨‍💻 Author

### Gaurav Patil

B.E. Information Technology Student

Interested in Full-Stack Development, Artificial Intelligence, and Sustainable Technology.

[GitHub](YOUR_GITHUB_PROFILE_URL) | [LinkedIn](YOUR_LINKEDIN_PROFILE_URL)

---

<p align="center">
  Built with 💚 for AI and Sustainability.
</p>
