# 🌍 Travel Blog & Weather Forecast Website

A dynamic web application built using Node.js, Express.js, EJS, and OpenWeatherMap API.  
Users can create, edit, and delete travel blogs while also checking real-time weather information for any location.

---

## 🛠️ Technologies Used
- Node.js
- Express.js
- EJS
- Axios
- HTML5
- CSS3
- JavaScript
- OpenWeatherMap API

---

## ✨ Features

### 📝 Travel Blog
- Create travel blogs
- Edit existing blogs
- Delete blogs
- View all blogs on homepage

### 🌦️ Weather Forecast
- Search weather by city/location
- Displays:
  - Temperature
  - Weather condition
  - Wind speed
  - Weather icon
  - Date and day
  - Country/location
- Error handling for invalid locations

---

## ⚙️ Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/Hymavathi-20/Travel-blog-app.git
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create `.env` File
Add your OpenWeatherMap API key:

```env
API_KEY=your_api_key
```

Get API key from:  
https://openweathermap.org/api

---

## ▶️ Run the Project

```bash
nodemon index.js
```

or

```bash
node index.js
```

Open in browser:
```txt
http://localhost:3000
```

---

## 📌 Notes
- Blog data is stored temporarily using arrays (no database used)
- Built for learning and practice purposes
- Responsive improvements are planned for future updates
