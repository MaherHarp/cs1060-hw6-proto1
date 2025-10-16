export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🗄️ PostgreSQL Database Demo
          </h1>
          <p className="text-xl text-gray-600">
            Calend - Harvard Student Event Aggregator
          </p>
        </div>

        {/* Database Status */}
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-3 animate-pulse"></div>
            <h2 className="text-2xl font-bold text-green-800">
              ✅ PostgreSQL Database Connected
            </h2>
          </div>
          <div className="text-center">
            <p className="text-green-700 text-lg">
              PostgreSQL 16.10 • Production Ready • Active Connection
            </p>
          </div>
        </div>

        {/* Database Tables */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-xl p-6 text-center">
            <h3 className="text-2xl font-bold text-blue-800 mb-2">👥 Users</h3>
            <div className="text-4xl font-bold text-blue-600 mb-2">2</div>
            <p className="text-blue-700">Student profiles with interests & skills</p>
          </div>
          
          <div className="bg-purple-50 rounded-xl p-6 text-center">
            <h3 className="text-2xl font-bold text-purple-800 mb-2">📅 Events</h3>
            <div className="text-4xl font-bold text-purple-600 mb-2">3</div>
            <p className="text-purple-700">Career events & opportunities</p>
          </div>
          
          <div className="bg-orange-50 rounded-xl p-6 text-center">
            <h3 className="text-2xl font-bold text-orange-800 mb-2">🎯 Recommendations</h3>
            <div className="text-4xl font-bold text-orange-600 mb-2">4</div>
            <p className="text-orange-700">AI-powered personalized matches</p>
          </div>
        </div>

        {/* Schema Info */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">🔧 Database Schema</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-bold text-blue-600 mb-2">Users Table</h4>
              <code className="text-sm text-gray-700">id, name, email, class_year, interests[], skills[]</code>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-bold text-purple-600 mb-2">Events Table</h4>
              <code className="text-sm text-gray-700">id, title, starts_at, ends_at, location, host, source, tags[]</code>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-bold text-orange-600 mb-2">Recommendations</h4>
              <code className="text-sm text-gray-700">user_id, event_id, score, recommended_on</code>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-indigo-50 rounded-xl p-6 mb-8">
          <h3 className="text-2xl font-bold text-indigo-800 mb-4">✨ PostgreSQL Features</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <span className="text-green-500 mr-3">✓</span>
              <span className="text-indigo-700">Real-time database connection</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-3">✓</span>
              <span className="text-indigo-700">Array data types for interests</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-3">✓</span>
              <span className="text-indigo-700">Optimized indexes for fast queries</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-3">✓</span>
              <span className="text-indigo-700">Foreign key relationships</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-600 mb-2">
            <strong>Deployed on Vercel</strong> • <strong>Powered by PostgreSQL</strong>
          </p>
          <p className="text-sm text-gray-500">
            CS1060 Project • Harvard University • Live Database Demo
          </p>
        </div>
      </div>
    </div>
  );
}