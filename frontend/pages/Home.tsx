import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ArrowRight, Play, Users, GraduationCap, Info, Heart, Calendar, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import ChurchPartnershipCTA from '../components/ChurchPartnershipCTA';

const ministryTiles = [
  {
    title: 'Supernatural Institute of Ministry',
    description: 'Complete ministry training courses for supernatural believers equipped for Kingdom advancement.',
    icon: GraduationCap,
    href: '/academy'
  },
  {
    title: 'Church Partnership Network',
    description: 'Join our global network of supernatural churches advancing the Kingdom through apostolic partnership.',
    icon: Users,
    href: '/find-church'
  },
  {
    title: 'Kingdom Funding & Support',
    description: 'Supporting believers and ministries with supernatural provision for Kingdom advancement and impact.',
    icon: Heart,
    href: '/give'
  },
  {
    title: 'Global Soul Outreach',
    description: 'Reaching the lost with supernatural power demonstrations and biblical truth for eternal transformation.',
    icon: Play,
    href: '/soul-outreach'
  }
];

export default function Home() {
  // Mock upcoming events data
  const upcomingEvents = [
    {
      id: '1',
      title: 'Supernatural Prayer Conference',
      description: 'Join us for a powerful time of corporate prayer and supernatural manifestation.',
      eventType: 'conference',
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      locationName: 'Online'
    },
    {
      id: '2',
      title: 'Kingdom Discipleship Training',
      description: 'Advanced training session for those walking in supernatural ministry.',
      eventType: 'service',
      startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      locationName: 'Online'
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <SEO
        title="Global Discipleship, Training and Funding"
        description="Supernatural Institute is a global Christian discipleship, training, and funding platform. Join us to spread the Gospel and build disciples worldwide."
        type="website"
      />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white mb-4 sm:mb-6 heading-font tracking-tight leading-tight">
            TRAIN. EQUIP. TRANSFORM.
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed font-light">
            The World's Premier Supernatural Ministry Training Institute. University-level theological education combined with authentic power demonstration. Where biblical scholarship meets miraculous manifestation - equipping believers to walk in Christ's authority and transform nations through supernatural ministry.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link 
              to="/academy"
              className="w-full sm:w-auto bg-orange-500 text-white hover:bg-orange-600 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold uppercase tracking-wide inline-flex items-center justify-center"
            >
              START TRAINING
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-12 sm:py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6 heading-font tracking-tight">
              Upcoming Events
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
              Join us for worship, conferences, and special gatherings.
            </p>
          </div>
          
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {upcomingEvents.map((event) => (
                <Link key={event.id} to="/church" className="group">
                  <div className="h-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm p-6 sm:p-8">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                      <div className={`border px-2 py-1 ${
                        event.eventType === 'service' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                        event.eventType === 'conference' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                        'bg-green-500/20 text-green-400 border-green-500/30'
                      }`}>
                        {event.eventType.toUpperCase()}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1.5" />
                        <span>{new Date(event.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-2 sm:mb-3 heading-font tracking-wide">
                      {event.title}
                    </h3>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex items-center text-gray-300 text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{event.locationName || 'Online'}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400">No upcoming events scheduled. Please check back soon.</div>
          )}

          <div className="text-center mt-10 sm:mt-12">
            <Link to="/church" className="inline-flex items-center justify-center bg-white text-black hover:bg-gray-100 font-semibold uppercase tracking-wide px-6 py-3 text-sm sm:text-base">
              View All Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-12 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6 heading-font tracking-tight">
              Explore Our Ministry
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
              Discover how you can be part of God's supernatural work through our ministry platforms.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
            {ministryTiles.map((tile) => {
              const Icon = tile.icon;
              return (
                <Link key={tile.title} to={tile.href} className="group">
                  <div className="h-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm p-6 sm:p-8">
                    <div className="flex items-start justify-start mb-4 sm:mb-6">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/10 border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-2 sm:mb-3 heading-font tracking-wide">
                      {tile.title}
                    </h3>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                      {tile.description}
                    </p>
                    
                    <div className="flex items-center text-white group-hover:text-gray-200 transition-colors text-sm sm:text-base">
                      <span className="uppercase tracking-wide font-medium">Learn More</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
