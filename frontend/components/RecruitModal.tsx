import React, { useState } from 'react';
import { UserPlus, Mail, Phone, MapPin, Calendar, CheckCircle, X, BookOpen, Type, Minus, Plus } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

interface RecruitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecruitModal({ isOpen, onClose }: RecruitModalProps) {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('script');
  const [fontSize, setFontSize] = useState(14);
  const [isScriptExpanded, setIsScriptExpanded] = useState(false);
  const [recruitForm, setRecruitForm] = useState({
    firstName: '',
    surname: '',
    email: '',
    phone: '',
    location: '',
    notes: '',
    receivedSalvation: false
  });
  const [recruitSuccess, setRecruitSuccess] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Generate affiliate link using user's ID or referral code
  const affiliateLink = user?.id ? `https://supernatural.institute/join?ref=${user.id.slice(-8)}` : 'https://supernatural.institute/join';

  const handleRecruitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate required fields: first name + either mobile OR email
      if (!recruitForm.firstName.trim()) {
        alert('Please enter a first name (required)');
        return;
      }

      if (!recruitForm.email.trim() && !recruitForm.phone.trim()) {
        alert('Please provide either an email address or mobile number (at least one is required)');
        return;
      }

      // Additional validation for email format if provided
      if (recruitForm.email.trim() && !recruitForm.email.includes('@')) {
        alert('Please enter a valid email address');
        return;
      }

      // Here you would typically send to your backend
      const fullName = `${recruitForm.firstName} ${recruitForm.surname || ''}`.trim();
      const recruitData = {
        name: fullName,
        email: recruitForm.email,
        phone: recruitForm.phone,
        location: recruitForm.location,
        notes: recruitForm.notes,
        receivedSalvation: recruitForm.receivedSalvation,
        affiliateLink: affiliateLink,
        timestamp: new Date().toISOString()
      };

      console.log('Recruit form submitted:', recruitData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setRecruitSuccess(true);
      setTimeout(() => {
        setRecruitSuccess(false);
        setRecruitForm({
          firstName: '',
          surname: '',
          email: '',
          phone: '',
          location: '',
          notes: '',
          receivedSalvation: false
        });
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Failed to submit recruit form:', error);
    }
  };

  const updateRecruitForm = (field: string, value: string | boolean) => {
    setRecruitForm(prev => ({ ...prev, [field]: value }));
  };

  // Get user's current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Use reverse geocoding to get city/state from coordinates
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
          );
          const data = await response.json();

          const location = `${data.city || data.locality || ''}, ${data.principalSubdivision || data.countryName || ''}`.trim();
          updateRecruitForm('location', location || `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
        } catch (error) {
          // Fallback to coordinates if geocoding fails
          updateRecruitForm('location', `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
        } finally {
          setIsGettingLocation(false);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get your location. Please enter it manually.');
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  if (!isOpen) return null;

  // Font size options
  const fontSizes = [10, 12, 14, 16];
  const fontSizeLabels = { 10: 'Small', 12: 'Medium', 14: 'Large', 16: 'Extra Large' };

  // Gospel Script content with improved wording based on evangelism principles
  const gospelScript = {
    opening: `Has anyone ever told you that God loves you and has a wonderful plan for your life?

I have a quick but important question: If you died right now, do you know for certain, beyond any doubt, that you'd go to Heaven?

Many people are searching for real hope and peace. The Bible says God has the answer for that longing in your heart.`,

    scripture: `The Bible tells us:

"For all have sinned and fall short of the glory of God." (Romans 3:23)

That's all of us - we all miss the mark sometimes.

"For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord." (Romans 6:23)

Sin separates us from God, but Jesus paid the price for our sins.

"For whoever calls on the name of the Lord shall be saved." (Romans 10:13)

And you're a "whoever"! God loves you personally and wants a relationship with you.`,

    prayer: `If you'd like to receive God's gift of eternal life and peace, pray this with me from your heart:

Lord Jesus, I know I'm a sinner and need Your forgiveness.
I believe You died on the cross for my sins and rose again on the third day.
I repent of my sins and ask You to come into my heart as my Lord and Savior.
Thank You for forgiving me and giving me eternal life.
Fill me with Your Holy Spirit and help me follow You every day.
I receive Your peace and hope right now.
In Jesus' name, Amen.`,

    declaration: `🎉 Congratulations! You're now a child of God!

"For as many as received Him, to them He gave the right to become children of God." (John 1:12)

Welcome to the family of God! Your sins are forgiven, and you have eternal life through Jesus Christ. God has a wonderful plan for your life, and He's just getting started with you!

The Bible says: "Do not be conformed to the patterns of this world, but be transformed by the renewing of your mind." (Romans 12:1-2)

I want you to experience your best life - the life God has prepared for you! This is just the beginning of your amazing journey with Jesus. Remember, it's a step-by-step process, and if you draw near to Him, He promises to draw near to you.`
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <UserPlus className="h-6 w-6 text-orange-400" />
            <h3 className="text-lg sm:text-xl font-bold text-white heading-font">Add New Recruit</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Collapsible Gospel Script */}
        <div className="px-4 sm:px-6 pt-4">
          <button
            onClick={() => setIsScriptExpanded(!isScriptExpanded)}
            className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg hover:from-blue-500/15 hover:to-purple-500/15 transition-all duration-200 mb-4"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <div className="text-left">
                <h3 className="text-blue-300 font-semibold text-sm sm:text-base">📖 Gospel Script</h3>
                <p className="text-blue-200 text-xs">Tap to share the Good News</p>
              </div>
            </div>
            <div className={`transform transition-transform duration-200 ${isScriptExpanded ? 'rotate-180' : ''}`}>
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          {/* Font Size Toggle - Only show when script is expanded */}
          {isScriptExpanded && (
            <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Font Size:</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFontSize(Math.max(10, fontSize - 2))}
                    className="p-1 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded transition-colors"
                    disabled={fontSize <= 10}
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm text-white min-w-[60px] text-center">
                    {fontSizeLabels[fontSize as keyof typeof fontSizeLabels]}
                  </span>
                  <button
                    onClick={() => setFontSize(Math.min(16, fontSize + 2))}
                    className="p-1 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded transition-colors"
                    disabled={fontSize >= 16}
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Gospel Script Content - Only show when expanded */}
          {isScriptExpanded && (
            <div className="mt-4 space-y-4">
              {/* Opening Question */}
              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <h4 className="text-blue-300 font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Opening Question
                </h4>
                <p className={`text-gray-200 leading-relaxed whitespace-pre-line`} style={{ fontSize: `${fontSize}px` }}>
                  {gospelScript.opening}
                </p>
              </div>

              {/* Scripture Sharing */}
              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h4 className="text-green-300 font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Scripture Sharing
                </h4>
                <p className={`text-gray-200 leading-relaxed whitespace-pre-line`} style={{ fontSize: `${fontSize}px` }}>
                  {gospelScript.scripture}
                </p>
              </div>

              {/* Salvation Prayer */}
              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <h4 className="text-purple-300 font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  Salvation Prayer
                </h4>
                <p className={`text-gray-200 leading-relaxed whitespace-pre-line font-medium`} style={{ fontSize: `${fontSize}px` }}>
                  {gospelScript.prayer}
                </p>
              </div>

              {/* Declaration */}
              <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
                <h4 className="text-yellow-300 font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  Declaration
                </h4>
                <p className={`text-gray-200 leading-relaxed whitespace-pre-line`} style={{ fontSize: `${fontSize}px` }}>
                  {gospelScript.declaration}
                </p>
              </div>

              {/* Follow-up Invitation */}
              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h4 className="text-green-300 font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Stay Connected
                </h4>
                <p className={`text-gray-200 leading-relaxed`} style={{ fontSize: `${fontSize}px` }}>
                  Now that you're part of God's family, I'd love to stay in touch and help you grow in your relationship with Jesus! Can you fill out your details below so I can follow up with you?
                </p>
                <div className="mt-3 p-3 bg-green-500/20 border border-green-500/40 rounded">
                  <p className="text-green-200 text-sm">
                    📱 <strong>Next Steps:</strong> We'll send you welcome materials and connect you with local church resources to help you grow in your faith journey.
                  </p>
                  <p className="text-green-200 text-sm mt-2">
                    📚 <strong>Your Journey:</strong> Remember, following Jesus is a step-by-step journey. I'll send you information on how to stay connected and learn more about God. If you draw near to Him, He promises to draw near to you!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Content - Form Section */}
        <div className="px-4 sm:px-6 pb-4 pt-6">


          {recruitSuccess ? (
            <div className="text-center py-6 sm:py-8">
              <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-4" />
              <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                {recruitForm.receivedSalvation ? 'Welcome Message Sent!' : 'Invitation Sent!'}
              </h4>
              <p className="text-gray-400 text-sm sm:text-base">
                {recruitForm.receivedSalvation
                  ? 'Congratulations message sent! Welcome to the family of God!'
                  : 'Salvation invitation sent successfully via email and SMS. Contact details saved for follow-up!'
                }
              </p>
            </div>
          ) : (
            <form onSubmit={handleRecruitSubmit} className="space-y-4">
              {/* Contact Information Header */}
              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg mb-4">
                <h4 className="text-blue-300 font-semibold mb-2">📝 Contact Information</h4>
                <p className="text-blue-200 text-sm">
                  Help us stay connected and provide resources for your spiritual growth journey.
                </p>
              </div>

              {/* First Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  First Name *
                </label>
                <div className="relative">
                  <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    value={recruitForm.firstName}
                    onChange={(e) => updateRecruitForm('firstName', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 pl-10 pr-3 py-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm sm:text-base"
                    placeholder="Enter first name"
                    required
                  />
                </div>
              </div>

              {/* Surname Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Surname <span className="text-gray-500">(optional)</span>
                </label>
                <div className="relative">
                  <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    value={recruitForm.surname}
                    onChange={(e) => updateRecruitForm('surname', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 pl-10 pr-3 py-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm sm:text-base"
                    placeholder="Enter surname"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address <span className="text-orange-400">(provide email OR mobile)</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="email"
                    value={recruitForm.email}
                    onChange={(e) => updateRecruitForm('email', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 pl-10 pr-3 py-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm sm:text-base"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Mobile Number <span className="text-orange-400">(provide email OR mobile)</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="tel"
                    value={recruitForm.phone}
                    onChange={(e) => updateRecruitForm('phone', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 pl-10 pr-3 py-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm sm:text-base"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Location Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Location/City
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    value={recruitForm.location}
                    onChange={(e) => updateRecruitForm('location', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 pl-10 pr-16 py-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm sm:text-base"
                    placeholder="City, State or use GPS"
                  />
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={isGettingLocation}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white px-2 py-1 text-xs font-medium transition-colors rounded"
                  >
                    {isGettingLocation ? '...' : 'GPS'}
                  </button>
                </div>
              </div>

              {/* Salvation Status */}
              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={recruitForm.receivedSalvation}
                    onChange={(e) => updateRecruitForm('receivedSalvation', e.target.checked)}
                    className="mt-1 w-6 h-6 text-orange-600 bg-gray-800 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
                  />
                  <div>
                    <span className="text-orange-300 font-semibold text-sm">✅ They received salvation during this conversation</span>
                    <p className="text-orange-200 text-xs mt-1">
                      Check this if they prayed the salvation prayer and accepted Jesus as their Lord and Savior right now.
                    </p>
                  </div>
                </label>
              </div>

              {/* Notes Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Follow-up Notes
                </label>
                <textarea
                  value={recruitForm.notes}
                  onChange={(e) => updateRecruitForm('notes', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 px-3 py-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 h-20 sm:h-24 resize-none text-sm sm:text-base"
                  placeholder="Any specific prayer requests, questions, or notes about their spiritual journey?"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 font-medium transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white py-3 px-4 font-bold uppercase tracking-wide text-sm shadow-lg hover:shadow-orange-500/25 transition-all duration-200"
                >
                  {recruitForm.receivedSalvation ? 'Send Welcome Message' : 'Send Salvation Invitation'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}