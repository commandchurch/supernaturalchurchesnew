import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ArrowRight, Play, Users, GraduationCap, Info, Heart, Calendar, MapPin, Shield } from 'lucide-react';
import SEO from '../components/SEO';
import ChurchPartnershipCTA from '../components/ChurchPartnershipCTA';

const ministryTiles = [
  {
    title: 'Supernatural Institute of Ministry',
    description: 'Heaven\'s truth revealed through accurate biblical teaching. Equipped with supernatural power for Kingdom advancement.',
    icon: GraduationCap,
    href: '/academy'
  },
  {
    title: 'Church Partnership Network',
    description: 'Join our global network of supernatural churches advancing the Kingdom through apostolic partnership and signs & wonders.',
    icon: Users,
    href: '/find-church'
  },
  {
    title: 'Kingdom Funding & Support',
    description: 'Supporting believers and ministries with supernatural provision for Kingdom advancement and miraculous impact.',
    icon: Heart,
    href: '/give'
  },
  {
    title: 'Global Soul Outreach',
    description: 'Reaching the lost with supernatural power demonstrations and heaven\'s truth for eternal transformation.',
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
      <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-0">
        {/* Enhanced gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/80 to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-purple-500/5 to-blue-500/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />

        {/* Subtle animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white mb-4 sm:mb-6 heading-font tracking-tight leading-tight drop-shadow-2xl">
            TRAIN. EQUIP. TRANSFORM.
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed font-light">
            The World's Premier Supernatural Ministry Training Institute. Heaven's truth revealed through accurate biblical teaching. We believe these signs shall follow those who believe in the name of Jesus - equipping believers to walk in Christ's authority, demonstrate supernatural power, and transform nations through authentic ministry.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/academy"
              className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 font-bold uppercase tracking-wider inline-flex items-center justify-center border border-orange-400/20"
            >
              START TRAINING
              <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6" />
            </Link>
            <Link
              to="/membership"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold uppercase tracking-wide inline-flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
            >
              VIEW MEMBERSHIP PLANS
            </Link>
          </div>

        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 sm:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-black" />

        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 heading-font tracking-tight">
              Upcoming Events
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Join us for powerful worship services, prophetic conferences, and supernatural gatherings that will transform your walk with God.
            </p>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              {upcomingEvents.map((event, index) => {
                const eventColors = [
                  { bg: 'from-blue-500/10 to-cyan-500/10', border: 'border-blue-500/30', badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
                  { bg: 'from-purple-500/10 to-pink-500/10', border: 'border-purple-500/30', badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30' }
                ];
                const colorScheme = eventColors[index % eventColors.length];

                return (
                  <Link key={event.id} to="/church" className="group block">
                    <div className={`relative h-full bg-gradient-to-br ${colorScheme.bg} border ${colorScheme.border} backdrop-blur-sm transition-all duration-500 sm:hover:scale-105 sm:hover:shadow-2xl p-8 sm:p-10 rounded-2xl overflow-hidden`}>
                      {/* Background pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full -translate-y-12 translate-x-12" />
                      </div>

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                          <div className={`border px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full ${colorScheme.badge}`}>
                            {event.eventType}
                          </div>
                          <div className="flex items-center text-gray-300 text-sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span className="font-medium">
                              {new Date(event.startDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 heading-font tracking-wide leading-tight">
                          {event.title}
                        </h3>
                        <p className="text-gray-300 text-base leading-relaxed mb-6 line-clamp-3">
                          {event.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-300">
                            <MapPin className="h-5 w-5 mr-2" />
                            <span className="font-medium">{event.locationName || 'Online'}</span>
                          </div>
                          <div className="flex items-center text-white sm:group-hover:text-gray-200 transition-colors">
                            <span className="uppercase tracking-wider font-semibold text-sm mr-2">Join Event</span>
                            <ArrowRight className="h-5 w-5 sm:group-hover:translate-x-2 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-gray-800/30 border border-gray-600/30 rounded-2xl p-12 backdrop-blur-sm">
                <Calendar className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No Upcoming Events</h3>
                <p className="text-gray-400">Check back soon for our next supernatural gathering!</p>
              </div>
            </div>
          )}

          <div className="text-center mt-16">
            <Link
              to="/church"
              className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold uppercase tracking-wide px-8 py-4 text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              View All Events
              <ArrowRight className="ml-3 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />

        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 heading-font tracking-tight">
              Explore Our Ministry
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Discover how you can be part of God's supernatural work through our comprehensive ministry platforms designed for Kingdom advancement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {ministryTiles.map((tile, index) => {
              const Icon = tile.icon;
              const colors = [
                { bg: 'from-blue-500/10 to-cyan-500/10', border: 'border-blue-500/20', icon: 'text-blue-400', hover: 'hover:border-blue-400/40' },
                { bg: 'from-purple-500/10 to-pink-500/10', border: 'border-purple-500/20', icon: 'text-purple-400', hover: 'hover:border-purple-400/40' },
                { bg: 'from-orange-500/10 to-red-500/10', border: 'border-orange-500/20', icon: 'text-orange-400', hover: 'hover:border-orange-400/40' },
                { bg: 'from-green-500/10 to-emerald-500/10', border: 'border-green-500/20', icon: 'text-green-400', hover: 'hover:border-green-400/40' }
              ];
              const colorScheme = colors[index % colors.length];

              return (
                <Link key={tile.title} to={tile.href} className="group block">
                  <div className={`relative h-full bg-gradient-to-br ${colorScheme.bg} border ${colorScheme.border} backdrop-blur-sm transition-all duration-500 sm:hover:scale-105 sm:hover:shadow-2xl p-8 sm:p-10 rounded-2xl overflow-hidden`}>
                    {/* Subtle background pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <div className={`w-16 h-16 bg-white/10 border border-white/20 flex items-center justify-center sm:group-hover:scale-110 transition-all duration-300 rounded-2xl`}>
                          <Icon className={`h-8 w-8 ${colorScheme.icon}`} />
                        </div>
                        <div className="opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                          <ArrowRight className="h-6 w-6 text-white" />
                        </div>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 heading-font tracking-wide leading-tight">
                        {tile.title}
                      </h3>
                      <p className="text-gray-300 text-base leading-relaxed mb-6">
                        {tile.description}
                      </p>

                      <div className="flex items-center text-white sm:group-hover:text-gray-200 transition-colors">
                        <span className="uppercase tracking-wider font-semibold text-sm">Explore Platform</span>
                        <ArrowRight className="ml-3 h-5 w-5 sm:group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/20 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 heading-font">
                Ready to Begin Your Journey?
              </h3>
              <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
                Join believers worldwide who believe these signs shall follow those who believe in the name of Jesus.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/academy"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 font-semibold uppercase tracking-wide transition-all duration-300 hover:scale-105 inline-flex items-center justify-center"
                >
                  Start Training Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/membership"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 font-semibold uppercase tracking-wide transition-all duration-300 inline-flex items-center justify-center backdrop-blur-sm"
                >
                  View All Plans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
