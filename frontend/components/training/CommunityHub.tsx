import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import {
  Users,
  MessageCircle,
  Heart,
  Share2,
  Send,
  Plus,
  Search,
  Filter,
  User,
  Clock,
  TrendingUp,
  BookOpen,
  Award,
  ThumbsUp,
  Reply,
  MoreVertical,
  Flag,
  Star,
  CheckCircle,
  X
} from 'lucide-react';

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar?: string;
  createdAt: string;
  updatedAt: string;
  courseId?: string;
  moduleId?: string;
  tags: string[];
  likes: number;
  replies: number;
  isLiked: boolean;
  isSticky: boolean;
}

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  courseId: string;
  members: number;
  maxMembers: number;
  createdBy: string;
  createdAt: string;
  isPrivate: boolean;
  meetingTime?: string;
  goals: string[];
}

interface CommunityPost {
  id: string;
  type: 'discussion' | 'achievement' | 'question' | 'resource';
  title: string;
  content: string;
  author: string;
  authorAvatar?: string;
  createdAt: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  tags: string[];
  attachments?: any[];
}

export default function CommunityHub() {
  const { user } = useUser();

  const [activeTab, setActiveTab] = useState('feed');
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    type: 'discussion' as const,
    tags: [] as string[]
  });
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    courseId: '',
    maxMembers: 10,
    isPrivate: false,
    meetingTime: '',
    goals: [] as string[]
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Load mock data
  useEffect(() => {
    const mockDiscussions: Discussion[] = [
      {
        id: '1',
        title: 'Understanding Prayer Foundations - Need Help!',
        content: 'I\'m struggling with the concept of praying in the Spirit. Can anyone explain this better?',
        author: 'Sarah Johnson',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
        courseId: '1',
        moduleId: '1-2',
        tags: ['prayer', 'Beginner', 'help'],
        likes: 12,
        replies: 8,
        isLiked: false,
        isSticky: false
      },
      {
        id: '2',
        title: 'Bible Study Methods That Work',
        content: 'Here are some effective Bible study methods I\'ve found helpful...',
        author: 'Michael Chen',
        createdAt: '2024-01-14T15:20:00Z',
        updatedAt: '2024-01-14T15:20:00Z',
        courseId: '1',
        moduleId: '1-3',
        tags: ['bible-study', 'methods', 'tips'],
        likes: 24,
        replies: 15,
        isLiked: true,
        isSticky: true
      }
    ];

    const mockStudyGroups: StudyGroup[] = [
      {
        id: '1',
        name: 'Evangelism Essentials Study Group',
        description: 'Weekly study group for the Evangelism Essentials course. We meet every Tuesday at 7 PM.',
        courseId: '2',
        members: 8,
        maxMembers: 12,
        createdBy: 'Pastor David',
        createdAt: '2024-01-10T09:00:00Z',
        isPrivate: false,
        meetingTime: '2024-01-16T19:00:00Z',
        goals: ['Complete course together', 'Practice evangelism skills', 'Share testimonies']
      },
      {
        id: '2',
        name: 'Prayer Warriors Circle',
        description: 'A dedicated group for deepening our prayer life and supporting each other spiritually.',
        courseId: '1',
        members: 15,
        maxMembers: 20,
        createdBy: 'Sister Grace',
        createdAt: '2024-01-12T14:30:00Z',
        isPrivate: true,
        meetingTime: '2024-01-17T20:00:00Z',
        goals: ['Develop consistent prayer habits', 'Learn intercessory prayer', 'Build spiritual community']
      }
    ];

    const mockPosts: CommunityPost[] = [
      {
        id: '1',
        type: 'achievement',
        title: 'Completed Evangelism Essentials!',
        content: 'Just finished the Evangelism Essentials course and earned 2 points! The course was incredibly helpful and I feel equipped to share the Gospel more effectively.',
        author: 'John Smith',
        createdAt: '2024-01-15T08:45:00Z',
        likes: 18,
        comments: 5,
        shares: 3,
        isLiked: false,
        tags: ['achievement', 'evangelism', 'course-completion']
      },
      {
        id: '2',
        type: 'question',
        title: 'Recommended Resources for Ministry Training',
        content: 'I\'m looking for additional resources to supplement my ministry training. Any recommendations for books, podcasts, or online courses?',
        author: 'Lisa Thompson',
        createdAt: '2024-01-14T16:20:00Z',
        likes: 7,
        comments: 12,
        shares: 2,
        isLiked: true,
        tags: ['resources', 'ministry', 'recommendations']
      }
    ];

    setDiscussions(mockDiscussions);
    setStudyGroups(mockStudyGroups);
    setPosts(mockPosts);
  }, []);

  const createPost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const post: CommunityPost = {
      id: Date.now().toString(),
      type: newPost.type,
      title: newPost.title,
      content: newPost.content,
      author: user?.firstName + ' ' + user?.lastName || 'Anonymous',
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      tags: newPost.tags
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', type: 'discussion', tags: [] });
    setShowNewPostModal(false);
  };

  const createStudyGroup = () => {
    if (!newGroup.name.trim() || !newGroup.description.trim()) return;

    const group: StudyGroup = {
      id: Date.now().toString(),
      name: newGroup.name,
      description: newGroup.description,
      courseId: newGroup.courseId,
      members: 1,
      maxMembers: newGroup.maxMembers,
      createdBy: user?.firstName + ' ' + user?.lastName || 'Anonymous',
      createdAt: new Date().toISOString(),
      isPrivate: newGroup.isPrivate,
      meetingTime: newGroup.meetingTime,
      goals: newGroup.goals
    };

    setStudyGroups([group, ...studyGroups]);
    setNewGroup({
      name: '',
      description: '',
      courseId: '',
      maxMembers: 10,
      isPrivate: false,
      meetingTime: '',
      goals: []
    });
    setShowNewGroupModal(false);
  };

  const likePost = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const likeDiscussion = (discussionId: string) => {
    setDiscussions(discussions.map(discussion =>
      discussion.id === discussionId
        ? {
            ...discussion,
            isLiked: !discussion.isLiked,
            likes: discussion.isLiked ? discussion.likes - 1 : discussion.likes + 1
          }
        : discussion
    ));
  };

  const joinStudyGroup = (groupId: string) => {
    setStudyGroups(studyGroups.map(group =>
      group.id === groupId && group.members < group.maxMembers
        ? { ...group, members: group.members + 1 }
        : group
    ));
  };

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // Get all unique tags
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Community Hub</h1>
          <p className="text-gray-400">Connect, learn, and grow together with fellow students</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNewPostModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-semibold flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Post
          </button>
          <button
            onClick={() => setShowNewGroupModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 font-semibold flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Create Group
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700">
        {[
          { id: 'feed', label: 'Community Feed', icon: MessageCircle },
          { id: 'discussions', label: 'Discussions', icon: Users },
          { id: 'groups', label: 'Study Groups', icon: Users },
          { id: 'leaderboard', label: 'Leaderboard', icon: Award }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Community Feed */}
      {activeTab === 'feed' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white px-10 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white px-4 py-2 focus:border-blue-500 focus:outline-none"
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>

          {/* Posts */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No posts yet</h3>
              <p className="text-gray-500 mb-4">Be the first to share something with the community</p>
              <button
                onClick={() => setShowNewPostModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold"
              >
                Create First Post
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredPosts.map(post => (
                <div key={post.id} className="bg-gray-800/50 border border-gray-700 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-blue-500/20 border border-blue-500/40 flex items-center justify-center rounded-full">
                        <User className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{post.author}</h3>
                        <p className="text-gray-400 text-sm">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {post.type === 'achievement' && (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 border border-green-500/30 text-xs">
                          Achievement
                        </span>
                      )}
                      {post.type === 'question' && (
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs">
                          Question
                        </span>
                      )}
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-white mb-2">{post.title}</h4>
                  <p className="text-gray-300 mb-4">{post.content}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => likePost(post.id)}
                        className={`flex items-center gap-2 ${
                          post.isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                        {post.likes}
                      </button>

                      <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                        <MessageCircle className="h-4 w-4" />
                        {post.comments}
                      </button>

                      <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                        <Share2 className="h-4 w-4" />
                        {post.shares}
                      </button>
                    </div>

                    <button className="text-gray-400 hover:text-white">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Discussions Tab */}
      {activeTab === 'discussions' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Course Discussions</h2>
            <button
              onClick={() => setShowNewPostModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-semibold flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Start Discussion
            </button>
          </div>

          {discussions.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No discussions yet</h3>
              <p className="text-gray-500">Start the first discussion about your courses</p>
            </div>
          ) : (
            <div className="space-y-4">
              {discussions.map(discussion => (
                <div key={discussion.id} className="bg-gray-800/50 border border-gray-700 p-6">
                  {discussion.isSticky && (
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-yellow-400 text-sm font-semibold">Sticky Post</span>
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-blue-500/20 border border-blue-500/40 flex items-center justify-center rounded-full">
                        <User className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{discussion.author}</h3>
                        <p className="text-gray-400 text-sm">
                          {new Date(discussion.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {discussion.courseId && (
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs">
                          Course Discussion
                        </span>
                      )}
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-white mb-2">{discussion.title}</h4>
                  <p className="text-gray-300 mb-4 line-clamp-2">{discussion.content}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {discussion.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => likeDiscussion(discussion.id)}
                        className={`flex items-center gap-2 ${
                          discussion.isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                        }`}
                      >
                        <ThumbsUp className={`h-4 w-4 ${discussion.isLiked ? 'fill-current' : ''}`} />
                        {discussion.likes}
                      </button>

                      <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                        <Reply className="h-4 w-4" />
                        {discussion.replies}
                      </button>
                    </div>

                    <button className="text-gray-400 hover:text-white">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Study Groups Tab */}
      {activeTab === 'groups' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Study Groups</h2>
            <button
              onClick={() => setShowNewGroupModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 font-semibold flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Group
            </button>
          </div>

          {studyGroups.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No study groups yet</h3>
              <p className="text-gray-500 mb-4">Create the first study group for your course</p>
              <button
                onClick={() => setShowNewGroupModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-semibold"
              >
                Create First Group
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studyGroups.map(group => (
                <div key={group.id} className="bg-gray-800/50 border border-gray-700 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{group.name}</h3>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{group.description}</p>

                      <div className="flex items-center gap-4 text-sm mb-3">
                        <span className="text-gray-400">
                          {group.members}/{group.maxMembers} members
                        </span>
                        {group.isPrivate && (
                          <span className="px-2 py-1 bg-red-500/20 text-red-400 border border-red-500/30 text-xs">
                            Private
                          </span>
                        )}
                      </div>

                      {group.meetingTime && (
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                          <Clock className="h-4 w-4" />
                          <span>Next meeting: {new Date(group.meetingTime).toLocaleString()}</span>
                        </div>
                      )}

                      <div className="space-y-1">
                        <h4 className="text-white font-semibold text-sm">Group Goals:</h4>
                        {group.goals.slice(0, 2).map((goal, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                            <CheckCircle className="h-3 w-3" />
                            <span>{goal}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => joinStudyGroup(group.id)}
                    disabled={group.members >= group.maxMembers}
                    className={`w-full py-2 px-4 font-semibold ${
                      group.members >= group.maxMembers
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {group.members >= group.maxMembers ? 'Group Full' : 'Join Group'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white">Community Leaderboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Top Contributors */}
            <div className="bg-gray-800/50 border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Top Contributors
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Sarah Johnson', posts: 45, rank: 1 },
                  { name: 'Michael Chen', posts: 38, rank: 2 },
                  { name: 'Lisa Thompson', posts: 32, rank: 3 }
                ].map(user => (
                  <div key={user.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        user.rank === 1 ? 'bg-yellow-500 text-black' :
                        user.rank === 2 ? 'bg-gray-400 text-black' :
                        'bg-orange-600 text-white'
                      }`}>
                        {user.rank}
                      </span>
                      <span className="text-white">{user.name}</span>
                    </div>
                    <span className="text-gray-400">{user.posts} posts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Streaks */}
            <div className="bg-gray-800/50 border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Award className="h-5 w-5" />
                Study Streaks
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'David Wilson', streak: 28 },
                  { name: 'Emma Davis', streak: 21 },
                  { name: 'James Brown', streak: 19 }
                ].map(user => (
                  <div key={user.name} className="flex items-center justify-between">
                    <span className="text-white">{user.name}</span>
                    <span className="text-orange-400 font-semibold">{user.streak} days</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Completions */}
            <div className="bg-gray-800/50 border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Course Masters
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Rachel Green', completions: 8 },
                  { name: 'Tom Anderson', completions: 7 },
                  { name: 'Maria Garcia', completions: 6 }
                ].map(user => (
                  <div key={user.name} className="flex items-center justify-between">
                    <span className="text-white">{user.name}</span>
                    <span className="text-green-400 font-semibold">{user.completions} courses</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Create New Post</h2>
              <button
                onClick={() => setShowNewPostModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">Post Type</label>
                <select
                  value={newPost.type}
                  onChange={(e) => setNewPost({ ...newPost, type: e.target.value as any })}
                  className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-3 focus:border-blue-500 focus:outline-none"
                >
                  <option value="discussion">Discussion</option>
                  <option value="question">Question</option>
                  <option value="achievement">Achievement</option>
                  <option value="resource">Resource Share</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-3 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter post title..."
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Content</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-3 h-32 resize-none focus:border-blue-500 focus:outline-none"
                  placeholder="Share your thoughts..."
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {newPost.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-2"
                    >
                      {tag}
                      <button
                        onClick={() => setNewPost({
                          ...newPost,
                          tags: newPost.tags.filter(t => t !== tag)
                        })}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add tag and press Enter..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      const newTag = e.currentTarget.value.trim();
                      if (!newPost.tags.includes(newTag)) {
                        setNewPost({
                          ...newPost,
                          tags: [...newPost.tags, newTag]
                        });
                      }
                      e.currentTarget.value = '';
                    }
                  }}
                  className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowNewPostModal(false)}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={createPost}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Create Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Study Group Modal */}
      {showNewGroupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Create Study Group</h2>
              <button
                onClick={() => setShowNewGroupModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">Group Name</label>
                <input
                  type="text"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-3 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter group name..."
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Description</label>
                <textarea
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-3 h-24 resize-none focus:border-blue-500 focus:outline-none"
                  placeholder="Describe your study group..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">Course</label>
                  <select
                    value={newGroup.courseId}
                    onChange={(e) => setNewGroup({ ...newGroup, courseId: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-3 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select a course</option>
                    <option value="1">New Life in Jesus: Foundations</option>
                    <option value="2">Evangelism Essentials</option>
                    <option value="3">Advanced Ministry Training</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Max Members</label>
                  <input
                    type="number"
                    min="2"
                    max="50"
                    value={newGroup.maxMembers}
                    onChange={(e) => setNewGroup({ ...newGroup, maxMembers: parseInt(e.target.value) || 10 })}
                    className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-3 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Meeting Time (Optional)</label>
                <input
                  type="datetime-local"
                  value={newGroup.meetingTime}
                  onChange={(e) => setNewGroup({ ...newGroup, meetingTime: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-3 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={newGroup.isPrivate}
                    onChange={(e) => setNewGroup({ ...newGroup, isPrivate: e.target.checked })}
                    className="text-blue-600 bg-gray-700 border-gray-600"
                  />
                  <span className="text-white font-semibold">Private Group</span>
                </label>
                <p className="text-gray-400 text-sm">Private groups require invitation to join</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowNewGroupModal(false)}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={createStudyGroup}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold"
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
