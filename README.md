# 🌾 Mera MGNREGA — District Data Visualization Platform

A full-stack web application built to visualize and compare **district-level performance metrics** under the **MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act)** scheme.
The platform provides interactive charts and AI-powered summaries for better transparency, analysis, and decision-making.

---

## 🖥️ Live Demo

🔗 **Frontend:** [https://mera-mgnrega.vercel.app](https://mera-mgnrega.vercel.app)

⚙️ **Backend:** Hosted securely on **Render**

🧠 **Developer:** [Rishi Sharma](https://rishisharmapro.vercel.app)

---

## 🖼️ Preview

<img width="1470" height="841" alt="Screenshot 2025-11-01 at 5 40 53 PM" src="https://github.com/user-attachments/assets/eb19d4cd-a5a5-4541-bf25-2463020d9cd6" />
<img width="1470" height="883" alt="Screenshot 2025-11-01 at 5 41 43 PM" src="https://github.com/user-attachments/assets/833ce614-daad-4875-8557-8f27f22c13f6" />
<img width="1470" height="883" alt="Screenshot 2025-11-01 at 5 42 00 PM" src="https://github.com/user-attachments/assets/f544e6f0-c3bc-441c-a02c-b6cc9466f1a1" />
<img width="1470" height="883" alt="Screenshot 2025-11-01 at 5 42 21 PM" src="https://github.com/user-attachments/assets/acead098-31d5-4c05-963a-0fb4b1048dc4" />


---

## 🚀 Tech Stack

### 🧩 Frontend

* ⚛️ **React.js** — Component-based UI library
* ⚡ **Vite** — Fast development bundler
* 🎨 **Tailwind CSS** — Modern, utility-first styling
* 🔄 **TanStack Query** — Smart data fetching & caching

### ⚙️ Backend

* 🧠 **Express.js** — RESTful API with structured routing
* 🌐 **Axios** — For data fetching and Gemini API integration
* 🤖 **Google Gemini API** — For generating bilingual summaries (English + Hindi)
* 🍃 **MongoDB (Mongoose)** — For storing district-wise statistics and summaries

---

## 📊 Core Features

- ✅ Fetch and display detailed MGNREGA data for any district
- ✅ AI-generated performance summaries in **English & Hindi**
- ✅ Compare any two districts with interactive **bar charts**
- ✅ Month-wise and year-wise visual analytics
- ✅ Data caching for faster subsequent loads
- ✅ Fully deployed and production-ready
- ✅ Available in English and Hindi

---

## 🧠 AI Integration

The backend integrates the **Google Gemini API** to analyze MGNREGA metrics and produce:

* **Good Points** — highlighting achievements
* **Can Be Better** — identifying optimization areas
* **Needs Improvement** — spotlighting critical issues

All summaries are generated in **both English and Hindi**.

---

## 🛠️ API Endpoints

### 1️⃣ `GET /api/v1/getdistrictdata`

Fetches MGNREGA data for a single district.
**Example Response:**

```json
{
  "district": "JAIPUR",
  "fin_year": "2024-2025",
  "month": "Jan",
  "Average_Wage_rate_per_day_per_person": 206.65,
  "Total_Households_Worked": 102851,
  "Total_Exp": 9951.69,
  "summary": {
    "english": {...},
    "hindi": {...}
  }
}
```

---

### 2️⃣ `POST /api/v1/compare`

Compares two districts based on the same financial year and month.

**Request Body:**

```json
{
  "district1": "JAIPUR",
  "district2": "RAJSAMAND",
  "fin_year": "2024-2025",
  "month": "Jan"
}
```

**Response:**

```json
{
  "district1Data": {...},
  "district2Data": {...}
}
```

---

## 💾 Database Design

### 🗂️ **Districts Collection**

Stores each district’s base information and monthly MGNREGA data.

```json
{
  "_id": "68f7f31c2d7d59fb54c1b6f8",
  "state_name": "RAJASTHAN",
  "state_code": "27",
  "district_code": "2705",
  "district_name": "JHUNJHUNU",
  "monthly_data": [
    {
      "month": "Jan",
      "Average_Wage_rate_per_day_per_person": 206.65,
      "Number_of_Completed_Works": 5049,
      "Total_Exp": 9951.69,
      "Total_Households_Worked": 102851
    }
  ],
  "createdAt": "2025-10-21T20:54:52.752Z",
  "updatedAt": "2025-10-30T13:45:08.960Z",
  "__v": 6
}
```

---

### 🧾 **Summaries Collection**

Stores AI-generated summaries linked to a district and financial year.

```json
{
  "_id": "68f7f31e2d7d59fb54c1b8b8",
  "districtId": "68f7f31c2d7d59fb54c1b6f8",
  "fin_year": "2024-2025",
  "summary": {
    "goodPoints": ["High employment rate", "Quick payment generation"],
    "canBeBetter": ["Wage rates could be higher"],
    "needsImprovement": ["More transparency in fund allocation"]
  },
  "createdAt": "2025-10-21T20:54:54.094Z"
}
```

---

## 🌐 Deployment

| Layer        | Platform                                                   | URL                                                                |
| :----------- | :--------------------------------------------------------- | :----------------------------------------------------------------- |
| **Frontend** | [Vercel](https://vercel.com)                               | [https://mera-mgnrega.vercel.app](https://mera-mgnrega.vercel.app) |
| **Backend**  | [DigitalOcean App Platform](https://www.digitalocean.com/) | Private API endpoint                                               |
| **Database** | MongoDB Atlas                                              | Managed Cloud Instance                                             |

---

## 🔒 Environment Variables

### 🖥️ Frontend (`.env`)

```env
VITE_BACKEND_URL=https://api.mera-mgnrega.in
```

### ⚙️ Backend (`.env`)

```env
PORT=8080
MONGO_URI=<your-mongodb-uri>
GEMINI_API_KEY=<your-gemini-api-key>
CORS_ORIGIN=["http://localhost:5173","https://mera-mgnrega.vercel.app"]
```

---

## 🧪 Local Development

```bash
# Clone the repo
git clone https://github.com/RishiSharmapro/Mera-Mgnrega.git
cd Mera-Mgnrega

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Run backend
cd ../backend && npm run dev

# Run frontend
cd ../frontend && npm run dev
```

App available at:

- 🔹 Frontend — [http://localhost:5173](http://localhost:5173)
- 🔹 Backend — [http://localhost:8080](http://localhost:8080)

---

## 📈 Example Visualization

Bar charts represent district-wise monthly comparisons for key indicators like:

* **Average Wage Rate**
* **Employment Days per Household**
* **Total Expenditure**
* **Women Persondays**

Built with **Recharts** for clarity and responsiveness.

---

## 🏆 Project Purpose

This project was developed as part of the **Bharat Fellowship 2025 Selection Assignment**, showcasing:

* Full-stack web development
* Data analysis and visualization
* AI integration using Google Gemini API
* Real-world problem-solving aligned with public policy and governance

---

## 👨‍💻 Developer

**Rishi Sharma**
- 🌐 [Portfolio](https://rishisharmapro.vercel.app)
- 💼 [GitHub](https://github.com/RishiSharmapro)

---
