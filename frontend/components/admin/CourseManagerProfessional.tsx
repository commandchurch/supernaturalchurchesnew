import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../_generated/api';
import { GraduationCap, Plus, Edit, Trash2, CheckCircle, XCircle, Upload, Video, Image, Info, FileText, X, PlayCircle, Trash } from 'lucide-react';

// Interfaces matching backend
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
  thumbnailUrl?: string;
  durationMinutes?: number;
  isPublished: boolean;
  isPremium: boolean;
  requiresQuiz: boolean;
  passingScore?: number;
  modules: CourseModule[];
  quizQuestions: QuizQuestion[];
}

const emptyCourse: CourseFormData = {
  title: '',
  description: '',
  category: 'spiritual-growth',
  thumbnailUrl: '',
  durationMinutes: 60,
  isPublished: false,
  isPremium: false,
  requiresQuiz: false,
  passingScore: 70,
  modules: [],
  quizQuestions: [],
};

const emptyModule: CourseModule = {
  title: '',
  contentUrl: '',
};

export default function CourseManagerProfessional() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseFormData>(emptyCourse);
  const [activeTab, setActiveTab] = useState<'basic' | 'modules' | 'quiz' | 'publishing'>('basic');

  const coursesData = useQuery(api.academy.listAllCourses);
  const isLoading = coursesData === undefined;

  const createMutation = useMutation({
    mutationFn: (courseData: CourseFormData) => backend.academy.createCourseWithModules({
      title: courseData.title,
      description: courseData.description,
      category: courseData.category,
      thumbnailUrl: courseData.thumbnailUrl,
      durationMinutes: courseData.durationMinutes,
      isPublished: courseData.isPublished,
      isPremium: courseData.isPremium,
      requiresQuiz: courseData.requiresQuiz,
      passingScore: courseData.passingScore,
      modules: courseData.modules,
      quizQuestions: courseData.quizQuestions,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
      setIsModalOpen(false);
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (courseData: CourseFormData) => backend.academy.updateCourse({
      id: courseData.id!,
      title: courseData.title,
      description: courseData.description,
      category: courseData.category,
      thumbnailUrl: courseData.thumbnailUrl,
      durationMinutes: courseData.durationMinutes,
      isPublished: courseData.isPublished,
      isPremium: courseData.isPremium,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
      setIsModalOpen(false);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => backend.academy.deleteCourse({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
    },
  });

  const resetForm = () => {
    setEditingCourse(emptyCourse);
    setActiveTab('basic');
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (course: any) => {
    setEditingCourse({
      id: course.id,
      title: course.title,
      description: course.description || '',
      category: course.category || 'spiritual-growth',
      thumbnailUrl: course.thumbnailUrl || '',
      durationMinutes: course.durationMinutes || 60,
      isPublished: course.isPublished || false,
      isPremium: course.isPremium || false,
      requiresQuiz: course.requiresQuiz || false,
      passingScore: course.passingScore || 70,
      modules: course.modules || [],
      quizQuestions: course.quizQuestions || [],
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      deleteMutation.mutate(id);
    }
  };

  const addModule = () => {
    setEditingCourse({
      ...editingCourse,
      modules: [...editingCourse.modules, { ...emptyModule }],
    });
  };

  const removeModule = (index: number) => {
    const updatedModules = editingCourse.modules.filter((_, i) => i !== index);
    setEditingCourse({
      ...editingCourse,
      modules: updatedModules,
    });
  };

  const updateModule = (index: number, updatedModule: CourseModule) => {
    const updatedModules = [...editingCourse.modules];
    updatedModules[index] = updatedModule;
    setEditingCourse({
      ...editingCourse,
      modules: updatedModules,
    });
  };

  const validateVideoUrl = (url: string): boolean => {
    if (!url) return true;
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const vimeoRegex = /(?:vimeo\.com\/)([0-9]+)/;
    return youtubeRegex.test(url) || vimeoRegex.test(url) || url.startsWith('http');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCourse.modules.length === 0) {
      alert('Please add at least one module to the course');
      return;
    }

    for (const module of editingCourse.modules) {
      if (!module.title.trim()) {
        alert('All modules must have a title');
        return;
      }
    }

    if (editingCourse.requiresQuiz && editingCourse.quizQuestions.length === 0) {
      alert('Quiz is required but no questions have been added');
      return;
    }

    if (editingCourse.id) {
      updateMutation.mutate(editingCourse);
    } else {
      createMutation.mutate(editingCourse);
    }
  };

  const categories = [
    'spiritual-growth', 'ministry-training', 'biblical-studies', 'leadership',
    'evangelism', 'discipleship', 'worship', 'prayer', 'healing', 'prophecy'
  ];

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-6 w-6 text-white" />
          <div>
            <h2 className="text-2xl font-bold text-white heading-font">Manage Courses</h2>
            <p className="text-gray-400 text-sm">Create comprehensive courses with multiple video modules and structured learning</p>
          </div>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-semibold uppercase tracking-wide inline-flex items-center text-sm rounded transition-colors"
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
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Course</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Category</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Duration</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Type</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Status</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coursesData?.courses.map((course: any) => (
                <tr key={course.id} className="border-b border-gray-700/50 hover:bg-gray-700/20">
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-3">
                      {course.thumbnailUrl && (
                        <img
                          src={course.thumbnailUrl}
                          alt={course.title}
                          className="w-12 h-8 object-cover rounded border border-gray-600"
                        />
                      )}
                      <div>
                        <p className="text-white font-medium">{course.title}</p>
                        <p className="text-gray-400 text-sm mt-1 line-clamp-1">{course.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 capitalize">
                      {course.category?.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-3 text-gray-300">
                    {course.durationMinutes ? `${course.durationMinutes} min` : 'N/A'}
                  </td>
                  <td className="py-4 px-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      course.isPremium 
                        ? 'bg-yellow-500/20 text-yellow-400' 
                        : 'bg-green-500/20 text-green-400'
                    }`}>
                      {course.isPremium ? 'Premium' : 'Free'}
                    </span>
                  </td>
                  <td className="py-4 px-3">
                    {course.isPublished ? (
                      <span className="inline-flex items-center gap-1 text-green-400 text-sm">
                        <CheckCircle className="h-4 w-4" /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-yellow-400 text-sm">
                        <XCircle className="h-4 w-4" /> Draft
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-3">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleOpenEdit(course)} 
                        className="text-blue-400 hover:text-blue-300 p-1 rounded"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(course.id)} 
                        className="text-red-400 hover:text-red-300 p-1 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Enhanced Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-5xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-6 w-6 text-orange-500" />
                <div>
                  <h3 className="text-xl font-bold text-white heading-font">
                    {editingCourse.id ? 'Edit Course' : 'Create New Course'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Build comprehensive learning experiences with video modules and assessments
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-300 p-2 rounded"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-700">
              <button
                onClick={() => setActiveTab('basic')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'basic'
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Info className="inline-block w-4 h-4 mr-2" />
                Course Details
              </button>
              <button
                onClick={() => setActiveTab('modules')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'modules'
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Video className="inline-block w-4 h-4 mr-2" />
                Modules ({editingCourse.modules.length})
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'quiz'
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <FileText className="inline-block w-4 h-4 mr-2" />
                Quiz ({editingCourse.quizQuestions.length})
              </button>
              <button
                onClick={() => setActiveTab('publishing')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'publishing'
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <CheckCircle className="inline-block w-4 h-4 mr-2" />
                Publishing
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Course Details Tab */}
                {activeTab === 'basic' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Course Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingCourse.title}
                          onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                          className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                          placeholder="Enter course title..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Category *
                        </label>
                        <select
                          value={editingCourse.category}
                          onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value })}
                          className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500 capitalize"
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat} className="capitalize">{cat.replace('-', ' ')}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Course Description *
                      </label>
                      <textarea
                        required
                        value={editingCourse.description}
                        onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                        rows={4}
                        placeholder="Comprehensive description of what students will learn..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Duration (minutes)
                        </label>
                        <input
                          type="number"
                          min="10"
                          max="600"
                          value={editingCourse.durationMinutes || ''}
                          onChange={(e) => setEditingCourse({ ...editingCourse, durationMinutes: parseInt(e.target.value) || undefined })}
                          className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={editingCourse.isPremium}
                            onChange={(e) => setEditingCourse({ ...editingCourse, isPremium: e.target.checked })}
                            className="form-checkbox h-4 w-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                          />
                          <span className="ml-2 text-white text-sm">Premium Course</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Course Thumbnail URL
                      </label>
                      <input
                        type="url"
                        value={editingCourse.thumbnailUrl || ''}
                        onChange={(e) => setEditingCourse({ ...editingCourse, thumbnailUrl: e.target.value })}
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                        placeholder="https://example.com/course-thumbnail.jpg"
                      />
                    </div>
                  </div>
                )}

                {/* Video Modules Tab */}
                {activeTab === 'modules' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-white">Course Modules</h4>
                        <p className="text-gray-400 text-sm">Add content modules to build your course</p>
                      </div>
                      <button
                        type="button"
                        onClick={addModule}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm font-medium rounded inline-flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Module
                      </button>
                    </div>

                    {editingCourse.modules.length === 0 ? (
                      <div className="text-center py-12 border-2 border-dashed border-gray-600 rounded-lg">
                        <PlayCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">No modules added yet</p>
                        <p className="text-gray-500 text-sm">Click "Add Module" to get started</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {editingCourse.modules.map((module, index) => (
                          <div key={index} className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h5 className="text-white font-medium">Module {index + 1}</h5>
                              <button
                                type="button"
                                onClick={() => removeModule(index)}
                                className="text-red-400 hover:text-red-300 p-1 rounded"
                              >
                                <Trash className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Module Title *
                                </label>
                                <input
                                  type="text"
                                  value={module.title}
                                  onChange={(e) => updateModule(index, { ...module, title: e.target.value })}
                                  className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                                  placeholder="Module title..."
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Content URL (YouTube, Vimeo, or direct link)
                                </label>
                                <input
                                  type="url"
                                  value={module.contentUrl || ''}
                                  onChange={(e) => updateModule(index, { ...module, contentUrl: e.target.value })}
                                  className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                                  placeholder="https://www.youtube.com/watch?v=... or direct content URL"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Quiz Tab */}
                {activeTab === 'quiz' && (
                  <div className="space-y-6">
                    <div className="bg-gray-700/50 border border-gray-600 rounded p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-white font-medium mb-1">Course Assessment</h4>
                          <p className="text-gray-400 text-sm">Optional quiz to test student understanding</p>
                        </div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={editingCourse.requiresQuiz}
                            onChange={(e) => setEditingCourse({ ...editingCourse, requiresQuiz: e.target.checked })}
                            className="form-checkbox h-5 w-5 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                          />
                          <span className="ml-2 text-white font-medium">Enable Quiz</span>
                        </label>
                      </div>
                      
                      {editingCourse.requiresQuiz && (
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Passing Score (%)
                          </label>
                          <input
                            type="number"
                            min="50"
                            max="100"
                            value={editingCourse.passingScore || 70}
                            onChange={(e) => setEditingCourse({ ...editingCourse, passingScore: parseInt(e.target.value) })}
                            className="w-32 bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                          />
                        </div>
                      )}
                    </div>

                    {editingCourse.requiresQuiz && (
                      <div className="text-center py-8 border-2 border-dashed border-gray-600 rounded-lg">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">Quiz questions feature coming soon</p>
                        <p className="text-gray-500 text-sm">Advanced quiz builder will be available in the next update</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Publishing Tab */}
                {activeTab === 'publishing' && (
                  <div className="space-y-6">
                    <div className="bg-gray-700/50 border border-gray-600 rounded p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-white font-medium mb-2">Publishing Status</h4>
                          <p className="text-gray-400 text-sm">
                            {editingCourse.isPublished 
                              ? 'This course will be visible to all users and available for enrollment'
                              : 'Save as draft to review and test before making it public'
                            }
                          </p>
                        </div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={editingCourse.isPublished}
                            onChange={(e) => setEditingCourse({ ...editingCourse, isPublished: e.target.checked })}
                            className="form-checkbox h-5 w-5 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                          />
                          <span className="ml-2 text-white font-medium">
                            {editingCourse.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="bg-gray-700/50 border border-gray-600 rounded p-4">
                      <h4 className="text-white font-medium mb-3">Course Summary</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Title:</p>
                          <p className="text-white font-medium">{editingCourse.title || 'Untitled Course'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Category:</p>
                          <p className="text-white font-medium capitalize">{editingCourse.category.replace('-', ' ')}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Type:</p>
                          <p className="text-white font-medium">{editingCourse.isPremium ? 'Premium' : 'Free'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Total Modules:</p>
                          <p className="text-white font-medium">{editingCourse.modules.length}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Quiz:</p>
                          <p className="text-white font-medium">{editingCourse.requiresQuiz ? 'Enabled' : 'Disabled'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Status:</p>
                          <p className={`font-medium ${editingCourse.isPublished ? 'text-green-400' : 'text-yellow-400'}`}>
                            {editingCourse.isPublished ? 'Published' : 'Draft'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Actions */}
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-700">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 text-gray-400 hover:text-gray-300 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white px-8 py-2 font-semibold uppercase tracking-wide text-sm rounded transition-colors"
                  >
                    {createMutation.isPending || updateMutation.isPending
                      ? 'Saving...'
                      : editingCourse.id
                      ? 'Update Course'
                      : 'Create Course'
                    }
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
