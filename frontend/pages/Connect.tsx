import React, { useState, useCallback, useMemo } from 'react';
import {
  EnhancedCard,
  EnhancedCardContent,
  EnhancedCardHeader,
  EnhancedCardTitle,
  EnhancedCardDescription
} from '../components/ui/enhanced-card';
import {
  EnhancedButton,
  RealTimeCounter,
  RealTimeBadge,
  FloatingActionButton
} from '../components/ui/enhanced-button';
import { useRealTime } from '../components/RealTimeProvider';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import {
  Users,
  Heart,
  Calendar,
  MessageCircle,
  Globe,
  Command,
  Flame,
  Wifi,
  WifiOff,
  UserPlus,
  Search,
  Filter,
  MapPin,
  Clock,
  ArrowRight,
  Send,
  Bell,
  Star,
  Crown,
  Zap,
  Church,
  Handshake,
  Target,
  Award
} from 'lucide-react';

const Connect: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'groups' | 'events' | 'prayer'>('feed');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [prayerRequest, setPrayerRequest] = useState('');
  const { data: realTimeData, isConnected } = useRealTime();

  // Memoized data to prevent unnecessary re-renders
  const communityStats = useMemo(() => ({
    totalMembers: 12847,
    activeGroups: 234,
    eventsThisMonth: 89,
    prayerRequests: 456,
    newMembersToday: 23
  }), []);

  const activityFeed = useMemo(() => [
    {
      id: '1',
      user: 'Sarah Johnson',
      action: 'joined the Healing Ministry group',
      timestamp: '2 minutes ago',
      type: 'group_join'
    },
    {
      id: '2',
      user: 'Pastor David',
      action: 'created a new prayer request',
      timestamp: '15 minutes ago',
      type: 'prayer'
    },
    {
      id: '3',
      user: 'Grace Chen',
      action: 'registered for Supernatural Healing Conference',
      timestamp: '1 hour ago',
      type: 'event'
    },
    {
      id: '4',
      user: 'Michael Rodriguez',
      action: 'shared a testimony in Deliverance Warriors',
      timestamp: '2 hours ago',
      type: 'testimony'
    }
  ], []);

  const ministryGroups = useMemo(() => [
    {
      id: 'healing',
      name: 'Healing Ministry',
      description: 'Pray for the sick and witness miraculous healings',
      members: 1250,
      category: 'ministry',
      icon: Heart,
      color: 'green'
    },
    {
      id: 'deliverance',
      name: 'Deliverance Warriors',
      description: 'Spiritual warfare and setting captives free',
      members: 890,
      category: 'ministry',
      icon: Zap,
      color: 'purple'
    },
    {
      id: 'prophecy',
      name: 'Prophetic Voices',
      description: 'Develop your prophetic gift and hear God\'s voice',
      members: 756,
      category: 'ministry',
      icon: Star,
      color: 'yellow'
    },
    {
      id: 'youth',
      name: 'Youth Ministry',
      description: 'Reach the next generation for Christ',
      members: 432,
      category: 'outreach',
      icon: Users,
      color: 'blue'
    }
  ], []);

  const upcomingEvents = useMemo(() => [
    {
      id: '1',
      title: 'Supernatural Healing Conference',
      date: 'Dec 15, 2024',
      location: 'Orlando, FL',
      attendees: 234,
      capacity: 500,
      type: 'conference'
    },
    {
      id: '2',
      title: 'Prophetic Training Workshop',
      date: 'Jan 20, 2025',
      location: 'Online',
      attendees: 89,
      capacity: 200,
      type: 'workshop'
    },
    {
      id: '3',
      title: 'Kingdom Authority Summit',
      date: 'Feb 10, 2025',
      location: 'Dallas, TX',
      attendees: 156,
      capacity: 300,
      type: 'summit'
    }
  ], []);

  const prayerRequests = useMemo(() => [
    {
      id: '1',
      name: 'Anonymous',
      location: 'Florida',
      request: 'Please pray for my mother who is in the hospital. She needs a miracle healing from cancer.',
      timestamp: '3 hours ago',
      prayerCount: 47
    },
    {
      id: '2',
      name: 'John D.',
      location: 'California',
      request: 'Seeking prayer for breakthrough in my marriage. We need restoration and healing.',
      timestamp: '6 hours ago',
      prayerCount: 32
    },
    {
      id: '3',
      name: 'Mary L.',
      location: 'Texas',
      request: 'Please pray for my son who is struggling with addiction. We need deliverance and freedom.',
      timestamp: '12 hours ago',
      prayerCount: 89
    }
  ], []);

  // Optimized filtered data
  const filteredActivityFeed = useMemo(() => {
    if (!searchTerm) return activityFeed;
    return activityFeed.filter(item =>
      item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.action.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [activityFeed, searchTerm]);

  const filteredGroups = useMemo(() => {
    if (selectedCategory === 'all') return ministryGroups;
    return ministryGroups.filter(group => group.category === selectedCategory);
  }, [ministryGroups, selectedCategory]);

  // Optimized event handlers
  const handleTabChange = useCallback((tabId: 'feed' | 'groups' | 'events' | 'prayer') => {
    setActiveTab(tabId);
  }, []);

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handlePrayerSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    alert('Prayer request submitted! 🙏');
    setPrayerRequest('');
  }, []);

  const handleGroupJoin = useCallback((groupId: string) => {
    alert(`Joined ${ministryGroups.find(g => g.id === groupId)?.name} group! 🙌`);
  }, [ministryGroups]);

  const handleEventRegister = useCallback((eventId: string) => {
    alert(`Registered for ${upcomingEvents.find(e => e.id === eventId)?.title}! 📅`);
  }, [upcomingEvents]);

  const handlePrayForRequest = useCallback((requestId: string) => {
    alert('Prayer sent! 🙏✨');
  }, []);

  const handleChatClick = useCallback(() => {
    alert('Community chat coming soon! 💬');
  }, []);

  const handleDiscussionClick = useCallback(() => {
    alert('New discussion started! 🗣️');
  }, []);

  // Dynamic search placeholder based on active tab
  const searchPlaceholder = useMemo(() => {
    switch (activeTab) {
      case 'feed': return 'Search activities...';
      case 'groups': return 'Search ministry groups...';
      case 'events': return 'Search events...';
      case 'prayer': return 'Search prayer requests...';
      default: return 'Search...';
    }
  }, [activeTab]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Connection Status Indicator */}
      <div className="fixed top-4 right-4 z-50">
        <RealTimeBadge
          count={isConnected ? communityStats.newMembersToday : 0}
          label={isConnected ? "ONLINE" : "OFFLINE"}
          variant={isConnected ? "green" : "pink"}
          animate={true}
          className="backdrop-blur-sm"
        />
      </div>

      <div className="text-center mb-10 sm:mb-12">
        {/* Logo */}
        <div className="flex items-center justify-center gap-6 mb-12">
          <div className="w-32 h-32 bg-white rounded-none flex items-center justify-center">
            <Globe className="w-16 h-16 text-black" />
          </div>
        </div>

        {/* Main Title - Using CHURCH PARTNERSHIPS font style */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 tracking-tight leading-none heading-font">
          COMMAND<span className="block text-white">
          COMMUNITY
          </span>
        </h1>

        {/* Status Badge */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Badge className="bg-white text-black px-6 py-3 text-lg font-bold">
            <Heart className="w-5 h-5 mr-2" />
            UNITE • GROW • TRANSFORM
          </Badge>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            {isConnected ? (
              <Wifi className="w-4 h-4 text-green-400" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-400" />
            )}
            <span>{isConnected ? 'LIVE COMMUNITY' : 'CONNECTING...'}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xl sm:text-2xl text-gray-400 mb-16 max-w-4xl mx-auto leading-relaxed">
          Join our Command Church community of believers. Connect with <span className="text-white font-semibold">Kingdom warriors</span>, participate in ministry groups, attend events, and share prayer requests in real-time.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
          <div className="text-center">
            <RealTimeCounter
              value={communityStats.totalMembers}
              label="Total Members"
              className="text-3xl font-black text-blue-400"
            />
          </div>
          <div className="text-center">
            <RealTimeCounter
              value={communityStats.activeGroups}
              label="Active Groups"
              className="text-3xl font-black text-green-400"
            />
          </div>
          <div className="text-center">
            <RealTimeCounter
              value={communityStats.eventsThisMonth}
              label="Events This Month"
              className="text-3xl font-black text-purple-400"
            />
          </div>
          <div className="text-center">
            <RealTimeCounter
              value={communityStats.prayerRequests}
              label="Prayer Requests"
              className="text-3xl font-black text-pink-400"
            />
          </div>
        </div>

      {/* Section Navigation */}
      <div className="mb-12 sm:mb-16">
        <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8 mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { id: 'feed', label: 'Activity Feed', icon: Bell },
              { id: 'groups', label: 'Ministry Groups', icon: Users },
              { id: 'events', label: 'Events', icon: Calendar },
              { id: 'prayer', label: 'Prayer Wall', icon: Heart }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-none border ${
                    activeTab === tab.id
                      ? 'bg-white text-black border-white'
                      : 'bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="font-semibold">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:ring-black"
            />
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'feed' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-center animate-supernatural-fade-in">
              Live <span className="bg-supernatural-gradient bg-clip-text text-transparent">Activity Feed</span>
            </h2>
            <div className="grid gap-6 max-w-4xl mx-auto">
              {filteredActivityFeed.map((activity, index) => (
                <EnhancedCard
                  key={activity.id}
                  variant="animated"
                  className="group hover:scale-105 transition-all duration-300 animate-supernatural-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <EnhancedCardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-supernatural-gradient rounded-full flex items-center justify-center">
                        <Bell className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-white">{activity.user}</span>
                          <Badge className="bg-supernatural-accent/20 text-supernatural-accent text-xs">
                            {activity.type.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-gray-300 mb-2">{activity.action}</p>
                        <p className="text-gray-400 text-sm">{activity.timestamp}</p>
                      </div>
                    </div>
                  </EnhancedCardContent>
                </EnhancedCard>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'groups' && (
          <div className="space-y-8">
            <div className="flex justify-center gap-4 mb-8">
              {['all', 'ministry', 'outreach'].map((category) => (
                <EnhancedButton
                  key={category}
                  variant={selectedCategory === category ? "supernatural" : "outline"}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category === 'all' ? 'All Groups' : category.charAt(0).toUpperCase() + category.slice(1)}
                </EnhancedButton>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {filteredGroups.map((group, index) => {
                const IconComponent = group.icon;
                return (
                  <EnhancedCard
                    key={group.id}
                    variant="animated"
                    className="group hover:scale-105 transition-all duration-300 animate-supernatural-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <EnhancedCardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white`}
                             style={{ backgroundColor: `var(--${group.color}-500)` }}>
                          <IconComponent className="w-8 h-8" />
                        </div>
                        <div>
                          <EnhancedCardTitle className="text-xl mb-2">{group.name}</EnhancedCardTitle>
                          <EnhancedCardDescription>{group.description}</EnhancedCardDescription>
                        </div>
                      </div>
                    </EnhancedCardHeader>
                    <EnhancedCardContent>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-400">{group.members.toLocaleString()} members</span>
                        <Badge className="bg-supernatural-accent/20 text-supernatural-accent">
                          {group.category}
                        </Badge>
                      </div>
                      <EnhancedButton
                        variant="supernatural"
                        className="w-full"
                        onClick={() => handleGroupJoin(group.id)}
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Join Group
                      </EnhancedButton>
                    </EnhancedCardContent>
                  </EnhancedCard>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-center animate-supernatural-fade-in">
              Upcoming <span className="bg-supernatural-gradient bg-clip-text text-transparent">Events</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
                <EnhancedCard
                  key={event.id}
                  variant="animated"
                  className="group hover:scale-105 transition-all duration-300 animate-supernatural-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <EnhancedCardHeader>
                    <EnhancedCardTitle className="text-lg mb-2">{event.title}</EnhancedCardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    </div>
                  </EnhancedCardHeader>
                  <EnhancedCardContent>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400 text-sm">Registration Progress</span>
                        <span className="text-white font-bold">{Math.round((event.attendees / event.capacity) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-supernatural-gradient h-3 rounded-full animate-supernatural-shimmer"
                          style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center mt-2 text-sm">
                        <span className="text-green-400">{event.attendees} registered</span>
                        <span className="text-gray-400">{event.capacity} capacity</span>
                      </div>
                    </div>
                    <EnhancedButton
                      variant="supernatural"
                      className="w-full"
                      onClick={() => handleEventRegister(event.id)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Register Now
                    </EnhancedButton>
                  </EnhancedCardContent>
                </EnhancedCard>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'prayer' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black">Prayer Wall</h2>
              <EnhancedButton variant="supernatural">
                <Send className="w-4 h-4 mr-2" />
                Share Request
              </EnhancedButton>
            </div>

            {/* Prayer Request Form */}
            <EnhancedCard variant="gradient">
              <EnhancedCardHeader>
                <EnhancedCardTitle>Share Your Prayer Request</EnhancedCardTitle>
                <EnhancedCardDescription>Let our community lift you up in prayer</EnhancedCardDescription>
              </EnhancedCardHeader>
              <EnhancedCardContent>
                <form onSubmit={handlePrayerSubmit} className="space-y-4">
                  <Textarea
                    placeholder="Share your prayer request..."
                    value={prayerRequest}
                    onChange={(e) => setPrayerRequest(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    rows={4}
                    required
                  />
                  <div className="flex gap-4">
                    <Input
                      type="text"
                      placeholder="Your name (optional)"
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    />
                    <Input
                      type="text"
                      placeholder="Location (optional)"
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    />
                  </div>
                  <EnhancedButton variant="supernatural" type="submit">
                    <Heart className="w-4 h-4 mr-2" />
                    Submit Prayer Request
                  </EnhancedButton>
                </form>
              </EnhancedCardContent>
            </EnhancedCard>

            {/* Prayer Requests */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {prayerRequests.map((prayer, index) => (
                <EnhancedCard
                  key={prayer.id}
                  variant="animated"
                  className="group hover:scale-105 transition-all duration-300 animate-supernatural-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <EnhancedCardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-red-400" />
                        <span className="font-semibold text-white">{prayer.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">{prayer.location}</div>
                      </div>
                    </div>
                    <p className="text-gray-300 italic">"{prayer.request}"</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-gray-400 text-sm">{prayer.timestamp}</div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-400" />
                        <span className="text-red-400 text-sm">{prayer.prayerCount}</span>
                      </div>
                    </div>
                  </EnhancedCardHeader>
                  <EnhancedCardContent>
                    <EnhancedButton variant="glow" className="w-full">
                      <Heart className="w-4 h-4 mr-2" />
                      Pray for This
                    </EnhancedButton>
                  </EnhancedCardContent>
                </EnhancedCard>
              ))}
            </div>
          </div>
        )}
      </div>

      <FloatingActionButton
        icon={<MessageCircle className="w-6 h-6" />}
        label="Community Chat"
        onClick={handleChatClick}
        variant="primary"
        position="bottom-right"
        animate={true}
      />
    </div>
    </div>
  );
};

export default Connect;
