import React, { useState } from 'react';

// Removed backend type import - using local types instead
import { Edit, Trash2, Plus, CheckCircle, XCircle, BookOpen, FileText, HelpCircle, Award } from 'lucide-react';

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

interface Course {
  _id: string;
  title: string;
  category: string;
  isPublished: boolean;
  isPremium?: boolean;
  requiresSubscription?: boolean;
  durationMinutes?: number;
}

const emptyCourse = {
  title: '',
  description: '',
  category: 'discipleship',
  durationMinutes: 0,
  isPublished: false,
  isPremium: false,
  requiresQuiz: false,
  passingScore: 70,
  thumbnailUrl: '',
  modules: [{ title: '', contentUrl: '' }] as CourseModule[],
  quizQuestions: Array(10).fill(null).map(() => ({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 'A' as 'A' | 'B' | 'C' | 'D',
  })) as QuizQuestion[],
  certificateUrl: '',
};

export default function CourseManagerEnhanced() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(emptyCourse);
  const [moduleCount, setModuleCount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock courses data
  const coursesData = {
    courses: [
      {
        _id: '1',
        title: 'New Life in Jesus: Foundations',
        category: 'discipleship',
        isPublished: true,
        isPremium: false,
        durationMinutes: 120
      },
      {
        _id: '2',
        title: 'Divine Healing Masterclass',
        category: 'healing',
        isPublished: true,
        isPremium: true,
        durationMinutes: 180
      },
      {
        _id: '3',
        title: 'Evangelism Essentials',
        category: 'evangelism',
        isPublished: true,
        isPremium: false,
        durationMinutes: 120
      }
    ]
  };
  const isLoading = false;

  const createMutation = async (params: any) => {
    alert('Course created successfully!');
    setIsModalOpen(false);
  };

  const updateMutation = async (params: any) => {
    alert('Course updated successfully!');
  };

  const deleteMutation = async (params: any) => {
    if (confirm('Are you sure you want to delete this course?')) {
      alert('Course deleted successfully!');
    }
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setEditingCourse(emptyCourse);
    setModuleCount(1);
  };

  const handleOpenCreate = () => {
    setEditingCourse(emptyCourse);
    setModuleCount(1);
    setIsModalOpen(true);
  };

  const handleDelete = (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course? This will also delete all modules, quiz questions, and student progress.')) {
      deleteMutation({ courseId });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!editingCourse.title || !editingCourse.description) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await createMutation({
        title: editingCourse.title,
        description: editingCourse.description,
        category: editingCourse.category,
        thumbnailUrl: editingCourse.thumbnailUrl,
        durationMinutes: editingCourse.durationMinutes || 0,
        isPublished: editingCourse.isPublished,
        requiresSubscription: editingCourse.isPremium,
      });
      resetModal();
    } catch (error) {
      console.error('Failed to create course:', error);
      alert('Failed to create course. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateModule = (index: number, field: keyof CourseModule, value: string) => {
    const newModules = [...editingCourse.modules];
    newModules[index] = { ...newModules[index], [field]: value };
    setEditingCourse({ ...editingCourse, modules: newModules });
  };

  const updateQuizQuestion = (index: number, field: keyof QuizQuestion, value: string) => {
    const newQuestions = [...editingCourse.quizQuestions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setEditingCourse({ ...editingCourse, quizQuestions: newQuestions });
  };

  const handleModuleCountChange = (count: number) => {
    setModuleCount(count);
    const newModules = Array(count).fill(null).map((_, i) => 
      editingCourse.modules[i] || { title: '', contentUrl: '' }
    );
    setEditingCourse({ ...editingCourse, modules: newModules });
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BookOpen className="h-5 w-5 text-white" />
          <div>
            <h2 className="text-xl font-bold text-white heading-font">Enhanced Course Manager</h2>
            <p className="text-gray-400 text-sm">Create courses with modules, quizzes, and certificates.</p>
          </div>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-white text-black hover:bg-gray-200 px-4 py-2 font-semibold uppercase tracking-wide inline-flex items-center text-sm"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Course
        </button>
      </div>

      {isLoading ? (
        <p className="text-gray-400">Loading courses...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Title</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Category</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Status</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Access</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Quiz</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coursesData?.courses.map((course: Course) => (
                <tr key={course._id} className="border-b border-gray-700">
                  <td className="py-3 px-3 text-white">{course.title}</td>
                  <td className="py-3 px-3 text-gray-300">{course.category}</td>
                  <td className="py-3 px-3">
                    {course.isPublished ? (
                      <span className="inline-flex items-center gap-1 text-green-400 text-sm"><CheckCircle className="h-4 w-4" /> Published</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-yellow-400 text-sm"><XCircle className="h-4 w-4" /> Draft</span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    {course.isPremium ? (
                      <span className="text-purple-400 text-sm">Premium</span>
                    ) : (
                      <span className="text-gray-400 text-sm">Free</span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 text-blue-400 text-sm">
                      <HelpCircle className="h-4 w-4" /> Quiz
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300"><Edit className="h-4 w-4" /></button>
                      <button onClick={() => handleDelete(course._id)} className="text-red-400 hover:text-red-300"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-6 heading-font">Create New Course</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Course Info */}
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
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="block text-white font-semibold mb-1 text-sm">Duration (minutes)</label>
                      <input 
                        type="number" 
                        value={Number.isFinite(editingCourse.durationMinutes as number) ? editingCourse.durationMinutes : ''} 
                        onChange={(e) => {
                          const val = e.target.value.trim();
                          setEditingCourse({ 
                            ...editingCourse, 
                            durationMinutes: val === '' ? 0 : Number(val) || 0
                          });
                        }} 
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-1 text-sm">Thumbnail URL</label>
                      <input 
                        type="text" 
                        value={editingCourse.thumbnailUrl || ''} 
                        onChange={(e) => setEditingCourse({ ...editingCourse, thumbnailUrl: e.target.value })} 
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-1 text-sm">Certificate URL</label>
                      <input 
                        type="text" 
                        value={editingCourse.certificateUrl || ''} 
                        onChange={(e) => setEditingCourse({ ...editingCourse, certificateUrl: e.target.value })} 
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm" 
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
                        onChange={(e) => setEditingCourse({ ...editingCourse, passingScore: parseInt(e.target.value) || 70 })} 
                        className="w-32 bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm" 
                      />
                    </div>
                  )}
                </div>

                {/* Course Modules */}
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
                        onChange={(e) => handleModuleCountChange(parseInt(e.target.value))}
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

                {/* Quiz Questions */}
                {editingCourse.requiresQuiz && (
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
                )}

                <div className="flex space-x-3 pt-4">
                  <button 
                    type="submit" 
                    className="bg-white text-black hover:bg-gray-200 px-6 py-3 font-semibold uppercase tracking-wide text-sm inline-flex items-center" 
                    disabled={isSubmitting}
                  >
                    <Award className="mr-2 h-4 w-4" />
                    {isSubmitting ? 'Creating...' : 'Create Course'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)} 
                    className="border border-gray-600 text-white hover:bg-gray-700 px-6 py-3 font-semibold uppercase tracking-wide text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
