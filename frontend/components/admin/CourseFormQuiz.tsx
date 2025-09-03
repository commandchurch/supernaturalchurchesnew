import React from 'react';
import { HelpCircle } from 'lucide-react';

interface QuizQuestion {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
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
  modules: Array<{ title: string; contentUrl?: string }>;
  quizQuestions: QuizQuestion[];
}

interface CourseFormQuizProps {
  editingCourse: CourseFormData;
  setEditingCourse: (course: CourseFormData) => void;
}

export default function CourseFormQuiz({ editingCourse, setEditingCourse }: CourseFormQuizProps) {
  const updateQuizQuestion = (index: number, field: keyof QuizQuestion, value: string) => {
    const newQuestions = [...editingCourse.quizQuestions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setEditingCourse({ ...editingCourse, quizQuestions: newQuestions });
  };

  if (!editingCourse.requiresQuiz) {
    return null;
  }

  return (
    <div className="bg-gray-900/50 border border-gray-700 p-4">
      <h4 className="text-lg font-bold text-white mb-4 heading-font flex items-center gap-2">
        <HelpCircle className="h-5 w-5" />
        Quiz Questions (10 Questions)
      </h4>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {editingCourse.quizQuestions.map((question, index) => (
          <div key={index} className="bg-gray-800/50 border border-gray-600 p-4">
            <div className="mb-3">
              <label className="block text-white font-semibold mb-1 text-sm">Question {index + 1}</label>
              <textarea
                rows={2}
                value={question.question}
                onChange={(e) => updateQuizQuestion(index, 'question', e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
                placeholder={`Enter question ${index + 1}`}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-white font-semibold mb-1 text-xs">Option A</label>
                <input
                  type="text"
                  value={question.optionA}
                  onChange={(e) => updateQuizQuestion(index, 'optionA', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-1 text-xs">Option B</label>
                <input
                  type="text"
                  value={question.optionB}
                  onChange={(e) => updateQuizQuestion(index, 'optionB', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-1 text-xs">Option C</label>
                <input
                  type="text"
                  value={question.optionC}
                  onChange={(e) => updateQuizQuestion(index, 'optionC', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-1 text-xs">Option D</label>
                <input
                  type="text"
                  value={question.optionD}
                  onChange={(e) => updateQuizQuestion(index, 'optionD', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-1 text-xs">Correct Answer</label>
              <select
                value={question.correctAnswer}
                onChange={(e) => updateQuizQuestion(index, 'correctAnswer', e.target.value as 'A' | 'B' | 'C' | 'D')}
                className="bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
