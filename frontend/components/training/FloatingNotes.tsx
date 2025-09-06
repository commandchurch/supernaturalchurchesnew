 import React, { useState, useEffect, useRef } from 'react';
import {
  PenTool,
  X,
  Minimize2,
  Maximize2,
  Copy,
  Check,
  Save,
  FileText,
  Clock,
  StickyNote,
  Plus,
  Trash2,
  Edit3
} from 'lucide-react';

interface Note {
  id: string;
  content: string;
  timestamp?: number;
  courseId: string;
  moduleId: string;
  createdAt: string;
  updatedAt: string;
  type: 'video' | 'general';
  tags?: string[];
}

interface FloatingNotesProps {
  courseId: string;
  moduleId: string;
  currentTime?: number;
  isVisible: boolean;
  onToggle: () => void;
}

export default function FloatingNotes({
  courseId,
  moduleId,
  currentTime,
  isVisible,
  onToggle
}: FloatingNotesProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [copiedNoteId, setCopiedNoteId] = useState<string | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes_${courseId}_${moduleId}`);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, [courseId, moduleId]);

  // Save notes to localStorage
  const saveNotes = (updatedNotes: Note[]) => {
    setNotes(updatedNotes);
    localStorage.setItem(`notes_${courseId}_${moduleId}`, JSON.stringify(updatedNotes));
  };

  // Auto-save current note
  const autoSaveNote = () => {
    if (currentNote.trim()) {
      const newNote: Note = {
        id: Date.now().toString(),
        content: currentNote.trim(),
        timestamp: currentTime,
        courseId,
        moduleId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        type: 'video'
      };

      const updatedNotes = [...notes, newNote];
      saveNotes(updatedNotes);
      setCurrentNote('');
    }
  };

  // Save note manually
  const saveCurrentNote = () => {
    if (currentNote.trim()) {
      autoSaveNote();
    }
  };

  // Delete note
  const deleteNote = (noteId: string) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    saveNotes(updatedNotes);
  };

  // Start editing note
  const startEditing = (note: Note) => {
    setEditingNoteId(note.id);
    setEditContent(note.content);
  };

  // Save edited note
  const saveEditedNote = () => {
    if (editingNoteId && editContent.trim()) {
      const updatedNotes = notes.map(note =>
        note.id === editingNoteId
          ? {
              ...note,
              content: editContent.trim(),
              updatedAt: new Date().toISOString()
            }
          : note
      );
      saveNotes(updatedNotes);
      setEditingNoteId(null);
      setEditContent('');
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingNoteId(null);
    setEditContent('');
  };

  // Copy note to clipboard
  const copyNote = async (note: Note) => {
    try {
      await navigator.clipboard.writeText(note.content);
      setCopiedNoteId(note.id);
      setTimeout(() => setCopiedNoteId(null), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = note.content;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedNoteId(note.id);
      setTimeout(() => setCopiedNoteId(null), 2000);
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp?: number) => {
    if (!timestamp) return '';
    const minutes = Math.floor(timestamp / 60);
    const seconds = Math.floor(timestamp % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible) return;

      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        saveCurrentNote();
      }

      if (e.key === 'Escape') {
        if (editingNoteId) {
          cancelEditing();
        } else {
          onToggle();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, currentNote, editingNoteId, onToggle]);

  // Auto-focus textarea when panel opens
  useEffect(() => {
    if (isVisible && !isMinimized && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isVisible, isMinimized]);

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className="fixed inset-0 bg-black/20 z-40 md:hidden"
        onClick={onToggle}
      />

      {/* Floating Notes Panel */}
      <div
        className={`
          fixed top-0 right-0 h-full bg-gray-900/95 backdrop-blur-sm border-l border-gray-700
          transition-transform duration-300 ease-in-out z-50
          ${isMinimized ? 'translate-x-full' : 'translate-x-0'}
          w-full max-w-md md:w-96
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800/50">
          <div className="flex items-center gap-2">
            <PenTool className="h-5 w-5 text-blue-400" />
            <h3 className="text-white font-semibold">Quick Notes</h3>
            {notes.length > 0 && (
              <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded">
                {notes.length}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 text-gray-400 hover:text-white transition-colors"
              title={isMinimized ? "Maximize" : "Minimize"}
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={onToggle}
              className="p-1 text-gray-400 hover:text-white transition-colors"
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <div className="flex flex-col h-full min-h-0">
            {/* Quick Note Input */}
            <div className="p-4 border-b border-gray-700">
              <div className="mb-3">
                <label className="block text-white text-sm font-medium mb-2">
                  Quick Note {currentTime ? `(at ${formatTimestamp(currentTime)})` : ''}
                </label>
                <textarea
                  ref={textareaRef}
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  placeholder="Write your thoughts here... (Ctrl+S to save, Esc to close)"
                  className="w-full bg-gray-800 border border-gray-600 text-white px-3 py-2 text-sm resize-none focus:border-blue-500 focus:outline-none min-h-[80px]"
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={saveCurrentNote}
                  disabled={!currentNote.trim()}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-3 py-1 text-sm font-medium transition-colors"
                >
                  <Save className="h-3 w-3" />
                  Save Note
                </button>

                <div className="text-xs text-gray-400">
                  {currentNote.length} characters
                </div>
              </div>
            </div>

            {/* Notes List */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <div className="p-4 space-y-3">
                {notes.length === 0 ? (
                  <div className="text-center py-8">
                    <StickyNote className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">No notes yet</p>
                    <p className="text-gray-500 text-xs mt-1">
                      Start taking notes while watching videos
                    </p>
                  </div>
                ) : (
                  notes
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map(note => (
                      <div
                        key={note.id}
                        className="bg-gray-800/50 border border-gray-700 p-3 group hover:bg-gray-800/70 transition-colors"
                      >
                        {editingNoteId === note.id ? (
                          // Edit Mode
                          <div className="space-y-2">
                            <textarea
                              ref={editTextareaRef}
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              className="w-full bg-gray-900 border border-gray-600 text-white px-2 py-1 text-sm resize-none focus:border-blue-500 focus:outline-none"
                              rows={3}
                            />
                            <div className="flex items-center gap-2">
                              <button
                                onClick={saveEditedNote}
                                className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 text-xs"
                              >
                                Save
                              </button>
                              <button
                                onClick={cancelEditing}
                                className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 text-xs"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          // View Mode
                          <>
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                {note.timestamp && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {formatTimestamp(note.timestamp)}
                                  </span>
                                )}
                                <span>{formatDate(note.createdAt)}</span>
                              </div>

                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => startEditing(note)}
                                  className="p-1 text-gray-400 hover:text-white"
                                  title="Edit"
                                >
                                  <Edit3 className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={() => copyNote(note)}
                                  className="p-1 text-gray-400 hover:text-white"
                                  title="Copy"
                                >
                                  {copiedNoteId === note.id ? (
                                    <Check className="h-3 w-3 text-green-400" />
                                  ) : (
                                    <Copy className="h-3 w-3" />
                                  )}
                                </button>
                                <button
                                  onClick={() => deleteNote(note.id)}
                                  className="p-1 text-red-400 hover:text-red-300"
                                  title="Delete"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            </div>

                            <p className="text-gray-300 text-sm leading-relaxed">
                              {note.content}
                            </p>

                            {copiedNoteId === note.id && (
                              <div className="text-green-400 text-xs mt-1 flex items-center gap-1">
                                <Check className="h-3 w-3" />
                                Copied to clipboard!
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))
                )}
              </div>
            </div>

            {/* Footer with keyboard shortcuts */}
            <div className="p-3 border-t border-gray-700 bg-gray-800/50 mt-auto">
              <div className="text-xs text-gray-500 space-y-2">
                <div className="font-medium text-gray-400">Keyboard Shortcuts:</div>
                <div className="grid grid-cols-1 gap-1">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-500">Save note:</span>
                    <span className="bg-gray-700 px-2 py-1 rounded text-gray-300">Ctrl+S</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-500">Close panel:</span>
                    <span className="bg-gray-700 px-2 py-1 rounded text-gray-300">Esc</span>
                  </div>
                </div>
                <div className="text-blue-400 text-center pt-1 border-t border-gray-600 mt-2">
                  All notes auto-save to your browser
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}


