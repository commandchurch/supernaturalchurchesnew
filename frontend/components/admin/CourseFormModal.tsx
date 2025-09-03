import React from 'react';
import { Award } from 'lucide-react';
import CourseFormBasicInfo from './CourseFormBasicInfo';
import CourseFormModules from './CourseFormModules';
import CourseFormQuiz from './CourseFormQuiz';

interface CourseModule {
  title: string;
  contentUrl?: string;
}

interface QuizQuestion {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
}

interface CourseFormData {
  id?: number;
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
  quizQuestions: QuizQuestion[];
}

interface CourseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingCourse: CourseFormData;
  setEditingCourse: (course: CourseFormData) => void;
  moduleCount: number;
  setModuleCount: (count: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export default function CourseFormModal({
  isOpen,
  onClose,
  editingCourse,
  setEditingCourse,
  moduleCount,
  setModuleCount,
  onSubmit,
  isSubmitting
}: CourseFormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-6 heading-font">
            {editingCourse.id ? 'Edit Course' : 'Create New Course'}
          </h3>

          <form onSubmit={onSubmit} className="space-y-6">
            <CourseFormBasicInfo
              editingCourse={editingCourse}
              setEditingCourse={setEditingCourse}
            />

            <CourseFormModules
              editingCourse={editingCourse}
              setEditingCourse={setEditingCourse}
              moduleCount={moduleCount}
              setModuleCount={setModuleCount}
            />

            <CourseFormQuiz
              editingCourse={editingCourse}
              setEditingCourse={setEditingCourse}
            />

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="bg-white text-black hover:bg-gray-200 px-6 py-3 font-semibold uppercase tracking-wide text-sm inline-flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                <Award className="mr-2 h-4 w-4" />
                {isSubmitting ? 'Creating...' : editingCourse.id ? 'Update Course' : 'Create Course'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="border border-gray-600 text-white hover:bg-gray-700 px-6 py-3 font-semibold uppercase tracking-wide text-sm"
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
