-- Calend Database Schema
-- PostgreSQL 16

-- Users table: stores student profiles and preferences
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    class_year INTEGER,
    interests TEXT[],
    skills TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events table: stores aggregated events and opportunities
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    starts_at TIMESTAMPTZ,
    ends_at TIMESTAMPTZ,
    location TEXT,
    host TEXT,
    source TEXT NOT NULL, -- e.g., 'MCS', 'Luma', 'Crimson Careers'
    tags TEXT[],
    description TEXT,
    link TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recommendations table: stores AI-generated recommendations
CREATE TABLE recommendations (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    score REAL NOT NULL, -- recommendation score (0.0 to 1.0)
    recommended_on DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, event_id, recommended_on)
);

-- Index for faster daily digest queries
CREATE INDEX idx_recommendations_user_date ON recommendations (user_id, recommended_on);

-- Additional useful indexes
CREATE INDEX idx_events_starts_at ON events (starts_at);
CREATE INDEX idx_events_source ON events (source);
CREATE INDEX idx_users_email ON users (email);

-- Add some sample data for testing
INSERT INTO users (name, email, class_year, interests, skills) VALUES
    ('John Doe', 'john.doe@college.harvard.edu', 2026, ARRAY['technology', 'finance'], ARRAY['Python', 'SQL', 'Machine Learning']),
    ('Jane Smith', 'jane.smith@college.harvard.edu', 2025, ARRAY['consulting', 'public policy'], ARRAY['Excel', 'PowerPoint', 'Research']);

INSERT INTO events (title, starts_at, ends_at, location, host, source, tags, description, link) VALUES
    ('Tech Career Fair 2025', '2025-02-15 10:00:00+00', '2025-02-15 16:00:00+00', 'Science Center', 'Harvard Technology Club', 'MCS', ARRAY['technology', 'career fair', 'networking'], 'Annual technology career fair featuring top tech companies', 'https://example.com/tech-fair'),
    ('Investment Banking Workshop', '2025-02-20 18:00:00+00', '2025-02-20 20:00:00+00', 'Sever Hall', 'Harvard Finance Society', 'MCS', ARRAY['finance', 'investment banking', 'workshop'], 'Learn about careers in investment banking', 'https://example.com/ib-workshop'),
    ('Startup Pitch Night', '2025-02-25 19:00:00+00', '2025-02-25 22:00:00+00', 'i-lab', 'Harvard Innovation Lab', 'Luma', ARRAY['startups', 'entrepreneurship', 'pitching'], 'Watch Harvard students pitch their startup ideas', 'https://luma.com/events/startup-pitch');

INSERT INTO recommendations (user_id, event_id, score, recommended_on) VALUES
    (1, 1, 0.95, '2025-01-30'),
    (1, 3, 0.87, '2025-01-30'),
    (2, 2, 0.92, '2025-01-30'),
    (2, 3, 0.78, '2025-01-30');
