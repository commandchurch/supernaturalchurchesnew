import React, { useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { useUser } from '@clerk/clerk-react';
import { api } from '../../_generated/api';
import { HelpCircle, CheckCircle, XCircle, Award, Share2 } from 'lucide-react';

interface CourseQuizProps {
  courseId: string;
  onQuizComplete: () => void;
}

interface QuizAnswer {
  questionId: string;
  selectedAnswer: 'A' | 'B' | 'C' | 'D';
}

export default function CourseQuiz({ courseId, onQuizComplete }: CourseQuizProps) {
  const { user } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);

  const courseData = useQuery(api.academy.getCourse, { courseId });
  const outreachProfile = useQuery(api.outreach.getStats);

  const submitQuizMutation = useMutation(api.academy.submitQuiz);

  const handleAnswerSelect = (questionId: string, selectedAnswer: 'A' | 'B' | 'C' | 'D') => {
    const newAnswers = answers.filter(a => a.questionId !== questionId);
    newAnswers.push({ questionId, selectedAnswer });
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < (courseData?.quizQuestions.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    if (answers.length === courseData?.quizQuestions?.length) {
      try {
        const result = await submitQuizMutation.mutateAsync({
          courseId,
          answers,
        });
        setQuizResult(result);
        setQuizCompleted(true);
        if (result.passed) {
          onQuizComplete();
        }
      } catch (error) {
        console.error('Quiz submission failed:', error);
      }
    }
  };

  const shareToSocial = (platform: string) => {
    const referralCode = outreachProfile?.referralCode || '';
    const shareText = `🎓 Just completed "${courseData?.title}" at Command Church! Join me in growing spiritually: https://commandchurch.com/join?ref=${referralCode}`;
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://commandchurch.com/join?ref=${referralCode}`)}&quote=${encodeURIComponent(shareText)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://commandchurch.com/join?ref=${referralCode}`)}&summary=${encodeURIComponent(shareText)}`,
    };

    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
  };

  if (courseData === undefined) {
    return <div className="text-center p-8">Loading quiz...</div>;
  }

  if (!courseData?.quizQuestions.length) {
    return <div className="text-center p-8">No quiz available for this course.</div>;
  }

  if (quizCompleted && quizResult) {
    return (
      <div className="bg-gray-800/50 border border-gray-700 p-8 text-center">
        <div className="mb-6">
          {quizResult.passed ? (
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
          ) : (
            <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          )}
          
          <h2 className="text-2xl font-bold text-white mb-2 heading-font">
            {quizResult.passed ? 'Congratulations!' : 'Quiz Not Passed'}
          </h2>
          
          <p className="text-gray-300 mb-4">
            You scored {quizResult.score}% ({quizResult.score >= quizResult.passingScore ? 'Passed' : 'Failed'})
          </p>
          
          <div className="bg-gray-900/50 border border-gray-700 p-4 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Your Score:</span>
              <span className="text-white font-bold">{quizResult.score}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Passing Score:</span>
              <span className="text-white">{quizResult.passingScore}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Questions Correct:</span>
              <span className="text-white">{Math.round((quizResult.score / 100) * quizResult.totalQuestions)}/{quizResult.totalQuestions}</span>
            </div>
          </div>
        </div>

        {quizResult.passed && quizResult.certificateIssued && (
          <div className="mb-6">
            <Award className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2 heading-font">Certificate Issued!</h3>
            <p className="text-gray-300 mb-4">Your certificate has been added to your dashboard.</p>
            
            <div className="space-y-3">
              <h4 className="text-white font-semibold">Share Your Achievement:</h4>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => shareToSocial('twitter')}
                  className="bg-blue-500 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-600 inline-flex items-center"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Twitter
                </button>
                <button
                  onClick={() => shareToSocial('facebook')}
                  className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-700 inline-flex items-center"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Facebook
                </button>
                <button
                  onClick={() => shareToSocial('linkedin')}
                  className="bg-blue-700 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-800 inline-flex items-center"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  LinkedIn
                </button>
              </div>
            </div>
          </div>
        )}

        {!quizResult.passed && (
          <p className="text-gray-400 text-sm">
            You can retake the quiz after reviewing the course material.
          </p>
        )}
      </div>
    );
  }

  const currentQuestionData = courseData.quizQuestions[currentQuestion];
  const currentAnswer = answers.find(a => a.questionId === currentQuestionData.id);

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-5 w-5 text-white" />
          <h2 className="text-xl font-bold text-white heading-font">Course Quiz</h2>
        </div>
        <div className="text-gray-400 text-sm">
          Question {currentQuestion + 1} of {courseData.quizQuestions.length}
        </div>
      </div>

      <div className="mb-6">
        <div className="w-full bg-gray-700 h-2 mb-4">
          <div 
            className="bg-blue-400 h-2 transition-all duration-300" 
            style={{ width: `${((currentQuestion + 1) / courseData.quizQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-6">
          {currentQuestionData.question}
        </h3>

        <div className="space-y-3">
          {[
            { key: 'A' as const, text: currentQuestionData.optionA },
            { key: 'B' as const, text: currentQuestionData.optionB },
            { key: 'C' as const, text: currentQuestionData.optionC },
            { key: 'D' as const, text: currentQuestionData.optionD },
          ].map((option) => (
            <button
              key={option.key}
              onClick={() => handleAnswerSelect(currentQuestionData.id, option.key)}
              className={`w-full text-left p-4 border transition-colors ${
                currentAnswer?.selectedAnswer === option.key
                  ? 'border-blue-400 bg-blue-500/20 text-white'
                  : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="font-semibold mr-3">{option.key}.</span>
              {option.text}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-4 py-2 border border-gray-600 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <div className="text-gray-400 text-sm">
          {answers.length} of {courseData.quizQuestions.length} answered
        </div>

        {currentQuestion === courseData.quizQuestions.length - 1 ? (
          <button
            onClick={handleSubmitQuiz}
            disabled={answers.length !== courseData.quizQuestions.length || submitQuizMutation.isPending}
            className="bg-white text-black hover:bg-gray-200 px-6 py-2 font-semibold uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitQuizMutation.isPending ? 'Submitting...' : 'Submit Quiz'}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!currentAnswer}
            className="bg-white text-black hover:bg-gray-200 px-4 py-2 font-semibold uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
