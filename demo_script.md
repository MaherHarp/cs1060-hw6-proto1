# PostgreSQL Demo Script for Screenshots

## Step 1: Start the Database
```bash
docker-compose up -d
```

## Step 2: Show Container is Running
```bash
docker-compose ps
```

## Step 3: Connect to PostgreSQL
```bash
psql -h localhost -p 5432 -U calend -d calend
```

## Step 4: Show PostgreSQL Version
```sql
SELECT version();
```

## Step 5: List All Tables
```sql
\dt
```

## Step 6: Show Table Structure
```sql
\d users
\d events
\d recommendations
```

## Step 7: Show Sample Data
```sql
SELECT * FROM users;
SELECT * FROM events LIMIT 3;
SELECT * FROM recommendations;
```

## Step 8: Show Database Info
```sql
\l
```

## Alternative: Single Command Demo
```bash
# One-liner that shows everything
docker exec calend_postgres psql -U calend -d calend -c "\dt; SELECT version();"
```
