import React, { useState, useEffect } from 'react';
import { Trophy, Star, Crown, Shield, Users, BookOpen, Heart, Target } from 'lucide-react';
import client from '../../client';

interface SpiritualRank {
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  requirements: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  category: string;
  points: number;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  unlockedAt?: string;
}

interface UserAchievements {
  currentRank: string;
  spiritualScore: number;
  totalAchievements: number;
  achievements: Achievement[];
  recentEvents: any[];
}

const SPIRITUAL_RANKS: Record<string, SpiritualRank> = {
  BELIEVER: {
    name: 'Believer',
    icon: <Heart className="h-6 w-6" />,
    color: 'text-blue-500',
    description: 'Basic spiritual foundation',
    requirements: 'Accept Christ as Savior'
  },
  DISCIPLE: {
    name: 'Disciple',
    icon: <BookOpen className="h-6 w-6" />,
    color: 'text-green-500',
    description: 'Bible study completion',
    requirements: 'Complete discipleship training'
  },
  MINISTER: {
    name: 'Minister',
    icon: <Users className="h-6 w-6" />,
    color: 'text-yellow-500',
    description: 'Prayer ministry leadership',
    requirements: 'Lead prayer sessions and ministry'
  },
  EVANGELIST: {
    name: 'Evangelist',
    icon: <Target className="h-6 w-6" />,
    color: 'text-orange-500',
    description: 'Soul-winning impact',
    requirements: 'Lead people to Christ'
  },
  PASTOR: {
    name: 'Pastor',
    icon: <Shield className="h-6 w-6" />,
    color: 'text-purple-500',
    description: 'Church planting leadership',
    requirements: 'Plant and lead churches'
  },
  APOSTLE: {
    name: 'Apostle',
    icon: <Crown className="h-6 w-6" />,
    color: 'text-red-500',
    description: 'Leadership multiplication',
    requirements: 'Train and multiply leaders'
  },
  CARDINAL: {
    name: 'Cardinal',
    icon: <Star className="h-6 w-6" />,
    color: 'text-pink-500',
    description: 'Supreme spiritual authority',
    requirements: 'Kingdom advancement excellence'
  }
};

export default function SpiritualAchievements() {
  const [userAchievements, setUserAchievements] = useState<UserAchievements | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadUserAchievements();
  }, []);

  const loadUserAchievements = async () => {
    try {
      setLoading(true);
      // This would call the actual API endpoint
      // const response = await client.church.getUserAchievements();
      // For now, using mock data
      const mockData: UserAchievements = {
        currentRank: 'MINISTER',
        spiritualScore: 1250,
        totalAchievements: 8,
        achievements: [
          {
            id: 'prayer_warrior_bronze',
            name: 'Prayer Warrior Bronze',
            description: 'Lead 10 prayer sessions',
            category: 'PRAYER',
            points: 100,
            unlocked: true,
            progress: 10,
            maxProgress: 10,
            unlockedAt: '2024-01-15T10:30:00Z'
          },
          {
            id: 'bible_scholar',
            name: 'Bible Scholar',
            description: 'Complete comprehensive Bible study',
            category: 'BIBLE_STUDY',
            points: 150,
            unlocked: true,
            progress: 1,
            maxProgress: 1,
            unlockedAt: '2024-02-01T14:20:00Z'
          },
          {
            id: 'soul_winner',
            name: 'Soul Winner',
            description: 'Lead 5 people to Christ',
            category: 'EVANGELISM',
            points: 500,
            unlocked: false,
            progress: 3,
            maxProgress: 5
          }
        ],
        recentEvents: []
      };
      setUserAchievements(mockData);
    } catch (error) {
      console.error('Failed to load achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentRank = userAchievements ? SPIRITUAL_RANKS[userAchievements.currentRank] : null;

  const filteredAchievements = userAchievements?.achievements.filter(achievement =>
    selectedCategory === 'all' || achievement.category === selectedCategory
  ) || [];

  if (loading) {
    return (
      <div className="bg-gray-800/50 border border-gray-700 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-32 bg-gray-700 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="h-8 w-8 text-yellow-500" />
        <div>
          <h2 className="text-2xl font-bold text-white">Spiritual Achievements</h2>
          <p className="text-gray-400">Track your spiritual growth and ministry impact</p>
        </div>
      </div>

      {/* Current Rank Display */}
      {currentRank && (
        <div className="bg-gradient-to-r from-gray-700 to-gray-600 p-6 rounded-lg mb-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 bg-gray-800 rounded-full ${currentRank.color}`}>
              {currentRank.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{currentRank.name}</h3>
              <p className="text-gray-300">{currentRank.description}</p>
              <p className="text-sm text-gray-400 mt-1">{currentRank.requirements}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-300 mb-1">
              <span>Spiritual Score</span>
              <span>{userAchievements?.spiritualScore || 0} points</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((userAchievements?.spiritualScore || 0) / 100 * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: 'all', label: 'All Achievements' },
          { key: 'PRAYER', label: 'Prayer Ministry' },
          { key: 'BIBLE_STUDY', label: 'Bible Study' },
          { key: 'EVANGELISM', label: 'Evangelism' },
          { key: 'SUPERNATURAL', label: 'Supernatural' },
          { key: 'DISCIPLESHIP', label: 'Discipleship' }
        ].map(category => (
          <button
            key={category.key}
            onClick={() => setSelectedCategory(category.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map(achievement => (
          <div
            key={achievement.id}
            className={`p-4 rounded-lg border transition-all ${
              achievement.unlocked
                ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30'
                : 'bg-gray-700/50 border-gray-600'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg ${
                achievement.unlocked ? 'bg-yellow-500/20' : 'bg-gray-600'
              }`}>
                <Trophy className={`h-5 w-5 ${
                  achievement.unlocked ? 'text-yellow-500' : 'text-gray-400'
                }`} />
              </div>
              {achievement.unlocked && (
                <div className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                  Unlocked
                </div>
              )}
            </div>

            <h4 className="font-semibold text-white mb-1">{achievement.name}</h4>
            <p className="text-sm text-gray-400 mb-3">{achievement.description}</p>

            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>Progress</span>
              <span>{achievement.progress}/{achievement.maxProgress}</span>
            </div>

            <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  achievement.unlocked ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gray-500'
                }`}
                style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">{achievement.points} points</span>
              {achievement.unlockedAt && (
                <span className="text-gray-500">
                  {new Date(achievement.unlockedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-700/50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-400">{userAchievements?.totalAchievements || 0}</div>
          <div className="text-sm text-gray-400">Total Achievements</div>
        </div>
        <div className="bg-gray-700/50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-400">{userAchievements?.spiritualScore || 0}</div>
          <div className="text-sm text-gray-400">Spiritual Score</div>
        </div>
        <div className="bg-gray-700/50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-400">
            {filteredAchievements.filter(a => a.unlocked).length}
          </div>
          <div className="text-sm text-gray-400">Unlocked</div>
        </div>
        <div className="bg-gray-700/50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-400">
            {filteredAchievements.filter(a => !a.unlocked).length}
          </div>
          <div className="text-sm text-gray-400">In Progress</div>
        </div>
      </div>
    </div>
  );
}