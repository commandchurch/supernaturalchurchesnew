import React from 'react';
import { FileText } from 'lucide-react';

interface CourseModule {
  title: string;
  contentUrl?: string;
}

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
  modules: CourseModule[];
}

interface CourseFormModulesProps {
  editingCourse: CourseFormData;
  setEditingCourse: (course: CourseFormData) => void;
  moduleCount: number;
  setModuleCount: (count: number) => void;
}

export default function CourseFormModules({ editingCourse, setEditingCourse, moduleCount, setModuleCount }: CourseFormModulesProps) {
  const updateModule = (index: number, field: keyof CourseModule, value: string) => {
    const newModules = [...editingCourse.modules];
    newModules[index] = { ...newModules[index], [field]: value };
    setEditingCourse({ ...editingCourse, modules: newModules });
  };

  const handleModuleCountChange = (count: number) => {
    setModuleCount(count);
    const newModules = Array(count).fill(null).map((_, i) =>
      editingCourse.modules[i] || { title: '', contentUrl: '' }
    );
    setEditingCourse({ ...editingCourse, modules: newModules });
  };

  return (
    <div className="bg-gray-900/50 border border-gray-700 p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-white heading-font flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Course Modules
        </h4>
        <div className="flex items-center gap-2">
          <label className="text-white text-sm">Number of modules:</label>
          <select
            value={moduleCount}
            onChange={(e) => handleModuleCountChange(parseInt(e.target.value, 10))}
            className="bg-gray-700 border border-gray-600 text-white px-3 py-1 text-sm"
          >
            {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {editingCourse.modules.map((module, index) => (
          <div key={index} className="bg-gray-800/50 border border-gray-600 p-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-white font-semibold mb-1 text-xs">Module {index + 1} Title</label>
                <input
                  type="text"
                  value={module.title}
                  onChange={(e) => updateModule(index, 'title', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
                  placeholder={`Module ${index + 1} title`}
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-1 text-xs">Content URL (Video/Document)</label>
                <input
                  type="text"
                  value={module.contentUrl || ''}
                  onChange={(e) => updateModule(index, 'contentUrl', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
