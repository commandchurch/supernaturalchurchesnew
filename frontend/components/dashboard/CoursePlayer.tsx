import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

interface CoursePlayerProps {
  courseId: string;
  videoUrl: string;
  title: string;
  duration: number; // in seconds
  onProgress: (progress: number) => void;
  onComplete: () => void;
  requiredWatchTime?: number; // minimum watch time required (default 80% of duration)
}


export default function CoursePlayer({
  courseId,
  videoUrl,
  title,
  duration,
  onProgress,
  onComplete,
  requiredWatchTime = Math.floor(duration * 0.4) // 40% minimum watch time
}: CoursePlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [totalWatchTime, setTotalWatchTime] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [lastSeekTime, setLastSeekTime] = useState(0);
  const [seekAttempts, setSeekAttempts] = useState(0);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(`course_${courseId}_progress`);
    const savedCompletion = localStorage.getItem(`course_${courseId}_completed`);

    if (savedProgress) {
      setTotalWatchTime(parseInt(savedProgress));
    }
    if (savedCompletion === 'true') {
      setHasCompleted(true);
    }
  }, [courseId]);

  // Improved seek handling with better UX
  const handleSeek = useCallback((newTime: number) => {
    const currentVideoTime = videoRef.current?.currentTime || 0;
    const timeDifference = newTime - currentVideoTime;

    // Allow backward seeking freely
    if (timeDifference < 0) {
      setCurrentTime(newTime);
      if (videoRef.current) {
        videoRef.current.currentTime = newTime;
      }
      return;
    }

    // For forward seeking, implement smart anti-cheat
    if (timeDifference > 10) {
      setSeekAttempts(prev => prev + 1);

      // If too many seek attempts, prevent the seek and show warning
      if (seekAttempts >= 3) {
        // Don't update the time, show visual feedback instead
        setTimeout(() => {
          setSeekAttempts(0); // Reset after showing warning
        }, 5000);
        return;
      }

      // Allow but track suspicious seeking
      setLastSeekTime(Date.now());
    }

    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  }, [seekAttempts]);

  // Simplified progress tracking - just track total watch time
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let lastTime = currentTime;

    if (isPlaying && videoRef.current) {
      interval = setInterval(() => {
        if (videoRef.current && !videoRef.current.paused) {
          const newTime = videoRef.current.currentTime;

          // Only count forward progress to prevent cheating
          if (newTime > lastTime) {
            const timeWatched = newTime - lastTime;
            const newTotalTime = totalWatchTime + timeWatched;

            setTotalWatchTime(newTotalTime);
            localStorage.setItem(`course_${courseId}_progress`, newTotalTime.toString());

            // Calculate progress percentage
            const progress = Math.min((newTotalTime / requiredWatchTime) * 100, 100);
            onProgress(progress);

            // Check completion
            if (newTotalTime >= requiredWatchTime && !hasCompleted) {
              setHasCompleted(true);
              localStorage.setItem(`course_${courseId}_completed`, 'true');
              onComplete();
            }
          }

          lastTime = newTime;
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, totalWatchTime, requiredWatchTime, hasCompleted, courseId, currentTime, onProgress, onComplete]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = Math.min((totalWatchTime / requiredWatchTime) * 100, 100);
  const isCompleted = totalWatchTime >= requiredWatchTime;

  return (
    <div className="bg-black border border-gray-700">
      {/* Video Player */}
      <div className="relative">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full aspect-video"
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          controls={false} // Disable default controls for custom anti-cheat
        />

        {/* Custom Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress Bar with Click-to-Seek */}
          <div className="mb-3">
            <div
              className="w-full bg-gray-700 h-2 mb-1 cursor-pointer group relative"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percentage = clickX / rect.width;
                const newTime = percentage * duration;
                handleSeek(newTime);
              }}
            >
              {/* Progress bar background */}
              <div className="w-full bg-gray-600 h-2 rounded-full" />
              {/* Completion progress */}
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300 relative"
                style={{ width: `${Math.min((totalWatchTime / duration) * 100, 100)}%` }}
              />
              {/* Current playback position */}
              <div
                className="absolute top-0 w-3 h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/4 shadow-lg"
                style={{ left: `${(currentTime / duration) * 100}%` }}
              />

              {/* Hover tooltip */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Click to seek
              </div>
            </div>

            {/* Seek attempt warning */}
            {seekAttempts >= 3 && (
              <div className="bg-red-900/80 border border-red-500/50 p-2 mb-2 text-center">
                <p className="text-red-300 text-sm font-semibold">⚠️ Seek Protection Active</p>
                <p className="text-red-200 text-xs">Please watch the video sequentially for proper progress tracking</p>
              </div>
            )}

            <div className="flex justify-between text-xs text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 accent-blue-500"
                />
              </div>
            </div>

            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Play Button Overlay (when paused) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="bg-black/50 hover:bg-black/70 text-white p-4 transition-colors"
            >
              <Play className="h-12 w-12" />
            </button>
          </div>
        )}
      </div>

      {/* Progress & Completion Status */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {isCompleted ? (
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-semibold">Completed</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-yellow-400">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-semibold">In Progress</span>
            </div>
          )}
        </div>

        {/* Progress Details */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Watch Time:</span>
            <span className="text-white">{formatTime(totalWatchTime)} / {formatTime(requiredWatchTime)}</span>
          </div>

          <div className="w-full bg-gray-700 h-2">
            <div
              className={`h-2 transition-all duration-300 ${isCompleted ? 'bg-green-500' : 'bg-blue-500'}`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-gray-400">
            <span>{progressPercentage.toFixed(1)}% Complete</span>
            <span>{isCompleted ? 'Ready for Quiz' : `${formatTime(requiredWatchTime - totalWatchTime)} remaining`}</span>
          </div>
        </div>

        {/* Anti-cheat Warning */}
        {seekAttempts > 0 && (
          <div className="mt-3 p-3 bg-yellow-900/20 border border-yellow-500/30 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-yellow-400 font-semibold">Seek Detection Active</p>
              <p className="text-gray-300 text-xs">
                Multiple seek attempts detected. Please watch the video sequentially for proper completion tracking.
              </p>
            </div>
          </div>
        )}

        {/* Completion Requirements */}
        {!isCompleted && (
          <div className="mt-3 p-3 bg-blue-900/20 border border-blue-500/30">
            <p className="text-blue-400 text-sm font-semibold mb-1">Completion Requirements:</p>
            <ul className="text-gray-300 text-xs space-y-1">
              <li>• Watch at least {formatTime(requiredWatchTime)} of the video</li>
              <li>• Watch video in sequence (no skipping)</li>
              <li>• Complete the quiz after watching</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
