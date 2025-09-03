import React, { useState, useEffect, useMemo } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

import { GraduationCap, Clock, Play, Lock, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import { siteUrl } from '../config/index';
import { apiClient } from '../lib/apiClient';
import { useUIStore } from '../stores/uiStore';
import { useToast } from '../contexts/ToastContext';

export default function Academy() {
  const { isSignedIn, user } = useUser();
  const { setLoading } = useUIStore();
  const { showToast } = useToast();
  const [filter, setFilter] = useState<'all' | 'free' | 'paid' | 'healing' | 'discipleship' | 'evangelism'>('all');
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLocalLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completedCourses, setCompletedCourses] = useState<Record<string, boolean>>({});

  // Load completed courses from localStorage
  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem('completedCourses') || '{}');
    setCompletedCourses(completed);
  }, []);

  // Load courses from API
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLocalLoading(true);
        setError(null);
        setLoading(true, 'Loading courses...');

        const response = await apiClient.academy.listCourses({
          page: 1,
          limit: 50 // Load more courses for the academy page
        });

        setCourses(response.courses || []);
      } catch (err: any) {
        console.error('Failed to load courses:', err);
        setError(err.message || 'Failed to load courses');

        // Fallback to sample courses if API fails
        setCourses([
          {
            id: 1,
            title: 'New Life in Jesus: Foundations',
            description: 'Essential foundations covering the body and blood of Jesus, how to receive from God, how to pray to God, how to renew your mind, and more.',
            category: 'discipleship',
            isPremium: false,
            durationMinutes: 120
          },
          {
            id: 4,
            title: 'Evangelism Essentials',
            description: 'Master the foundational principles of effective soul-winning and Gospel outreach. Learn biblical evangelism methods and supernatural outreach strategies.',
            category: 'evangelism',
            isPremium: false,
            durationMinutes: 120
          }
        ]);
      } finally {
        setLocalLoading(false);
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const markCourseCompleted = (courseTitle: string) => {
    const courseId = courseTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const updated = { ...completedCourses, [courseId]: true };
    setCompletedCourses(updated);
    localStorage.setItem('completedCourses', JSON.stringify(updated));
    showToast(`Congratulations! You have completed "${courseTitle}". This completion is now tracked in your dashboard.`, 'success');
  };

  // Mock membership data
  const membership = { active: true, planName: 'GOLD', renewsAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() };



  // Create progress map from completed courses (should be replaced with real progress API)
  const progressMap = useMemo(() => {
    const m = new Map<number, { pct: number; completedAt?: string | null }>();
    courses.forEach(course => {
      const courseId = course.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const isCompleted = completedCourses[courseId];
      m.set(course.id, {
        pct: isCompleted ? 100 : 0,
        completedAt: isCompleted ? new Date().toISOString() : null
      });
    });
    return m;
  }, [courses, completedCourses]);

  const completeMutation = async (params: { courseId: string }) => {
    // Mock completion - just show toast
    showToast('Course completed successfully!', 'success');
  };

  const filteredCourses = useMemo(() => {
    if (filter === 'all') return courses;
    if (filter === 'free') return courses.filter(c => !c.isPremium);
    if (filter === 'paid') return courses.filter(c => c.isPremium);
    return courses.filter(c => c.category.toLowerCase() === filter);
  }, [courses, filter]);

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'healing': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'discipleship': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'evangelism': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const canAccess = (isPremium: boolean) => {
    if (!isPremium) return true;
    return !!membership?.active;
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Institute of Ministry", item: `${siteUrl}/academy` }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-16">
      <SEO
        title="Supernatural Institute of Ministry - Complete Ministry Training Courses"
        description="God's supernatural ministry training for believers equipped for Kingdom advancement. Master signs, wonders, miracles and apply faith to every aspect of life."
        breadcrumbsJsonLd={breadcrumbs}
      />

      <div className="text-center mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 heading-font">
          Supernatural Institute of Ministry
        </h1>
        <p className="text-base sm:text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed">
          God's supernatural ministry training believers to be fully equipped for the advancement of the Kingdom of Heaven here on earth. Master signs, wonders, miracles and learn how to apply faith to every aspect of your life—financially, health, and eternally.
        </p>
      </div>

      <div className="flex justify-center mb-10 sm:mb-12">
        <div className="flex flex-wrap justify-center gap-2 p-1 bg-black border border-gray-700 w-full sm:w-auto">
          {[
            { key: 'all', label: 'ALL' },
            { key: 'free', label: 'FREE' },
            { key: 'paid', label: 'PAID' },
            { key: 'healing', label: 'HEALING' },
            { key: 'discipleship', label: 'DISCIPLESHIP' },
            { key: 'evangelism', label: 'EVANGELISM' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as any)}
              className={`${filter === f.key ? 'bg-white text-black' : 'border border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white'} px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wide`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredCourses.map((course: any) => {
          const progress = progressMap.get(course.id)?.pct ?? 0;
          const completed = (progressMap.get(course.id)?.completedAt ?? null) !== null;
          const access = canAccess(course.isPremium);

          return (
            <div key={course.id} className="relative bg-black border-0 shadow-none group">
              <div className="p-0">
                <div className="aspect-video bg-gray-800 mb-3 sm:mb-4 flex items-center justify-center relative">
                  <Play className="h-10 w-10 sm:h-12 sm:w-12 text-white/60" />
                  {course.isPremium && !access && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center px-3">
                      <div className="text-center">
                        <Lock className="h-7 w-7 sm:h-8 sm:w-8 text-white mx-auto mb-2" />
                        <p className="text-white font-semibold text-sm sm:text-base">Unlock with Membership</p>
                        <div className="mt-3">
                          <Link to="/membership" className="inline-block bg-white text-black hover:bg-gray-200 px-3 sm:px-4 py-1.5 sm:py-2 font-semibold uppercase tracking-wide text-xs sm:text-sm">
                            View Plans
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-400 mb-2">
                  <div className={`border px-2 py-1 ${getCategoryColor(course.category)}`}>
                    {course.category.toUpperCase()}
                  </div>
                  {course.duration && (
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1.5" />
                      <span>{Math.floor(course.duration / 60)}h {course.duration % 60}m</span>
                    </div>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold heading-font text-white mb-2 group-hover:text-gray-300 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-3">
                  {course.description}
                </p>

                <div className="flex items-center text-xs text-gray-400 mb-3">
                  <GraduationCap className="h-3 w-3 mr-1.5" />
                  <span>Senior Leader, Samuel Waterhouse</span>
                </div>

                <div className="mt-3">
                  {isSignedIn ? (
                    <>
                      <div className="w-full bg-gray-700 h-2 mb-2">
                        <div 
                          className={`h-2 transition-all duration-300 ${completed ? 'bg-green-400' : 'bg-white'}`} 
                          style={{ width: `${progress}%` }}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={progress}
                          role="progressbar"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-xs">{progress}% complete</span>
                        {completed ? (
                          <span className="inline-flex items-center text-green-400 text-xs font-semibold">
                            <CheckCircle2 className="h-4 w-4 mr-1" /> Completed
                          </span>
                        ) : (
                          <button
                            onClick={async () => await completeMutation({ courseId: course.id.toString() })}
                            className={`text-xs font-semibold uppercase tracking-wide ${access ? 'bg-white text-black hover:bg-gray-200' : 'bg-gray-800 text-gray-400 cursor-not-allowed'} px-3 py-1`}
                            disabled={!access}
                          >
                            {progress > 0 ? 'Continue' : 'Start'}
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() => showToast('Please sign in to track progress', 'info')}
                      className="w-full bg-white text-black hover:bg-gray-200 px-4 py-2 font-semibold uppercase tracking-wide text-sm"
                    >
                      Sign in to Track Progress
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <section className="mt-12 sm:mt-20">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 sm:mb-6 heading-font">
            Featured Course
          </h2>
        </div>
        
        <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-blue-600/20" />
              <Play className="h-12 w-12 sm:h-16 sm:w-16 text-white/80 relative z-10" />
            </div>
            <div>
              <div className="bg-green-500/20 text-green-400 border border-green-500/30 px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold inline-block mb-3 sm:mb-4">
                DISCIPLESHIP
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">
                New Life in Jesus: Foundations
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                Begin your walk with Jesus strong. Understand His finished work, establish healthy rhythms, and learn how to guard your mind, body, and spirit.
              </p>
              <Link to="/academy" className="inline-block bg-white text-black hover:bg-gray-100 font-semibold uppercase tracking-wide px-4 sm:px-6 py-2 text-sm sm:text-base">
                START LEARNING
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
