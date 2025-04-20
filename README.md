

# 📦 API Monitoring Middleware

A lightweight and pluggable Express middleware for monitoring API requests and sending logs to a centralized server.

## 📌 What is this?

This is a Node.js middleware that logs incoming API requests and sends the data (URL, method, status code, response time, and timestamp) to your own backend server for storage and analytics.

Ideal for building your own centralized monitoring service (like a mini LogRocket/Sentry for APIs).

---

## ⚙️ How it works

- You install the middleware in any Express app.
- It intercepts every request and logs:
  - HTTP Method (GET, POST, etc.)
  - URL
  - Status Code
  - Response Time
  - Timestamp
- It sends this data via HTTP to your logging backend (which stores it in ClickHouse or any other DB).

---

## 🚀 When to use it

- You want to monitor multiple Node.js APIs in real time.
- You’re building a central logging/analytics dashboard for APIs.
- You want to track performance or error trends from your backend.

---

## 📦 Installation

```bash
npm install @devsahil01/apimonitoring


pull clickhouse-server docker image

to run that image 

docker run -d --name my-clickhouse -p 8123:8123 -p 9000:9000 -p 9009:9009 -e CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT=1 clickhouse/clickhouse-server
