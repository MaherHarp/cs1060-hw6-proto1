'use client';

import { useState, useEffect } from 'react';

interface DatabaseInfo {
  success: boolean;
  database?: {
    configured: boolean;
    version?: string;
    tables?: string[];
    counts?: {
      users: number;
      events: number;
      recommendations: number;
    };
    status?: string;
  };
  instructions?: {
    setup: string;
    steps: string[];
  };
  error?: string;
  timestamp: string;
}

export default function Home() {
  const [dbInfo, setDbInfo] = useState<DatabaseInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/db-status')
      .then(res => res.json())
      .then(data => {
        setDbInfo(data);
        setLoading(false);
      })
      .catch(err => {
        setDbInfo({
          success: false,
          error: err.message,
          timestamp: new Date().toISOString()
        });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading database status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🗓️ Calend Database Status
          </h1>
          <p className="text-xl text-gray-600">
            PostgreSQL Database Demo for CS1060
          </p>
        </div>

        {dbInfo?.success && dbInfo.database?.configured ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-green-600 mb-4 flex items-center">
                ✅ PostgreSQL Connection Active
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Database Version:</h3>
                <code className="text-sm bg-white p-2 rounded border block">
                  {dbInfo.database?.version}
                </code>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-3">📊 Database Tables</h3>
                <ul className="space-y-2">
                  {dbInfo.database?.tables?.map((table, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      <code className="bg-white px-2 py-1 rounded text-sm">{table}</code>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-3">📈 Data Counts</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Users:</span>
                    <span className="font-semibold">{dbInfo.database?.counts?.users}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Events:</span>
                    <span className="font-semibold">{dbInfo.database?.counts?.events}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recommendations:</span>
                    <span className="font-semibold">{dbInfo.database?.counts?.recommendations}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500">
              Last updated: {new Date(dbInfo.timestamp).toLocaleString()}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-orange-600 mb-4 flex items-center">
                ⚠️ PostgreSQL Setup Required
              </h2>
              <div className="bg-orange-50 rounded-lg p-4 mb-6">
                <p className="text-orange-800 mb-2">
                  <strong>Status:</strong> {dbInfo?.database?.status || 'Database not configured'}
                </p>
                {dbInfo?.error && (
                  <p className="text-orange-700 text-sm mt-2">
                    <strong>Error:</strong> {dbInfo.error}
                  </p>
                )}
              </div>
            </div>

            {dbInfo?.instructions && (
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-blue-800 mb-3">
                  {dbInfo.instructions.setup}
                </h3>
                <ol className="space-y-2 text-blue-700">
                  {dbInfo.instructions.steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="font-semibold mr-2">{step.split(':')[0]}:</span>
                      <span>{step.split(':').slice(1).join(':')}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">🔧 Technical Details:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• This app demonstrates PostgreSQL integration</li>
                <li>• Database schema includes users, events, and recommendations tables</li>
                <li>• Built with Next.js 15 and TypeScript</li>
                <li>• Ready for Neon PostgreSQL or any PostgreSQL database</li>
              </ul>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            This page demonstrates that Calend is designed to use PostgreSQL as its database.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Deployed on Vercel • Ready for PostgreSQL Integration
          </p>
        </div>
      </div>
    </div>
  );
}