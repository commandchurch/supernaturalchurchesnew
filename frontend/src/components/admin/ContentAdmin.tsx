import React from 'react';
import { BookOpen, FileText, Video } from 'lucide-react';

export default function ContentAdmin() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="h-6 w-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">Content Management</h2>
        </div>
        <p className="text-gray-400">Manage training content and resources.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-green-400" />
            <div>
              <p className="text-gray-400 text-sm">Training Modules</p>
              <p className="text-xl font-bold text-white">24</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Video className="h-5 w-5 text-purple-400" />
            <div>
              <p className="text-gray-400 text-sm">Video Content</p>
              <p className="text-xl font-bold text-white">156</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-gray-400 text-sm">Active Students</p>
              <p className="text-xl font-bold text-white">892</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}