import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Download,
  Bell,
  Wifi,
  WifiOff,
  Monitor,
  Apple,
  Smartphone as Android,
  Camera,
  UserPlus,
  Zap,
  Star,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react';

const MobileAppSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';

      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent));
      setIsIOS(/iPad|iPhone|iPod/.test(userAgent));
      setIsAndroid(/Android/.test(userAgent));
    };

    checkDevice();
  }, []);

  const features = [
    {
      icon: Bell,
      title: "Push Notifications",
      description: "Get instant notifications for ministry updates, prayer requests, and course progress"
    },
    {
      icon: WifiOff,
      title: "Offline Access",
      description: "Access courses, notes, and resources even without internet connection"
    },
    {
      icon: Zap,
      title: "Native Performance",
      description: "Lightning-fast loading and smooth navigation optimized for mobile"
    },
    {
      icon: Camera,
      title: "Camera Integration",
      description: "Capture testimonies, photos, and content directly in the app"
    },
    {
      icon: UserPlus,
      title: "Quick Recruit Capture",
      description: "Instantly add new recruits during conversations and events"
    },
    {
      icon: Star,
      title: "Home Screen Integration",
      description: "Add quick actions like 'Add Recruit' directly to your home screen"
    }
  ];

  const iosInstructions = [
    "Open Safari browser on your iOS device",
    "Visit supernatural.institute",
    "Tap the Share button (📤) in the browser",
    "Scroll down and tap 'Add to Home Screen'",
    "Tap 'Add' in the top right corner",
    "The app icon will appear on your home screen"
  ];

  const androidInstructions = [
    "Open Chrome browser on your Android device",
    "Visit supernatural.institute",
    "Tap the menu button (⋮) or 'Install app'",
    "Tap 'Install' or 'Add to Home Screen'",
    "Follow the installation prompts",
    "The app will be added to your home screen"
  ];

  return (
    <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-2xl p-6 lg:p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-blue-500/20 border border-blue-500/40 px-4 py-2 rounded-full mb-6">
          <Smartphone className="h-5 w-5 text-blue-400" />
          <span className="text-blue-400 font-semibold text-sm">MOBILE APP</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 heading-font">
          Download Our Mobile App
        </h2>

        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-6">
          Get the full Supernatural Institute experience optimized for mobile devices with push notifications and offline access.
        </p>

        {/* Device Status */}
        <div className="inline-flex items-center gap-2 bg-gray-800/50 border border-gray-600 px-4 py-2 rounded-lg mb-6">
          {isMobile ? (
            <>
              <Smartphone className="h-4 w-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">
                {isIOS ? 'iOS Device Detected' : isAndroid ? 'Android Device Detected' : 'Mobile Device'}
              </span>
            </>
          ) : (
            <>
              <Monitor className="h-4 w-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Desktop Browser</span>
            </>
          )}
        </div>
      </div>

      {/* Main CTA */}
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-xl mb-6">
          <h3 className="text-xl font-bold text-white mb-2">Install Mobile App</h3>
          <p className="text-blue-100 mb-4">
            Get instant access to all features with push notifications and offline support.
          </p>
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 font-bold rounded-lg shadow-lg transition-colors flex items-center gap-2 mx-auto"
          >
            <Download className="h-5 w-5" />
            Download Mobile App
            {showInstructions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>

        {!isMobile && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
            <p className="text-yellow-200 text-sm">
              📱 Mobile app installation is available on iOS and Android devices. You're currently on a desktop browser.
            </p>
          </div>
        )}
      </div>

      {/* Installation Instructions */}
      {showInstructions && (
        <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6 mb-8">
          {(isIOS || (!isMobile && !isAndroid)) && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Apple className="h-5 w-5 text-gray-300" />
                <h4 className="text-lg font-semibold text-white">iOS Installation</h4>
              </div>
              <ol className="space-y-2 text-gray-300 text-sm">
                {iosInstructions.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="bg-blue-500/20 text-blue-400 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {(isAndroid || (!isMobile && !isIOS)) && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Android className="h-5 w-5 text-green-400" />
                <h4 className="text-lg font-semibold text-white">Android Installation</h4>
              </div>
              <ol className="space-y-2 text-gray-300 text-sm">
                {androidInstructions.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="bg-green-500/20 text-green-400 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-gray-800/50 border border-gray-600/50 p-4 rounded-lg hover:bg-gray-800/70 transition-colors">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 bg-blue-500/20 border border-blue-500/40 flex items-center justify-center rounded-lg flex-shrink-0">
                <feature.icon className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Why Mobile App */}
      <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-green-400" />
          Why Mobile App?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium">3x Higher Engagement</p>
              <p className="text-gray-300 text-sm">Than mobile web browsing</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Bell className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium">Push Notifications</p>
              <p className="text-gray-300 text-sm">Stay updated with ministry alerts</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <WifiOff className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium">Works Offline</p>
              <p className="text-gray-300 text-sm">Access content without internet</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <UserPlus className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium">Instant Recruit Capture</p>
              <p className="text-gray-300 text-sm">Never lose a lead again</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
          <p className="text-blue-200 text-sm">
            💡 <strong>Pro Tip:</strong> After installing, tap and hold the app icon to add quick actions like "Add Recruit" directly to your home screen!
          </p>
        </div>

        <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg mt-4">
          <p className="text-orange-200 text-sm">
            🎯 <strong>Perfect for Ministry:</strong> Capture leads instantly during conversations, events, or meetings. No more fumbling with notes or losing contact information!
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileAppSection;


