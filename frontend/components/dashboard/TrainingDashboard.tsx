import React, { useState, useEffect, useMemo } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Trophy,
  TrendingUp,
  Calendar,
  Play,
  CheckCircle2,
  Clock,
  Star,
  Award,
  Target,
  BarChart3,
  Zap,
  Users,
  GraduationCap
} from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  isPremium: boolean;
  isChurch: boolean;
  durationMinutes: number;
  videoUrl?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites?: number[];
}

interface UserProgress {
  courseId: string;
  progress: number; // 0-100
  completed: boolean;
  completedAt?: string;
  totalWatchTime: number;
  lastWatched?: string;
}

export default function TrainingDashboard() {
  const { user } = useUser();
  const [courses, setCourses] = useState<Course[]>([]);
  const [userProgress, setUserProgress] = useState<Record<string, UserProgress>>({});
  const [userPoints, setUserPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load courses and user progress
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Load courses (same as Academy page)
        setCourses([
          {
            id: 1,
            title: 'New Life in Jesus: Foundations',
            description: 'Essential foundations covering the body and blood of Jesus, how to receive from God, how to pray to God, how to renew your mind, and more.',
            category: 'discipleship',
            isPremium: false,
            isChurch: false,
            durationMinutes: 120,
            difficulty: 'Beginner'
          },
          {
            id: 2,
            title: 'Advanced Ministry Training',
            description: 'Deep dive into supernatural ministry, healing, deliverance and prophetic ministry.',
            category: 'ministry',
            isPremium: true,
            isChurch: false,
            durationMinutes: 180,
            difficulty: 'Advanced',
            prerequisites: [1]
          },
          {
            id: 3,
            title: 'Church Leadership Fundamentals',
            description: 'Essential training for church leaders and pastors in biblical leadership principles.',
            category: 'leadership',
            isPremium: true,
            isChurch: true,
            durationMinutes: 240,
            difficulty: 'Intermediate'
          },
          {
            id: 4,
            title: 'Evangelism Essentials',
            description: 'Master the foundational principles of effective soul-winning and Gospel outreach.',
            category: 'evangelism',
            isPremium: false,
            isChurch: false,
            durationMinutes: 120,
            difficulty: 'Beginner'
          },
          {
            id: 5,
            title: 'Prayer Ministry Intensive',
            description: 'Advanced training in intercessory prayer, spiritual warfare, and maintaining a consistent prayer life.',
            category: 'ministry',
            isPremium: true,
            isChurch: true,
            durationMinutes: 210,
            difficulty: 'Intermediate',
            prerequisites: [1]
          },
          {
            id: 6,
            title: 'Biblical Financial Stewardship',
            description: 'Learn God\'s principles for financial management, tithing, and kingdom prosperity.',
            category: 'stewardship',
            isPremium: true,
            isChurch: false,
            durationMinutes: 150,
            difficulty: 'Intermediate'
          }
        ]);

        // Load user progress from localStorage
        const loadUserProgress = () => {
          const progress: Record<string, UserProgress> = {};

          courses.forEach(course => {
            const courseId = course.id.toString();
            const savedProgress = localStorage.getItem(`course_${courseId}_progress`);
            const savedCompletion = localStorage.getItem(`course_${courseId}_completed`);
            const savedWatchTime = localStorage.getItem(`course_${courseId}_watch_time`);
            const savedLastWatched = localStorage.getItem(`course_${courseId}_last_watched`);

            if (savedProgress || savedCompletion) {
              progress[courseId] = {
                courseId,
                progress: savedCompletion === 'true' ? 100 : parseInt(savedProgress || '0'),
                completed: savedCompletion === 'true',
                completedAt: savedCompletion === 'true' ? new Date().toISOString() : undefined,
                totalWatchTime: parseInt(savedWatchTime || '0'),
                lastWatched: savedLastWatched || undefined
              };
            }
          });

          setUserProgress(progress);

          // Load user points
          const points = parseInt(localStorage.getItem('userPoints') || '0');
          setUserPoints(points);

          // Check if user has username
          const hasUsername = localStorage.getItem('userUsername') ||
                             JSON.parse(localStorage.getItem('userProfile') || '{}')?.username;
          if (!hasUsername) {
            // Redirect to main dashboard for username creation
            window.location.href = '/dashboard';
          }
        };

        loadUserProgress();
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Calculate dashboard statistics
  const dashboardStats = useMemo(() => {
    const totalCourses = courses.length;
    const completedCourses = Object.values(userProgress).filter(p => p.completed).length;
    const inProgressCourses = Object.values(userProgress).filter(p => p.progress > 0 && !p.completed).length;
    const totalWatchTime = Object.values(userProgress).reduce((sum, p) => sum + p.totalWatchTime, 0);

    // Enhanced study streak calculation
    const getStudyStreak = () => {
      const lastStudyDay = localStorage.getItem('lastStudyDay');
      const currentStreak = parseInt(localStorage.getItem('studyStreak') || '0');

      if (!lastStudyDay) {
        // First time studying
        localStorage.setItem('lastStudyDay', Date.now().toString());
        localStorage.setItem('studyStreak', '1');
        return 1;
      }

      const daysSinceLastStudy = Math.floor((Date.now() - parseInt(lastStudyDay)) / (1000 * 60 * 60 * 24));

      if (daysSinceLastStudy === 0) {
        // Studied today, keep current streak
        return currentStreak;
      } else if (daysSinceLastStudy === 1) {
        // Studied yesterday, increment streak
        const newStreak = currentStreak + 1;
        localStorage.setItem('lastStudyDay', Date.now().toString());
        localStorage.setItem('studyStreak', newStreak.toString());
        return newStreak;
      } else {
        // Streak broken, reset to 1
        localStorage.setItem('lastStudyDay', Date.now().toString());
        localStorage.setItem('studyStreak', '1');
        return 1;
      }
    };

    const studyStreak = getStudyStreak();

    return {
      totalCourses,
      completedCourses,
      inProgressCourses,
      totalWatchTime,
      studyStreak,
      completionPercentage: totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0
    };
  }, [courses, userProgress]);

  // Get current courses (in progress)
  const currentCourses = useMemo(() => {
    return courses
      .filter(course => {
        const progress = userProgress[course.id.toString()];
        return progress && progress.progress > 0 && !progress.completed;
      })
      .sort((a, b) => {
        const progressA = userProgress[a.id.toString()]?.progress || 0;
        const progressB = userProgress[b.id.toString()]?.progress || 0;
        return progressB - progressA; // Sort by progress (highest first)
      });
  }, [courses, userProgress]);

  // Get recommended courses
  const recommendedCourses = useMemo(() => {
    return courses
      .filter(course => {
        const progress = userProgress[course.id.toString()];
        if (progress?.completed) return false;

        // Check prerequisites
        if (course.prerequisites) {
          return course.prerequisites.every(prereqId =>
            userProgress[prereqId.toString()]?.completed
          );
        }

        return true;
      })
      .sort((a, b) => {
        // Prioritize based on difficulty and prerequisites completion
        const getPriority = (course: Course) => {
          let priority = 0;
          if (course.difficulty === 'Beginner') priority += 3;
          if (course.difficulty === 'Intermediate') priority += 2;
          if (course.difficulty === 'Advanced') priority += 1;
          if (course.prerequisites?.every(prereqId => userProgress[prereqId.toString()]?.completed)) {
            priority += 2;
          }
          return priority;
        };
        return getPriority(b) - getPriority(a);
      })
      .slice(0, 3);
  }, [courses, userProgress]);

  // Get completed courses
  const completedCoursesList = useMemo(() => {
    return courses
      .filter(course => userProgress[course.id.toString()]?.completed)
      .sort((a, b) => {
        const dateA = userProgress[a.id.toString()]?.completedAt;
        const dateB = userProgress[b.id.toString()]?.completedAt;
        return new Date(dateB || 0).getTime() - new Date(dateA || 0).getTime();
      });
  }, [courses, userProgress]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-700 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 heading-font">
              Welcome back, {user?.firstName || 'Student'}! 👋
            </h1>
            <p className="text-gray-300">
              Continue your journey in supernatural ministry training. You're making amazing progress!
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{userPoints}</div>
              <div className="text-sm text-gray-400">Points Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{dashboardStats.studyStreak}</div>
              <div className="text-sm text-gray-400">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{dashboardStats.completionPercentage}%</div>
              <div className="text-sm text-gray-400">Complete</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 border border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="h-8 w-8 text-blue-400" />
            <div>
              <p className="text-2xl font-bold text-white">{dashboardStats.totalCourses}</p>
              <p className="text-gray-400 text-sm">Total Courses</p>
            </div>
          </div>
          <div className="w-full bg-gray-700 h-2">
            <div
              className="bg-blue-500 h-2 transition-all duration-300"
              style={{ width: `${dashboardStats.completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle2 className="h-8 w-8 text-green-400" />
            <div>
              <p className="text-2xl font-bold text-white">{dashboardStats.completedCourses}</p>
              <p className="text-gray-400 text-sm">Completed</p>
            </div>
          </div>
          <p className="text-green-400 text-sm">🎉 Great progress!</p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="h-8 w-8 text-yellow-400" />
            <div>
              <p className="text-2xl font-bold text-white">{formatTime(dashboardStats.totalWatchTime)}</p>
              <p className="text-gray-400 text-sm">Watch Time</p>
            </div>
          </div>
          <p className="text-yellow-400 text-sm">📚 Keep learning!</p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="h-8 w-8 text-purple-400" />
            <div>
              <p className="text-2xl font-bold text-white">{dashboardStats.studyStreak}</p>
              <p className="text-gray-400 text-sm">Day Streak</p>
            </div>
          </div>
          <p className="text-purple-400 text-sm">🔥 Keep it up!</p>
        </div>
      </div>

      {/* Current Courses */}
      {currentCourses.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 heading-font">Continue Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentCourses.map(course => {
              const progress = userProgress[course.id.toString()];
              return (
                <div key={course.id} className="bg-gray-800/50 border border-gray-700 p-6 hover:bg-gray-800/70 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-1 text-xs border ${getDifficultyColor(course.difficulty)}`}>
                          {course.difficulty}
                        </span>
                        <span className="text-gray-400 text-sm">{course.category}</span>
                      </div>
                    </div>
                    <Play className="h-8 w-8 text-blue-400" />
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">{progress?.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2">
                      <div
                        className="bg-blue-500 h-2 transition-all duration-300"
                        style={{ width: `${progress?.progress || 0}%` }}
                      />
                    </div>
                  </div>

                  <Link
                    to={`/academy?course=${course.id}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 text-center font-semibold uppercase tracking-wide"
                  >
                    Continue Course
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recommended Courses */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 heading-font">Recommended for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedCourses.map(course => (
            <div key={course.id} className="bg-gray-800/50 border border-gray-700 p-6 hover:bg-gray-800/70 transition-colors group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 text-xs border ${getDifficultyColor(course.difficulty)}`}>
                      {course.difficulty}
                    </span>
                    <span className="text-gray-400 text-sm">{course.category}</span>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2">{course.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.durationMinutes}min
                </span>
                {course.isPremium && (
                  <span className="flex items-center gap-1 text-yellow-400">
                    <Star className="h-4 w-4" />
                    Premium
                  </span>
                )}
              </div>

              <Link
                to={`/academy?course=${course.id}`}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 text-center font-semibold uppercase tracking-wide text-sm"
              >
                Start Course
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Courses */}
      {completedCoursesList.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 heading-font">Completed Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedCoursesList.slice(0, 6).map(course => (
              <div key={course.id} className="bg-green-900/20 border border-green-500/30 p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-3">{course.description}</p>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs border ${getDifficultyColor(course.difficulty)}`}>
                        {course.difficulty}
                      </span>
                      <span className="text-gray-400 text-sm">{course.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {completedCoursesList.length > 6 && (
            <div className="text-center mt-6">
              <Link
                to="/academy?filter=completed"
                className="inline-block bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 font-semibold uppercase tracking-wide"
              >
                View All Completed ({completedCoursesList.length})
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Achievement Section */}
      <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="h-8 w-8 text-yellow-400" />
          <h2 className="text-2xl font-bold text-white heading-font">Achievements & Milestones</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <Award className="h-12 w-12 text-yellow-400 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-white mb-1">First Steps</h3>
            <p className="text-gray-400 text-sm">Complete your first course</p>
            <div className={`mt-2 px-3 py-1 text-xs border ${dashboardStats.completedCourses > 0 ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-gray-700 text-gray-400 border-gray-600'}`}>
              {dashboardStats.completedCourses > 0 ? '✅ Earned' : '🔒 Locked'}
            </div>
          </div>

          <div className="text-center">
            <Target className="h-12 w-12 text-blue-400 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-white mb-1">Dedicated Learner</h3>
            <p className="text-gray-400 text-sm">Complete 5 courses</p>
            <div className={`mt-2 px-3 py-1 text-xs border ${dashboardStats.completedCourses >= 5 ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-gray-700 text-gray-400 border-gray-600'}`}>
              {dashboardStats.completedCourses >= 5 ? '✅ Earned' : `${5 - dashboardStats.completedCourses} to go`}
            </div>
          </div>

          <div className="text-center">
            <Zap className="h-12 w-12 text-purple-400 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-white mb-1">Study Champion</h3>
            <p className="text-gray-400 text-sm">7 day learning streak</p>
            <div className={`mt-2 px-3 py-1 text-xs border ${dashboardStats.studyStreak >= 7 ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-gray-700 text-gray-400 border-gray-600'}`}>
              {dashboardStats.studyStreak >= 7 ? '✅ Earned' : `${7 - dashboardStats.studyStreak} days to go`}
            </div>
          </div>

          <div className="text-center">
            <GraduationCap className="h-12 w-12 text-green-400 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-white mb-1">Ministry Master</h3>
            <p className="text-gray-400 text-sm">Complete all courses</p>
            <div className={`mt-2 px-3 py-1 text-xs border ${dashboardStats.completionPercentage >= 100 ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-gray-700 text-gray-400 border-gray-600'}`}>
              {dashboardStats.completionPercentage >= 100 ? '✅ Earned' : `${dashboardStats.totalCourses - dashboardStats.completedCourses} to go`}
            </div>
          </div>
        </div>

        {/* Study Streak Visual */}
        <div className="mt-6 p-4 bg-gray-800/50 border border-gray-600/30 rounded">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-400" />
              <span className="text-white font-semibold">Current Study Streak</span>
            </div>
            <span className="text-2xl font-bold text-purple-400">{dashboardStats.studyStreak} days</span>
          </div>

          {/* Streak visualization */}
          <div className="flex gap-1">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded ${
                  index < dashboardStats.studyStreak
                    ? 'bg-purple-500'
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>

          <p className="text-gray-400 text-sm mt-2">
            {dashboardStats.studyStreak >= 7
              ? "🎉 Amazing! You're on fire!"
              : dashboardStats.studyStreak === 1
              ? "🌱 Keep it up! Every day counts."
              : `🔥 ${7 - dashboardStats.studyStreak} more days to reach your goal!`
            }
          </p>
        </div>
      </div>
    </div>
  );
}
