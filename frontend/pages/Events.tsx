import React, { useState, useEffect } from 'react';
import client from '../client';
import { Calendar, Users, Play } from 'lucide-react';
import SEO from '../components/SEO';
import { siteUrl } from '../config';

export default function Events() {
  const [eventsData, setEventsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const result = await client.church.listEvents();
        setEventsData(result);
      } catch (error) {
        console.error('Failed to fetch events:', error);
        // Set empty events if fetch fails
        setEventsData({ events: [] });
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
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
      { "@type": "ListItem", position: 2, name: "Events", item: `${siteUrl}/events` }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-16">
      <SEO
        title="Events – Command Church"
        description="Join Command Church events including services, conferences and gatherings. RSVP and be part of the global community."
        breadcrumbsJsonLd={breadcrumbs}
      />

      <div className="text-center mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 heading-font">
          Events
        </h1>
        <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
          Join us for worship, conferences, and special gatherings as we build community and grow in faith together.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {loading ? (
          <div className="col-span-full text-center text-gray-400">Loading events...</div>
        ) : (eventsData?.events || []).length === 0 ? (
          <div className="col-span-full text-center text-gray-400">No events scheduled at this time.</div>
        ) : (
          (eventsData?.events || []).map((event: any) => (
          <div key={event.id} className="bg-white/5 border border-white/10 backdrop-blur-sm p-5 sm:p-6">
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className={`px-3 py-1 text-xs font-semibold border ${
                event.eventType === 'service' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                event.eventType === 'conference' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                'bg-green-500/20 text-green-400 border-green-500/30'
              }`}>
                {event.eventType.toUpperCase()}
              </div>
            </div>
            
            <h2 className="text-lg sm:text-xl font-bold text-white mb-2 heading-font">
              {event.title}
            </h2>
            
            <p className="text-gray-400 text-sm mb-4">
              {event.description}
            </p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-400 text-xs sm:text-sm">
                <Calendar className="h-4 w-4 mr-2" />
                {formatDate(event.startDate)}
              </div>
              
              {event.virtualLink && (
                <div className="flex items-center text-green-400 text-xs sm:text-sm">
                  <Play className="h-4 w-4 mr-2" />
                  Live Stream Available
                </div>
              )}
              
              {event.maxAttendees && (
                <div className="flex items-center text-gray-400 text-xs sm:text-sm">
                  <Users className="h-4 w-4 mr-2" />
                  {event.currentAttendees}/{event.maxAttendees} attending
                </div>
              )}
            </div>
            
            <button className="w-full bg-white text-black hover:bg-gray-200 font-semibold uppercase tracking-wide py-2 text-sm">
              RSVP
            </button>
          </div>
          ))
        )}
      </div>
    </div>
  );
}
