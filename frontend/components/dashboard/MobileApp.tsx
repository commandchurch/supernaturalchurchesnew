import React, { useState, useEffect } from 'react';
import { Smartphone, Download, CheckCircle, AlertCircle, Apple, Smartphone as AndroidIcon, Zap, Wifi, WifiOff } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function MobileApp() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'other'>('other');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    // Detect platform
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setPlatform('ios');
    } else if (/android/.test(userAgent)) {
      setPlatform('android');
    }

    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;

    if (isStandalone || isInWebAppiOS) {
      setIsInstalled(true);
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setIsInstallable(false);
    };

    // Check notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }

    // Listen for online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        setIsInstalled(true);
      }

      setDeferredPrompt(null);
      setIsInstallable(false);
    } catch (error) {
      console.error('Install prompt failed:', error);
    }
  };

  const handleIOSInstructions = () => {
    alert('To install on iOS:\n1. Tap the Share button (📤)\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add" in the top right');
  };

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);

      if (permission === 'granted') {
        // Register for push notifications with service worker
        if ('serviceWorker' in navigator) {
          const registration = await navigator.serviceWorker.ready;
          // You can add push subscription logic here if needed
          console.log('Push notifications enabled');
        }
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Online/Offline Status */}
      <div className={`flex items-center gap-3 p-4 rounded-lg border ${
        isOnline
          ? 'bg-green-500/10 border-green-500/20 text-green-400'
          : 'bg-red-500/10 border-red-500/20 text-red-400'
      }`}>
        {isOnline ? <Wifi className="h-5 w-5" /> : <WifiOff className="h-5 w-5" />}
        <span className="font-medium">
          {isOnline ? 'Online - All features available' : 'Offline - Limited functionality'}
        </span>
        {!isOnline && (
          <span className="text-sm opacity-75">
            Your data will sync when connection is restored
          </span>
        )}
      </div>

      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-3 lg:mb-4">
          <Smartphone className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Mobile App</h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm lg:text-base px-4">
          Download our mobile app for the best experience. Same features as the website, optimized for mobile devices.
        </p>
      </div>

      {/* Installation Status */}
      <div className="bg-gray-800 rounded-lg p-4 lg:p-6 border border-gray-700">
        {isInstalled ? (
          <div className="text-center">
            <CheckCircle className="w-10 h-10 lg:w-12 lg:h-12 text-green-500 mx-auto mb-3 lg:mb-4" />
            <h3 className="text-lg lg:text-xl font-semibold text-white mb-2">App Installed!</h3>
            <p className="text-gray-400 mb-3 lg:mb-4 text-sm lg:text-base">
              You're using the Supernatural Institute mobile app. Enjoy the optimized experience!
            </p>
            <div className="flex items-center justify-center gap-2 text-green-400">
              <Zap className="h-4 w-4" />
              <span className="text-xs lg:text-sm">Push notifications enabled</span>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <Download className="w-10 h-10 lg:w-12 lg:h-12 text-orange-500 mx-auto mb-3 lg:mb-4" />
            <h3 className="text-lg lg:text-xl font-semibold text-white mb-2">Install Mobile App</h3>
            <p className="text-gray-400 mb-4 lg:mb-6 text-sm lg:text-base px-4">
              Get instant access to all features with push notifications and offline support.
            </p>

            {/* Platform-specific installation */}
            {platform === 'ios' && (
              <div className="space-y-3 lg:space-y-4">
                <div className="flex items-center justify-center gap-3 lg:gap-4">
                  <Apple className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400" />
                  <span className="text-white font-medium text-sm lg:text-base">iOS Installation</span>
                </div>
                <button
                  onClick={handleIOSInstructions}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-medium transition-colors text-sm lg:text-base"
                >
                  Show iOS Installation Steps
                </button>
                <p className="text-xs lg:text-sm text-gray-500 px-4">
                  Tap the Share button (📤) → Add to Home Screen
                </p>
              </div>
            )}

            {platform === 'android' && isInstallable && (
              <div className="space-y-3 lg:space-y-4">
                <div className="flex items-center justify-center gap-3 lg:gap-4">
                  <AndroidIcon className="w-6 h-6 lg:w-8 lg:h-8 text-green-500" />
                  <span className="text-white font-medium text-sm lg:text-base">Android Installation</span>
                </div>
                <button
                  onClick={handleInstallClick}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-medium transition-colors text-sm lg:text-base"
                >
                  Install App Now
                </button>
                <p className="text-xs lg:text-sm text-gray-500 px-4">
                  Add to Home Screen for the best experience
                </p>
              </div>
            )}

            {platform === 'android' && !isInstallable && (
              <div className="space-y-3 lg:space-y-4">
                <AlertCircle className="w-10 h-10 lg:w-12 lg:h-12 text-yellow-500 mx-auto mb-3 lg:mb-4" />
                <h4 className="text-base lg:text-lg font-medium text-white mb-2">Browser Not Supported</h4>
                <p className="text-gray-400 mb-3 lg:mb-4 text-sm lg:text-base px-4">
                  For the best experience, please use Chrome, Edge, or Samsung Internet browser.
                </p>
                <div className="flex items-center justify-center gap-3 lg:gap-4">
                  <AndroidIcon className="w-6 h-6 lg:w-8 lg:h-8 text-green-500" />
                  <span className="text-white font-medium text-sm lg:text-base">Android Installation</span>
                </div>
                <p className="text-xs lg:text-sm text-gray-500 px-4">
                  Open in Chrome → Tap menu (⋮) → Add to Home Screen
                </p>
              </div>
            )}

            {platform === 'other' && (
              <div className="space-y-3 lg:space-y-4">
                <AlertCircle className="w-10 h-10 lg:w-12 lg:h-12 text-yellow-500 mx-auto mb-3 lg:mb-4" />
                <h4 className="text-base lg:text-lg font-medium text-white mb-2">Desktop Browser</h4>
                <p className="text-gray-400 text-sm lg:text-base px-4">
                  Mobile app installation is available on iOS and Android devices.
                  You're currently on a desktop browser.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile App Download */}
      {!isInstalled && (
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4 lg:p-6">
          <div className="flex items-center gap-3 mb-3 lg:mb-4">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Download className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg lg:text-xl font-semibold text-white">Download Mobile App</h3>
              <p className="text-gray-400 text-sm lg:text-base">Get the full experience with push notifications and offline access</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Push notifications for ministry updates</span>
            </div>
            <div className="flex items-center gap-3 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Offline access to courses and content</span>
            </div>
            <div className="flex items-center gap-3 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Quick recruit capture on the go</span>
            </div>

            {platform === 'ios' && (
              <button
                onClick={handleIOSInstructions}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Apple className="h-5 w-5" />
                Download for iOS
              </button>
            )}

            {platform === 'android' && isInstallable && (
              <button
                onClick={handleInstallClick}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <AndroidIcon className="h-5 w-5" />
                Install Android App
              </button>
            )}

            {platform === 'android' && !isInstallable && (
              <div className="space-y-3">
                <div className="text-center text-gray-400 text-sm">
                  Open in Chrome browser for installation
                </div>
                <button
                  onClick={() => window.open('https://play.google.com/store/apps/detail?id=com.supernatural.institute', '_blank')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <AndroidIcon className="h-5 w-5" />
                  Get on Google Play
                </button>
              </div>
            )}

            {platform === 'other' && (
              <div className="text-center text-gray-400 text-sm">
                Mobile app available on iOS and Android devices
              </div>
            )}
          </div>
        </div>
      )}

      {/* Push Notifications */}
      {isInstalled && (
        <div className="bg-gray-800 rounded-lg p-4 lg:p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-3 lg:mb-4">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm lg:text-lg">🔔</span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg lg:text-xl font-semibold text-white">Push Notifications</h3>
              <p className="text-gray-400 text-sm lg:text-base">Stay connected with ministry updates and prayer requests</p>
            </div>
          </div>

          {notificationPermission === 'granted' ? (
            <div className="flex items-center gap-3 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span>Push notifications enabled</span>
            </div>
          ) : notificationPermission === 'denied' ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-red-400">
                <AlertCircle className="w-5 h-5" />
                <span>Notifications blocked</span>
              </div>
              <p className="text-gray-400 text-sm">
                To enable notifications, go to your browser settings and allow notifications for this site.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-gray-300">
                Enable push notifications to receive updates about prayer requests, ministry opportunities, and important announcements.
              </p>
              <button
                onClick={requestNotificationPermission}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Enable Notifications
              </button>
            </div>
          )}
        </div>
      )}

      {/* Features Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="bg-gray-800 rounded-lg p-4 lg:p-6 border border-gray-700">
          <h3 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4">Mobile App Features</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-300">Push notifications for prayer updates</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-300">Offline access to courses</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-300">Native mobile performance</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-300">Home screen integration</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-300">Camera integration for testimonies</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-300">Quick recruit capture</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 lg:p-6 border border-gray-700">
          <h3 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4">Why Mobile App?</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <span className="text-gray-300">3x higher engagement than mobile web</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <span className="text-gray-300">Push notifications for ministry updates</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <span className="text-gray-300">No app store approval needed</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <span className="text-gray-300">Automatic updates</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <span className="text-gray-300">Works offline for key features</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <span className="text-gray-300">Instant recruit capture</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Installation Instructions */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-4 lg:p-6 border border-gray-700">
        <h3 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4">Installation Instructions</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* iOS Instructions */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Apple className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400 flex-shrink-0" />
              <span className="text-white font-medium text-sm lg:text-base">iOS (iPhone/iPad)</span>
            </div>
            <ol className="text-gray-400 text-xs lg:text-sm space-y-2 px-2">
              <li>1. Open Safari browser</li>
              <li>2. Visit supernatural.institute</li>
              <li>3. Tap the Share button (📤)</li>
              <li>4. Scroll down, tap "Add to Home Screen"</li>
              <li>5. Tap "Add" in the top right</li>
            </ol>
          </div>

          {/* Android Instructions */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <AndroidIcon className="w-5 h-5 lg:w-6 lg:h-6 text-green-500 flex-shrink-0" />
              <span className="text-white font-medium text-sm lg:text-base">Android</span>
            </div>
            <ol className="text-gray-400 text-xs lg:text-sm space-y-2 px-2">
              <li>1. Open Chrome browser</li>
              <li>2. Visit supernatural.institute</li>
              <li>3. Tap menu (⋮) or "Install app"</li>
              <li>4. Tap "Install" or "Add to Home Screen"</li>
              <li>5. Follow the prompts</li>
            </ol>
          </div>
        </div>

        <div className="mt-4 lg:mt-6 p-3 lg:p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
          <p className="text-orange-400 text-xs lg:text-sm px-2">
            <strong>💡 Pro Tip:</strong> After installing, tap and hold the app icon to add quick actions like "Add Recruit" directly to your home screen!
          </p>
        </div>

        <div className="mt-3 lg:mt-4 p-3 lg:p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-blue-400 text-xs lg:text-sm px-2">
            <strong>🎯 Perfect for Ministry:</strong> Capture leads instantly during conversations, events, or meetings.
            No more fumbling with notes or losing contact information!
          </p>
        </div>
      </div>
    </div>
  );
}
