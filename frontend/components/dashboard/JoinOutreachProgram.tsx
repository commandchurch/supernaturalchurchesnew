import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useBackend } from '../../hooks/useBackend';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function JoinOutreachProgram() {
  const authedBackend = useBackend();
  const queryClient = useQueryClient();
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const { data: coursesData, isLoading: isLoadingCourses } = useQuery({
    queryKey: ['academy-courses'],
    queryFn: () => authedBackend.academy.listCourses(),
  });

  const evangelismCourse = coursesData?.courses.find(c => c.title.toLowerCase().includes('evangelism essentials'));

  const { data: progressData, isLoading: isLoadingProgress } = useQuery({
    queryKey: ['academy-progress', evangelismCourse?.id],
    queryFn: () => authedBackend.academy.getProgress(),
    enabled: !!evangelismCourse,
  });

  const { data: termsData, isLoading: isLoadingTerms } = useQuery({
    queryKey: ['terms', 'soul-outreach-terms'],
    queryFn: () => authedBackend.admin.getTerms({ documentType: 'soul-outreach-terms' }),
  });

  const joinMutation = useMutation({
    mutationFn: () => authedBackend.outreach.joinProgram({}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['outreach-profile'] });
    },
    onError: (error: any) => {
      alert(`Failed to join: ${error.message}`);
    }
  });

  const courseProgress = progressData?.progress.find(p => p.courseId === evangelismCourse?.id);
  const isCourseCompleted = !!courseProgress?.completedAt;

  const canJoin = isCourseCompleted && agreedToTerms;
  const isLoading = isLoadingCourses || isLoadingProgress || isLoadingTerms;

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
        onClick={() => joinMutation.mutate()}
        disabled={!canJoin || joinMutation.isPending}
        className="bg-white text-black px-6 py-3 font-semibold uppercase tracking-wide disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-gray-200"
      >
        {joinMutation.isPending ? 'Joining...' : 'Agree & Join Program'}
      </button>
    </div>
  );
}
