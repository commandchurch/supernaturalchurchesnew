import React from 'react';

export default function Training() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 heading-font">
            Supernatural Churches Limited Training Overview
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            Comprehensive supernatural ministry training through our partner organization, Supernatural Institute.
          </p>
          <div className="bg-gray-800/70 border border-gray-600 p-6 sm:p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4">Access Full Training Platform</h3>
            <p className="text-gray-200 mb-6">
              Visit our dedicated training platform for complete courses on healing, deliverance, and supernatural ministry.
            </p>
            <a
              href="https://supernatural.institute/training"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 font-semibold uppercase tracking-wide text-lg transition-colors"
            >
              Start Training at Supernatural Institute →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}