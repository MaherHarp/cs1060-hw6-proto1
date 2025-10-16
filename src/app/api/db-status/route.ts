import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if DATABASE_URL is configured
    const hasDatabaseUrl = !!process.env.DATABASE_URL;
    
    if (!hasDatabaseUrl) {
      return NextResponse.json({
        success: false,
        message: "PostgreSQL database not configured",
        database: {
          configured: false,
          status: "No DATABASE_URL environment variable found"
        },
        instructions: {
          setup: "To connect to PostgreSQL:",
          steps: [
            "1. Set up a Neon PostgreSQL database (free at neon.tech)",
            "2. Add DATABASE_URL to your environment variables",
            "3. Run the schema.sql to create tables",
            "4. Redeploy your application"
          ]
        },
        timestamp: new Date().toISOString()
      });
    }

    // If DATABASE_URL exists, try to connect
    const { Pool } = require('pg');
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    });

    // Get database info
    const versionResult = await pool.query('SELECT version() as postgres_version');
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    const usersCount = await pool.query('SELECT COUNT(*) as user_count FROM users');
    const eventsCount = await pool.query('SELECT COUNT(*) as event_count FROM events');
    const recommendationsCount = await pool.query('SELECT COUNT(*) as recommendation_count FROM recommendations');

    await pool.end();

    return NextResponse.json({
      success: true,
      database: {
        configured: true,
        version: versionResult.rows[0].postgres_version,
        tables: tablesResult.rows.map(row => row.table_name),
        counts: {
          users: parseInt(usersCount.rows[0].user_count),
          events: parseInt(eventsCount.rows[0].event_count),
          recommendations: parseInt(recommendationsCount.rows[0].recommendation_count)
        }
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      database: {
        configured: !!process.env.DATABASE_URL,
        status: "Connection failed"
      },
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}