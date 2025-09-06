import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { Users, Key, CheckCircle, AlertCircle, BookOpen, Crown } from 'lucide-react';

interface CourseAccessProps {
  onAccessGranted: (accessCode: string) => void;
  onAccessRevoked: () => void;
}

export default function CourseAccess({ onAccessGranted, onAccessRevoked }: CourseAccessProps) {
  const { user } = useUser();
  const [accessCode, setAccessCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [currentAccess, setCurrentAccess] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing access
    const storedAccess = localStorage.getItem('churchAccess');
    if (storedAccess) {
      setCurrentAccess(storedAccess);
    }
  }, []);

  const verifyAccessCode = async () => {
    if (!accessCode.trim()) {
      setError('Please enter an access code');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      // In a real app, this would be an API call to verify the church access code
      // For now, we'll use a mock verification
      const validCodes = {
        'faithchurch': { name: 'Faith Church', location: 'Sydney, NSW', members: 250 },
        'hopeassembly': { name: 'Hope Assembly', location: 'Melbourne, VIC', members: 180 },
        'gracechapel': { name: 'Grace Chapel', location: 'Brisbane, QLD', members: 320 },
        'spiritcenter': { name: 'Spirit Center', location: 'Perth, WA', members: 150 },
        'kingdomfellowship': { name: 'Kingdom Fellowship', location: 'Adelaide, SA', members: 200 },
        'crossroadscommunity': { name: 'Crossroads Community', location: 'Darwin, NT', members: 95 }
      };

      const code = accessCode.toLowerCase();

      if (validCodes[code as keyof typeof validCodes]) {
        const church = validCodes[code as keyof typeof validCodes];
        localStorage.setItem('churchAccess', code);
        localStorage.setItem('churchInfo', JSON.stringify(church));
        setCurrentAccess(code);
        onAccessGranted(code);

        // Track access for analytics
        localStorage.setItem('churchAccessGranted', new Date().toISOString());
      } else {
        setError('Invalid access code. Please check with your church leader.');
      }
    } catch (err) {
      setError('Failed to verify access code. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const revokeAccess = () => {
    localStorage.removeItem('churchAccess');
    localStorage.removeItem('churchInfo');
    localStorage.removeItem('churchAccessGranted');
    setCurrentAccess(null);
    setAccessCode('');
    onAccessRevoked();
  };

  const getChurchInfo = () => {
    try {
      const info = localStorage.getItem('churchInfo');
      return info ? JSON.parse(info) : null;
    } catch {
      return null;
    }
  };

  const churchInfo = getChurchInfo();

  if (currentAccess) {
    return (
      <div className="bg-green-900/20 border border-green-500/30 p-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="h-6 w-6 text-green-400" />
          <h3 className="text-xl font-bold text-white heading-font">Church Access Active</h3>
        </div>

        {churchInfo && (
          <div className="bg-gray-800/50 p-4 mb-4 border border-gray-600/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Church:</span>
                <p className="text-white font-semibold">{churchInfo.name}</p>
              </div>
              <div>
                <span className="text-gray-400">Location:</span>
                <p className="text-white font-semibold">{churchInfo.location}</p>
              </div>
              <div>
                <span className="text-gray-400">Members:</span>
                <p className="text-white font-semibold">{churchInfo.members}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-green-400">
            <Users className="h-4 w-4" />
            <span className="text-sm">Access Code: <strong>{currentAccess}</strong></span>
          </div>

          <button
            onClick={revokeAccess}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm font-semibold uppercase tracking-wide"
          >
            Revoke Access
          </button>
        </div>

        <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30">
          <div className="flex items-start gap-2">
            <BookOpen className="h-4 w-4 text-blue-400 mt-0.5" />
            <div>
              <p className="text-blue-400 text-sm font-semibold">Church Courses Available</p>
              <p className="text-gray-300 text-xs mt-1">
                You now have access to all church-specific training materials and congregation courses.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Key className="h-6 w-6 text-blue-400" />
        <h3 className="text-xl font-bold text-white heading-font">Church Access</h3>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-gray-300 mb-3">
            Church courses are available exclusively to members of partnered churches.
            Enter your church's affiliate link username to gain access to congregation-specific training materials.
          </p>

          <div className="bg-yellow-900/20 border border-yellow-500/30 p-3 mb-4">
            <div className="flex items-start gap-2">
              <Crown className="h-4 w-4 text-yellow-400 mt-0.5" />
              <div>
                <p className="text-yellow-400 text-sm font-semibold">Premium Church Content</p>
                <p className="text-gray-300 text-xs mt-1">
                  Access discipleship programs, leadership training, and congregation-specific courses designed for church growth.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Church Access Code
            </label>
            <input
              type="text"
              placeholder="Enter your church access code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
              disabled={isVerifying}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-900/20 border border-red-500/30 p-3">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <button
            onClick={verifyAccessCode}
            disabled={isVerifying || !accessCode.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 font-semibold uppercase tracking-wide"
          >
            {isVerifying ? 'Verifying...' : 'Grant Church Access'}
          </button>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">
            Don't have an access code?
          </p>
          <Link
            to="/contact"
            className="text-blue-400 hover:text-blue-300 text-sm underline"
          >
            Contact your church leader
          </Link>
        </div>

        <div className="bg-gray-900/50 border border-gray-600/30 p-3">
          <p className="text-gray-400 text-xs">
            <strong>Note:</strong> Church access codes are provided by your church leadership team.
            These codes give you access to specialized training materials designed specifically for your congregation's growth and development.
          </p>
        </div>
      </div>
    </div>
  );
}

