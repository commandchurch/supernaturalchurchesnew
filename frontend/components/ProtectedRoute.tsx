import React from 'react';
import { useUser, SignInButton, UserButton } from '@clerk/clerk-react';
import { Loader2, Lock, Shield } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, isLoaded, isSignedIn } = useUser();

  // Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Not signed in - show auth modal
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="max-w-md mx-auto text-center bg-gray-900 border border-gray-700 p-8 rounded-lg">
          <div className="mb-6">
            {requireAdmin ? (
              <Shield className="h-16 w-16 text-orange-500 mx-auto mb-4" />
            ) : (
              <Lock className="h-16 w-16 text-orange-500 mx-auto mb-4" />
            )}
            <h1 className="text-2xl font-bold text-white mb-2">
              {requireAdmin ? 'Admin Access Required' : 'Sign In Required'}
            </h1>
            <p className="text-gray-400">
              {requireAdmin 
                ? 'You need administrator privileges to access this area.'
                : 'Please sign in to access your dashboard and account features.'
              }
            </p>
          </div>
          
          <SignInButton mode="modal">
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded transition-colors">
              Sign In / Sign Up
            </button>
          </SignInButton>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-sm text-gray-500">
              New to Supernatural Institute? Signing up is free and takes just seconds.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Check admin access if required
  if (requireAdmin) {
    const adminEmails = [
      'commandchurch@gmail.com',
      'supernaturalchurches.australia@gmail.com', 
      'supernaturalinstitute.australia@gmail.com'
    ];
    
    const userEmail = user?.emailAddresses?.[0]?.emailAddress;
    const isAdmin = user?.publicMetadata?.role === 'admin' || 
                   adminEmails.includes(userEmail || '');
    
    if (!isAdmin) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="max-w-md mx-auto text-center bg-gray-900 border border-gray-700 p-8 rounded-lg">
            <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
            <p className="text-gray-400 mb-6">
              You don't have administrator privileges to access this area.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <UserButton afterSignOutUrl="/" />
                <span className="text-gray-500 text-sm">Signed in as {user?.emailAddresses?.[0]?.emailAddress}</span>
              </div>
              <button
                onClick={() => window.history.back()}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                ← Go Back
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  // User is authenticated and authorized
  return <>{children}</>;
}
