import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Mail, ExternalLink, Navigation, Clock, Users, Star, Map } from 'lucide-react';
import SEO from '../components/SEO';
import ChurchPartnershipCTA from '../components/ChurchPartnershipCTA';
import { siteUrl } from '../config';

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
  pastor: string;
  denomination: string;
  services: string[];
  specialties: string[];
  serviceTypes: string[]; // Sunday, Youth, Mens, Womens
  serviceTimes: { day: string; time: string; type: string; ampm: 'AM' | 'PM' }[];
  distance?: number;
  coordinates: { lat: number; lng: number };
}

export default function FindChurch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState('');
  const [churches, setChurches] = useState<Church[]>([]);
  const [filteredChurches, setFilteredChurches] = useState<Church[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedDay, setSelectedDay] = useState('all');
  const [selectedTime, setSelectedTime] = useState('all');
  const [locationFilter, setLocationFilter] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedChurch, setSelectedChurch] = useState<Church | null>(null);

  // Mock church data - in real app this would come from backend
  const mockChurches: Church[] = [
    {
      id: '1',
      name: 'Supernatural Life Church',
      address: '123 King Street',
      city: 'Sydney',
      state: 'NSW',
      postcode: '2000',
      phone: '+61 2 9555 0123',
      email: 'info@supernaturallife.church',
      website: 'https://supernaturallife.church',
      pastor: 'Pastor John Smith',
      denomination: 'Pentecostal',
      services: ['Sunday 9:00 AM', 'Sunday 6:00 PM', 'Wednesday 7:00 PM'],
      specialties: ['Divine Healing', 'Supernatural Ministry', 'Deliverance'],
      serviceTypes: ['Sunday Church', 'Youth Group', 'Mens Group'],
      serviceTimes: [
        { day: 'Sunday', time: '9:00', type: 'Sunday Church', ampm: 'AM' },
        { day: 'Sunday', time: '6:00', type: 'Sunday Church', ampm: 'PM' },
        { day: 'Wednesday', time: '7:00', type: 'Youth Group', ampm: 'PM' },
        { day: 'Friday', time: '7:30', type: 'Mens Group', ampm: 'PM' }
      ],
      coordinates: { lat: -33.8688, lng: 151.2093 }
    },
    {
      id: '2',
      name: 'Kingdom Power Assembly',
      address: '456 Collins Street',
      city: 'Melbourne',
      state: 'VIC',
      postcode: '3000',
      phone: '+61 3 9555 0456',
      email: 'contact@kingdompower.org.au',
      website: 'https://kingdompower.org.au',
      pastor: 'Pastor Sarah Williams',
      denomination: 'Apostolic',
      services: ['Sunday 10:00 AM', 'Sunday 7:00 PM', 'Tuesday 7:30 PM'],
      specialties: ['Signs & Wonders', 'Prophetic Ministry', 'Soul Winning'],
      serviceTypes: ['Sunday Church', 'Womens Group'],
      serviceTimes: [
        { day: 'Sunday', time: '10:00', type: 'Sunday Church', ampm: 'AM' },
        { day: 'Sunday', time: '7:00', type: 'Sunday Church', ampm: 'PM' },
        { day: 'Tuesday', time: '7:30', type: 'Womens Group', ampm: 'PM' }
      ],
      coordinates: { lat: -37.8136, lng: 144.9631 }
    },
    {
      id: '3',
      name: 'Fire & Glory Ministries',
      address: '789 Queen Street',
      city: 'Brisbane',
      state: 'QLD',
      postcode: '4000',
      phone: '+61 7 3555 0789',
      email: 'admin@fireglory.church',
      pastor: 'Pastor David Chen',
      denomination: 'Charismatic',
      services: ['Sunday 9:30 AM', 'Sunday 6:30 PM', 'Friday 7:00 PM'],
      specialties: ['Miracle Services', 'Youth Ministry', 'Evangelism'],
      serviceTypes: ['Sunday Church', 'Youth Group'],
      serviceTimes: [
        { day: 'Sunday', time: '9:30', type: 'Sunday Church', ampm: 'AM' },
        { day: 'Sunday', time: '6:30', type: 'Sunday Church', ampm: 'PM' },
        { day: 'Friday', time: '7:00', type: 'Youth Group', ampm: 'PM' }
      ],
      coordinates: { lat: -27.4698, lng: 153.0251 }
    },
    {
      id: '4',
      name: 'Supernatural Breakthrough Church',
      address: '321 North Terrace',
      city: 'Adelaide',
      state: 'SA',
      postcode: '5000',
      phone: '+61 8 8555 0321',
      email: 'info@breakthrough.church',
      pastor: 'Pastor Maria Rodriguez',
      denomination: 'Independent',
      services: ['Sunday 10:30 AM', 'Wednesday 7:00 PM'],
      specialties: ['Financial Breakthrough', 'Healing Ministry', 'Family Restoration'],
      serviceTypes: ['Sunday Church', 'Mens Group', 'Womens Group'],
      serviceTimes: [
        { day: 'Sunday', time: '10:30', type: 'Sunday Church', ampm: 'AM' },
        { day: 'Wednesday', time: '7:00', type: 'Mens Group', ampm: 'PM' },
        { day: 'Thursday', time: '10:00', type: 'Womens Group', ampm: 'AM' }
      ],
      coordinates: { lat: -34.9285, lng: 138.6007 }
    },
    {
      id: '5',
      name: 'Glory Realm Church',
      address: '654 Hay Street',
      city: 'Perth',
      state: 'WA',
      postcode: '6000',
      phone: '+61 8 9555 0654',
      email: 'welcome@gloryrealm.org.au',
      pastor: 'Pastor Michael Johnson',
      denomination: 'Revival',
      services: ['Sunday 9:00 AM', 'Sunday 6:00 PM', 'Thursday 7:30 PM'],
      specialties: ['Worship & Praise', 'Supernatural Encounters', 'Community Outreach'],
      serviceTypes: ['Sunday Church', 'Youth Group', 'Womens Group'],
      serviceTimes: [
        { day: 'Sunday', time: '9:00', type: 'Sunday Church', ampm: 'AM' },
        { day: 'Sunday', time: '6:00', type: 'Sunday Church', ampm: 'PM' },
        { day: 'Thursday', time: '7:30', type: 'Youth Group', ampm: 'PM' },
        { day: 'Saturday', time: '10:00', type: 'Womens Group', ampm: 'AM' }
      ],
      coordinates: { lat: -31.9505, lng: 115.8605 }
    }
  ];

  useEffect(() => {
    setChurches(mockChurches);
    setFilteredChurches(mockChurches);
  }, []);

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          setLocationError('');
          
          // Calculate distances and sort by nearest
          const churchesWithDistance = mockChurches.map(church => ({
            ...church,
            distance: calculateDistance(location, church.coordinates)
          })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
          
          setChurches(churchesWithDistance);
          setFilteredChurches(churchesWithDistance);
        },
        (error) => {
          setLocationError('Unable to get your location. Please search by city or postcode.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  };

  const calculateDistance = (pos1: { lat: number; lng: number }, pos2: { lat: number; lng: number }) => {
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
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI/180);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredChurches(churches);
      return;
    }

    const filtered = churches.filter(church =>
      church.name.toLowerCase().includes(query.toLowerCase()) ||
      church.city.toLowerCase().includes(query.toLowerCase()) ||
      church.state.toLowerCase().includes(query.toLowerCase()) ||
      church.postcode.includes(query) ||
      church.pastor.toLowerCase().includes(query.toLowerCase()) ||
      church.specialties.some(specialty => specialty.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredChurches(filtered);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    applyFilters(filter, selectedDay, selectedTime, locationFilter);
  };

  const handleDayChange = (day: string) => {
    setSelectedDay(day);
    applyFilters(selectedFilter, day, selectedTime, locationFilter);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    applyFilters(selectedFilter, selectedDay, time, locationFilter);
  };

  const handleLocationChange = (location: string) => {
    setLocationFilter(location);
    applyFilters(selectedFilter, selectedDay, selectedTime, location);
  };

  const applyFilters = (filter: string, day: string, time: string, location: string) => {
    let filtered = churches;

    // Service Type Filter (All churches, Sunday Church, Youth Group, etc.)
    if (filter !== 'all') {
      filtered = filtered.filter(church => 
        church.serviceTypes.includes(filter) ||
        church.specialties.some(specialty => 
          specialty.toLowerCase().includes(filter.toLowerCase())
        ) ||
        church.denomination.toLowerCase().includes(filter.toLowerCase())
      );
    }

    // Day Filter
    if (day !== 'all') {
      filtered = filtered.filter(church =>
        church.serviceTimes.some(serviceTime => serviceTime.day === day)
      );
    }

    // Time Filter (AM/PM)
    if (time !== 'all') {
      filtered = filtered.filter(church =>
        church.serviceTimes.some(serviceTime => serviceTime.ampm === time)
      );
    }

    // Location Filter
    if (location.trim()) {
      const locationLower = location.toLowerCase();
      filtered = filtered.filter(church =>
        church.city.toLowerCase().includes(locationLower) ||
        church.state.toLowerCase().includes(locationLower) ||
        church.postcode.includes(location) ||
        church.address.toLowerCase().includes(locationLower)
      );
    }

    setFilteredChurches(filtered);
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Find a Church", item: `${siteUrl}/find-church` }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-16">
      <SEO
        title="Find a Supernatural Church Near You - Partner Churches Directory"
        description="Discover supernatural ministry churches in your area. Find partner churches that practice divine healing, deliverance, and signs & wonders across Australia."
        breadcrumbsJsonLd={breadcrumbs}
      />

      {/* Header */}
      <div className="text-center mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 heading-font">
          Find a Supernatural Church
        </h1>
        <p className="text-base sm:text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed">
          Connect with partner churches in your area that practice authentic supernatural ministry, divine healing, 
          and biblical signs & wonders. Find a spiritual home where faith meets fire.
        </p>
      </div>

      {/* Search & Location */}
      <div className="bg-gray-800/50 border border-gray-700 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by church name, city, pastor, or ministry focus..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
            />
          </div>
          
          <button
            onClick={requestLocation}
            className="bg-orange-500 text-white hover:bg-orange-600 px-6 py-3 font-semibold uppercase tracking-wide inline-flex items-center justify-center gap-2"
          >
            <Navigation className="w-5 h-5" />
            Find Churches Near Me
          </button>
        </div>

        {locationError && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 text-red-300 text-sm">
            {locationError}
          </div>
        )}

        {userLocation && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 text-green-300 text-sm">
            ✓ Location found! Churches are now sorted by distance from you.
          </div>
        )}

        {/* Enhanced Filters */}
        <div className="space-y-4 mb-6">
          {/* Service Type Filter */}
          <div>
            <label className="block text-white font-semibold mb-2">Service Type:</label>
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All Churches' },
                { key: 'Sunday Church', label: 'Sunday Church' },
                { key: 'Youth Group', label: 'Youth Group' },
                { key: 'Mens Group', label: 'Mens Group' },
                { key: 'Womens Group', label: 'Womens Group' }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => handleFilterChange(filter.key)}
                  className={`px-4 py-2 text-sm font-semibold uppercase tracking-wide border ${
                    selectedFilter === filter.key
                      ? 'bg-white text-black border-white'
                      : 'bg-transparent text-gray-300 border-gray-600 hover:border-gray-500'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Location Filter */}
            <div>
              <label className="block text-white font-semibold mb-2">Location:</label>
              <input
                type="text"
                placeholder="City, State, or Postcode..."
                value={locationFilter}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
              />
            </div>

            {/* Day Filter */}
            <div>
              <label className="block text-white font-semibold mb-2">Day:</label>
              <select
                value={selectedDay}
                onChange={(e) => handleDayChange(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
              >
                <option value="all">Any Day</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </div>

            {/* Time Filter */}
            <div>
              <label className="block text-white font-semibold mb-2">Time:</label>
              <select
                value={selectedTime}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
              >
                <option value="all">AM or PM</option>
                <option value="AM">Morning (AM)</option>
                <option value="PM">Evening (PM)</option>
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="flex justify-end">
            <button
              onClick={() => {
                setSelectedFilter('all');
                setSelectedDay('all');
                setSelectedTime('all');
                setLocationFilter('');
                setFilteredChurches(churches);
              }}
              className="px-4 py-2 text-sm bg-gray-600 text-white hover:bg-gray-500 border border-gray-500"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 text-sm font-semibold uppercase tracking-wide border inline-flex items-center gap-2 ${
              viewMode === 'list'
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-transparent text-gray-300 border-gray-600 hover:border-gray-500'
            }`}
          >
            <Users className="w-4 h-4" />
            List View
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-4 py-2 text-sm font-semibold uppercase tracking-wide border inline-flex items-center gap-2 ${
              viewMode === 'map'
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-transparent text-gray-300 border-gray-600 hover:border-gray-500'
            }`}
          >
            <Map className="w-4 h-4" />
            Map View
          </button>
        </div>
      </div>

      {/* Churches Display */}
      {viewMode === 'list' ? (
        <div className="space-y-6">
          {filteredChurches.length === 0 ? (
            <div className="bg-gray-800/50 border border-gray-700 p-8 text-center">
              <MapPin className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No Churches Found</h3>
              <p className="text-gray-400">
                Try adjusting your search criteria or contact us to add your local supernatural church.
              </p>
            </div>
          ) : (
            filteredChurches.map((church) => (
            <div key={church.id} className="bg-gray-800/50 border border-gray-700 p-6 hover:bg-gray-800/70 transition-colors">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Church Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 heading-font">{church.name}</h3>
                      <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">
                          {church.address}, {church.city}, {church.state} {church.postcode}
                        </span>
                        {church.distance && (
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 text-xs font-semibold rounded">
                            {church.distance}km away
                          </span>
                        )}
                      </div>
                      <p className="text-blue-400 text-sm mb-3">Led by {church.pastor}</p>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-4">
                    <h4 className="text-white font-semibold mb-2 text-sm">Ministry Focus:</h4>
                    <div className="flex flex-wrap gap-2">
                      {church.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-1 text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Services */}
                  <div className="mb-4">
                    <h4 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Service Times:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {church.services.map((service, idx) => (
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
                    <h4 className="text-white font-semibold mb-3 text-sm">Contact Information</h4>
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
                          <a 
                            href={church.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-white"
                          >
                            Visit Website
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button className="w-full bg-orange-500 text-white hover:bg-orange-600 px-4 py-3 font-semibold uppercase tracking-wide">
                      Get Directions
                    </button>
                    <button className="w-full bg-blue-500 text-white hover:bg-blue-600 px-4 py-3 font-semibold uppercase tracking-wide">
                      Contact Church
                    </button>
                  </div>

                  <div className="text-center">
                    <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 text-xs font-semibold">
                      ✓ VERIFIED PARTNER
                    </span>
                  </div>
                </div>
              </div>
            </div>
            ))
          )}
        </div>
      ) : (
        /* Map View */
        <div className="bg-gray-800/50 border border-gray-700 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Interactive Map */}
            <div className="lg:col-span-2">
              <div className="bg-gray-700 border border-gray-600 h-96 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
                
                {/* Simple SVG Map of Australia with Church Pins */}
                <svg viewBox="0 0 800 600" className="w-full h-full">
                  {/* Australia Outline (simplified) */}
                  <path
                    d="M150,200 L200,180 L300,190 L400,200 L500,220 L600,250 L650,300 L680,350 L650,400 L600,450 L500,480 L400,490 L300,480 L200,460 L150,400 L120,350 L100,300 L120,250 Z"
                    fill="rgba(55, 65, 81, 0.8)"
                    stroke="rgba(156, 163, 175, 0.5)"
                    strokeWidth="2"
                  />
                  
                  {/* Church Pins */}
                  {filteredChurches.map((church, idx) => {
                    // Map coordinates to SVG positions (simplified mapping)
                    const positions = [
                      { x: 580, y: 280 }, // Sydney
                      { x: 520, y: 350 }, // Melbourne
                      { x: 550, y: 250 }, // Brisbane
                      { x: 450, y: 380 }, // Adelaide
                      { x: 350, y: 320 }  // Perth
                    ];
                    const pos = positions[idx] || { x: 400, y: 300 };
                    
                    return (
                      <g key={church.id}>
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="8"
                          fill={selectedChurch?.id === church.id ? "#f97316" : "#3b82f6"}
                          stroke="white"
                          strokeWidth="2"
                          className="cursor-pointer hover:r-10 transition-all"
                          onClick={() => setSelectedChurch(church)}
                        />
                        <text
                          x={pos.x}
                          y={pos.y - 15}
                          textAnchor="middle"
                          fill="white"
                          fontSize="10"
                          className="pointer-events-none"
                        >
                          {church.city}
                        </text>
                      </g>
                    );
                  })}
                  
                  {/* User Location (if available) */}
                  {userLocation && (
                    <circle
                      cx="580"
                      cy="280"
                      r="6"
                      fill="#ef4444"
                      stroke="white"
                      strokeWidth="2"
                    />
                  )}
                </svg>
                
                <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-2 text-xs rounded">
                  Click pins to view church details
                </div>
              </div>
            </div>
            
            {/* Selected Church Details */}
            <div className="bg-gray-700/50 border border-gray-600 p-4">
              {selectedChurch ? (
                <div>
                  <h3 className="text-lg font-bold text-white mb-3 heading-font">{selectedChurch.name}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedChurch.address}, {selectedChurch.city}, {selectedChurch.state}</span>
                    </div>
                    
                    <div className="text-blue-400 text-sm">Led by {selectedChurch.pastor}</div>
                    
                    {selectedChurch.distance && (
                      <div className="bg-orange-500/20 text-orange-400 px-2 py-1 text-xs font-semibold rounded inline-block">
                        {selectedChurch.distance}km away
                      </div>
                    )}
                    
                    <div>
                      <h4 className="text-white font-semibold mb-2 text-sm">Ministry Focus:</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedChurch.specialties.map((specialty, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-1 text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Service Times:
                      </h4>
                      <div className="space-y-1">
                        {selectedChurch.services.map((service, idx) => (
                          <div key={idx} className="text-gray-300 text-sm bg-gray-700/50 px-2 py-1">
                            {service}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2 pt-4">
                      {selectedChurch.phone && (
                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                          <Phone className="w-4 h-4" />
                          <a href={`tel:${selectedChurch.phone}`} className="hover:text-white">
                            {selectedChurch.phone}
                          </a>
                        </div>
                      )}
                      {selectedChurch.email && (
                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${selectedChurch.email}`} className="hover:text-white">
                            {selectedChurch.email}
                          </a>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2 pt-4">
                      <button className="w-full bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 font-semibold uppercase tracking-wide text-sm">
                        Get Directions
                      </button>
                      <button className="w-full bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 font-semibold uppercase tracking-wide text-sm">
                        Contact Church
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Map className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Select a Church</h3>
                  <p className="text-gray-400 text-sm">
                    Click on any pin on the map to view church details and contact information.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Church Partnership CTA */}
      <div className="mt-12">
        <ChurchPartnershipCTA variant="compact" />
      </div>
    </div>
  );
}
