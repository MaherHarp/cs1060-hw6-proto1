# Deploy Calend to Vercel with PostgreSQL

## Option 1: Vercel + Neon PostgreSQL (Recommended)

### 1. Set up Neon Database
1. Go to [neon.tech](https://neon.tech)
2. Create free account
3. Create new database
4. Copy connection string

### 2. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### 3. Add Environment Variables
In Vercel dashboard:
- `DATABASE_URL`: Your Neon connection string
- `POSTGRES_HOST`: neon host
- `POSTGRES_USER`: neon user
- `POSTGRES_PASSWORD`: neon password
- `POSTGRES_DB`: neon database name

## Option 2: Railway (Full Stack)

### 1. Deploy to Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### 2. Add PostgreSQL Service
In Railway dashboard:
- Add PostgreSQL service
- Connect your app to it
- Run schema.sql

## Option 3: Render (Full Stack)

### 1. Deploy to Render
1. Connect GitHub repo
2. Choose "Web Service"
3. Add PostgreSQL database
4. Deploy both services

## Demo Commands for Screenshots

### Show PostgreSQL Connection
```bash
# Connect to your deployed database
psql $DATABASE_URL

# Show tables
\dt

# Show version
SELECT version();

# Show data
SELECT COUNT(*) FROM users;
```

### Show in Browser
Create a simple API endpoint that shows database info:
```javascript
// pages/api/db-status.js
export default async function handler(req, res) {
  const { Pool } = require('pg');
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  const result = await pool.query(`
    SELECT 
      version() as postgres_version,
      (SELECT COUNT(*) FROM users) as user_count,
      (SELECT COUNT(*) FROM events) as event_count
  `);
  
  res.json(result.rows[0]);
}
```

Then visit: `your-app.vercel.app/api/db-status`
