# Calend - PostgreSQL Database Demo

This Next.js app demonstrates the Calend project using PostgreSQL database.

## 🚀 Quick Deploy to Vercel

### 1. Set up Neon PostgreSQL Database
1. Go to [neon.tech](https://neon.tech)
2. Sign up for free account
3. Create new project: "calend-demo"
4. Copy the connection string

### 2. Set up Database Schema
Run this SQL in your Neon SQL editor:
```sql
-- Copy the contents of schema.sql from the parent directory
-- This will create the users, events, and recommendations tables
```

### 3. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variable
vercel env add DATABASE_URL
# Paste your Neon connection string when prompted
```

### 4. Screenshot the Result
Visit your deployed URL and screenshot the page showing:
- ✅ PostgreSQL connection status
- 📊 Database tables (users, events, recommendations)
- 📈 Data counts
- 🔗 Live database connection

## 🎯 Perfect Screenshot Features

The deployed page will show:
- **PostgreSQL version** (e.g., "PostgreSQL 16.10")
- **Custom Calend tables** (users, events, recommendations)
- **Live data counts** proving the database is working
- **Real-time connection status**

## 📱 Demo URL
Once deployed, your URL will be: `https://calend-app-xxx.vercel.app`

This clearly demonstrates PostgreSQL usage for your Calend project!