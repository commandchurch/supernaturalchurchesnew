import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import {
  BookOpen,
  PenTool,
  Bookmark,
  Calendar,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  Star,
  FileText,
  Download,
  Share2,
  Search,
  Filter,
  Plus,
  X,
  Edit,
  Trash2,
  Play
} from 'lucide-react';

interface StudyNote {
  id: string;
  courseId: string;
  moduleId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

interface Bookmark {
  id: string;
  courseId: string;
  moduleId: string;
  title: string;
  timestamp?: number;
  createdAt: string;
}

interface StudyGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  completed: boolean;
  progress: number;
  type: 'courses' | 'hours' | 'certificates';
  target: number;
}

export default function StudyTools() {
  const { user } = useUser();

  const [activeTab, setActiveTab] = useState('notes');
  const [notes, setNotes] = useState<StudyNote[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [goals, setGoals] = useState<StudyGoal[]>([]);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [editingNote, setEditingNote] = useState<StudyNote | null>(null);
  const [editingGoal, setEditingGoal] = useState<StudyGoal | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Current note/goal being edited
  const [currentNote, setCurrentNote] = useState({
    title: '',
    content: '',
    tags: [] as string[]
  });

  const [currentGoal, setCurrentGoal] = useState({
    title: '',
    description: '',
    targetDate: '',
    type: 'courses' as 'courses' | 'hours' | 'certificates',
    target: 1
  });

  // Load data from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('studyNotes');
    const savedBookmarks = localStorage.getItem('studyBookmarks');
    const savedGoals = localStorage.getItem('studyGoals');

    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }

    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }

    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  // Save data to localStorage
  const saveNotes = (updatedNotes: StudyNote[]) => {
    setNotes(updatedNotes);
    localStorage.setItem('studyNotes', JSON.stringify(updatedNotes));
  };

  const saveBookmarks = (updatedBookmarks: Bookmark[]) => {
    setBookmarks(updatedBookmarks);
    localStorage.setItem('studyBookmarks', JSON.stringify(updatedBookmarks));
  };

  const saveGoals = (updatedGoals: StudyGoal[]) => {
    setGoals(updatedGoals);
    localStorage.setItem('studyGoals', JSON.stringify(updatedGoals));
  };

  // Note management
  const createNote = () => {
    if (!currentNote.title.trim() || !currentNote.content.trim()) return;

    const newNote: StudyNote = {
      id: Date.now().toString(),
      courseId: 'current', // Would be set to actual course
      moduleId: 'current', // Would be set to actual module
      title: currentNote.title,
      content: currentNote.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: currentNote.tags
    };

    saveNotes([...notes, newNote]);
    setCurrentNote({ title: '', content: '', tags: [] });
    setShowNoteModal(false);
  };

  const updateNote = () => {
    if (!editingNote || !currentNote.title.trim() || !currentNote.content.trim()) return;

    const updatedNote: StudyNote = {
      ...editingNote,
      title: currentNote.title,
      content: currentNote.content,
      updatedAt: new Date().toISOString(),
      tags: currentNote.tags
    };

    const updatedNotes = notes.map(note =>
      note.id === editingNote.id ? updatedNote : note
    );

    saveNotes(updatedNotes);
    setEditingNote(null);
    setCurrentNote({ title: '', content: '', tags: [] });
    setShowNoteModal(false);
  };

  const deleteNote = (noteId: string) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    saveNotes(updatedNotes);
  };

  const editNote = (note: StudyNote) => {
    setEditingNote(note);
    setCurrentNote({
      title: note.title,
      content: note.content,
      tags: note.tags
    });
    setShowNoteModal(true);
  };

  // Goal management
  const createGoal = () => {
    if (!currentGoal.title.trim()) return;

    const newGoal: StudyGoal = {
      id: Date.now().toString(),
      title: currentGoal.title,
      description: currentGoal.description,
      targetDate: currentGoal.targetDate,
      completed: false,
      progress: 0,
      type: currentGoal.type,
      target: currentGoal.target
    };

    saveGoals([...goals, newGoal]);
    setCurrentGoal({
      title: '',
      description: '',
      targetDate: '',
      type: 'courses',
      target: 1
    });
    setShowGoalModal(false);
  };

  const updateGoal = () => {
    if (!editingGoal || !currentGoal.title.trim()) return;

    const updatedGoal: StudyGoal = {
      ...editingGoal,
      title: currentGoal.title,
      description: currentGoal.description,
      targetDate: currentGoal.targetDate,
      type: currentGoal.type,
      target: currentGoal.target
    };

    const updatedGoals = goals.map(goal =>
      goal.id === editingGoal.id ? updatedGoal : goal
    );

    saveGoals(updatedGoals);
    setEditingGoal(null);
    setCurrentGoal({
      title: '',
      description: '',
      targetDate: '',
      type: 'courses',
      target: 1
    });
    setShowGoalModal(false);
  };

  const deleteGoal = (goalId: string) => {
    const updatedGoals = goals.filter(goal => goal.id !== goalId);
    saveGoals(updatedGoals);
  };

  const toggleGoalCompletion = (goalId: string) => {
    const updatedGoals = goals.map(goal =>
      goal.id === goalId
        ? { ...goal, completed: !goal.completed }
        : goal
    );
    saveGoals(updatedGoals);
  };

  // Filter notes
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 ||
                       selectedTags.some(tag => note.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  // Get all unique tags
  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Study Tools</h1>
          <p className="text-gray-400 text-sm sm:text-base">Enhance your learning experience with powerful study tools</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <button
            onClick={() => setShowNoteModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <PenTool className="h-4 w-4" />
            <span className="whitespace-nowrap">New Note</span>
          </button>
          <button
            onClick={() => setShowGoalModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Target className="h-4 w-4" />
            <span className="whitespace-nowrap">Set Goal</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-700 overflow-x-auto">
        <div className="flex min-w-max">
          {[
            { id: 'notes', label: 'Study Notes', icon: PenTool },
            { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
            { id: 'goals', label: 'Goals & Progress', icon: Target },
            { id: 'analytics', label: 'Study Analytics', icon: TrendingUp }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-6 py-3 font-semibold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon className="h-4 w-4 flex-shrink-0" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notes Tab */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white px-10 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 min-w-0">
              <div className="flex items-center gap-2 flex-shrink-0">
                <Filter className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-sm whitespace-nowrap">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2 overflow-x-auto">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTags(prev =>
                      prev.includes(tag)
                        ? prev.filter(t => t !== tag)
                        : [...prev, tag]
                    )}
                    className={`px-3 py-1 text-xs font-semibold whitespace-nowrap ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredNotes.map(note => (
              <div key={note.id} className="bg-gray-800/50 border border-gray-700 p-4 sm:p-6 hover:bg-gray-800/70 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-white line-clamp-2 min-w-0">{note.title}</h3>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => editNote(note)}
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                      aria-label="Edit note"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="p-1 text-red-400 hover:text-red-300 transition-colors"
                      aria-label="Delete note"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">{note.content}</p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex flex-wrap gap-1 min-w-0">
                    {note.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-500 text-xs whitespace-nowrap flex-shrink-0">
                    {new Date(note.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredNotes.length === 0 && (
            <div className="text-center py-12">
              <PenTool className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No study notes yet</h3>
              <p className="text-gray-500 mb-4">Create your first study note to organize your learning</p>
              <button
                onClick={() => setShowNoteModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold"
              >
                Create First Note
              </button>
            </div>
          )}
        </div>
      )}

      {/* Bookmarks Tab */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Your Bookmarks</h2>
            <span className="text-gray-400">{bookmarks.length} bookmarks</span>
          </div>

          {bookmarks.length === 0 ? (
            <div className="text-center py-12">
              <Bookmark className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No bookmarks yet</h3>
              <p className="text-gray-500">Save important moments in your courses for quick reference</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookmarks.map(bookmark => (
                <div key={bookmark.id} className="bg-gray-800/50 border border-gray-700 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Bookmark className="h-5 w-5 text-blue-400" />
                    <div>
                      <h4 className="text-white font-semibold">{bookmark.title}</h4>
                      <p className="text-gray-400 text-sm">
                        {bookmark.timestamp && `${Math.floor(bookmark.timestamp / 60)}:${(bookmark.timestamp % 60).toString().padStart(2, '0')}`}
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-white">
                    <Play className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Goals Tab */}
      {activeTab === 'goals' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Study Goals</h2>
            <button
              onClick={() => setShowGoalModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 font-semibold flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              New Goal
            </button>
          </div>

          {goals.length === 0 ? (
            <div className="text-center py-12">
              <Target className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No goals set yet</h3>
              <p className="text-gray-500 mb-4">Set learning goals to stay motivated and track your progress</p>
              <button
                onClick={() => setShowGoalModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-semibold"
              >
                Set Your First Goal
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {goals.map(goal => (
                <div key={goal.id} className="bg-gray-800/50 border border-gray-700 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-2 line-clamp-2">{goal.title}</h3>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{goal.description}</p>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                        <span className="text-gray-400 whitespace-nowrap">
                          Target: {goal.target} {goal.type}
                        </span>
                        <span className="text-gray-400 whitespace-nowrap">
                          Due: {new Date(goal.targetDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => {
                          setEditingGoal(goal);
                          setCurrentGoal({
                            title: goal.title,
                            description: goal.description,
                            targetDate: goal.targetDate,
                            type: goal.type,
                            target: goal.target
                          });
                          setShowGoalModal(true);
                        }}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                        aria-label="Edit goal"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteGoal(goal.id)}
                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                        aria-label="Delete goal"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">{goal.progress}/{goal.target}</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-2 transition-all duration-300 ${
                          goal.completed ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${Math.min((goal.progress / goal.target) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => toggleGoalCompletion(goal.id)}
                      className={`px-4 py-2 font-semibold ${
                        goal.completed
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-gray-600 hover:bg-gray-500'
                      } text-white`}
                    >
                      {goal.completed ? 'Completed' : 'Mark Complete'}
                    </button>

                    {goal.completed && (
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white">Study Analytics</h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-gray-800/50 border border-gray-700 p-4 sm:p-6 text-center">
              <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400 mx-auto mb-2 sm:mb-3" />
              <div className="text-xl sm:text-2xl font-bold text-white">{notes.length}</div>
              <div className="text-gray-400 text-xs sm:text-sm">Study Notes</div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 p-4 sm:p-6 text-center">
              <Bookmark className="h-6 w-6 sm:h-8 sm:w-8 text-green-400 mx-auto mb-2 sm:mb-3" />
              <div className="text-xl sm:text-2xl font-bold text-white">{bookmarks.length}</div>
              <div className="text-gray-400 text-xs sm:text-sm">Bookmarks</div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 p-4 sm:p-6 text-center">
              <Target className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400 mx-auto mb-2 sm:mb-3" />
              <div className="text-xl sm:text-2xl font-bold text-white">{goals.length}</div>
              <div className="text-gray-400 text-xs sm:text-sm">Active Goals</div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 p-4 sm:p-6 text-center">
              <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 mx-auto mb-2 sm:mb-3" />
              <div className="text-xl sm:text-2xl font-bold text-white">
                {goals.filter(g => g.completed).length}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">Goals Achieved</div>
            </div>
          </div>

          {/* Study Patterns */}
          <div className="bg-gray-800/50 border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Study Patterns</h3>
            <div className="text-gray-400 text-sm">
              Your study analytics will be displayed here, including study time patterns,
              most productive hours, and learning progress trends.
            </div>
          </div>
        </div>
      )}

      {/* Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 p-4 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-2xl font-bold text-white">
                {editingNote ? 'Edit Note' : 'Create Study Note'}
              </h2>
              <button
                onClick={() => {
                  setShowNoteModal(false);
                  setEditingNote(null);
                  setCurrentNote({ title: '', content: '', tags: [] });
                }}
                className="text-gray-400 hover:text-white p-1"
                aria-label="Close modal"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">Note Title</label>
                <input
                  type="text"
                  value={currentNote.title}
                  onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-3 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter note title..."
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Note Content</label>
                <textarea
                  value={currentNote.content}
                  onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-3 h-48 resize-none focus:border-blue-500 focus:outline-none"
                  placeholder="Write your study notes here..."
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {currentNote.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-2"
                    >
                      {tag}
                      <button
                        onClick={() => setCurrentNote({
                          ...currentNote,
                          tags: currentNote.tags.filter(t => t !== tag)
                        })}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add tag and press Enter..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      const newTag = e.currentTarget.value.trim();
                      if (!currentNote.tags.includes(newTag)) {
                        setCurrentNote({
                          ...currentNote,
                          tags: [...currentNote.tags, newTag]
                        });
                      }
                      e.currentTarget.value = '';
                    }
                  }}
                  className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4 sm:mt-6">
              <button
                onClick={() => {
                  setShowNoteModal(false);
                  setEditingNote(null);
                  setCurrentNote({ title: '', content: '', tags: [] });
                }}
                className="px-4 sm:px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold transition-colors order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                onClick={editingNote ? updateNote : createNote}
                className="px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors order-1 sm:order-2"
              >
                {editingNote ? 'Update Note' : 'Create Note'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 p-4 sm:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-2xl font-bold text-white">
                {editingGoal ? 'Edit Goal' : 'Create Study Goal'}
              </h2>
              <button
                onClick={() => {
                  setShowGoalModal(false);
                  setEditingGoal(null);
                  setCurrentGoal({
                    title: '',
                    description: '',
                    targetDate: '',
                    type: 'courses',
                    target: 1
                  });
                }}
                className="text-gray-400 hover:text-white p-1"
                aria-label="Close modal"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">Goal Title</label>
                <input
                  type="text"
                  value={currentGoal.title}
                  onChange={(e) => setCurrentGoal({ ...currentGoal, title: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-3 focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., Complete 5 courses this month"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Description</label>
                <textarea
                  value={currentGoal.description}
                  onChange={(e) => setCurrentGoal({ ...currentGoal, description: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-3 h-24 resize-none focus:border-blue-500 focus:outline-none"
                  placeholder="Describe your goal..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">Goal Type</label>
                  <select
                    value={currentGoal.type}
                    onChange={(e) => setCurrentGoal({ ...currentGoal, type: e.target.value as any })}
                    className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-3 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="courses">Complete Courses</option>
                    <option value="hours">Study Hours</option>
                    <option value="certificates">Earn Certificates</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Target</label>
                  <input
                    type="number"
                    min="1"
                    value={currentGoal.target}
                    onChange={(e) => setCurrentGoal({ ...currentGoal, target: parseInt(e.target.value) || 1 })}
                    className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-3 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Target Date</label>
                <input
                  type="date"
                  value={currentGoal.targetDate}
                  onChange={(e) => setCurrentGoal({ ...currentGoal, targetDate: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-3 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4 sm:mt-6">
              <button
                onClick={() => {
                  setShowGoalModal(false);
                  setEditingGoal(null);
                  setCurrentGoal({
                    title: '',
                    description: '',
                    targetDate: '',
                    type: 'courses',
                    target: 1
                  });
                }}
                className="px-4 sm:px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold transition-colors order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                onClick={editingGoal ? updateGoal : createGoal}
                className="px-4 sm:px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors order-1 sm:order-2"
              >
                {editingGoal ? 'Update Goal' : 'Create Goal'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

