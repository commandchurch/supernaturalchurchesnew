// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import client from '../../client';

export default function JoinOutreachProgram() {
  const { user } = useUser();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  // TODO: Convert to Encore.dev backend
  // const coursesData = useQuery(api.academy.listAllCourses);
  // const progressData = useQuery(api.academy.getProgress, { userId: user?.id || '' });
  // const termsData = useQuery(api.admin.getTerms, { documentType: 'soul-outreach-terms' });
  // const joinMutation = useMutation(api.outreach.joinProgram);

  // Temporary mock data
  const [coursesData] = useState([{ id: '1', title: 'Evangelism Essentials', description: 'Learn the fundamentals of evangelism' }]);
  const [progressData] = useState({ progress: [{ courseId: '1', completedAt: new Date().toISOString() }] });
  const [termsData] = useState({ content: 'Terms and conditions for Soul Outreach program...' });

  const evangelismCourse = coursesData?.find((c: any) => c.title.toLowerCase().includes('evangelism essentials'));

  const courseProgress = progressData?.progress?.find((p: any) => p.courseId === evangelismCourse?.id);
  const isCourseCompleted = !!courseProgress?.completedAt;

  const canJoin = isCourseCompleted && agreedToTerms;

  const handleJoinProgram = async () => {
    try {
      setIsJoining(true);
      await client.outreach.joinProgram({});
      alert('Successfully joined Soul Outreach program!');
      // Refresh the page or redirect to show updated status
      window.location.reload();
    } catch (error) {
      console.error('Failed to join program:', error);
      alert('Failed to join program. Please try again.');
    } finally {
      setIsJoining(false);
    }
  };
  const isLoading = coursesData === undefined || progressData === undefined || termsData === undefined;

  if (isLoading) {
    return <div className="text-center p-8"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div>;
  }

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6">
      <h2 className="text-2xl font-bold text-white mb-4 heading-font">Join Soul Outreach</h2>
      <p className="text-gray-400 mb-6">
        Become an affiliate to earn commissions while spreading the Gospel. Complete the requirements below to get started.
      </p>

      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-3">
          {isCourseCompleted ? (
            <CheckCircle className="h-6 w-6 text-green-400 mt-1" />
          ) : (
            <XCircle className="h-6 w-6 text-red-400 mt-1" />
          )}
          <div>
            <h3 className="font-semibold text-white">Complete "Evangelism Essentials" Course</h3>
            <p className="text-sm text-gray-400">
              This free course equips you with the foundational knowledge for effective soul-winning.
            </p>
            {!isCourseCompleted && (
              <Link to="/academy" className="text-sm text-blue-400 hover:underline mt-1 inline-block">
                Go to Course
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3">
          {agreedToTerms ? (
            <CheckCircle className="h-6 w-6 text-green-400 mt-1" />
          ) : (
            <div className="w-6 h-6 border-2 border-gray-500 rounded-full mt-1 flex-shrink-0" />
          )}
          <div>
            <h3 className="font-semibold text-white">Agree to Terms & Conditions</h3>
            <p className="text-sm text-gray-400">
              Please review and agree to the Program's terms of business.
            </p>
            <div className="mt-2 text-sm">
              <div className="max-h-40 overflow-y-auto bg-gray-900/50 border border-gray-600 p-3 mb-2">
                <pre className="whitespace-pre-wrap font-sans">{termsData?.content}</pre>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                />
                <span>I have read and agree to the Terms & Conditions.</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleJoinProgram}
        disabled={!canJoin || isJoining}
        className="bg-white text-black px-6 py-3 font-semibold uppercase tracking-wide disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-gray-200"
      >
        {isJoining ? 'Joining...' : 'Agree & Join Program'}
      </button>
    </div>
  );
}
