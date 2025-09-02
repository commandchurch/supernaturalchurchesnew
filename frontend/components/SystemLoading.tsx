import React from 'react';
import { Loader2, Zap, Heart, Users } from 'lucide-react';

interface SystemLoadingProps {
  message?: string;
  showDetails?: boolean;
}

export default function SystemLoading({
  message = "Loading Supernatural Institute...",
  showDetails = false
}: SystemLoadingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Main Loading Animation */}
        <div className="text-center mb-8">
          <div className="relative mb-6">
            {/* Animated background circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-4 border-orange-500/20 rounded-full animate-pulse"></div>
              <div className="absolute w-24 h-24 border-4 border-orange-400/30 rounded-full animate-ping animation-delay-300"></div>
              <div className="absolute w-16 h-16 border-4 border-orange-300/40 rounded-full animate-pulse animation-delay-600"></div>
            </div>

            {/* Central loading icon */}
            <div className="relative flex items-center justify-center w-20 h-20 mx-auto bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-2xl">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-white mb-3 heading-font">
            SUPERNATURAL INSTITUTE
          </h1>

          <p className="text-gray-300 text-lg mb-6">
            {message}
          </p>
        </div>

        {/* Feature highlights */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center justify-center space-x-2 text-orange-400">
            <Zap className="w-4 h-4 animate-pulse" />
            <span className="text-sm">Ministry Training Platform</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-blue-400">
            <Heart className="w-4 h-4 animate-pulse animation-delay-300" />
            <span className="text-sm">Prayer Request System</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-purple-400">
            <Users className="w-4 h-4 animate-pulse animation-delay-600" />
            <span className="text-sm">Community Features</span>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 h-2 rounded-full animate-pulse"
               style={{ width: '60%' }}></div>
        </div>

        <p className="text-center text-gray-400 text-sm">
          Please wait while we prepare your experience...
        </p>

        {showDetails && (
          <div className="mt-6 text-left">
            <details className="bg-gray-800/50 rounded-lg p-4">
              <summary className="cursor-pointer text-gray-300 hover:text-white text-sm font-medium">
                🔧 System Status
              </summary>
              <div className="mt-3 space-y-2 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Database Connection</span>
                  <span className="text-green-400">✅ Connected</span>
                </div>
                <div className="flex justify-between">
                  <span>Authentication System</span>
                  <span className="text-yellow-400">⏳ Initializing</span>
                </div>
                <div className="flex justify-between">
                  <span>Content Loading</span>
                  <span className="text-blue-400">🔄 In Progress</span>
                </div>
                <div className="flex justify-between">
                  <span>User Interface</span>
                  <span className="text-purple-400">🎨 Rendering</span>
                </div>
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}

