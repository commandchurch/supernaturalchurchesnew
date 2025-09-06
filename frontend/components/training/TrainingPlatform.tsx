import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import jsPDF from 'jspdf';

// Debounce utility function
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// CertificateViewer Component - Reusable for dashboard and other areas
// Usage example in dashboard:
/*
import React, { useState } from 'react';
import { CertificateViewer, generateCertificatePDF, Certificate } from '../training/TrainingPlatform';

function DashboardCertificates() {
  const [viewingCertificate, setViewingCertificate] = useState<Certificate | null>(null);
  let certificates = [];
  try {
    const certificatesData = localStorage.getItem('certificates');
    if (certificatesData && certificatesData.trim()) {
      certificates = JSON.parse(certificatesData);
    }
  } catch (error) {
    console.warn('Corrupted certificates data found, clearing:', error);
    localStorage.removeItem('certificates');
    certificates = [];
  }

  return (
    <div>
      <h2>Your Certificates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certificates.map((cert: Certificate) => (
          <div key={cert.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold">{cert.courseTitle}</h3>
            <p className="text-sm text-gray-600">Score: {cert.score}%</p>
            <button
              onClick={() => setViewingCertificate(cert)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              View Certificate
            </button>
          </div>
        ))}
      </div>

      {viewingCertificate && (
        <CertificateViewer
          certificate={viewingCertificate}
          onClose={() => setViewingCertificate(null)}
        />
      )}
    </div>
  );
}
*/
interface CertificateViewerProps {
  certificate: Certificate;
  onClose?: () => void;
}

export const CertificateViewer: React.FC<CertificateViewerProps> = ({ certificate, onClose }) => {
  const downloadPDF = () => {
    const doc = generateCertificatePDF(certificate);
    doc.save(`certificate-${certificate.certificateId}.pdf`);
  };

  const shareCertificate = () => {
    const shareText = `I earned a certificate for completing "${certificate.courseTitle}" with ${certificate.score}%! 🎓`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: 'Certificate Earned!',
        text: shareText,
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert('Certificate link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Certificate Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-purple-600/90 to-green-600/90" />

      {/* Certificate Content */}
      <div className="relative z-10 bg-white rounded-lg p-8 max-w-4xl w-full shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl font-bold text-blue-600 mb-2">SUPERNATURAL INSTITUTE</div>
          <div className="text-lg text-gray-600 mb-4">E-Learning Platform</div>
          <div className="text-3xl font-bold text-gray-800 mb-4">CERTIFICATE OF COMPLETION</div>
          <div className="w-32 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-8">
          <div className="text-lg text-gray-700 mb-4">This certifies that</div>
          <div className="text-3xl font-bold text-blue-600 mb-4">{certificate.userName}</div>
          <div className="text-lg text-gray-700 mb-4">has successfully completed the course</div>
          <div className="text-2xl font-bold text-gray-800 mb-4">"{certificate.courseTitle}"</div>
          <div className="text-lg text-gray-700">with a score of {certificate.score}%</div>
        </div>

        {/* Certificate Details */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="text-left">
            <div className="text-sm text-gray-600">Certificate ID:</div>
            <div className="font-mono text-sm">{certificate.certificateId}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Completion Date:</div>
            <div className="text-sm">{new Date(certificate.completionDate).toLocaleDateString()}</div>
          </div>
          <div className="text-left">
            <div className="text-sm text-gray-600">Instructor:</div>
            <div className="text-sm">{certificate.instructor}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Date Issued:</div>
            <div className="text-sm">{new Date().toLocaleDateString()}</div>
          </div>
        </div>

        {/* Signature */}
        <div className="text-center mb-8">
          <div className="inline-block">
            <div className="w-64 h-px bg-gray-400 mb-2"></div>
            <div className="text-sm text-gray-600">Authorized Signature</div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 mb-8">
          Supernatural Institute - Equipping believers for Kingdom advancement
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={downloadPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold rounded-lg transition-colors flex items-center gap-2"
          >
            <FileText className="h-5 w-5" />
            Download PDF
          </button>

          <button
            onClick={shareCertificate}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-semibold rounded-lg transition-colors flex items-center gap-2"
          >
            <Share2 className="h-5 w-5" />
            Share Certificate
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 font-semibold rounded-lg transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Export the Certificate interface and PDF generator for use in other components
export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  userName: string;
  completionDate: string;
  score: number;
  certificateId: string;
  instructor: string;
}

export const generateCertificatePDF = (certificate: Certificate) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const centerX = pageWidth / 2;

  // Set background color (light blue)
  doc.setFillColor(240, 248, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Add decorative border
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(3);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

  // Inner decorative border
  doc.setDrawColor(147, 51, 234);
  doc.setLineWidth(1);
  doc.rect(20, 20, pageWidth - 40, pageHeight - 40);

  // Header - Supernatural Institute
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(59, 130, 246);
  doc.text('SUPERNATURAL INSTITUTE', centerX, 40, { align: 'center' });

  // Subtitle
  doc.setFontSize(16);
  doc.setTextColor(107, 114, 128);
  doc.text('E-Learning Platform', centerX, 55, { align: 'center' });

  // Certificate title
  doc.setFontSize(24);
  doc.setTextColor(31, 41, 55);
  doc.text('CERTIFICATE OF COMPLETION', centerX, 75, { align: 'center' });

  // Decorative line
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(1);
  doc.line(centerX - 50, 85, centerX + 50, 85);

  // Main text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(75, 85, 99);
  doc.text('This certifies that', centerX, 105, { align: 'center' });

  // Student name (highlighted)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(59, 130, 246);
  doc.text(certificate.userName, centerX, 120, { align: 'center' });

  // Course completion text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(75, 85, 99);
  doc.text('has successfully completed the course', centerX, 140, { align: 'center' });

  // Course title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(31, 41, 55);
  doc.text(`"${certificate.courseTitle}"`, centerX, 155, { align: 'center' });

  // Score
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(75, 85, 99);
  doc.text(`with a score of ${certificate.score}%`, centerX, 170, { align: 'center' });

  // Certificate details
  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128);

  // Certificate ID
  doc.text(`Certificate ID: ${certificate.certificateId}`, 30, pageHeight - 60);
  doc.text(`Completion Date: ${new Date(certificate.completionDate).toLocaleDateString()}`, 30, pageHeight - 50);
  doc.text(`Instructor: ${certificate.instructor}`, 30, pageHeight - 40);

  // Date issued
  const today = new Date().toLocaleDateString();
  doc.text(`Date Issued: ${today}`, pageWidth - 60, pageHeight - 60);

  // Signature line
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(0.5);
  doc.line(pageWidth - 80, pageHeight - 30, pageWidth - 30, pageHeight - 30);
  doc.setFontSize(8);
  doc.setTextColor(75, 85, 99);
  doc.text('Authorized Signature', pageWidth - 55, pageHeight - 25);

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(156, 163, 175);
  doc.text('Supernatural Institute - Equipping believers for Kingdom advancement', centerX, pageHeight - 15, { align: 'center' });

  return doc;
};

// Speech Recognition types
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

declare var SpeechRecognition: {
  prototype: SpeechRecognition;
  new(): SpeechRecognition;
};
import {
  BookOpen,
  Play,
  CheckCircle,
  Clock,
  Award,
  TrendingUp,
  MessageCircle,
  Settings,
  HelpCircle,
  Monitor,
  Tablet,
  Star,
  Calendar,
  Share2,
  Book,
  PenTool,
  Target,
  Zap,
  BarChart3,
  FileText,
  Video,
  Headphones,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  Plus,
  Minus,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  SkipForward,
  Pause,
  User,
  Bell,
  Heart,
  Lightbulb,
  GraduationCap,
  Mic,
  MicOff,
  Save,
  Edit3,
  Trash2,
  Sparkles,
  Shield,
  Menu,
  Lock,
  AlertTriangle
} from 'lucide-react';
import { academy } from '../../client';
import StudyTools from './StudyTools';
import FloatingNotes from './FloatingNotes';
import { sampleCourses } from '../../data/sampleCourses';
import { getRandomScripture } from '../../data/scriptures';

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  previewVideoUrl?: string;
  previewImageUrl?: string;
  pdfUrl?: string;
  durationMinutes?: number;
  isPublished: boolean;
  isPremium: boolean;
  accessType?: 'free' | 'premium' | 'church';
  createdAt: string;
  instructor?: string;
  rating?: number;
  enrolledCount?: number;
  modules?: Module[];
  quiz?: Quiz;
  certificate?: boolean;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface Module {
  id: string;
  title: string;
  duration: number;
  type: 'video';
  content: {
    url: string;
    notes?: string[];
    quiz?: {
      questions: QuizQuestion[];
      passingScore: number;
    };
  };
  completed: boolean;
}

interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number;
}

interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  question: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation?: string;
}

interface UserProgress {
  courseId: string;
  completedModules: string[];
  quizScores: { [quizId: string]: number };
  notes: { [moduleId: string]: string };
  bookmarks: string[];
  lastAccessed: string;
  progress: number;
  startedAt: string;
  completedAt?: string;
}

export default function TrainingPlatform() {
  const { user } = useUser();

  // Daily Scripture Feature
  const [dailyScripture, setDailyScripture] = useState<{text: string, reference: string, version: string} | null>(null);

  // Layout and UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('courses');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Course and learning state
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [userProgress, setUserProgress] = useState<{ [courseId: string]: UserProgress }>({});

  // Additional features state
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{ [questionId: string]: any }>({});
  const [showNotes, setShowNotes] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [showSupport, setShowSupport] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFloatingNotes, setShowFloatingNotes] = useState(false);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [showRules, setShowRules] = useState(false);

  // Enhanced note-taking state
  const [quickNotesVisible, setQuickNotesVisible] = useState(() => {
    // Load from localStorage to persist state with error handling
    try {
      return localStorage.getItem('quickNotesVisible') === 'true';
    } catch (error) {
      console.warn('Failed to load quickNotesVisible from localStorage:', error);
      return false;
    }
  });
  const [quickNoteText, setQuickNoteText] = useState('');
  const [isQuickRecording, setIsQuickRecording] = useState(false);

  // Speech-to-text state
  const [isRecording, setIsRecording] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState<SpeechRecognition | null>(null);
  const [transcribedText, setTranscribedText] = useState('');

  // Church access state
  const [showChurchAccessModal, setShowChurchAccessModal] = useState(false);
  const [churchAccessCode, setChurchAccessCode] = useState('');
  const [hasChurchAccess, setHasChurchAccess] = useState(false);
  const [validatingCode, setValidatingCode] = useState(false);

  // Membership prompt state
  const [showMembershipPrompt, setShowMembershipPrompt] = useState(false);


  // Stats and achievements
  const [userStats, setUserStats] = useState({
    totalPoints: 0,
    studyStreak: 0,
    coursesCompleted: 0,
    totalWatchTime: 0,
    certificatesEarned: 0,
    averageScore: 0
  });

  // Celebration modal state
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [showCertificateViewer, setShowCertificateViewer] = useState(false);
  const [celebrationData, setCelebrationData] = useState<{
    courseTitle: string;
    score: number;
    certificate: Certificate | null;
    isPremium: boolean;
  } | null>(null);

  // Global font size state
  const [globalFontSize, setGlobalFontSize] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('globalFontSize');
      return stored ? parseInt(stored) : 14; // Default to 14px
    } catch (error) {
      console.warn('Failed to load globalFontSize from localStorage:', error);
      return 14;
    }
  });

  // AI Detection state
  const [showAIDetectionWarning, setShowAIDetectionWarning] = useState(false);
  const [aiDetectionReason, setAIDetectionReason] = useState('');
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const [answerTimings, setAnswerTimings] = useState<number[]>([]);
  const [lastScreenshotTime, setLastScreenshotTime] = useState<number>(0);
  const [copyPasteCount, setCopyPasteCount] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognitionAPI();

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscribedText(finalTranscript + interimTranscript);
        setCurrentNote(finalTranscript + interimTranscript);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      setSpeechRecognition(recognition);
      
      // Cleanup function to prevent memory leaks
      return () => {
        if (recognition) {
          recognition.abort();
          setSpeechRecognition(null);
        }
      };
    }
  }, []);

  // Speech-to-text functions
  const startRecording = () => {
    if (speechRecognition && !isRecording) {
      setTranscribedText('');
      speechRecognition.start();
    }
  };

  const stopRecording = () => {
    if (speechRecognition && isRecording) {
      speechRecognition.stop();
    }
  };

  const saveVoiceNote = () => {
    if (transcribedText.trim()) {
      const newNote: any = {
        id: Date.now().toString(),
        content: transcribedText.trim(),
        timestamp: currentVideoTime,
        courseId: selectedCourse?.id.toString() || '',
        moduleId: selectedModule?.id || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        type: 'voice'
      };

      // Save to localStorage with error handling
      try {
        const existingNotes = JSON.parse(localStorage.getItem(`notes_${selectedCourse?.id}_${selectedModule?.id}`) || '[]');
        const updatedNotes = [...existingNotes, newNote];
        localStorage.setItem(`notes_${selectedCourse?.id}_${selectedModule?.id}`, JSON.stringify(updatedNotes));
      } catch (error) {
        console.error('Failed to save voice note to localStorage:', error);
        // Could show user notification here
      }

      setTranscribedText('');
      setCurrentNote('');
      setShowFloatingNotes(true); // Show notes panel to see the saved note
    }
  };

  // AI Detection Functions
  const detectScreenshotActivity = () => {
    const now = Date.now();
    if (now - lastScreenshotTime < 5000) { // Multiple screenshots within 5 seconds
      triggerAIDetection('Multiple screenshot attempts detected');
    }
    setLastScreenshotTime(now);
  };

  const detectCopyPasteActivity = () => {
    setCopyPasteCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 3) { // 3+ paste operations
        triggerAIDetection('Excessive copy-paste activity detected');
        return 0; // Reset counter
      }
      return newCount;
    });
  };

  const detectCopyActivity = () => {
    if (showQuiz) {
      setCopyPasteCount(prev => {
        const newCount = prev + 1;
        if (newCount >= 5) { // 5+ copy operations during quiz
          triggerAIDetection('Copy operations during quiz detected');
          return 0;
        }
        return newCount;
      });
    }
  };

  const detectSuspiciousTiming = (questionIndex: number) => {
    if (!quizStartTime) return;

    const now = Date.now();
    const timeSpent = now - quizStartTime;
    const averageTimePerQuestion = timeSpent / (questionIndex + 1);

    if (averageTimePerQuestion < 3000) { // Less than 3 seconds per question
      triggerAIDetection('Unusually fast quiz completion detected');
    }
  };

  const triggerAIDetection = (reason: string) => {
    setAIDetectionReason(reason);
    setShowAIDetectionWarning(true);

    // Log the detection for admin review
    console.warn('AI Detection Triggered:', reason, {
      user: user?.id || 'anonymous',
      course: selectedCourse?.title,
      module: selectedModule?.title,
      timestamp: new Date().toISOString()
    });
  };

  // Enhanced keyboard shortcuts for seamless note-taking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle floating notes with Ctrl+N
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        setShowFloatingNotes(!showFloatingNotes);
      }

      // Toggle quick notes with Ctrl+Q
      if (e.ctrlKey && e.key === 'q') {
        e.preventDefault();
        setQuickNotesVisible(!quickNotesVisible);
      }

      // Close quick notes with Esc
      if (e.key === 'Escape' && quickNotesVisible) {
        e.preventDefault();
        setQuickNotesVisible(false);
        localStorage.setItem('quickNotesVisible', 'false');
      }

      // Quick voice note with Ctrl+V
      if (e.ctrlKey && e.key === 'v' && selectedCourse && selectedModule) {
        e.preventDefault();
        if (isRecording) {
          stopRecording();
        } else {
          startRecording();
        }
      }

      // Save quick note with Ctrl+S
      if (e.ctrlKey && e.key === 's' && quickNoteText.trim()) {
        e.preventDefault();
        saveQuickNote();
      }

      // AI Detection: Screenshot detection
      if (e.key === 'PrintScreen' || (e.ctrlKey && e.key === 'PrintScreen') || (e.altKey && e.key === 'PrintScreen')) {
        detectScreenshotActivity();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showFloatingNotes, quickNotesVisible, isRecording, quickNoteText]);

  // AI Detection: Copy-paste detection
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (showQuiz && selectedModule?.content.quiz) {
        detectCopyPasteActivity();
      }
    };

    const handleCopy = (e: ClipboardEvent) => {
      if (showQuiz && selectedModule?.content.quiz) {
        detectCopyActivity();
      }
    };

    document.addEventListener('paste', handlePaste);
    document.addEventListener('copy', handleCopy);

    return () => {
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('copy', handleCopy);
    };
  }, [showQuiz, selectedModule]);

  // AI Detection: Canvas manipulation detection
  useEffect(() => {
    const detectCanvasManipulation = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Check if canvas is being used for screenshots
        const originalToDataURL = canvas.toDataURL;
        canvas.toDataURL = function(...args) {
          if (showQuiz) {
            detectScreenshotActivity();
          }
          return originalToDataURL.apply(this, args);
        };
      }
    };

    detectCanvasManipulation();
  }, [showQuiz]);

  // Track quiz start time
  useEffect(() => {
    if (showQuiz && !quizStartTime) {
      setQuizStartTime(Date.now());
      setAnswerTimings([]);
    }
  }, [showQuiz, quizStartTime]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCategoryDropdown && !(event.target as Element).closest('.category-dropdown')) {
        setShowCategoryDropdown(false);
      }
      if (showNotifications && !(event.target as Element).closest('.notifications-dropdown')) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCategoryDropdown, showNotifications]);

  // Apply font size to training page only on mount and when it changes
  useEffect(() => {
    const trainingContainer = document.querySelector('[data-training-page]');
    if (trainingContainer) {
      (trainingContainer as HTMLElement).style.fontSize = `${globalFontSize}px`;
    }
  }, [globalFontSize]);

  // Quick note functions
  const saveQuickNote = () => {
    if (!quickNoteText.trim() || !selectedCourse || !selectedModule) return;

    const newNote: any = {
      id: Date.now().toString(),
      content: quickNoteText.trim(),
      timestamp: currentVideoTime,
      courseId: selectedCourse.id.toString(),
      moduleId: selectedModule.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: 'quick'
    };

    // Save to localStorage with error handling
    try {
      const existingNotes = JSON.parse(localStorage.getItem(`notes_${selectedCourse.id}_${selectedModule.id}`) || '[]');
      const updatedNotes = [...existingNotes, newNote];
      localStorage.setItem(`notes_${selectedCourse.id}_${selectedModule.id}`, JSON.stringify(updatedNotes));
      setQuickNoteText('');
    } catch (error) {
      console.error('Failed to save note to localStorage:', error);
      // Could show user notification here
    }
    setTranscribedText('');
    // Show brief success feedback
    setTimeout(() => {
      // Could add a toast notification here
    }, 100);
  };

  const startQuickRecording = () => {
    setIsQuickRecording(true);
    startRecording();
  };

  const stopQuickRecording = () => {
    setIsQuickRecording(false);
    stopRecording();
  };

  // Check church access and membership status on load
  useEffect(() => {
    const checkAccess = () => {
      const storedAccess = localStorage.getItem('churchAccess');
      if (storedAccess) {
        setHasChurchAccess(true);
      } else {
        // Show church access modal only once (not every time)
        const hasShownChurchModal = localStorage.getItem('hasShownChurchModal');
        if (!hasShownChurchModal) {
          setTimeout(() => {
            setShowChurchAccessModal(true);
            localStorage.setItem('hasShownChurchModal', 'true');
          }, 1000);
        }
      }

      // Show membership prompt for non-signed-in users (unless they've dismissed it)
      if (!user && !localStorage.getItem('hideMembershipPrompt')) {
        setTimeout(() => setShowMembershipPrompt(true), 2000);
      }
    };

    checkAccess();
  }, [user]);

  // Initialize daily scripture
  useEffect(() => {
    const getDailyScripture = () => {
      const today = new Date().toDateString();
      const storedDate = localStorage.getItem('dailyScriptureDate');
      const storedScripture = localStorage.getItem('dailyScripture');

      if (storedDate === today && storedScripture) {
        try {
          const parsedScripture = JSON.parse(storedScripture);
          setDailyScripture(parsedScripture);
        } catch (error) {
          console.warn('Corrupted scripture data found, clearing:', error);
          localStorage.removeItem('dailyScripture');
        }
      } else {
        // Generate new daily scripture from the scriptures database
        const newScripture = getRandomScripture();
        setDailyScripture(newScripture);

        // Store for the day
        localStorage.setItem('dailyScriptureDate', today);
        localStorage.setItem('dailyScripture', JSON.stringify(newScripture));
      }
    };

    getDailyScripture();
  }, []);

  // Video completion tracking
  const [videoCompleted, setVideoCompleted] = useState<{ [moduleId: string]: boolean }>({});
  const [videoWatchedTime, setVideoWatchedTime] = useState<{ [moduleId: string]: number }>({});
  const [videoDuration, setVideoDuration] = useState<{ [moduleId: string]: number }>({});
  const [videoMinimumWatchTime, setVideoMinimumWatchTime] = useState<{ [moduleId: string]: number }>({});

  // Load persisted video completion state
  useEffect(() => {
    const savedVideoCompleted = localStorage.getItem('videoCompleted');
    const savedVideoWatchedTime = localStorage.getItem('videoWatchedTime');
    const savedVideoMinimumWatchTime = localStorage.getItem('videoMinimumWatchTime');

    if (savedVideoCompleted) {
      try {
        setVideoCompleted(JSON.parse(savedVideoCompleted));
      } catch (error) {
        console.warn('Corrupted video completed data, clearing:', error);
        localStorage.removeItem('videoCompleted');
      }
    }
    if (savedVideoWatchedTime) {
      try {
        setVideoWatchedTime(JSON.parse(savedVideoWatchedTime));
      } catch (error) {
        console.warn('Corrupted video watched time data, clearing:', error);
        localStorage.removeItem('videoWatchedTime');
      }
    }
    if (savedVideoMinimumWatchTime) {
      try {
        setVideoMinimumWatchTime(JSON.parse(savedVideoMinimumWatchTime));
      } catch (error) {
        console.warn('Corrupted video minimum watch time data, clearing:', error);
        localStorage.removeItem('videoMinimumWatchTime');
      }
    }
  }, []);

  // Mark video as completed and persist state
  const markVideoCompleted = useCallback(async (moduleId: string) => {
    setVideoCompleted(prev => {
      const newState = { ...prev, [moduleId]: true };
      localStorage.setItem('videoCompleted', JSON.stringify(newState));
      return newState;
    });

          // Mark module as completed in progress
    await updateProgress(selectedCourse!.id.toString(), moduleId, true);

          // Auto-progress to next module if no quiz is required
          if (selectedModule && selectedCourse?.modules) {
            const currentIndex = selectedCourse.modules.findIndex(m => m.id === moduleId);
            const hasQuiz = selectedModule.content.quiz;

            if (!hasQuiz && currentIndex >= 0 && currentIndex < selectedCourse.modules.length - 1) {
              // No quiz required, auto-progress to next module
              const nextModule = selectedCourse.modules[currentIndex + 1];
              setTimeout(() => {
                selectModule(nextModule);
        }, 500);
      }
    }
  }, [selectedModule, selectedCourse]);

  // Debounced video time update to prevent excessive re-renders
  const debouncedTimeUpdate = useCallback(
    debounce((time: number, moduleId: string) => {
      setCurrentVideoTime(time);

      // Track watched time for completion
      setVideoWatchedTime(prev => {
        const watchedTime = prev[moduleId] || 0;
        if (time > watchedTime) {
          const newState = { ...prev, [moduleId]: time };
          localStorage.setItem('videoWatchedTime', JSON.stringify(newState));
          return newState;
        }
        return prev;
      });

      // Check video completion requirements
      setVideoDuration(prev => {
        const duration = prev[moduleId] || 0;
        if (duration > 0 && !videoCompleted[moduleId]) {
          const minimumWatchTime = duration * 0.4; // 40% minimum watch time
          const completionThreshold = duration * 0.9; // 90% completion threshold
          
          // Update minimum watch time tracking
          setVideoMinimumWatchTime(prevMin => {
            const currentMinTime = prevMin[moduleId] || 0;
            if (time > currentMinTime) {
              const newState = { ...prevMin, [moduleId]: time };
              localStorage.setItem('videoMinimumWatchTime', JSON.stringify(newState));
              return newState;
            }
            return prevMin;
          });

          // Check if both requirements are met: 40% minimum watch time AND 90% completion
          const hasMinimumWatchTime = time >= minimumWatchTime;
          const hasCompletionThreshold = time >= completionThreshold;
          
          if (hasMinimumWatchTime && hasCompletionThreshold) {
            markVideoCompleted(moduleId);
          }
        }
        return prev;
      });
    }, 100),
    [videoCompleted, markVideoCompleted]
  );


  // Validate church access code
  const validateChurchAccessCode = async () => {
    if (!churchAccessCode.trim()) return;

    setValidatingCode(true);
    try {
      // For now, we'll use a simple validation - in a real app this would call a backend API
      // You could validate against a list of valid codes or call an API endpoint
      const validCodes = ['CHURCH2024', 'MINISTRY2024', 'FAITH2024']; // Example codes

      if (validCodes.includes(churchAccessCode.toUpperCase())) {
        setHasChurchAccess(true);
        localStorage.setItem('churchAccess', churchAccessCode.toUpperCase());
        setShowChurchAccessModal(false);
        setChurchAccessCode('');
      } else {
        alert('Invalid church access code. Please contact your church leader for the correct code.');
      }
    } catch (error) {
      console.error('Failed to validate church access code:', error);
      alert('Failed to validate code. Please try again.');
    } finally {
      setValidatingCode(false);
    }
  };

  // Generate notifications based on user progress
  const generateNotifications = (courses: any[], userProgress: any) => {
    const notifications: any[] = [];
    const now = new Date();
    const fourteenDaysAgo = new Date(now.getTime() - (14 * 24 * 60 * 60 * 1000));

    courses.forEach(course => {
      const progress = userProgress[course.id];

      // New courses (assuming courses without progress are new)
      if (!progress) {
        notifications.push({
          id: `new-${course.id}`,
          type: 'new_course',
          title: 'New Course Available',
          message: `${course.title} is now available for you to start!`,
          courseId: course.id,
          courseTitle: course.title
        });
      } else {
        const lastAccessed = progress.lastAccessed ? new Date(progress.lastAccessed) : null;
        const completionPercentage = progress.progress || 0;

        // Courses over 50% complete but not finished
        if (completionPercentage >= 50 && completionPercentage < 100 && !progress.completedAt) {
          notifications.push({
            id: `incomplete-${course.id}`,
            type: 'incomplete_course',
            title: 'Almost There!',
            message: `${course.title} is ${Math.round(completionPercentage)}% complete. Finish it now!`,
            courseId: course.id,
            courseTitle: course.title,
            progress: Math.round(completionPercentage)
          });
        }

        // Courses not touched for 14 days
        if (lastAccessed && lastAccessed < fourteenDaysAgo && !progress.completedAt) {
          const daysSinceAccess = Math.floor((now.getTime() - lastAccessed.getTime()) / (24 * 60 * 60 * 1000));
          notifications.push({
            id: `inactive-${course.id}`,
            type: 'inactive_course',
            title: 'Time to Continue Learning',
            message: `It's been ${daysSinceAccess} days since you worked on ${course.title}. Pick up where you left off!`,
            courseId: course.id,
            courseTitle: course.title,
            daysSinceAccess
          });
        }
      }
    });

    return notifications;
  };

  // Load courses data
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await academy.listCourses();
        const apiCourses = response.courses.map(course => ({
          ...course,
          instructor: 'Ministry Team',
          rating: 4.5,
          enrolledCount: 0,
          certificate: true,
          difficulty: 'Beginner' as const,
          modules: [],
          quiz: undefined
        }));

        // Combine API courses with sample courses
        const allCourses = [...apiCourses, ...sampleCourses];
        setCourses(allCourses);

        // Load user progress from backend
        let progress: { [courseId: string]: any } = {};
        try {
          const backendProgress = await academy.getProgress();
          const progressMap: { [courseId: string]: any } = {};

          backendProgress.progress.forEach(p => {
            progressMap[p.courseId.toString()] = {
              courseId: p.courseId.toString(),
              completedModules: [],
              quizScores: {},
              notes: {},
              bookmarks: [],
              lastAccessed: p.lastAccessed || new Date().toISOString(),
              progress: p.progressPercentage,
              startedAt: new Date().toISOString(),
              completedAt: p.completedAt || undefined
            };
          });

          // Merge with local storage for additional data
          try {
            const localProgressData = localStorage.getItem('userCourseProgress');
            if (localProgressData && localProgressData.trim()) {
              const localProgress = JSON.parse(localProgressData);
          Object.keys(localProgress).forEach(courseId => {
            if (progressMap[courseId]) {
              progressMap[courseId] = { ...progressMap[courseId], ...localProgress[courseId] };
            } else {
              progressMap[courseId] = localProgress[courseId];
            }
          });
            }
          } catch (error) {
            console.warn('Corrupted local progress data found, skipping merge:', error);
          }

          // Validate and sync video completion state with backend progress
          let savedVideoCompleted = {};
          try {
            const videoCompletedData = localStorage.getItem('videoCompleted');
            if (videoCompletedData && videoCompletedData.trim()) {
              savedVideoCompleted = JSON.parse(videoCompletedData);
            }
          } catch (error) {
            console.warn('Corrupted video completion data found, resetting:', error);
            localStorage.removeItem('videoCompleted');
            savedVideoCompleted = {};
          }
          const validatedVideoCompleted = { ...savedVideoCompleted };
          
          // Check each course's modules and validate completion state
          allCourses.forEach(course => {
            if (course.modules) {
              course.modules.forEach(module => {
                const courseProgress = progressMap[course.id.toString()];
                if (courseProgress && courseProgress.completedModules.includes(module.id)) {
                  // Module is completed in backend, ensure video completion state is set
                  (validatedVideoCompleted as any)[module.id] = true;
                }
              });
            }
          });
          
          // Update video completion state if validation found discrepancies
          if (JSON.stringify(validatedVideoCompleted) !== JSON.stringify(savedVideoCompleted)) {
            localStorage.setItem('videoCompleted', JSON.stringify(validatedVideoCompleted));
            setVideoCompleted(validatedVideoCompleted);
          }

          progress = progressMap;
          setUserProgress(progress);
          localStorage.setItem('userCourseProgress', JSON.stringify(progress));
        } catch (error) {
          console.error('Failed to load progress from backend:', error);
          // Fallback to local storage with error handling
          try {
            const progressData = localStorage.getItem('userCourseProgress');
            if (progressData && progressData.trim()) {
              progress = JSON.parse(progressData);
            } else {
              progress = {};
            }
          } catch (fallbackError) {
            console.warn('Corrupted fallback progress data, using empty object:', fallbackError);
            localStorage.removeItem('userCourseProgress');
            progress = {};
          }
          setUserProgress(progress);
        }

        // Load user stats
        const stats = {
          totalPoints: parseInt(localStorage.getItem('userPoints') || '0'),
          studyStreak: parseInt(localStorage.getItem('studyStreak') || '1'),
          coursesCompleted: Object.values(progress).filter((p: any) => p.progress === 100).length,
          totalWatchTime: Object.values(progress).reduce((sum: number, p: any) => sum + (p.totalWatchTime || 0), 0),
          certificatesEarned: Object.values(progress).filter((p: any) => p.completedAt).length,
          averageScore: 85 // Mock average score
        };
        setUserStats(stats);
      } catch (error) {
        console.error('Failed to load courses from backend, using sample courses:', error);
        // Fallback to sample courses only
        setCourses(sampleCourses);

        // Load user progress from local storage with error handling
        let progress = {};
        try {
          const progressData = localStorage.getItem('userCourseProgress');
          if (progressData && progressData.trim()) {
            progress = JSON.parse(progressData);
          }
        } catch (error) {
          console.warn('Corrupted user progress data found, clearing localStorage:', error);
          localStorage.removeItem('userCourseProgress');
          progress = {};
        }
        setUserProgress(progress);

        // Generate notifications
        const newNotifications = generateNotifications(courses, progress);
        setNotifications(newNotifications);

        // Load user stats
        const stats = {
          totalPoints: parseInt(localStorage.getItem('userPoints') || '0'),
          studyStreak: parseInt(localStorage.getItem('studyStreak') || '1'),
          coursesCompleted: Object.values(progress).filter((p: any) => p.progress === 100).length,
          totalWatchTime: Object.values(progress).reduce((sum: number, p: any) => sum + (p.totalWatchTime || 0), 0),
          certificatesEarned: Object.values(progress).filter((p: any) => p.completedAt).length,
          averageScore: 85 // Mock average score
        };
        setUserStats(stats);
      }
    };

    loadCourses();
  }, []);

  // No compact mode - full screen layout only

  // Course selection
  const selectCourse = (course: Course) => {
    setSelectedCourse(course);
    setSelectedModule(course.modules?.[0] || null);
    setActiveSection('course');
  };

  // Module selection
  const selectModule = (module: Module) => {
    setSelectedModule(module);
    // Don't automatically show quiz - wait for video completion
    setShowQuiz(false);
  };

  // Progress tracking
  const updateProgress = async (courseId: string, moduleId: string, completed: boolean) => {
    try {
      const progress = { ...userProgress };
      if (!progress[courseId]) {
        progress[courseId] = {
          courseId,
          completedModules: [],
          quizScores: {},
          notes: {},
          bookmarks: [],
          lastAccessed: new Date().toISOString(),
          progress: 0,
          startedAt: new Date().toISOString()
        };
      }

      if (completed && !progress[courseId].completedModules.includes(moduleId)) {
        progress[courseId].completedModules.push(moduleId);
      }

      // Calculate overall progress
      const course = courses.find(c => c.id.toString() === courseId);
      if (course && course.modules) {
        const completedCount = progress[courseId].completedModules.length;
        progress[courseId].progress = Math.round((completedCount / course.modules.length) * 100);
      }

      // Update backend
      await academy.updateProgress(parseInt(courseId), {
        progressPercentage: progress[courseId].progress
      });

      // Award points for course completion
      if (progress[courseId].progress === 100 && !progress[courseId].completedAt) {
        progress[courseId].completedAt = new Date().toISOString();
        const currentPoints = parseInt(localStorage.getItem('userPoints') || '0');
        localStorage.setItem('userPoints', (currentPoints + 1).toString());
      }

      setUserProgress(progress);
      localStorage.setItem('userCourseProgress', JSON.stringify(progress));
      
      // Also persist video completion state
      const videoCompletedState = { ...videoCompleted };
      if (completed) {
        videoCompletedState[moduleId] = true;
        localStorage.setItem('videoCompleted', JSON.stringify(videoCompletedState));
      }
    } catch (error) {
      console.error('Failed to update progress:', error);
      // Fallback to local storage only
      const progress = { ...userProgress };
      if (!progress[courseId]) {
        progress[courseId] = {
          courseId,
          completedModules: [],
          quizScores: {},
          notes: {},
          bookmarks: [],
          lastAccessed: new Date().toISOString(),
          progress: 0,
          startedAt: new Date().toISOString()
        };
      }

      if (completed && !progress[courseId].completedModules.includes(moduleId)) {
        progress[courseId].completedModules.push(moduleId);
      }

      const course = courses.find(c => c.id.toString() === courseId);
      if (course && course.modules) {
        const completedCount = progress[courseId].completedModules.length;
        progress[courseId].progress = Math.round((completedCount / course.modules.length) * 100);
      }

      setUserProgress(progress);
      localStorage.setItem('userCourseProgress', JSON.stringify(progress));
    }
  };

  // Quiz handling
  const submitQuiz = () => {
    if (!selectedModule?.content.quiz) return;

    // Check if quiz has already been completed
    const existingScore = userProgress[selectedCourse!.id.toString()]?.quizScores?.[selectedModule.id];
    if (existingScore !== undefined) {
      alert('You have already completed this quiz. You cannot retake it.');
      setShowQuiz(false);
      return;
    }

    const quiz = selectedModule.content.quiz;
    let correct = 0;
    const total = quiz.questions.length;

    // AI Detection: Check timing patterns
    if (quizStartTime) {
      const totalTime = Date.now() - quizStartTime;
      const averageTimePerQuestion = totalTime / total;

      if (averageTimePerQuestion < 5000) { // Less than 5 seconds per question
        triggerAIDetection('Unusually fast quiz completion detected');
      }
    }

    quiz.questions.forEach((question, index) => {
      const userAnswer = quizAnswers[question.id];
      if (userAnswer === question.correctAnswer) {
        correct++;
      }

      // AI Detection: Check for suspicious answer patterns
      if (answerTimings[index] && answerTimings[index] < 2000) { // Less than 2 seconds per question
        triggerAIDetection('Suspiciously fast answer timing detected');
      }
    });

    const score = Math.round((correct / total) * 100);

    // Update progress
    const progress = { ...userProgress };
    if (!progress[selectedCourse!.id.toString()]) {
      progress[selectedCourse!.id.toString()] = {
        courseId: selectedCourse!.id.toString(),
        completedModules: [],
        quizScores: {},
        notes: {},
        bookmarks: [],
        lastAccessed: new Date().toISOString(),
        progress: 0,
        startedAt: new Date().toISOString()
      };
    }

    progress[selectedCourse!.id.toString()].quizScores[selectedModule.id] = score;

    if (score >= quiz.passingScore) {
      // Mark module as completed
      if (!progress[selectedCourse!.id.toString()].completedModules.includes(selectedModule.id)) {
        progress[selectedCourse!.id.toString()].completedModules.push(selectedModule.id);
      }

      // Calculate overall progress
      const course = courses.find(c => c.id.toString() === selectedCourse!.id.toString());
      if (course && course.modules) {
        const completedCount = progress[selectedCourse!.id.toString()].completedModules.length;
        progress[selectedCourse!.id.toString()].progress = Math.round((completedCount / course.modules.length) * 100);

        // Check if course is completed
        if (progress[selectedCourse!.id.toString()].progress === 100) {
          progress[selectedCourse!.id.toString()].completedAt = new Date().toISOString();

          // Award premium points for premium courses (1 point per completion)
          if (selectedCourse!.isPremium) {
            const currentPoints = parseInt(localStorage.getItem('userPoints') || '0');
            localStorage.setItem('userPoints', (currentPoints + 1).toString());
          }

          // Generate certificate with user's full name
          const userFullName = user?.firstName && user?.lastName
            ? `${user.firstName} ${user.lastName}`
            : user?.firstName || user?.lastName || 'Valued Student';

          const certificate: Certificate = {
            id: Date.now().toString(),
            courseId: selectedCourse!.id.toString(),
            courseTitle: selectedCourse!.title,
            userName: userFullName,
            completionDate: new Date().toISOString(),
            score,
            certificateId: `CERT-${Date.now()}`,
            instructor: selectedCourse!.instructor || 'Ministry Team'
          };

          // Save certificate
          const existingCertificates = JSON.parse(localStorage.getItem('certificates') || '[]');
          const updatedCertificates = [...existingCertificates, certificate];
          localStorage.setItem('certificates', JSON.stringify(updatedCertificates));

          // Trigger celebration modal
          setCelebrationData({
            courseTitle: selectedCourse!.title,
            score,
            certificate,
            isPremium: selectedCourse!.isPremium || false
          });
          setShowCelebrationModal(true);
        }
      }

      alert(`Congratulations! You passed with ${score}%. Module completed!`);

      // Auto-progress to next module after quiz completion
      if (selectedCourse?.modules) {
        const currentIndex = selectedCourse.modules.findIndex(m => m.id === selectedModule!.id);
        if (currentIndex >= 0 && currentIndex < selectedCourse.modules.length - 1) {
          const nextModule = selectedCourse.modules[currentIndex + 1];
          setTimeout(() => {
            selectModule(nextModule);
          }, 1500); // Slightly longer delay for quiz completion celebration
        }
      }
 } else {
   alert(`You scored ${score}%. You need ${quiz.passingScore}% to pass. Try again!`);
 }

 setUserProgress(progress);
 localStorage.setItem('userCourseProgress', JSON.stringify(progress));
 setShowQuiz(false);
 setQuizAnswers({});
  };

  // Support ticket
  const submitSupportTicket = () => {
    if (!supportMessage.trim()) return;

    // Mock support ticket submission
    alert('Support ticket submitted! Our team will respond within 24 hours.');
    setSupportMessage('');
    setShowSupport(false);
  };

  // Generate and download PDF certificate
  const downloadCertificate = () => {
    if (!celebrationData?.certificate) return;

    const doc = generateCertificatePDF(celebrationData.certificate);
    doc.save(`certificate-${celebrationData.certificate.certificateId}.pdf`);
  };

  // Share achievement
  const shareAchievement = () => {
    if (!celebrationData) return;

    const shareText = `I just completed "${celebrationData.courseTitle}" with ${celebrationData.score}% at Supernatural Institute! 🎓`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: 'Course Completed!',
        text: shareText,
        url: shareUrl
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert('Achievement copied to clipboard!');
    }
  };


  // Filtered and sorted courses based on current section
  const filteredCourses = courses
    .filter(course => {
      let matchesCategory = true;
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'free') {
          matchesCategory = !course.isPremium && course.category !== 'church';
        } else if (selectedCategory === 'premium') {
          matchesCategory = course.isPremium && course.category !== 'church';
        } else if (selectedCategory === 'church') {
          matchesCategory = course.category === 'church' || course.isPremium;
        }
      }

      // Different filtering logic based on current section
      if (activeSection === 'courses') {
        // My Courses: Show free courses + church courses if access granted
        return matchesCategory && (!course.isPremium || (course.category === 'church' && hasChurchAccess));
      } else if (activeSection === 'library') {
        // Course Library: Show all courses but require premium/church access to unlock
        return matchesCategory;
      }

      return matchesCategory;
    })
    .sort((a, b) => {
      // Sort by progress (in progress first), then by difficulty, then by title
      const aProgress = userProgress[a.id.toString()]?.progress || 0;
      const bProgress = userProgress[b.id.toString()]?.progress || 0;

      // Courses with progress > 0 come first
      if (aProgress > 0 && bProgress === 0) return -1;
      if (bProgress > 0 && aProgress === 0) return 1;

      // Then sort by difficulty level
      const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
      const aDifficulty = difficultyOrder[a.difficulty as keyof typeof difficultyOrder] || 4;
      const bDifficulty = difficultyOrder[b.difficulty as keyof typeof difficultyOrder] || 4;

      if (aDifficulty !== bDifficulty) return aDifficulty - bDifficulty;

      // Finally sort alphabetically by title
      return a.title.localeCompare(b.title);
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white" data-training-page>
      <style>
        {`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
          w-64 md:w-72 lg:w-80 bg-gray-900/95 backdrop-blur-sm border-r border-gray-800
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex flex-col h-full p-6">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-500/20 border border-blue-500/40 flex items-center justify-center rounded">
                  <BookOpen className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">E-Learning</h2>
                  <p className="text-gray-400 text-sm">Platform</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
              {[
                { id: 'courses', label: 'My Courses', icon: BookOpen, description: 'Free courses & church access' },
                { id: 'library', label: 'Course Library', icon: Book, description: 'All courses - premium required' },
                { id: 'progress', label: 'Progress', icon: BarChart3 },
                { id: 'certificates', label: 'Certificates', icon: Award },
                { id: 'notes', label: 'My Notes', icon: PenTool },
                { id: 'study-tools', label: 'Study Tools', icon: Lightbulb },
                { id: 'church-access', label: 'Church Access', icon: Shield },
                { id: 'tools', label: 'Advanced Tools', icon: Settings }
              ].filter(item => item.id !== 'tools').map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'church-access') {
                      setShowChurchAccessModal(true);
                    } else {
                      setActiveSection(item.id);
                    }
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Quick Stats */}
            <div className="space-y-4 pt-6 border-t border-gray-800">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-semibold">Study Streak</span>
                </div>
                <div className="text-2xl font-bold text-yellow-400">{userStats.studyStreak}</div>
                <div className="text-xs text-gray-400">days in a row</div>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-semibold">Points Earned</span>
                </div>
                <div className="text-2xl font-bold text-green-400">{userStats.totalPoints}</div>
                <div className="text-xs text-gray-400">keep learning!</div>
              </div>
            </div>
          </div>
        </div>


        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 md:ml-72 lg:ml-80">
          {/* Header */}
          <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Menu className="h-5 w-5 text-gray-400" />
                </button>

                <div className="flex-1 flex items-center justify-center px-4">
                  {dailyScripture && (
                    <div className="max-w-6xl mx-auto text-center">
                      <div className="border border-blue-500/30 rounded-lg p-4">
                        <p className="text-blue-100 text-sm sm:text-base lg:text-lg leading-relaxed font-medium mb-2">
                          "{dailyScripture.text}"
                        </p>
                        <p className="text-blue-300 text-sm font-medium">
                          {dailyScripture.reference} <span className="text-gray-400">({dailyScripture.version})</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Header Controls */}
              <div className="flex items-center gap-2 md:gap-3 overflow-x-auto scrollbar-hide">


                {/* Offline Status */}

                {/* Notifications */}
                <div className="relative notifications-dropdown">
                    <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-colors rounded-lg flex-shrink-0"
                    title="Course Notifications"
                  >
                    <Bell className="h-5 w-5 text-white" />
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {notifications.length}
                      </span>
                    )}
                    </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute top-full right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 min-w-80 max-h-96 overflow-y-auto">
                      <div className="p-4">
                        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                          <Bell className="h-4 w-4" />
                          Course Notifications
                        </h3>

                        {notifications.length === 0 ? (
                          <p className="text-gray-400 text-sm">No notifications at this time.</p>
                        ) : (
                          <div className="space-y-3">
                            {notifications.map(notification => (
                              <div
                                key={notification.id}
                                className="bg-gray-700/50 rounded-lg p-3 border border-gray-600"
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                    notification.type === 'new_course' ? 'bg-blue-500' :
                                    notification.type === 'incomplete_course' ? 'bg-yellow-500' :
                                    'bg-orange-500'
                                  }`}></div>
                                  <div className="flex-1">
                                    <h4 className="text-white font-medium text-sm">
                                      {notification.title}
                                    </h4>
                                    <p className="text-gray-300 text-sm mt-1">
                                      {notification.message}
                                    </p>
                        <button
                          onClick={() => {
                                        const course = courses.find(c => c.id === notification.courseId);
                                        if (course) {
                                          selectCourse(course);
                                          setShowNotifications(false);
                                        }
                                      }}
                                      className="mt-2 text-blue-400 hover:text-blue-300 text-xs font-medium"
                                    >
                                      View Course →
                        </button>
                      </div>
                  </div>
                </div>
                            ))}
                      </div>
                    )}
                  </div>
                  </div>
                )}
                </div>

                {/* Global Font Size Controls */}
                <div className="flex items-center gap-1 bg-gray-800 border border-gray-700 rounded-lg p-1 flex-shrink-0">
                  <button
                    onClick={() => {
                      const sizes = [10, 12, 14, 16];
                      const currentIndex = sizes.indexOf(globalFontSize);
                      const nextIndex = (currentIndex + 1) % sizes.length;
                      const newSize = sizes[nextIndex];
                      setGlobalFontSize(newSize);
                      localStorage.setItem('globalFontSize', newSize.toString());
                      // Apply font size to training page only
                      const trainingContainer = document.querySelector('[data-training-page]');
                      if (trainingContainer) {
                        (trainingContainer as HTMLElement).style.fontSize = `${newSize}px`;
                      }
                    }}
                    className="p-2 hover:bg-gray-700 transition-colors rounded text-white"
                    title={`Font Size: ${globalFontSize}px - Click for next size`}
                  >
                    <span className="font-bold text-base">A</span>
                  </button>
                </div>

                {/* Quick Notes */}
                <button
                  onClick={() => setQuickNotesVisible(!quickNotesVisible)}
                  className={`p-2 border transition-colors rounded-lg flex-shrink-0 ${
                    quickNotesVisible
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                  }`}
                  title="Quick Notes (Ctrl+Q)"
                >
                  <PenTool className="h-5 w-5" />
                </button>

                {/* Support */}
                <button
                  onClick={() => setShowSupport(true)}
                  className="p-2 bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-colors rounded-lg flex-shrink-0"
                  title="Get Support"
                >
                  <HelpCircle className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-1 overflow-auto">
            {activeSection === 'study-tools' && (
              <div className="p-4 lg:p-6 xl:p-8">
                <StudyTools />
              </div>
            )}

            {activeSection === 'notes' && (
              <div className="p-4 lg:p-6 xl:p-8">
                <div className="max-w-7xl mx-auto">
                  <div className="mb-6 lg:mb-8">
                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">My Notes</h2>
                    <p className="text-gray-400">All your study notes organized by course and timestamp</p>
                  </div>

                  <div className="space-y-6">
                    {courses.map(course => {
                      let courseNotes = [];
                      try {
                        const notesData = localStorage.getItem(`notes_${course.id}_`);
                        if (notesData && notesData.trim()) {
                          courseNotes = JSON.parse(notesData);
                        }
                      } catch (error) {
                        console.warn('Corrupted course notes data found:', error);
                      }
                      if (courseNotes.length === 0) return null;

                      return (
                        <div key={course.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-white mb-4">{course.title}</h3>
                          <div className="space-y-3">
                            {courseNotes
                              .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                              .map((note: any) => (
                                <div key={note.id} className="bg-gray-900/50 border border-gray-600 p-4 rounded-lg">
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                      {note.timestamp && (
                                        <span className="flex items-center gap-1">
                                          <Clock className="h-4 w-4" />
                                          {Math.floor(note.timestamp / 60)}:{(note.timestamp % 60).toString().padStart(2, '0')}
                                        </span>
                                      )}
                                      <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                                      <span className={`px-2 py-1 text-xs rounded ${
                                        note.type === 'voice' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                                      }`}>
                                        {note.type === 'voice' ? 'Voice' : 'Text'}
                                      </span>
                                    </div>
                                  </div>
                                  <p className="text-gray-300">{note.content}</p>
                                </div>
                              ))}
                          </div>
                        </div>
                      );
                    })}

                    {courses.every(course => {
                      let courseNotes = [];
                      try {
                        const notesData = localStorage.getItem(`notes_${course.id}_`);
                        if (notesData && notesData.trim()) {
                          courseNotes = JSON.parse(notesData);
                        }
                      } catch (error) {
                        console.warn('Corrupted course notes data found:', error);
                      }
                      return courseNotes.length === 0;
                    }) && (
                      <div className="text-center py-12">
                        <PenTool className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">No notes yet</h3>
                        <p className="text-gray-400">Start watching videos and taking notes to see them here</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'courses' && (
              <div className="p-4 lg:p-6 xl:p-8">
                <div className="max-w-7xl mx-auto">
                  <div className="mb-6 lg:mb-8">
                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">My Courses</h2>
                    <p className="text-gray-400">Continue your ministry training journey</p>
                  </div>

                  {/* Course Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                    {courses.map(course => {
                      const progress = userProgress[course.id.toString()]?.progress || 0;
                      return (
                        <div
                          key={course.id}
                          className="bg-gray-800/50 border border-gray-700 rounded-xl hover:bg-gray-800/70 transition-all duration-200 cursor-pointer group overflow-hidden flex flex-col h-full"
                        >
                          {/* Course Preview Image/Video */}
                          <div className="relative aspect-video bg-gray-900 overflow-hidden">
                            {course.previewVideoUrl ? (
                              <video
                                src={course.previewVideoUrl}
                                className="w-full h-full object-cover"
                                muted
                                loop
                                onMouseEnter={(e) => e.currentTarget.play()}
                                onMouseLeave={(e) => e.currentTarget.pause()}
                              />
                            ) : course.previewImageUrl ? (
                              <img
                                src={course.previewImageUrl}
                                alt={course.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                                <BookOpen className="h-12 w-12 text-gray-400" />
                              </div>
                            )}

                            {/* Access Type Badge */}
                            <div className="absolute top-2 left-2">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                course.accessType === 'free' ? 'bg-green-500/90 text-white' :
                                course.accessType === 'premium' ? 'bg-yellow-500/90 text-black' :
                                'bg-purple-500/90 text-white'
                              }`}>
                                {course.accessType === 'free' ? 'Free' :
                                 course.accessType === 'premium' ? 'Premium' :
                                 'Church Access'}
                              </span>
                            </div>

                            {/* Lock overlay for inaccessible courses in library */}
                            {(activeSection === 'library' as any) && course.isPremium && !hasChurchAccess && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <div className="text-center text-white">
                                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                                      <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                                    </div>
                                  </div>
                                  <p className="text-sm font-medium">Premium Required</p>
                                  <p className="text-xs text-gray-300">Upgrade to access</p>
                                </div>
                              </div>
                            )}

                            {/* Play Button Overlay for Videos */}
                            {course.previewVideoUrl && (
                              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Play className="h-8 w-8 text-white" />
                              </div>
                            )}
                          </div>

                          <div className="p-4 lg:p-6 flex-1 flex flex-col">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors line-clamp-2">
                                  {course.title}
                                </h3>
                                {course.subcategory && (
                                  <p className="text-blue-400 text-sm font-medium mb-2">
                                    {course.subcategory}
                                  </p>
                                )}
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                  <span className={`px-2 py-1 text-xs border rounded-full ${
                                    course.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                                    course.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                                    'bg-red-500/20 text-red-400 border-red-500/30'
                                  }`}>
                                    {course.difficulty}
                                  </span>
                                  <span className="text-gray-400 text-sm">{course.category}</span>
                                </div>
                                <p className="text-gray-400 text-sm mb-4 flex-1">
                                  {course.description}
                                </p>
                              </div>
                            </div>

                            {/* Progress - Equal width */}
                            <div className="mb-4">
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-400">Progress</span>
                                <span className="text-white font-medium">{progress}%</span>
                              </div>
                              <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
                                <div
                                  className="bg-blue-500 h-3 transition-all duration-300"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                            </div>

                            {/* Instructor and Duration */}
                            <div className="flex items-center justify-between mb-4 text-sm">
                              <span className="text-gray-400">{course.instructor}</span>
                              <span className="text-gray-400">{course.durationMinutes}m</span>
                            </div>

                            {/* Spacer to push button to bottom */}
                            <div className="flex-1"></div>

                            {/* Action Button - Aligned at bottom */}
                            <div className="mt-auto">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  selectCourse(course);
                                }}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 font-semibold rounded-lg transition-colors duration-200 text-center"
                              >
                                Start Course
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'course' && selectedCourse && (
              <div className="p-4 lg:p-6 xl:p-8">
                <div className="max-w-7xl mx-auto">
                  {/* Course Header */}
                  <div className="mb-6 lg:mb-8">
                    <div className="flex items-center gap-4 mb-4">
                      <button
                        onClick={() => setActiveSection('courses')}
                        className="p-2 bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-colors rounded-lg"
                      >
                        <Menu className="h-5 w-5" />
                      </button>
                      <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-white">{selectedCourse.title}</h1>
                        <p className="text-gray-400">by {selectedCourse.instructor}</p>
                      </div>
                    </div>

                    {/* Course Progress */}
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 lg:p-6 mb-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-semibold">Course Progress</span>
                            <span className="text-blue-400 font-semibold text-lg">
                              {userProgress[selectedCourse.id.toString()]?.progress || 0}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
                            <div
                              className="bg-blue-500 h-3 transition-all duration-500"
                              style={{ width: `${userProgress[selectedCourse.id.toString()]?.progress || 0}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">{selectedCourse.modules?.length || 0}</div>
                            <div className="text-xs text-gray-400">Modules</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">{selectedCourse.durationMinutes}</div>
                            <div className="text-xs text-gray-400">Minutes</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
                    {/* Modules Sidebar */}
                    <div className="xl:col-span-1 order-2 xl:order-1">
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 lg:p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Course Modules</h3>
                        <div className="space-y-3">
                          {selectedCourse.modules?.map((module, index) => {
                            const isCompleted = userProgress[selectedCourse.id.toString()]?.completedModules?.includes(module.id);
                            const hasQuiz = module.content.quiz;
                            const quizCompleted = userProgress[selectedCourse.id.toString()]?.quizScores?.[module.id] !== undefined;
                            const videoCompletedStatus = videoCompleted[module.id];

                            // Module locking logic: next module is locked until current module is fully completed
                            let isLocked = false;
                            if (index > 0 && selectedCourse.modules) {
                              const prevModule = selectedCourse.modules[index - 1];
                              const prevModuleHasQuiz = prevModule.content.quiz;
                              const prevModuleQuizCompleted = userProgress[selectedCourse.id.toString()]?.quizScores?.[prevModule.id] !== undefined;
                              const prevModuleVideoCompleted = videoCompleted[prevModule.id];
                              const prevModuleProgress = userProgress[selectedCourse.id.toString()]?.completedModules?.includes(prevModule.id);

                              if (prevModuleHasQuiz) {
                                // Previous module has quiz - quiz must be completed AND passed
                                const quizScore = userProgress[selectedCourse.id.toString()]?.quizScores?.[prevModule.id];
                                const quizPassed = quizScore !== undefined && quizScore >= (prevModule.content.quiz?.passingScore || 70);
                                isLocked = !quizPassed;
                              } else {
                                // Previous module has no quiz - video completion is enough (40% watch time + 90% completion)
                                isLocked = !prevModuleVideoCompleted && !prevModuleProgress;
                              }
                            }

                            return (
                              <button
                                key={module.id}
                                onClick={() => !isLocked && selectModule(module)}
                                disabled={isLocked}
                                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                                  selectedModule?.id === module.id
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : isLocked
                                      ? 'bg-gray-800/50 text-gray-500 cursor-pointer opacity-80 hover:opacity-100'
                                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0 mt-0.5 relative">
                                    {isLocked ? (
                                      <Lock className="h-4 w-4 text-gray-500" />
                                    ) : (
                                      <>
                                        {module.type === 'video' && <Video className="h-4 w-4" />}
                                        {module.content.quiz && <HelpCircle className="h-4 w-4" />}
                                      </>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className={`text-sm font-medium ${isLocked ? 'text-gray-500' : ''}`} title={module.title}>{module.title}</span>
                                      <div className="flex items-center gap-1 flex-shrink-0">
                                        {isCompleted && (
                                          <CheckCircle className="h-4 w-4 text-green-400" />
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <Clock className="h-3 w-3" />
                                        <span>{module.duration}m</span>
                                        {!hasQuiz && (
                                          <span className="text-xs text-blue-400">90%</span>
                                        )}
                                      </div>
                                      {isLocked && (
                                        <span className="text-xs text-gray-500">Locked</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="xl:col-span-3 order-1 xl:order-2">
                      {selectedModule && (
                        <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
                          <div className="p-4 lg:p-6">
                            <div className="flex items-center justify-between mb-6">
                              <h2 className="text-xl lg:text-2xl font-semibold text-white">{selectedModule.title}</h2>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setShowNotes(!showNotes)}
                                  className="p-2 bg-gray-700 hover:bg-gray-600 transition-colors rounded-lg"
                                  title="Take Notes"
                                >
                                  <PenTool className="h-4 w-4" />
                                </button>
                              </div>
                            </div>

                            {/* Video Player */}
                            {selectedModule.type === 'video' && (
                              <div className="mb-6">
                                <div className="relative bg-black rounded-lg overflow-hidden">
                                  <video
                                    ref={videoRef}
                                    src={selectedModule.content.url}
                                    className="w-full aspect-video"
                                    controls
                                    playsInline
                                    onTimeUpdate={(e) => {
                                      const video = e.target as HTMLVideoElement;
                                      debouncedTimeUpdate(video.currentTime, selectedModule.id);
                                    }}
                                    onEnded={() => {
                                      // Ensure module completion when video ends
                                      setVideoCompleted(prev => ({
                                        ...prev,
                                        [selectedModule.id]: true
                                      }));
                                      updateProgress(selectedCourse!.id.toString(), selectedModule.id, true);
                                    }}
                                    onLoadedMetadata={(e) => {
                                      const video = e.target as HTMLVideoElement;
                                      if (video.duration && video.duration > 0) {
                                        setVideoDuration(prev => ({
                                          ...prev,
                                          [selectedModule.id]: video.duration
                                        }));
                                      }
                                    }}
                                    onDurationChange={(e) => {
                                      const video = e.target as HTMLVideoElement;
                                      if (video.duration && video.duration > 0) {
                                        setVideoDuration(prev => ({
                                          ...prev,
                                          [selectedModule.id]: video.duration
                                        }));
                                      }
                                    }}
                                    onLoadedData={(e) => {
                                      const video = e.target as HTMLVideoElement;
                                      if (video.duration && video.duration > 0) {
                                      setVideoDuration(prev => ({
                                        ...prev,
                                        [selectedModule.id]: video.duration
                                      }));

                                      // Check if already completed from previous sessions
                                      const watchedTime = videoWatchedTime[selectedModule.id] || 0;
                                        const minimumWatchTime = video.duration * 0.4;
                                      const completionThreshold = video.duration * 0.9;
                                        
                                        if (watchedTime >= minimumWatchTime && watchedTime >= completionThreshold) {
                                        setVideoCompleted(prev => ({
                                          ...prev,
                                          [selectedModule.id]: true
                                        }));
                                      }
                                      }
                                    }}
                                    onError={(e) => {
                                      console.error('Video loading error:', e);
                                      // Could add user notification here
                                    }}
                                  />



                                  {/* Completion indicator */}
                                  {videoCompleted[selectedModule.id] && (
                                    <div className="absolute top-4 left-4 bg-green-500/90 text-white px-3 py-1 rounded text-sm font-medium flex items-center gap-2">
                                      <CheckCircle className="h-4 w-4" />
                                    </div>
                                  )}

                                </div>

                                {/* Quick Notes - Now positioned at bottom right */}
                              </div>

                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>



      {/* Notepad Icon - Bottom Right (Desktop Only) */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <button
          onClick={() => setQuickNotesVisible(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          title="Quick Notes"
        >
          <PenTool className="h-6 w-6" />
        </button>
        
        <button
          onClick={() => setShowRules(true)}
          className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 mt-3"
          title="Training Rules & Guidelines"
        >
          <HelpCircle className="h-6 w-6" />
        </button>
      </div>

      {/* Quick Notes Modal */}
      {quickNotesVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <PenTool className="h-5 w-5" />
                Quick Notes
                {selectedModule && (
                  <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                    {Math.floor(currentVideoTime / 60)}:{(currentVideoTime % 60).toString().padStart(2, '0')}
                  </span>
                )}
              </h3>
              <button
                onClick={() => setQuickNotesVisible(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-4 max-h-96 overflow-y-auto">
              {/* Transcribed Text Display */}
              {transcribedText && (
                <div className="mb-4 p-3 bg-gray-900 border border-gray-600 rounded text-sm text-gray-300">
                  <div className="text-xs text-gray-400 mb-1">Voice transcription:</div>
                  {transcribedText}
                </div>
              )}

              {/* Voice Recording Controls */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-white text-sm font-medium">
                    Voice-to-Text Notes
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`flex items-center justify-center gap-2 py-2 px-4 font-medium transition-colors rounded-lg text-sm ${
                        isRecording
                          ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                          : 'bg-purple-600 hover:bg-purple-700 text-white'
                      }`}
                      title={isRecording ? "Stop Recording" : "Start Voice Recording"}
                    >
                      <Mic className="h-4 w-4" />
                      {isRecording ? 'Stop' : 'Record'}
                    </button>
                    {transcribedText && !isRecording && (
                      <button
                        onClick={() => {
                          setQuickNoteText(prev => prev + (prev ? '\n\n' : '') + transcribedText);
                          setTranscribedText('');
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-3 font-medium transition-colors rounded-lg text-sm"
                        title="Add voice transcription to notes"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Note Input */}
              <textarea
                value={quickNoteText}
                onChange={(e) => setQuickNoteText(e.target.value)}
                placeholder="Type your notes here... (or use voice recording above)"
                className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-3 h-32 resize-none focus:border-blue-500 focus:outline-none rounded-lg text-sm"
              />

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={saveQuickNote}
                  disabled={!quickNoteText.trim()}
                  className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
                  title="Save Note"
                >
                  Save Note
                </button>
                <button
                  onClick={() => setQuickNotesVisible(false)}
                  className="px-4 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Close
                </button>
              </div>

              {/* Recent Notes Preview */}
              <div className="mt-4">
                <div className="text-xs text-gray-400 mb-2">Recent notes from this module:</div>
                <div className="max-h-24 overflow-y-auto space-y-2">
                  {(() => {
                    let moduleNotes = [];
                    try {
                      const notesData = localStorage.getItem(`notes_${selectedCourse?.id}_${selectedModule?.id}`);
                      if (notesData && notesData.trim()) {
                        moduleNotes = JSON.parse(notesData);
                      }
                    } catch (error) {
                      console.warn('Corrupted module notes data found:', error);
                    }
                    return moduleNotes
                      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                      .slice(0, 3)
                      .map((note: any) => (
                        <div key={note.id} className="text-xs text-gray-300 bg-gray-900/50 p-2 rounded flex items-start gap-2">
                          <span className="text-gray-500 flex-shrink-0">
                            {note.timestamp ? `${Math.floor(note.timestamp / 60)}:${(note.timestamp % 60).toString().padStart(2, '0')}` : '--:--'}
                          </span>
                          <span className="line-clamp-1">{note.content}</span>
                        </div>
                      ));
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showQuiz && selectedModule?.content.quiz && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl lg:text-2xl font-bold text-white">Module Quiz</h2>
              <button
                onClick={() => {
                  setShowQuiz(false);
                  setQuizStartTime(null);
                  setAnswerTimings([]);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* AI Detection Notice */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 text-yellow-400 text-sm">
                <Shield className="h-4 w-4" />
                <span>Academic Integrity: AI usage and unauthorized assistance are monitored</span>
              </div>
            </div>

            <div className="space-y-6">
              {selectedModule.content.quiz.questions.map((question, index) => (
                <div key={question.id} className="bg-gray-900/50 border border-gray-600 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {index + 1}. {question.question}
                  </h3>

                  {question.type === 'multiple-choice' && question.options && (
                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => (
                        <label key={optionIndex} className="flex items-center gap-3 cursor-pointer hover:bg-gray-800/30 p-2 rounded">
                          <input
                            type="radio"
                            name={question.id}
                            value={optionIndex}
                            checked={quizAnswers[question.id] === optionIndex}
                            onChange={(e) => {
                              const questionIndex = selectedModule?.content.quiz?.questions.findIndex(q => q.id === question.id) || 0;
                              const answerTime = Date.now() - (quizStartTime || Date.now());

                              setAnswerTimings(prev => {
                                const newTimings = [...prev];
                                newTimings[questionIndex] = answerTime;
                                return newTimings;
                              });

                              setQuizAnswers({
                                ...quizAnswers,
                                [question.id]: parseInt(e.target.value)
                              });
                            }}
                            className="text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-300">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-700">
              <button
                onClick={() => setShowQuiz(false)}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={submitQuiz}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Submit Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {showNotes && selectedModule && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Study Notes</h2>
              <button
                onClick={() => setShowNotes(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-4">
              <h3 className="text-white font-semibold mb-2">{selectedModule.title}</h3>
            </div>

            {/* Speech-to-Text Controls */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-white text-sm font-medium">
                  Voice Notes {currentVideoTime ? `(at ${Math.floor(currentVideoTime / 60)}:${(currentVideoTime % 60).toString().padStart(2, '0')})` : ''}
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`flex items-center justify-center gap-2 py-2 px-4 font-medium transition-colors rounded-lg ${
                      isRecording
                        ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    <Mic className="h-4 w-4" />
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                  </button>
                  {transcribedText && !isRecording && (
                    <button
                      onClick={saveVoiceNote}
                      className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 font-medium transition-colors rounded-lg"
                    >
                      <Save className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Transcribed Text Display */}
              {transcribedText && (
                <div className="bg-gray-900 border border-gray-600 p-3 rounded-lg mb-4">
                  <p className="text-gray-300 text-sm">{transcribedText}</p>
                </div>
              )}
            </div>

            <textarea
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              placeholder="Write your study notes here... (or use voice recording above)"
              className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-3 h-48 resize-none focus:border-blue-500 focus:outline-none rounded-lg"
            />

            {/* Instructions */}
            <div className="mt-3 text-xs text-gray-400">
              <p>💡 Use voice recording for hands-free note-taking, or type manually. Works on both mobile and PC!</p>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowNotes(false)}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Save notes logic here
                  setShowNotes(false);
                  setCurrentNote('');
                }}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {showSupport && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Get Support</h2>
              <button
                onClick={() => setShowSupport(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">Describe your issue</label>
                <textarea
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  placeholder="How can we help you?"
                  className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-3 h-32 resize-none focus:border-blue-500 focus:outline-none rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowSupport(false)}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={submitSupportTicket}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Submit Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Notes Panel (slides from right) - Only during video playback */}
      {showFloatingNotes && selectedModule?.type === 'video' && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setShowFloatingNotes(false)}
          />

          {/* Slide-out Panel */}
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-gray-900/95 backdrop-blur-sm border-l border-gray-700 z-50 md:hidden transform transition-transform duration-300">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800/50">
                <div className="flex items-center gap-2">
                  <PenTool className="h-5 w-5 text-blue-400" />
                  <h3 className="text-white font-semibold">Voice Notes</h3>
                  <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                    {Math.floor(currentVideoTime / 60)}:{(currentVideoTime % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                <button
                  onClick={() => setShowFloatingNotes(false)}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Voice Recording Section */}
              <div className="p-4 border-b border-gray-700">
                <div className="mb-3">
                  <label className="block text-white text-sm font-medium mb-2">
                    Voice Notes
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-medium transition-colors rounded-lg ${
                        isRecording
                          ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      <Mic className="h-4 w-4" />
                      {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </button>
                    {transcribedText && !isRecording && (
                      <button
                        onClick={saveVoiceNote}
                        className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 font-medium transition-colors rounded-lg"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Transcribed Text Display */}
                {transcribedText && (
                  <div className="bg-gray-800 border border-gray-600 p-3 rounded-lg">
                    <p className="text-gray-300 text-sm">{transcribedText}</p>
                  </div>
                )}

                {/* Instructions */}
                <div className="mt-3 text-xs text-gray-400">
                  <p>💡 Click "Start Recording" to speak your notes. Works on both mobile and PC!</p>
                </div>
              </div>

              {/* Notes History */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                  <h4 className="text-white font-medium mb-3">Recent Notes</h4>
                  <div className="space-y-3">
                    {(() => {
                      const allNotes: any[] = [];
                      courses.forEach(course => {
                        let courseNotes = [];
                        try {
                          const notesData = localStorage.getItem(`notes_${course.id}_`);
                          if (notesData && notesData.trim()) {
                            courseNotes = JSON.parse(notesData);
                          }
                        } catch (error) {
                          console.warn('Corrupted course notes data found:', error);
                        }
                        allNotes.push(...courseNotes.map((note: any) => ({ ...note, courseTitle: course.title })));
                      });

                      return allNotes
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .slice(0, 10)
                        .map(note => (
                          <div key={note.id} className="bg-gray-800/50 border border-gray-700 p-3 rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                {note.timestamp && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {Math.floor(note.timestamp / 60)}:{(note.timestamp % 60).toString().padStart(2, '0')}
                                  </span>
                                )}
                                <span>{note.courseTitle}</span>
                              </div>
                            </div>
                            <p className="text-gray-300 text-sm line-clamp-2">{note.content}</p>
                          </div>
                        ));
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Desktop Floating Notes Panel */}
      <div className="hidden md:block">
        <FloatingNotes
          courseId={selectedCourse?.id.toString() || ''}
          moduleId={selectedModule?.id || ''}
          currentTime={currentVideoTime}
          isVisible={showFloatingNotes}
          onToggle={() => setShowFloatingNotes(!showFloatingNotes)}
        />
      </div>

      {/* Church Access Modal */}
      {showChurchAccessModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 sm:p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="h-16 w-16 bg-blue-500/20 border border-blue-500/40 flex items-center justify-center rounded-full mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Church Access</h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Church courses are available exclusively to members of partnered churches. Enter your church's affiliate link username to gain access to congregation-specific training materials.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">Church Access Code</label>
                <input
                  type="text"
                  value={churchAccessCode}
                  onChange={(e) => setChurchAccessCode(e.target.value)}
                  placeholder="Enter your church access code"
                  className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-3 rounded focus:border-blue-500 focus:outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && validateChurchAccessCode()}
                />
              </div>

              <button
                onClick={validateChurchAccessCode}
                disabled={!churchAccessCode.trim() || validatingCode}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-3 px-4 font-semibold rounded-lg transition-colors duration-200"
              >
                {validatingCode ? 'Validating...' : 'Grant Church Access'}
              </button>

              <div className="text-center">
                <p className="text-gray-400 text-sm mb-2">Don't have an access code?</p>
                <button
                  onClick={() => setShowChurchAccessModal(false)}
                  className="text-blue-400 hover:text-blue-300 text-sm underline transition-colors"
                >
                  Continue without church access
                </button>
                <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                  Note: Church access codes are provided by your church leadership team. These codes give you access to specialized training materials designed specifically for your congregation's growth and development.
                </p>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setShowChurchAccessModal(false)}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 font-semibold rounded-lg transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Celebration Modal */}
      {showCelebrationModal && celebrationData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Celebration Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/90 via-blue-600/90 to-purple-600/90" />

          {/* Simple Fireworks */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 1.5}s`,
                  animationDuration: '1.5s'
                }}
              />
            ))}
          </div>

          {/* Modal Content */}
          <div className="relative z-10 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-xl p-6 max-w-md w-full text-center shadow-xl">
            {/* Success Icon */}
            <div className="mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>

            {/* Congratulations */}
            <h1 className="text-2xl font-bold text-white mb-3">
              Congratulations!
            </h1>

            <div className="mb-5">
              <h2 className="text-lg font-semibold text-blue-400 mb-2">
                Course Completed!
              </h2>

              <p className="text-white mb-2">
                You completed <span className="font-semibold">"{celebrationData.courseTitle}"</span>
              </p>

              <p className="text-gray-300 mb-3">
                with a score of <span className="text-green-400 font-bold">{celebrationData.score}%</span>
              </p>

              {celebrationData.isPremium && (
                <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/40 rounded-lg px-3 py-1">
                  <Award className="h-4 w-4 text-yellow-400" />
                  <span className="text-yellow-400 text-sm font-medium">+1 Premium Point!</span>
                </div>
              )}
            </div>

            {/* Certificate Info */}
            {celebrationData.certificate && (
              <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-3 mb-5">
                <h3 className="text-white font-medium text-sm mb-1">Certificate Earned</h3>
                <p className="text-gray-300 text-sm">{celebrationData.certificate.userName}</p>
                <p className="text-gray-400 text-xs">ID: {celebrationData.certificate.certificateId}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              {celebrationData.certificate && (
                <button
                  onClick={() => {
                    setShowCertificateViewer(true);
                    setShowCelebrationModal(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Award className="h-5 w-5" />
                  View Certificate
                </button>
              )}

              <button
                onClick={shareAchievement}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="h-5 w-5" />
                Share Achievement
              </button>

              <button
                onClick={() => setShowCelebrationModal(false)}
                className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-3 font-semibold rounded-lg transition-colors"
              >
                Continue Learning
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Viewer */}
      {showCertificateViewer && celebrationData?.certificate && (
        <CertificateViewer
          certificate={celebrationData.certificate}
          onClose={() => setShowCertificateViewer(false)}
        />
      )}

      {/* Membership Prompt Modal */}
      {showMembershipPrompt && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Become a Member Today</h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Unlock the full potential of our supernatural ministry training platform. Start your journey with comprehensive courses, certificates, and community support.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-left">
                <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm">Access to all premium courses</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm">Earn certificates and points</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm">Join our ministry community</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm">Start earning commissions</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                to="/membership"
                onClick={() => setShowMembershipPrompt(false)}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-6 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                View Membership Options
              </Link>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setShowMembershipPrompt(false)}
                  className="text-gray-400 hover:text-white text-sm underline transition-colors"
                >
                  Continue as Guest
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem('hideMembershipPrompt', 'true');
                    setShowMembershipPrompt(false);
                  }}
                  className="text-gray-500 hover:text-gray-400 text-xs underline transition-colors"
                >
                  Don't show again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Detection Warning Modal */}
      {showAIDetectionWarning && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-red-900/95 border-2 border-red-500 rounded-xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">⚠️ Academic Integrity Alert</h2>
              <div className="bg-red-800/50 border border-red-600 rounded-lg p-4 mb-4">
                <p className="text-red-200 text-lg font-semibold mb-2">
                  "If you're using AI. God is watching you!"
                </p>
                <p className="text-red-300 text-sm">
                  {aiDetectionReason}
                </p>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Our system has detected potential academic integrity violations. This activity has been logged and may result in:
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-left">
                <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm">Certificate invalidation</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm">Account suspension</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm">Progress reset</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm">Administrative review</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowAIDetectionWarning(false)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 font-semibold rounded-lg transition-all duration-200"
              >
                I Understand - Continue Learning
              </button>
              <p className="text-gray-400 text-xs">
                This warning has been logged for review by our ministry team.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Training Rules Modal */}
      {showRules && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <HelpCircle className="h-6 w-6 text-blue-400" />
                  Training Completion Rules & Guidelines
                </h2>
                <button
                  onClick={() => setShowRules(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
    </div>

              <div className="space-y-6 text-gray-300">
                {/* Video Completion Requirements */}
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Video className="h-5 w-5 text-blue-400" />
                    Video Completion Requirements
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-white">For Modules WITHOUT Quizzes:</h4>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li><strong>90% Completion Required:</strong> You must watch 90% of the video to mark as completed</li>
                        <li><strong>Example:</strong> For a 10-minute video, you need to reach 9 minutes (90%)</li>
                        <li><strong>Note:</strong> The system tracks your engagement to ensure meaningful learning</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">For Modules WITH Quizzes:</h4>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li><strong>90% Completion Required:</strong> You must watch 90% of the video to mark as completed</li>
                        <li><strong>Quiz Completion:</strong> You must complete the quiz AND achieve a passing score (≥70%)</li>
                        <li><strong>All requirements must be met</strong> before the next module unlocks</li>
                        <li><strong>Note:</strong> The system tracks your engagement to ensure meaningful learning</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Academic Integrity */}
                <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    Academic Integrity & Content Protection
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-red-300">Prohibited Activities:</h4>
                      <ul className="list-disc list-inside ml-4 space-y-1 text-red-200">
                        <li><strong>DO NOT:</strong> Screenshot or record training videos</li>
                        <li><strong>DO NOT:</strong> Copy and paste content from training materials</li>
                        <li><strong>DO NOT:</strong> Use AI tools to extract or summarize training content</li>
                        <li><strong>DO NOT:</strong> Share training materials with unauthorized users</li>
                        <li><strong>DO NOT:</strong> Attempt to bypass completion requirements</li>
                      </ul>
                    </div>
                    <div className="bg-red-800/30 rounded p-3">
                      <h4 className="font-medium text-red-300 mb-2">Why These Rules Matter:</h4>
                      <ul className="list-disc list-inside ml-4 space-y-1 text-red-200">
                        <li><strong>Content Protection:</strong> Training materials are proprietary and protected</li>
                        <li><strong>Learning Integrity:</strong> The goal is genuine understanding, not quick completion</li>
                        <li><strong>Ministry Standards:</strong> We maintain high standards for spiritual education</li>
                        <li><strong>Legal Compliance:</strong> Unauthorized distribution violates copyright laws</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Best Practices */}
                <div className="bg-green-900/20 border border-green-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    Best Practices for Training Completion
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-green-300">Recommended Approach:</h4>
                      <ul className="list-disc list-inside ml-4 space-y-1 text-green-200">
                        <li><strong>Watch Actively:</strong> Take notes, pause to reflect, engage with the material</li>
                        <li><strong>Use Built-in Features:</strong> Utilize the note-taking and bookmarking features</li>
                        <li><strong>Complete Quizzes Honestly:</strong> Answer based on your understanding, not external sources</li>
                        <li><strong>Respect the Process:</strong> Allow the training to build your knowledge progressively</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-300">Technical Notes:</h4>
                      <ul className="list-disc list-inside ml-4 space-y-1 text-green-200">
                        <li><strong>Playback Speed:</strong> 1.5x speed is supported and still meets completion requirements</li>
                        <li><strong>Progress Tracking:</strong> Your progress is automatically saved and synced</li>
                        <li><strong>Mobile Access:</strong> All requirements apply across all devices</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Support */}
                <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-blue-400" />
                    Support & Questions
                  </h3>
                  <div className="space-y-2 text-blue-200">
                    <p><strong>If You Have Issues:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li><strong>Technical Problems:</strong> Contact support for video playback issues</li>
                      <li><strong>Completion Questions:</strong> Reach out if modules aren't unlocking properly</li>
                      <li><strong>Content Questions:</strong> Ask instructors for clarification on training material</li>
                      <li><strong>Access Issues:</strong> Report any problems with module access</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowRules(false)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  I Understand
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}






