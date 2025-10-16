# Calend Database Setup

This directory contains the PostgreSQL database setup for the Calend project - an AI-powered Harvard event aggregator.

## Quick Start

### 1. Start the Database

```bash
# Start PostgreSQL container
docker-compose up -d

# Check if container is running
docker-compose ps
```

### 2. Connect to the Database

```bash
# Connect using psql
psql -h localhost -p 5432 -U calend -d calend

# Or connect using Docker
docker exec -it calend_postgres psql -U calend -d calend
```

### 3. Verify Schema

```sql
-- List all tables
\dt

-- Check users table
SELECT * FROM users;

-- Check events table  
SELECT * FROM events;

-- Check recommendations table
SELECT * FROM recommendations;
```

## Database Schema

### Tables

- **users**: Student profiles with interests and skills
- **events**: Aggregated events from various sources (MCS, Luma, etc.)
- **recommendations**: AI-generated recommendations linking users to events

### Key Features

- Automatic schema initialization via `schema.sql`
- Sample data for testing
- Optimized indexes for daily digest queries
- Foreign key constraints for data integrity

## Useful Commands

### Docker Commands

```bash
# Start database
docker-compose up -d

# Stop database
docker-compose down

# View logs
docker-compose logs postgres

# Restart database
docker-compose restart postgres

# Remove database (WARNING: deletes all data)
docker-compose down -v
```

### PostgreSQL Commands

```bash
# Connect to database
psql -h localhost -p 5432 -U calend -d calend

# Run SQL file
psql -h localhost -p 5432 -U calend -d calend -f schema.sql

# Backup database
pg_dump -h localhost -p 5432 -U calend calend > backup.sql

# Restore database
psql -h localhost -p 5432 -U calend calend < backup.sql
```

### Common Queries

```sql
-- Get daily recommendations for a user
SELECT u.name, e.title, e.starts_at, r.score 
FROM recommendations r
JOIN users u ON r.user_id = u.id
JOIN events e ON r.event_id = e.id
WHERE u.id = 1 AND r.recommended_on = CURRENT_DATE
ORDER BY r.score DESC;

-- Get upcoming events
SELECT title, starts_at, location, source
FROM events 
WHERE starts_at > NOW()
ORDER BY starts_at;

-- Get user preferences
SELECT name, interests, skills 
FROM users 
WHERE email = 'john.doe@college.harvard.edu';
```

## Connection Details

- **Host**: localhost
- **Port**: 5432
- **Database**: calend
- **Username**: calend
- **Password**: calend

## Troubleshooting

### Container won't start
```bash
# Check if port 5432 is already in use
lsof -i :5432

# Remove existing container and restart
docker-compose down -v
docker-compose up -d
```

### Connection refused
```bash
# Wait for database to fully initialize (30-60 seconds)
docker-compose logs postgres

# Check container status
docker-compose ps
```
