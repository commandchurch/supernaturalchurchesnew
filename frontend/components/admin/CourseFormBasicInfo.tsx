import React from 'react';

interface CourseFormData {
  title: string;
  description: string;
  category: string;
  durationMinutes: number;
  isPublished: boolean;
  isPremium: boolean;
  requiresQuiz: boolean;
  passingScore: number;
  thumbnailUrl: string;
  certificateUrl: string;
}

interface CourseFormBasicInfoProps {
  editingCourse: CourseFormData;
  setEditingCourse: (course: CourseFormData) => void;
}

export default function CourseFormBasicInfo({ editingCourse, setEditingCourse }: CourseFormBasicInfoProps) {
  return (
    <div className="bg-gray-900/50 border border-gray-700 p-4">
      <h4 className="text-lg font-bold text-white mb-4 heading-font">Course Information</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white font-semibold mb-1 text-sm">Title *</label>
          <input
            type="text"
            required
            value={editingCourse.title}
            onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
            placeholder="Enter course title"
          />
        </div>
        <div>
          <label className="block text-white font-semibold mb-1 text-sm">Category</label>
          <select
            value={editingCourse.category}
            onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
          >
            <option value="discipleship">Discipleship</option>
            <option value="healing">Healing</option>
            <option value="evangelism">Evangelism</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-white font-semibold mb-1 text-sm">Description *</label>
        <textarea
          rows={3}
          required
          value={editingCourse.description}
          onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
          className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
          placeholder="Enter course description"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <label className="block text-white font-semibold mb-1 text-sm">Duration (minutes)</label>
          <input
            type="number"
            value={editingCourse.durationMinutes || ''}
            onChange={(e) => {
              const val = e.target.value.trim();
              setEditingCourse({
                ...editingCourse,
                durationMinutes: val === '' ? 0 : Number(val) || 0
              });
            }}
            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-white font-semibold mb-1 text-sm">Thumbnail URL</label>
          <input
            type="text"
            value={editingCourse.thumbnailUrl || ''}
            onChange={(e) => setEditingCourse({ ...editingCourse, thumbnailUrl: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="block text-white font-semibold mb-1 text-sm">Certificate URL</label>
          <input
            type="text"
            value={editingCourse.certificateUrl || ''}
            onChange={(e) => setEditingCourse({ ...editingCourse, certificateUrl: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="flex items-center space-x-6 mt-4">
        <label className="flex items-center text-white">
          <input
            type="checkbox"
            checked={editingCourse.isPublished}
            onChange={(e) => setEditingCourse({ ...editingCourse, isPublished: e.target.checked })}
            className="mr-2"
          />
          Published
        </label>
        <label className="flex items-center text-white">
          <input
            type="checkbox"
            checked={editingCourse.isPremium}
            onChange={(e) => setEditingCourse({ ...editingCourse, isPremium: e.target.checked })}
            className="mr-2"
          />
          Premium
        </label>
        <label className="flex items-center text-white">
          <input
            type="checkbox"
            checked={editingCourse.requiresQuiz}
            onChange={(e) => setEditingCourse({ ...editingCourse, requiresQuiz: e.target.checked })}
            className="mr-2"
          />
          Requires Quiz
        </label>
      </div>

      {editingCourse.requiresQuiz && (
        <div className="mt-4">
          <label className="block text-white font-semibold mb-1 text-sm">Passing Score (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={editingCourse.passingScore}
            onChange={(e) => setEditingCourse({ ...editingCourse, passingScore: parseInt(e.target.value, 10) || 70 })}
            className="w-32 bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
          />
        </div>
      )}
    </div>
  );
}
