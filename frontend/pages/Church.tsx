import React from 'react';

import { Calendar, MapPin, Play } from 'lucide-react';
import SEO from '../components/SEO';
import { siteUrl } from '../config';

export default function Church() {
  // Mock events data
  const eventsData = {
    events: [
      {
        id: '1',
        title: 'Sunday Worship Service',
        description: 'Join us for our weekly worship service with powerful preaching and supernatural manifestations.',
        eventType: 'service',
        startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        locationName: 'Online',
        virtualLink: 'https://youtube.com/@commandchurch'
      },
      {
        id: '2',
        title: 'Supernatural Prayer Conference 2024',
        description: 'A 3-day intensive prayer and fasting event focused on breakthrough and supernatural manifestation.',
        eventType: 'conference',
        startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        locationName: 'Online',
        virtualLink: 'https://youtube.com/@commandchurch'
      }
    ]
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Church", item: `${siteUrl}/church` }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-16">
      <SEO
        title="Church – Services, Events and Locations"
        description="Join Command Church services, conferences and gatherings. Watch live, RSVP for events and connect with our community."
        breadcrumbsJsonLd={breadcrumbs}
      />

      <div className="text-center mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 heading-font">
          Welcome to Command Church
        </h1>
        <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
          A global Christian discipleship, outreach, and funding platform. Join us in spreading the Gospel and building disciples worldwide through innovative technology and community.
        </p>
      </div>

      {/* Live Stream Section */}
      <section className="mb-12 sm:mb-16">
        <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 heading-font">
              Watch Live
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Join our live services and events from anywhere in the world.
            </p>
          </div>
          <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-purple-600/20" />
            <div className="text-center relative z-10 px-3">
              <Play className="h-14 w-14 sm:h-20 sm:w-20 text-white/80 mx-auto mb-3 sm:mb-4" />
              <p className="text-white text-base sm:text-lg font-semibold">Service starts soon</p>
              <p className="text-gray-300 text-sm sm:text-base">Sunday at 6:00 PM AEST</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 sm:mb-8 heading-font">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {eventsData?.events.map((event) => (
            <div key={event.id} className="bg-white/5 border border-white/10 backdrop-blur-sm p-5 sm:p-6 flex flex-col">
              <div className="flex-grow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`px-3 py-1 text-xs font-semibold border ${
                    event.eventType === 'service' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                    event.eventType === 'conference' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                    'bg-green-500/20 text-green-400 border-green-500/30'
                  }`}>
                    {event.eventType.toUpperCase()}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 heading-font">
                  {event.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {event.description}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-300">
                    <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{formatDate(event.startDate)}</span>
                  </div>
                  {event.locationName && (
                    <div className="flex items-center text-gray-300">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>{event.locationName}</span>
                    </div>
                  )}
                </div>
              </div>
              {event.virtualLink && (
                <a href={event.virtualLink} target="_blank" rel="noopener noreferrer" className="w-full mt-4 bg-white text-black hover:bg-gray-200 font-semibold uppercase tracking-wide py-2 text-sm text-center inline-flex items-center justify-center">
                  <Play className="h-4 w-4 mr-2" />
                  Watch Live
                </a>
              )}
            </div>
          ))}
          {(!eventsData || eventsData.events.length === 0) && (
            <p className="text-gray-400">No upcoming events scheduled. Please check back soon.</p>
          )}
        </div>
      </section>
    </div>
  );
}
