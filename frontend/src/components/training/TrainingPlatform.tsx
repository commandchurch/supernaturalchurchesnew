import React, { useState, useEffect } from 'react';
import { Lock, Unlock, CheckCircle, Play, BookOpen, Video, FileText, Award, ChevronRight } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment';
  duration: string;
  completed: boolean;
  locked: boolean;
  content?: string;
  videoUrl?: string;
  quiz?: any[];
}

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  completed: boolean;
  unlocked: boolean;
}

export default function TrainingPlatform() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [currentTrainingModule, setCurrentTrainingModule] = useState<string | null>(null);

  // Training modules data
  const [trainingModules, setTrainingModules] = useState<TrainingModule[]>([
    {
      id: 'foundation',
      title: 'Foundation of Faith',
      description: 'Build your spiritual foundation with core biblical principles',
      completed: false,
      unlocked: true,
      modules: [
        {
          id: 'faith-basics',
          title: 'The Basics of Faith',
          description: 'Understanding what faith really means',
          type: 'video',
          duration: '15 min',
          completed: false,
          locked: false,
          videoUrl: 'https://example.com/faith-basics'
        },
        {
          id: 'bible-study',
          title: 'How to Study the Bible',
          description: 'Essential skills for biblical study',
          type: 'reading',
          duration: '20 min',
          completed: false,
          locked: true,
          content: 'Bible study content here...'
        },
        {
          id: 'prayer-life',
          title: 'Developing a Prayer Life',
          description: 'Learn to communicate with God effectively',
          type: 'video',
          duration: '18 min',
          completed: false,
          locked: true,
          videoUrl: 'https://example.com/prayer-life'
        },
        {
          id: 'foundation-quiz',
          title: 'Foundation Quiz',
          description: 'Test your understanding of the basics',
          type: 'quiz',
          duration: '10 min',
          completed: false,
          locked: true
        }
      ]
    },
    {
      id: 'supernatural',
      title: 'Walking in the Supernatural',
      description: 'Discover your supernatural calling and authority in Christ',
      completed: false,
      unlocked: false,
      modules: [
        {
          id: 'holy-spirit',
          title: 'The Holy Spirit and Power',
          description: 'Understanding the role of the Holy Spirit',
          type: 'video',
          duration: '22 min',
          completed: false,
          locked: true,
          videoUrl: 'https://example.com/holy-spirit'
        },
        {
          id: 'spiritual-gifts',
          title: 'Spiritual Gifts and Calling',
          description: 'Discover your spiritual gifts',
          type: 'reading',
          duration: '25 min',
          completed: false,
          locked: true,
          content: 'Spiritual gifts content...'
        },
        {
          id: 'authority-christ',
          title: 'Authority in Christ',
          description: 'Understanding your authority as a believer',
          type: 'video',
          duration: '20 min',
          completed: false,
          locked: true,
          videoUrl: 'https://example.com/authority-christ'
        },
        {
          id: 'supernatural-quiz',
          title: 'Supernatural Quiz',
          description: 'Test your knowledge of supernatural ministry',
          type: 'quiz',
          duration: '15 min',
          completed: false,
          locked: true
        }
      ]
    },
    {
      id: 'healing',
      title: 'Healing Ministry',
      description: 'Learn to minister healing and deliverance',
      completed: false,
      unlocked: false,
      modules: [
        {
          id: 'healing-scriptures',
          title: 'Healing Scriptures',
          description: 'Key scriptures about divine healing',
          type: 'reading',
          duration: '15 min',
          completed: false,
          locked: true,
          content: 'Healing scriptures content...'
        },
        {
          id: 'healing-prayer',
          title: 'Healing Prayer Techniques',
          description: 'How to pray for the sick effectively',
          type: 'video',
          duration: '25 min',
          completed: false,
          locked: true,
          videoUrl: 'https://example.com/healing-prayer'
        },
        {
          id: 'deliverance',
          title: 'Deliverance Ministry',
          description: 'Understanding spiritual warfare and deliverance',
          type: 'video',
          duration: '30 min',
          completed: false,
          locked: true,
          videoUrl: 'https://example.com/deliverance'
        },
        {
          id: 'healing-quiz',
          title: 'Healing Ministry Quiz',
          description: 'Test your understanding of healing ministry',
          type: 'quiz',
          duration: '12 min',
          completed: false,
          locked: true
        }
      ]
    }
  ]);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('trainingProgress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setTrainingModules(prev => prev.map(module => ({
          ...module,
          completed: progress[module.id]?.completed || false,
          unlocked: progress[module.id]?.unlocked || module.id === 'foundation',
          modules: module.modules.map(m => ({
            ...m,
            completed: progress[module.id]?.modules?.[m.id]?.completed || false,
            locked: !progress[module.id]?.modules?.[m.id]?.completed &&
                    (m.id !== 'faith-basics' && !module.modules.find(prev => prev.id === getPreviousModuleId(m.id))?.completed)
          }))
        })));
      } catch (error) {
        console.error('Error loading training progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (modules: TrainingModule[]) => {
    const progress: any = {};
    modules.forEach(module => {
      progress[module.id] = {
        completed: module.completed,
        unlocked: module.unlocked,
        modules: {}
      };
      module.modules.forEach(m => {
        progress[module.id].modules[m.id] = {
          completed: m.completed
        };
      });
    });
    localStorage.setItem('trainingProgress', JSON.stringify(progress));
  };

  // Get previous module ID for unlocking logic
  const getPreviousModuleId = (currentId: string): string | null => {
    const moduleMap: { [key: string]: string } = {
      'bible-study': 'faith-basics',
      'prayer-life': 'bible-study',
      'foundation-quiz': 'prayer-life',
      'holy-spirit': 'foundation-quiz',
      'spiritual-gifts': 'holy-spirit',
      'authority-christ': 'spiritual-gifts',
      'supernatural-quiz': 'authority-christ',
      'healing-scriptures': 'supernatural-quiz',
      'healing-prayer': 'healing-scriptures',
      'deliverance': 'healing-prayer',
      'healing-quiz': 'deliverance'
    };
    return moduleMap[currentId] || null;
  };

  // Complete a module and unlock the next one
  const completeModule = (trainingModuleId: string, moduleId: string) => {
    setTrainingModules(prev => {
      const updated = prev.map(trainingModule => {
        if (trainingModule.id === trainingModuleId) {
          const updatedModules = trainingModule.modules.map(module => {
            if (module.id === moduleId) {
              return { ...module, completed: true };
            }
            // Unlock next module if this one was completed
            if (getPreviousModuleId(module.id) === moduleId) {
              return { ...module, locked: false };
            }
            return module;
          });

          // Check if training module is completed
          const allModulesCompleted = updatedModules.every(m => m.completed);
          const updatedTrainingModule = {
            ...trainingModule,
            modules: updatedModules,
            completed: allModulesCompleted
          };

          // Unlock next training module if current is completed
          if (allModulesCompleted) {
            const nextModuleIndex = prev.findIndex(m => m.id === trainingModuleId) + 1;
            if (nextModuleIndex < prev.length) {
              prev[nextModuleIndex].unlocked = true;
            }
          }

          return updatedTrainingModule;
        }
        return trainingModule;
      });

      saveProgress(updated);
      return updated;
    });
  };

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'reading': return <BookOpen className="h-4 w-4" />;
      case 'quiz': return <FileText className="h-4 w-4" />;
      case 'assignment': return <Award className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const selectedTrainingModule = trainingModules.find(m => m.id === currentTrainingModule);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-white mb-4 heading-font">
          Supernatural Ministry Training
        </h1>
        <p className="text-xl text-gray-400">
          Train. Go. Save. Repeat. - Become equipped for supernatural ministry
        </p>
      </div>

      {!currentTrainingModule ? (
        // Training Modules Overview
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainingModules.map((module) => (
            <div
              key={module.id}
              className={`bg-gray-800/50 border border-gray-700 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:transform hover:scale-105 ${
                !module.unlocked ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500'
              }`}
              onClick={() => module.unlocked && setCurrentTrainingModule(module.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{module.title}</h3>
                {module.completed ? (
                  <CheckCircle className="h-6 w-6 text-green-400" />
                ) : !module.unlocked ? (
                  <Lock className="h-6 w-6 text-gray-500" />
                ) : (
                  <Unlock className="h-6 w-6 text-blue-400" />
                )}
              </div>

              <p className="text-gray-400 mb-4">{module.description}</p>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  {module.modules.filter(m => m.completed).length}/{module.modules.length} completed
                </span>
                <div className="flex items-center text-blue-400">
                  <span>View Modules</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>

              {!module.unlocked && (
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-yellow-400 text-sm">
                    Complete previous module to unlock
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        // Individual Training Module View
        <div>
          <button
            onClick={() => setCurrentTrainingModule(null)}
            className="mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            ← Back to Overview
          </button>

          {selectedTrainingModule && (
            <div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">{selectedTrainingModule.title}</h2>
                <p className="text-gray-400">{selectedTrainingModule.description}</p>
                <div className="mt-4 flex items-center gap-4 text-sm">
                  <span className="text-green-400">
                    {selectedTrainingModule.modules.filter(m => m.completed).length}/{selectedTrainingModule.modules.length} completed
                  </span>
                  <span className="text-blue-400">
                    {selectedTrainingModule.modules.filter(m => !m.locked).length} unlocked
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedTrainingModule.modules.map((module, index) => (
                  <div
                    key={module.id}
                    className={`bg-gray-800/50 border border-gray-700 rounded-lg p-6 transition-all duration-300 ${
                      module.locked
                        ? 'opacity-50 cursor-not-allowed'
                        : module.completed
                          ? 'border-green-500 bg-green-500/10 cursor-pointer hover:border-green-400'
                          : 'cursor-pointer hover:border-blue-500 hover:bg-gray-700/50'
                    }`}
                    onClick={() => !module.locked && setSelectedModule(module.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getModuleIcon(module.type)}
                        <div>
                          <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                          <p className="text-gray-400 text-sm">{module.description}</p>
                        </div>
                      </div>

                      {module.completed ? (
                        <CheckCircle className="h-6 w-6 text-green-400" />
                      ) : module.locked ? (
                        <Lock className="h-6 w-6 text-gray-500" />
                      ) : (
                        <Play className="h-6 w-6 text-blue-400" />
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{module.duration}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        module.type === 'video' ? 'bg-red-500/20 text-red-400' :
                        module.type === 'reading' ? 'bg-blue-500/20 text-blue-400' :
                        module.type === 'quiz' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {module.type.toUpperCase()}
                      </span>
                    </div>

                    {module.locked && (
                      <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <p className="text-yellow-400 text-sm">
                          Complete Module {index} to unlock
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Module Content Modal */}
      {selectedModule && selectedTrainingModule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">
                  {selectedTrainingModule.modules.find(m => m.id === selectedModule)?.title}
                </h3>
                <button
                  onClick={() => setSelectedModule(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="mb-6">
                {selectedTrainingModule.modules.find(m => m.id === selectedModule)?.videoUrl && (
                  <div className="aspect-video bg-gray-900 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-center">
                      <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">Video Player</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {selectedTrainingModule.modules.find(m => m.id === selectedModule)?.videoUrl}
                      </p>
                    </div>
                  </div>
                )}

                {selectedTrainingModule.modules.find(m => m.id === selectedModule)?.content && (
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300">
                      {selectedTrainingModule.modules.find(m => m.id === selectedModule)?.content}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setSelectedModule(null)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    if (currentTrainingModule && selectedModule) {
                      completeModule(currentTrainingModule, selectedModule);
                    }
                    setSelectedModule(null);
                  }}
                  className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors"
                >
                  Mark as Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}