---
# 🌦️ Weather API with Redis Caching

A production-ready **Weather REST API** built using **Node.js, Express, Redis**, and a **3rd-party Weather API**.
This project demonstrates real-world backend concepts like **API integration, caching, rate limiting, and clean architecture**.
---

## 🚀 Features

- 🌍 Fetch real-time weather data using a **3rd-party API**
- ⚡ **Redis caching** with TTL (12 hours) to reduce API calls
- 🛑 **Rate limiting** to prevent API abuse
- 🔐 Secure configuration using **environment variables**
- 🧱 Clean and scalable **MVC-like folder structure**
- ❌ Centralized **error handling**
- 🧪 Easy to test with curl / Postman

---

## 🏗️ Architecture Overview

```
Client
  |
  | GET /api/weather?city=Delhi
  |
Server (Express)
  |
  ├── Check Redis Cache
  |     ├── Cache HIT  → Return cached data
  |     └── Cache MISS → Call 3rd-party Weather API
  |
  ├── Store response in Redis (with TTL)
  |
  └── Return response to client
```

---

## 🛠️ Tech Stack

- **Node.js**
- **Express**
- **Redis** (in-memory cache)
- **Axios** (HTTP client)
- **express-rate-limit**
- **dotenv**

---

## 📁 Project Structure

```
src/
├── app.js
├── server.js
│
├── routes/
│   └── weather.routes.js
│
├── controllers/
│   └── weather.controller.js
│
├── services/
│   └── weather.service.js
│
├── cache/
│   └── redis.client.js
│
├── middlewares/
│   ├── rateLimiter.js
│   └── errorHandler.js
│
└── utils/
    └── apiError.js
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
WEATHER_API_KEY=your_weather_api_key
REDIS_URL=redis://localhost:6379
CACHE_TTL=43200
```

> `CACHE_TTL` is in seconds (43200 = 12 hours)

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/weather-api.git
cd weather-api
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start Redis (Local)

#### macOS

```bash
brew install redis
brew services start redis
```

Verify:

```bash
redis-cli ping
# PONG
```

---

### 4️⃣ Run the server

```bash
npm run dev
```

Server should start on:

```
http://localhost:3000
```

---

## 📡 API Usage

### 🔹 Get Weather by City

**Endpoint**

```http
GET /api/weather?city=Delhi
```

**Example**

```bash
curl http://localhost:3000/api/weather?city=Delhi
```

---

### ✅ Sample Response (Cache MISS)

```json
{
  "source": "api",
  "data": {
    "city": "Delhi, India",
    "temperature": 32,
    "humidity": 45,
    "conditions": "Clear"
  }
}
```

### ⚡ Sample Response (Cache HIT)

```json
{
  "source": "cache",
  "data": {
    "city": "Delhi, India",
    "temperature": 32,
    "humidity": 45,
    "conditions": "Clear"
  }
}
```

---

## 🛑 Rate Limiting

- **100 requests / 15 minutes / IP**
- Returns **HTTP 429** on limit exceed

Response:

```json
{
  "success": false,
  "message": "Too many requests, please try again later"
}
```

---

## ❌ Error Handling

- Missing city parameter → `400 Bad Request`
- Weather API failure → `500 Internal Server Error`
- Centralized error handling using a custom `ApiError` class

---

## 🧠 What This Project Demonstrates

- Working with **3rd-party APIs**
- Implementing **Redis caching with TTL**
- Designing **scalable backend architecture**
- Handling **rate limiting & API abuse**
- Using **environment variables securely**
- Writing **clean, maintainable Node.js code**

---

## 🧪 Testing Tips

- Reduce rate limit temporarily to test throttling
- Call the same city twice to verify Redis cache
- Use response headers (`X-RateLimit-*`) for validation

---

## 🚀 Future Enhancements

- Dockerize Node.js + Redis
- Add Swagger / OpenAPI docs
- Store search history in MongoDB
- Add authentication & API keys
- Deploy using Render / Railway / AWS

---

## 👨‍💻 Author

**Ankit Anand**
Frontend / Full-Stack Developer
Learning backend architecture & system design 🚀

---
