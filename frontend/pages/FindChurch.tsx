import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Phone, Mail, ExternalLink, Navigation, Clock, Users, Star, Crown, Zap, DollarSign, CheckCircle, AlertTriangle, HelpCircle, X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import SEO from '../components/SEO';
import ChurchPartnershipCTA from '../components/ChurchPartnershipCTA';
import { siteUrl } from '../config';
import { churchDirectory, searchChurches, getChurchesByState } from '../data/churchDirectory';

// Define Church type locally
interface Church {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  phone?: string;
  email?: string;
  website?: string;
  pastor?: string;
  denomination?: string;
  services?: string[];
  specialties?: string[];
  serviceTypes?: string[];
  serviceTimes?: { day: string; time: string; type: string; ampm: 'AM' | 'PM' }[];
  distance?: number;
  coordinates: { lat: number; lng: number };
  verified: boolean;
  source: string;
}

// Memoized Church Item Component
const ChurchItem = memo(({ church, index }: { church: Church; index: number }) => (
  <div className={`bg-gray-800/50 border border-gray-700 p-6 hover:bg-gray-800/70 transition-colors ${
    index < 3 && church.distance ? 'ring-2 ring-yellow-500/50 bg-yellow-500/5' : ''
  }`}>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Church Info */}
      <div className="lg:col-span-2">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {index < 3 && church.distance && (
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 text-xs font-semibold rounded">
                  #{index + 1} Nearest
                </span>
              )}
              <h2 className="text-xl font-bold text-white heading-font">{church.name}</h2>
              {church.verified ? (
                <span className="bg-green-500/20 text-green-400 px-3 py-1 text-xs font-semibold rounded-full border border-green-500/30 inline-flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </span>
              ) : (
                <span className="bg-amber-500/20 text-amber-400 px-3 py-1 text-xs font-semibold rounded-full border border-amber-500/30 inline-flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Unverified
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">
                {church.address}, {church.city}, {church.state} {church.postcode}
              </span>
              {church.distance && (
                <span className="bg-blue-500/20 text-blue-400 px-2 py-1 text-xs font-semibold rounded">
                  {church.distance}km away
                </span>
              )}
            </div>
            <p className="text-blue-400 text-sm mb-3">Led by {church.pastor}</p>
          </div>
        </div>

        {/* Services */}
        <div className="mb-4">
          <h3 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Service Times:
          </h3>
          <div className="flex flex-wrap gap-2">
            {church.services && church.services.map((service: string, idx: number) => (
              <span key={idx} className="text-gray-300 text-sm bg-gray-700/50 px-2 py-1">
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Contact & Actions */}
      <div className="space-y-4">
        <div className="bg-gray-700/50 border border-gray-600 p-4">
          <h3 className="text-white font-semibold mb-3 text-sm">Contact Information</h3>
          <div className="space-y-2">
            {church.phone && (
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Phone className="w-4 h-4" />
                <a href={`tel:${church.phone}`} className="hover:text-white">
                  {church.phone}
                </a>
              </div>
            )}
            {church.email && (
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${church.email}`} className="hover:text-white">
                  {church.email}
                </a>
              </div>
            )}
            {church.website && (
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <ExternalLink className="w-4 h-4" />
                <a href={church.website.startsWith('http') ? church.website : `https://${church.website}`}
                   target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Visit Website
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          {church.coordinates && (
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${church.coordinates.lat},${church.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-semibold uppercase tracking-wide flex items-center justify-center gap-2 transition-colors"
            >
              <Navigation className="w-4 h-4" />
              Directions
            </a>
          )}
          {church.phone && (
            <a
              href={`tel:${church.phone}`}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm font-semibold uppercase tracking-wide flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
));

ChurchItem.displayName = 'ChurchItem';

const FindChurch = React.memo(function FindChurch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [selectedRadius, setSelectedRadius] = useState<number>(50); // Default to 50km
  const [geocodingCache, setGeocodingCache] = useState<Map<string, { lat: number; lng: number }>>(new Map());

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedDay, setSelectedDay] = useState('all');
  const [selectedTime, setSelectedTime] = useState('all');
  const [locationFilter, setLocationFilter] = useState('');
  const [verifiedFilter, setVerifiedFilter] = useState<'all' | 'verified' | 'unverified'>('all');
  const [showHelpPopup, setShowHelpPopup] = useState(false);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organisation: '',
    country: 'Australia',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Geocoding function using OpenStreetMap Nominatim
  const geocodeAddress = useCallback(async (address: string): Promise<{ lat: number; lng: number } | undefined> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&countrycodes=AU`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const result = data[0];
        return { lat: parseFloat(result.lat), lng: parseFloat(result.lon) };
      }
      return undefined;
    } catch (error) {
      console.error('Geocoding error:', error);
      return undefined;
    }
  }, []);

  // Enhanced distance calculation using haversine formula
  const calculateDistance = useCallback((pos1: { lat: number; lng: number }, pos2: { lat: number; lng: number }) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(pos2.lat - pos1.lat);
    const dLon = deg2rad(pos2.lng - pos1.lng);
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(pos1.lat)) * Math.cos(deg2rad(pos2.lat)) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in kilometers
    return Math.round(d * 10) / 10; // Round to 1 decimal place
  }, []);

  const deg2rad = (deg: number) => {
    return deg * (Math.PI/180);
  };

  // Use real church directory data with error handling
  const allChurches = useMemo(() => {
    try {
      return churchDirectory || [];
    } catch (error) {
      console.error('Error loading church directory:', error);
      return [];
    }
  }, []);

  // Count verified/unverified churches
  const churchStats = useMemo(() => {
    try {
      const verified = allChurches.filter(church => church.verified).length;
      const unverified = allChurches.filter(church => !church.verified).length;
      return { verified, unverified, total: verified + unverified };
    } catch (error) {
      console.error('Error calculating church stats:', error);
      return { verified: 0, unverified: 0, total: 0 };
    }
  }, [allChurches]);

  const [filteredChurches, setFilteredChurches] = useState<Church[]>([]);

  // Enhanced filtered churches with geocoding and proper distance calculation
  useEffect(() => {
    const filterChurches = async () => {
      try {
        let churches = [...allChurches];

        // Geocode churches missing coordinates
        const geocodedChurches = await Promise.all(
          churches.map(async (church) => {
            if (church.coordinates && church.coordinates.lat && church.coordinates.lng) {
              return church;
            }

            const cacheKey = `${church.address}, ${church.city}, ${church.state} ${church.postcode}`;
            let coordinates = geocodingCache.get(cacheKey);

            if (!coordinates) {
              coordinates = await geocodeAddress(cacheKey);
              if (coordinates) {
                setGeocodingCache(prev => new Map(prev.set(cacheKey, coordinates!)));
              } else {
                coordinates = undefined;
              }
            }

            return {
              ...church,
              coordinates: coordinates || church.coordinates
            };
          })
        );

        churches = geocodedChurches;

        // Location-based filtering (if user has location)
        if (userLocation) {
          churches = churches.map(church => ({
            ...church,
            distance: church.coordinates ? calculateDistance(userLocation, church.coordinates) : undefined
          })).filter(church => church.distance !== undefined && church.distance <= selectedRadius)
          .sort((a, b) => (a.distance || 0) - (b.distance || 0));

          // If no churches found within selected radius, show churches from same state
          if (churches.length === 0) {
            console.log(`No churches within ${selectedRadius}km, attempting to show churches in same state`);

            // Try to determine user's state from coordinates (rough approximation for Australian states)
            const userState = userLocation ? getStateFromCoordinates(userLocation.lat, userLocation.lng) : null;
            if (userState) {
              churches = allChurches.filter(church => church.state === userState)
                .map(church => ({
                  ...church,
                  distance: church.coordinates ? calculateDistance(userLocation, church.coordinates) : undefined
                }))
                .sort((a, b) => (a.distance || 0) - (b.distance || 0));
            }
          }
        }

        setFilteredChurches(churches);
      } catch (error) {
        console.error('Error filtering churches:', error);
        setFilteredChurches([]);
      }
    };

    filterChurches();
  }, [allChurches, userLocation, selectedRadius, geocodingCache, geocodeAddress, calculateDistance]);

  // Get user's location
  const getUserLocation = useCallback(() => {
    setIsGettingLocation(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setIsGettingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setLocationError('Unable to get your location. Please check your browser permissions.');
        setIsGettingLocation(false);

        // Fallback: show all churches in user's state (would need IP geolocation)
        // For now, just show all churches
        setFilteredChurches(allChurches);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  }, [allChurches]);

  // Helper function to determine state from coordinates (rough approximation)
  const getStateFromCoordinates = (lat: number, lng: number): string | null => {
    // Rough bounding boxes for Australian states
    if (lat >= -28.5 && lat <= -25.5 && lng >= 150.5 && lng <= 153.5) return 'QLD';
    if (lat >= -38.5 && lat <= -33.5 && lng >= 140.5 && lng <= 149.5) return 'NSW';
    if (lat >= -38.5 && lat <= -35.5 && lng >= 144.5 && lng <= 145.5) return 'VIC';
    if (lat >= -35.5 && lat <= -31.5 && lng >= 115.5 && lng <= 129.5) return 'WA';
    if (lat >= -35.5 && lat <= -25.5 && lng >= 138.5 && lng <= 141.5) return 'SA';
    if (lat >= -23.5 && lat <= -19.5 && lng >= 130.5 && lng <= 138.5) return 'NT';
    if (lat >= -43.5 && lat <= -39.5 && lng >= 143.5 && lng <= 148.5) return 'TAS';
    return null;
  };

  // Contact form submit handler
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const templateParams = {
        from_name: `${contactForm.firstName} ${contactForm.lastName}`,
        from_email: contactForm.email,
        phone: contactForm.phone,
        organisation: contactForm.organisation,
        country: contactForm.country,
        message: contactForm.message
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitMessage('Thank you! Your message has been sent. We\'ll respond within 48 hours.');
      
      // Reset form
      setContactForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organisation: '',
        country: 'Australia',
        message: ''
      });
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen text-white">
      <SEO
        title="Find a Church | Apostolic Supernatural Churches"
        description="Find supernatural churches near you. Connect with verified apostolic churches that teach accurate doctrine and demonstrate supernatural signs."
      />

      {/* Header */}
      <section className="bg-black py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 heading-font">
              Find a Church
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Connect with supernatural churches in your area that teach accurate apostolic doctrine and demonstrate the power of God.
            </p>

            {/* Location Button */}
            <div className="mb-6">
              <button
                onClick={getUserLocation}
                disabled={isGettingLocation}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white px-6 py-3 font-semibold uppercase tracking-wide flex items-center gap-2 mx-auto transition-colors"
              >
                <Navigation className="w-5 h-5" />
                {isGettingLocation ? 'Getting Location...' : 'Find Churches Near Me'}
              </button>
              {locationError && (
                <p className="text-red-400 text-sm mt-2">{locationError}</p>
              )}
            </div>

            {/* Radius Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Search Radius: {selectedRadius}km
              </label>
              <select
                value={selectedRadius}
                onChange={(e) => setSelectedRadius(Number(e.target.value))}
                className="bg-gray-800 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value={25}>25km</option>
                <option value={50}>50km</option>
                <option value={100}>100km</option>
                <option value={250}>250km</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Status Messages */}
        {userLocation && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 text-green-300 text-sm">
            ✓ Location found! Showing churches within {selectedRadius}km of your location, sorted by distance.
            {filteredChurches.length > 0 && filteredChurches[0].distance && filteredChurches[0].distance > 50 && (
              <div className="mt-2 text-xs">
                📍 Note: Some churches shown may be outside 50km due to approximate location data.
              </div>
            )}
            {searchQuery.trim() && searchQuery.trim().length <= 2 && (
              <div className="mt-2 text-xs">
                💡 Tip: Type 3+ characters to search by name, or clear search to see all nearby churches within {selectedRadius}km.
              </div>
            )}
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search churches by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-white px-10 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white heading-font">
              {filteredChurches.length > 0 ? `${filteredChurches.length} Churches Found` : 'No Churches Found'}
            </h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowHelpPopup(true)}
                className="text-sm text-blue-400 hover:text-blue-300 underline"
              >
                What do verified/unverified mean?
              </button>
              <div className="text-sm text-gray-400">
                {churchStats.verified} verified • {churchStats.unverified} unverified
              </div>
            </div>
          </div>

          {filteredChurches.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No churches found</h3>
              <p className="text-gray-400 mb-4">
                {userLocation
                  ? `No churches found within ${selectedRadius}km. Try increasing the search radius or check your location permissions.`
                  : 'Click "Find Churches Near Me" to search for churches in your area.'
                }
              </p>
              {!userLocation && (
                <button
                  onClick={getUserLocation}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 font-semibold uppercase tracking-wide"
                >
                  Enable Location
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredChurches.map((church, index) => (
                <ChurchItem key={church.id} church={church} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Verification Info Popup */}
      {showHelpPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Verified Churches Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-green-400 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    Verified Partner Churches
                  </h3>
                  <button
                    onClick={() => setShowHelpPopup(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-300 mb-4">
                  Our Verified Churches are ministries that meet our Supernatural Ministry Standards. These churches have completed leadership training, received recognised ordination, and are accountable to apostolic oversight.
                </p>
                <p className="text-gray-300 mb-4 font-semibold">They:</p>
                <ul className="text-gray-300 space-y-2 mb-4">
                  <li>• Teach sound biblical doctrine with accuracy and integrity</li>
                  <li>• Demonstrate authentic supernatural power through miracles, healing, deliverance, and prophecy</li>
                  <li>• Actively disciple believers to walk in Christ's authority and advance the Kingdom of God</li>
                  <li>• Fully align with our Statement of Faith</li>
                </ul>
                <p className="text-gray-300">
                  We don't verify by name or reputation but by fruit. Jesus said, "These signs will follow those who believe…" (Mark 16:17-18). A Verified Partner Church reflects both the Word and the power of God's Kingdom.
                </p>
                <p className="text-gray-300 mt-4">
                  Choosing a Verified Partner Church means you are part of a community where the Gospel is taught with accuracy, and where believers are equipped to live in victory and health.
                </p>
              </div>

              {/* Unverified Churches Section */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-6 h-6" />
                  Unverified Churches
                </h3>
                <p className="text-gray-300 mb-4">
                  Unverified Churches are those that have not partnered with us or been reviewed under our standards. Some are simply listed from public directories without any confirmation of doctrine or practice.
                </p>
                <p className="text-gray-300 mb-4">
                  We are 99.99% confident that most unverified churches in Australia are not teaching the foundational truths of God's Word correctly—especially concerning what Jesus accomplished through His broken body. Scripture warns: "For this reason many among you are weak and sick…" (1 Corinthians 11:30). This is seen today in many churches where sickness and disease are openly accepted rather than healed.
                </p>
                <p className="text-gray-300">
                  Unverified Churches may still use the Bible, but without correct doctrine and demonstration of power, they risk leaving people in bondage instead of equipping them for victory.
                </p>
                <p className="text-gray-300 mt-4">
                  For this reason, we recommend exercising caution when attending an unverified church. Always seek fellowship where God's Word is rightly taught, applied, and confirmed by supernatural signs following.
                </p>
              </div>

              {/* Bible Verses */}
              <div className="text-center mb-8 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
                <blockquote className="text-lg text-white font-semibold mb-4 italic">
                  "For the kingdom of God is not in word but in power."
                </blockquote>
                <cite className="text-gray-400 text-sm">— 1 Corinthians 4:20</cite>
                
                <blockquote className="text-lg text-white font-semibold mb-4 mt-6 italic">
                  "The kingdom of God is within you."
                </blockquote>
                <cite className="text-gray-400 text-sm">— Luke 17:21</cite>
              </div>

              {/* Understood Button */}
              <div className="text-center">
                <button
                  onClick={() => setShowHelpPopup(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-semibold uppercase tracking-wide transition-colors"
                >
                  Understood
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Section */}
      <div className="mt-16 bg-gray-800/50 border border-gray-700 p-8 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white heading-font mb-4">Contact Us</h2>
          <p className="text-gray-400">Have questions about finding a church? Get in touch with us.</p>
        </div>

        <form onSubmit={handleContactSubmit} className="max-w-2xl mx-auto space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                First Name *
              </label>
              <input
                type="text"
                value={contactForm.firstName}
                onChange={(e) => setContactForm({...contactForm, firstName: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                value={contactForm.lastName}
                onChange={(e) => setContactForm({...contactForm, lastName: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:border-orange-500"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={contactForm.email}
              onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:border-orange-500"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Phone *
            </label>
            <input
              type="tel"
              value={contactForm.phone}
              onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:border-orange-500"
              required
            />
          </div>

          {/* Organisation */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Organisation *
            </label>
            <input
              type="text"
              value={contactForm.organisation}
              onChange={(e) => setContactForm({...contactForm, organisation: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:border-orange-500"
              required
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Country
            </label>
            <select
              value={contactForm.country}
              onChange={(e) => setContactForm({...contactForm, country: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:border-orange-500"
            >
              <option value="Australia">Australia</option>
              <option value="New Zealand">New Zealand</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Message *
            </label>
            <textarea
              value={contactForm.message}
              onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
              rows={4}
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:border-orange-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white px-8 py-3 font-semibold uppercase tracking-wide transition-colors"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>

          {submitMessage && (
            <div className="text-center text-green-400">
              {submitMessage}
            </div>
          )}
        </form>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <ChurchPartnershipCTA />
      </div>
    </div>
  );
});

ChurchItem.displayName = 'ChurchItem';

FindChurch.displayName = 'FindChurch';

export default FindChurch;

