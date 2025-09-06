import React, { useState, useEffect } from 'react';

import { BookOpen, Plus, Edit, Trash2, CheckCircle, XCircle, Upload, Video, Image, Info, FileText, X, GraduationCap, PlayCircle, Trash } from 'lucide-react';
import { academy } from '../../client';

// Enhanced course and module interfaces
interface ModuleFormData {
  id?: string;
  title: string;
  description: string;
  videoUrl: string;
  duration?: number;
  order: number;
  resources?: string[]; // Additional resources like PDFs, links
  objectives?: string[]; // Learning objectives
}

interface QuizQuestion {
  id?: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface CourseFormData {
  _id?: string;
  title: string;
  description: string;
  category: string;
  thumbnailUrl?: string;
  durationMinutes?: number;
  modules: ModuleFormData[];
  isPublished: boolean;
  isPremium: boolean;
  requiresQuiz: boolean;
  passingScore?: number;
  tags?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites?: string[];
  outcomes?: string[];
  instructor?: string;
  language: string;
  quizQuestions: QuizQuestion[];
}

const emptyCourse: CourseFormData = {
  title: '',
  description: '',
  category: 'spiritual-growth',
  thumbnailUrl: '',
  durationMinutes: 60,
  modules: [],
  isPublished: false,
  isPremium: false,
  requiresQuiz: false,
  passingScore: 70,
  tags: '',
  level: 'Beginner',
  prerequisites: [],
  outcomes: [],
  instructor: '',
  language: 'english',
  quizQuestions: [],
};

const emptyModule: ModuleFormData = {
  title: '',
  description: '',
  videoUrl: '',
  duration: 10,
  order: 1,
  resources: [],
  objectives: [],
};

const emptyQuizQuestion: QuizQuestion = {
  question: '',
  options: ['', '', '', ''],
  correctAnswer: 0,
  explanation: '',
};

export default function CourseManagerEnhanced() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseFormData>(emptyCourse);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'basic' | 'modules' | 'quiz' | 'publishing'>('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load courses from backend
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await academy.listAllCourses();
        setCourses(response.courses);
      } catch (error) {
        console.error('Failed to load courses:', error);
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, []);

  const createMutation = async (params: any) => {
    try {
      await academy.createCourse(params);
      // Reload courses
      const response = await academy.listAllCourses();
      setCourses(response.courses);
      alert('Course created successfully!');
      return { success: true };
    } catch (error) {
      console.error('Failed to create course:', error);
      alert('Failed to create course. Please try again.');
      return { success: false };
    }
  };

  const updateMutation = async (params: any) => {
    try {
      await academy.updateCourse(params.courseId, params);
      // Reload courses
      const response = await academy.listAllCourses();
      setCourses(response.courses);
      alert('Course updated successfully!');
      return { success: true };
    } catch (error) {
      console.error('Failed to update course:', error);
      alert('Failed to update course. Please try again.');
      return { success: false };
    }
  };

  const deleteMutation = async (params: any) => {
    if (confirm('Are you sure you want to delete this course?')) {
      try {
        await academy.deleteCourse(params.courseId);
        // Reload courses
        const response = await academy.listAllCourses();
        setCourses(response.courses);
        alert('Course deleted successfully!');
        return { success: true };
      } catch (error) {
        console.error('Failed to delete course:', error);
        alert('Failed to delete course. Please try again.');
        return { success: false };
      }
    }
    return { success: false };
  };

  const resetForm = () => {
    setEditingCourse(emptyCourse);
    setThumbnailPreview('');
    setActiveTab('basic');
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (course: any) => {
    setEditingCourse({
      _id: course._id,
      title: course.title,
      description: course.description || '',
      category: course.category || 'spiritual-growth',
      thumbnailUrl: course.thumbnailUrl || '',
      durationMinutes: course.durationMinutes || 60,
      isPublished: course.isPublished || false,
      isPremium: course.isPremium || false,
      requiresQuiz: course.requiresQuiz || false,
      passingScore: course.passingScore || 70,
      modules: course.modules?.map((module: any, index: number) => ({
        id: module.id,
        title: module.title,
        description: module.description || '',
        videoUrl: module.videoUrl || '',
        duration: module.duration || 10,
        order: index + 1,
        resources: module.resources || [],
        objectives: module.objectives || [],
      })) || [],
      tags: '',
      level: course.level || 'beginner',
      prerequisites: course.prerequisites || [],
      outcomes: course.outcomes || [],
      instructor: course.instructor || '',
      language: course.language || 'english',
      quizQuestions: course.quizQuestions || [],
    });
    setThumbnailPreview('');
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      await deleteMutation({ courseId: id });
    }
  };

  const addModule = () => {
    const newModule = {
      ...emptyModule,
      order: editingCourse.modules.length + 1,
    };
    setEditingCourse({
      ...editingCourse,
      modules: [...editingCourse.modules, newModule],
    });
  };

  const removeModule = (index: number) => {
    const updatedModules = editingCourse.modules.filter((_, i) => i !== index);
    // Reorder remaining modules
    const reorderedModules = updatedModules.map((module, i) => ({
      ...module,
      order: i + 1,
    }));
    setEditingCourse({
      ...editingCourse,
      modules: reorderedModules,
    });
  };

  const updateModule = (index: number, updatedModule: ModuleFormData) => {
    const updatedModules = [...editingCourse.modules];
    updatedModules[index] = updatedModule;
    setEditingCourse({
      ...editingCourse,
      modules: updatedModules,
    });
  };

  const validateVideoUrl = (url: string): boolean => {
    if (!url) return false;
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const vimeoRegex = /(?:vimeo\.com\/)([0-9]+)/;
    return youtubeRegex.test(url) || vimeoRegex.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate modules
    if (editingCourse.modules.length === 0) {
      alert('Please add at least one module to the course');
      return;
    }

    for (const module of editingCourse.modules) {
      if (!module.title.trim()) {
        alert('All modules must have a title');
        return;
      }
      if (!validateVideoUrl(module.videoUrl)) {
        alert(`Module "${module.title}" must have a valid YouTube or Vimeo URL`);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const courseData = {
        title: editingCourse.title,
        description: editingCourse.description,
        category: editingCourse.category,
        thumbnailUrl: editingCourse.thumbnailUrl || undefined,
        videoUrl: editingCourse.modules[0]?.videoUrl || undefined,
        pdfUrl: undefined,
        durationMinutes: editingCourse.durationMinutes,
        isPublished: editingCourse.isPublished,
        isPremium: editingCourse.isPremium,
      };

      if (editingCourse._id) {
        await updateMutation({
          courseId: editingCourse._id,
          ...courseData,
        });
      } else {
        await createMutation(courseData);
      }

      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Failed to save course:', error);
      alert('Failed to save course. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    'spiritual-growth', 'ministry-training', 'biblical-studies', 'leadership',
    'evangelism', 'discipleship', 'worship', 'prayer', 'healing', 'prophecy'
  ];

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-3 sm:p-6 rounded-lg">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-white flex-shrink-0" />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white heading-font">Manage Courses</h2>
            <p className="text-gray-400 text-xs sm:text-sm hidden sm:block">Create comprehensive courses with multiple video modules and structured learning</p>
            <p className="text-gray-400 text-xs sm:hidden">Create structured learning courses</p>
          </div>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-6 py-2 sm:py-3 font-semibold uppercase tracking-wide inline-flex items-center text-xs sm:text-sm rounded transition-colors w-full sm:w-auto justify-center"
        >
          <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Create Course</span>
          <span className="sm:hidden">Create</span>
        </button>
      </div>

      {isLoading ? (
        <p className="text-gray-400 text-center py-8">Loading courses...</p>
      ) : (
        <div className="overflow-x-auto -mx-3 sm:mx-0">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-semibold py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm">Course</th>
                <th className="text-left text-gray-400 font-semibold py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm hidden md:table-cell">Category</th>
                <th className="text-left text-gray-400 font-semibold py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm hidden lg:table-cell">Level</th>
                <th className="text-left text-gray-400 font-semibold py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm">Modules</th>
                <th className="text-left text-gray-400 font-semibold py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm">Status</th>
                <th className="text-left text-gray-400 font-semibold py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course: any) => (
                <tr key={course._id} className="border-b border-gray-700/50 hover:bg-gray-700/20">
                  <td className="py-3 sm:py-4 px-2 sm:px-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      {course.thumbnailUrl && (
                        <img
                          src={course.thumbnailUrl}
                          alt={course.title}
                          className="w-8 h-6 sm:w-12 sm:h-8 object-cover rounded border border-gray-600 flex-shrink-0"
                        />
                      )}
                      <div className="min-w-0">
                        <p className="text-white font-medium text-sm sm:text-base truncate">{course.title}</p>
                        <p className="text-gray-400 text-xs sm:text-sm mt-1 line-clamp-1 md:hidden">
                          {course.category?.replace('-', ' ')} • {course.level}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-3 hidden md:table-cell">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 capitalize">
                      {course.category?.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-3 hidden lg:table-cell">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                      course.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                      course.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {course.level}
                    </span>
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-3 text-gray-300 text-xs sm:text-sm">
                    {course.modules?.length || 0}
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-3">
                    {course.isPublished ? (
                      <span className="inline-flex items-center gap-1 text-green-400 text-xs sm:text-sm">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Published</span>
                        <span className="sm:hidden">Pub</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-yellow-400 text-xs sm:text-sm">
                        <XCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Draft</span>
                        <span className="sm:hidden">Draft</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-3">
                    <div className="flex space-x-1 sm:space-x-2">
                      <button 
                        onClick={() => handleOpenEdit(course)} 
                        className="text-blue-400 hover:text-blue-300 p-1 rounded"
                        title="Edit course"
                      >
                        <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(course._id)} 
                        className="text-red-400 hover:text-red-300 p-1 rounded"
                        title="Delete course"
                      >
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-3 sm:p-6 border-b border-gray-700 flex-shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 flex-shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-white heading-font truncate">
                    {editingCourse._id ? 'Edit Course' : 'Create New Course'}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm hidden sm:block">
                    Build comprehensive learning experiences with multiple video modules
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-300 p-1 sm:p-2 rounded flex-shrink-0"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-700 overflow-x-auto flex-shrink-0">
              <button
                onClick={() => setActiveTab('basic')}
                className={`px-3 sm:px-6 py-2 sm:py-3 font-medium text-xs sm:text-sm whitespace-nowrap flex items-center gap-1 sm:gap-2 ${
                  activeTab === 'basic'
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Info className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Course Details</span>
                <span className="sm:hidden">Details</span>
              </button>
              <button
                onClick={() => setActiveTab('modules')}
                className={`px-3 sm:px-6 py-2 sm:py-3 font-medium text-xs sm:text-sm whitespace-nowrap flex items-center gap-1 sm:gap-2 ${
                  activeTab === 'modules'
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Video className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Modules ({editingCourse.modules.length})</span>
                <span className="sm:hidden">Modules</span>
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-3 sm:px-6 py-2 sm:py-3 font-medium text-xs sm:text-sm whitespace-nowrap flex items-center gap-1 sm:gap-2 ${
                  activeTab === 'quiz'
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Quiz ({editingCourse.quizQuestions.length})</span>
                <span className="sm:hidden">Quiz</span>
              </button>
              <button
                onClick={() => setActiveTab('publishing')}
                className={`px-3 sm:px-6 py-2 sm:py-3 font-medium text-xs sm:text-sm whitespace-nowrap flex items-center gap-1 sm:gap-2 ${
                  activeTab === 'publishing'
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Publishing</span>
                <span className="sm:hidden">Publish</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-3 sm:p-6 overflow-y-auto flex-1 min-h-0">{/* THIS IS WHERE MODAL BODY CONTINUES */}
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Difficulty Level *
                        </label>
                        <select
                          value={editingCourse.level}
                          onChange={(e) => setEditingCourse({ ...editingCourse, level: e.target.value as 'Beginner' | 'Intermediate' | 'Advanced' })}
                          className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                        >
                          <option value="Beginner">🟢 Beginner</option>
                          <option value="Intermediate">🟡 Intermediate</option>
                          <option value="Advanced">🔴 Advanced</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Language
                        </label>
                        <select
                          value={editingCourse.language}
                          onChange={(e) => setEditingCourse({ ...editingCourse, language: e.target.value })}
                          className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                        >
                          <option value="english">🇺🇸 English</option>
                          <option value="spanish">🇪🇸 Spanish</option>
                          <option value="french">🇫🇷 French</option>
                          <option value="portuguese">🇧🇷 Portuguese</option>
                          <option value="arabic">🇸🇦 Arabic</option>
                          <option value="chinese">🇨🇳 Chinese</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Estimated Duration (minutes)
                        </label>
                        <input
                          type="number"
                          value={editingCourse.durationMinutes || ''}
                          onChange={(e) => setEditingCourse({ ...editingCourse, durationMinutes: parseInt(e.target.value) || 60 })}
                          className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                          placeholder="60"
                          min="15"
                          max="600"
                        />
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

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Instructor Name
                      </label>
                      <input
                        type="text"
                        value={editingCourse.instructor || ''}
                        onChange={(e) => setEditingCourse({ ...editingCourse, instructor: e.target.value })}
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                        placeholder="Pastor John Smith"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Learning Outcomes (what students will achieve)
                      </label>
                      <div className="space-y-2">
                        {editingCourse.outcomes?.map((outcome, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={outcome}
                              onChange={(e) => {
                                const newOutcomes = [...(editingCourse.outcomes || [])];
                                newOutcomes[index] = e.target.value;
                                setEditingCourse({ ...editingCourse, outcomes: newOutcomes });
                              }}
                              className="flex-1 bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                              placeholder="e.g., Students will understand biblical principles of leadership"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newOutcomes = editingCourse.outcomes?.filter((_, i) => i !== index);
                                setEditingCourse({ ...editingCourse, outcomes: newOutcomes });
                              }}
                              className="text-red-400 hover:text-red-300 p-2"
                            >
                              <Trash className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const newOutcomes = [...(editingCourse.outcomes || []), ''];
                            setEditingCourse({ ...editingCourse, outcomes: newOutcomes });
                          }}
                          className="text-orange-500 hover:text-orange-400 text-sm font-medium"
                        >
                          + Add Learning Outcome
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Prerequisites (what students need to know beforehand)
                      </label>
                      <div className="space-y-2">
                        {editingCourse.prerequisites?.map((prereq, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={prereq}
                              onChange={(e) => {
                                const newPrereqs = [...(editingCourse.prerequisites || [])];
                                newPrereqs[index] = e.target.value;
                                setEditingCourse({ ...editingCourse, prerequisites: newPrereqs });
                              }}
                              className="flex-1 bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                              placeholder="e.g., Basic understanding of biblical principles"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newPrereqs = editingCourse.prerequisites?.filter((_, i) => i !== index);
                                setEditingCourse({ ...editingCourse, prerequisites: newPrereqs });
                              }}
                              className="text-red-400 hover:text-red-300 p-2"
                            >
                              <Trash className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const newPrereqs = [...(editingCourse.prerequisites || []), ''];
                            setEditingCourse({ ...editingCourse, prerequisites: newPrereqs });
                          }}
                          className="text-orange-500 hover:text-orange-400 text-sm font-medium"
                        >
                          + Add Prerequisite
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Course Thumbnail URL
                      </label>
                      <div className="bg-gray-700/50 border border-gray-600 rounded p-4 mb-4">
                        <p className="text-gray-400 text-sm mb-2">📸 Thumbnail Guidelines:</p>
                        <ul className="text-gray-400 text-xs space-y-1">
                          <li>• Recommended: 1920x1080 pixels (16:9 aspect ratio)</li>
                          <li>• Professional design that represents course content</li>
                          <li>• Clear, readable text if included</li>
                          <li>• Eye-catching but not cluttered</li>
                        </ul>
                      </div>
                      <input
                        type="url"
                        value={editingCourse.thumbnailUrl || ''}
                        onChange={(e) => setEditingCourse({ ...editingCourse, thumbnailUrl: e.target.value })}
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                        placeholder="https://example.com/course-thumbnail.jpg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        value={editingCourse.tags || ''}
                        onChange={(e) => setEditingCourse({ ...editingCourse, tags: e.target.value })}
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                        placeholder="spiritual growth, ministry, leadership"
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
                        <p className="text-gray-400 text-sm">Add video modules to build your course curriculum</p>
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
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                                  Duration (minutes)
                                </label>
                                <input
                                  type="number"
                                  min="1"
                                  max="180"
                                  value={module.duration}
                                  onChange={(e) => updateModule(index, { ...module, duration: parseInt(e.target.value) })}
                                  className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                                />
                              </div>
                            </div>

                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Module Description
                              </label>
                              <textarea
                                value={module.description}
                                onChange={(e) => updateModule(index, { ...module, description: e.target.value })}
                                className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                                rows={2}
                                placeholder="Brief description of what this module covers..."
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Video URL * (YouTube or Vimeo)
                              </label>
                              <input
                                type="url"
                                value={module.videoUrl}
                                onChange={(e) => updateModule(index, { ...module, videoUrl: e.target.value })}
                                className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                                placeholder="https://www.youtube.com/watch?v=..."
                              />
                              {module.videoUrl && !validateVideoUrl(module.videoUrl) && (
                                <p className="text-red-400 text-xs mt-1">Please enter a valid YouTube or Vimeo URL</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded p-4">
                      <p className="text-blue-400 text-sm mb-2">💡 Module Best Practices:</p>
                      <ul className="text-blue-300 text-xs space-y-1">
                        <li>• Keep modules focused on one key topic or skill</li>
                        <li>• Aim for 10-20 minutes per module for optimal engagement</li>
                        <li>• Structure modules in logical learning progression</li>
                        <li>• Use clear, descriptive titles and descriptions</li>
                        <li>• Test video URLs before publishing</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Quiz Tab */}
                {activeTab === 'quiz' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-white">Course Assessment</h4>
                        <p className="text-gray-400 text-sm">Create quiz questions to test student understanding</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const newQuestions = [...editingCourse.quizQuestions, { ...emptyQuizQuestion }];
                          setEditingCourse({ ...editingCourse, quizQuestions: newQuestions });
                        }}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm font-medium rounded inline-flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Question
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={editingCourse.requiresQuiz}
                            onChange={(e) => setEditingCourse({ ...editingCourse, requiresQuiz: e.target.checked })}
                            className="form-checkbox h-4 w-4 text-orange-500 bg-gray-700 border-gray-600 rounded"
                          />
                          <span className="ml-2 text-white text-sm">Require quiz completion for course completion</span>
                        </label>
                      </div>
                      
                      {editingCourse.requiresQuiz && (
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Passing Score (%)
                          </label>
                          <input
                            type="number"
                            value={editingCourse.passingScore || 70}
                            onChange={(e) => setEditingCourse({ ...editingCourse, passingScore: parseInt(e.target.value) || 70 })}
                            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                            min="0"
                            max="100"
                          />
                        </div>
                      )}
                    </div>

                    {editingCourse.quizQuestions.length > 0 && (
                      <div className="space-y-4">
                        {editingCourse.quizQuestions.map((question, questionIndex) => (
                          <div key={questionIndex} className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h5 className="text-white font-medium">Question {questionIndex + 1}</h5>
                              <button
                                type="button"
                                onClick={() => {
                                  const newQuestions = editingCourse.quizQuestions.filter((_, i) => i !== questionIndex);
                                  setEditingCourse({ ...editingCourse, quizQuestions: newQuestions });
                                }}
                                className="text-red-400 hover:text-red-300 p-1"
                              >
                                <Trash className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Question Text *
                              </label>
                              <textarea
                                value={question.question}
                                onChange={(e) => {
                                  const newQuestions = [...editingCourse.quizQuestions];
                                  newQuestions[questionIndex].question = e.target.value;
                                  setEditingCourse({ ...editingCourse, quizQuestions: newQuestions });
                                }}
                                className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                                rows={2}
                                placeholder="Enter your question here..."
                              />
                            </div>

                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Answer Options (select the correct one)
                              </label>
                              <div className="space-y-2">
                                {question.options.map((option, optionIndex) => (
                                  <div key={optionIndex} className="flex items-center gap-2">
                                    <input
                                      type="radio"
                                      name={`correct-answer-${questionIndex}`}
                                      checked={question.correctAnswer === optionIndex}
                                      onChange={() => {
                                        const newQuestions = [...editingCourse.quizQuestions];
                                        newQuestions[questionIndex].correctAnswer = optionIndex;
                                        setEditingCourse({ ...editingCourse, quizQuestions: newQuestions });
                                      }}
                                      className="text-orange-500"
                                    />
                                    <input
                                      type="text"
                                      value={option}
                                      onChange={(e) => {
                                        const newQuestions = [...editingCourse.quizQuestions];
                                        newQuestions[questionIndex].options[optionIndex] = e.target.value;
                                        setEditingCourse({ ...editingCourse, quizQuestions: newQuestions });
                                      }}
                                      className="flex-1 bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                                      placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Explanation (optional)
                              </label>
                              <textarea
                                value={question.explanation || ''}
                                onChange={(e) => {
                                  const newQuestions = [...editingCourse.quizQuestions];
                                  newQuestions[questionIndex].explanation = e.target.value;
                                  setEditingCourse({ ...editingCourse, quizQuestions: newQuestions });
                                }}
                                className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                                rows={2}
                                placeholder="Explain why this is the correct answer..."
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="bg-green-500/10 border border-green-500/30 rounded p-4">
                      <p className="text-green-400 text-sm mb-2">✅ Quiz Best Practices:</p>
                      <ul className="text-green-300 text-xs space-y-1">
                        <li>• Create 5-15 questions that cover key learning objectives</li>
                        <li>• Use clear, unambiguous language in questions</li>
                        <li>• Provide meaningful explanations for correct answers</li>
                        <li>• Set reasonable passing scores (70-80% typical)</li>
                        <li>• Test your quiz before publishing the course</li>
                      </ul>
                    </div>
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
                      
                      {editingCourse.isPublished && (
                        <div className="bg-green-500/10 border border-green-500/30 rounded p-4">
                          <p className="text-green-400 text-sm">✅ Course will be published with {editingCourse.modules.length} modules</p>
                        </div>
                      )}
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
                          <p className="text-gray-400">Level:</p>
                          <p className="text-white font-medium capitalize">{editingCourse.level}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Total Modules:</p>
                          <p className="text-white font-medium">{editingCourse.modules.length}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Estimated Duration:</p>
                          <p className="text-white font-medium">
                            {editingCourse.modules.reduce((total, module) => total + (module.duration || 0), 0)} minutes
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400">Status:</p>
                          <p className={`font-medium ${editingCourse.isPublished ? 'text-green-400' : 'text-yellow-400'}`}>
                            {editingCourse.isPublished ? 'Published' : 'Draft'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-500/10 border border-orange-500/30 rounded p-4">
                      <p className="text-orange-400 text-sm mb-2">📋 Pre-Publishing Checklist:</p>
                      <ul className="text-orange-300 text-xs space-y-1">
                        <li>• Course title is clear and engaging</li>
                        <li>• Description accurately represents the content</li>
                        <li>• All modules have valid video URLs</li>
                        <li>• Module titles and descriptions are complete</li>
                        <li>• Course thumbnail is professional and relevant</li>
                        <li>• Difficulty level matches the content complexity</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-gray-700 px-2 sm:px-0">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 sm:px-6 py-2 sm:py-2 text-gray-400 hover:text-gray-300 font-medium text-sm sm:text-base order-2 sm:order-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white px-6 sm:px-8 py-3 sm:py-2 font-semibold uppercase tracking-wide text-sm rounded transition-colors order-1 sm:order-2"
                  >
                    {isSubmitting
                      ? 'Saving...'
                      : editingCourse._id
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
