# 🚀 SpendBoat -AI Expense Tracker (WhatsApp + Web)

<p align="center">
  <img src="https://img.shields.io/badge/AI-Powered-blueviolet?style=for-the-badge" />
  <img src="https://img.shields.io/badge/MERN-Stack-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/WhatsApp-Bot-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" />
  <img src="https://img.shields.io/badge/ML-Fallback-orange?style=for-the-badge" />
</p>

<p align="center">
  <b>Track your expenses with simple messages. No forms. No friction.</b>
</p>

---

## 🎥 Demo Preview

<a href="https://www.youtube.com/watch?v=HcK1-M4W8lk">
  <img width="1536" height="1024" alt="ChatGPT Image May 3, 2026, 01_28_39 PM" src="https://github.com/user-attachments/assets/da960aca-a8ac-48f1-8f70-fda11f11ca84" />
</a>


---

## 🌐 Live Demo

* 🔗 **Frontend:** https://spend-boat.vercel.app/
* 🔗 **Backend API:** https://spendboat.onrender.com

---

## ✨ Features

* 🧠 AI-powered expense parsing (Natural Language → Structured Data)
* 💬 WhatsApp expense logging (Twilio integration)
* ⚡ Fast web dashboard (React)
* 📊 Visual analytics (Pie charts, trends)
* 🔁 ML fallback if AI fails
* 💰 Budget tracking with alerts
* 📧 Email notifications

---

## 🧪 Example

**Input:**

```
Spent 200 on groceries yesterday
```

**Output:**

```json
{
  "amount": 200,
  "category": "groceries",
  "date": "2026-03-11",
  "note": "groceries"
}
```

---

## 🏗️ Architecture

```
User (WhatsApp / Web)
        ↓
     Backend (Node.js)
        ↓
 AI Parsing (Groq - LLaMA 3)
        ↓
 ML Fallback (Python Flask)
        ↓
     MongoDB
        ↓
 React Dashboard
```

---

## 🧰 Tech Stack

| Layer        | Tech Used                    |
| ------------ | ---------------------------- |
| Frontend     | React.js, Recharts           |
| Backend      | Node.js, Express.js          |
| Database     | MongoDB                      |
| AI           | Groq (LLaMA 3)               |
| ML           | TF-IDF + Logistic Regression |
| Integrations | Twilio, Nodemailer           |

---

## ⚙️ Installation

### 1️⃣ Clone Repo

```bash
git clone https://github.com/Anubhavsingh9905/SpendBoat.git
cd SpendBoat
```

### 2️⃣ Backend Setup

```bash
cd server
npm install
node app.js
```
#### 🔑 Environment Variables

```env
JWT_SECRET=your_secret
GROQ_API_KEY=your_key
DB_URL=your_mongo_url
MODEL_API=your_ml_model
FRONTEND_URL=http://your-frontend-url
```

### 3️⃣ Frontend

```bash
cd client
npm install
npm run dev
```
#### 🔑 Environment Variables

```env
BACKEND_URL=http://your-backend-url
```

### 4️⃣ ML Service

```bash
cd model
pip install -r requirements.txt
python app.py
```

### 5️⃣ WhatsApp Webhook (For Development)
- Use Ngrok to expose your local server:
```
ngrok http 5000
```
- Configure Twilio webhook URL with:
  https://<ngrok-id>.ngrok-free.app/api/whatsapp/webhook

---

## 📡 API Endpoints

### Expense

* `POST /api/expense/parse`
* `GET /api/expenses`
* `DELETE /api/expense/:id`

### WhatsApp

* `POST /api/whatsapp/webhook`

### ML

* `POST /predict`

---

## 🧠 How It Works

1. User sends message (WhatsApp/Web)
2. Backend receives request
3. AI extracts structured data
4. If AI fails → ML predicts category
5. Data stored in MongoDB
6. Dashboard updates in real-time

---

## 🚧 Future Improvements

* 🎙️ Voice input (speech-to-expense)
* 🤖 Smart insights (AI suggestions)
* 📱 Mobile app (React Native)
* 👨‍👩‍👧 Multi-user support
* 🧾 OCR-based receipt parsing

---

## 🏆 Why This Project Stands Out

* Real-world problem solving
* AI + ML integration
* WhatsApp automation
* Full-stack architecture
* Production-ready design

---

### 🤝 CONTRIBUTING
1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

---

## 👨‍💻 Author

**Anubhav Singh**

<p align="center">
  <a href="https://github.com/Anubhavsingh9905">
    <img src="https://img.shields.io/badge/GitHub-Profile-black?style=for-the-badge&logo=github" />
  </a>
</p>

---

## ⭐ Show Your Support

If you like this project:

⭐ Star this repo
🍴 Fork it
📢 Share it

---

## 📜 License

MIT License

---

<p align="center">
  <b>Built with 💙 using AI + MERN Stack</b>
</p>
