import React, { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, Linkedin, Twitter, Youtube, LayoutDashboard } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import SEO from './SEO';
import { siteName, siteUrl } from '../config';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { name: 'HOME', path: '/' },
  { name: 'TRAINING', path: '/academy' },
  { name: 'MEMBERSHIP', path: '/membership' },
  { name: 'OUTREACH', path: '/soul-outreach' },
  { name: 'GIVE', path: '/give' },
  { name: 'ABOUT', path: '/about' },
  { name: 'FIND A CHURCH', path: '/find-church' },
];

  const footerLinks = [
    { name: 'GIVE', path: '/give' },
    { name: 'Statement of Faith', path: '/statement-of-faith' },
    { name: 'Legal', path: '/legal' },
    { name: 'Admin', path: '/admin' },
  ];

const socialLinks = [
  { name: 'Facebook', href: 'https://www.facebook.com/supernaturalchurches/', icon: Facebook },
  { name: 'LinkedIn', href: 'https://au.linkedin.com/company/supernatural-institute', icon: Linkedin },
  { name: 'X', href: 'https://x.com/SupernaturalInst', icon: Twitter },
  { name: 'Youtube', href: 'https://www.youtube.com/@supernaturalinstitute', icon: Youtube },
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: "https://supernaturalchurches.org.au/logo.png",
  description: "God's supernatural ministry training believers to be fully equipped for Kingdom advancement. Master signs, wonders, miracles and apply faith to every aspect of life.",
  foundingDate: "2020",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "info@supernaturalchurches.org.au"
  },
  sameAs: [
    "https://www.facebook.com/supernaturalchurches/",
    "https://x.com/SupernaturalInst",
    "https://www.youtube.com/@supernaturalinstitute",
    "https://au.linkedin.com/company/supernatural-institute"
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Supernatural Institute of Ministry Training Programs",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "Institute of Ministry Training",
          description: "Complete ministry training courses for supernatural believers equipped for Kingdom advancement"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "Kingdom Business Training",
          description: "Supernatural principles for business and ministry entrepreneurship"
        }
      }
    ]
  }
};

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isSignedIn } = useUser();

  const isActivePath = useCallback((path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="Supernatural Institute - TRAIN. EQUIP. TRANSFORM."
        description="The Premier Supernatural Ministry Training Platform. Professional SCHOOL-level training with miraculous results. Professional supernatural ministry education."
        type="website"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@700;900&family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
      </Helmet>
      <style>
        {`
          body { font-family: 'Inter', sans-serif; background-color: #000; background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px); background-size: 32px 32px; }
          .heading-font { font-family: 'Archivo', sans-serif; font-weight: 700; text-transform: uppercase; letter-spacing: -0.02em; }
          .nav-active { color: #FFFFFF; }
          .skip-link { position: absolute; left: -999px; top: auto; width: 1px; height: 1px; overflow: hidden; z-index: -999; }
          .skip-link:focus { left: 1rem; top: 1rem; width: auto; height: auto; z-index: 9999; background: #fff; color: #000; padding: 0.5rem 0.75rem; outline: 2px solid #fff; }
        `}
      </style>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800" role="navigation" aria-label="Primary">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <Link to="/" className="flex items-center gap-3" aria-label="Home">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white flex items-center justify-center">
                <span className="text-black font-black text-xl sm:text-2xl heading-font">S</span>
              </div>
              <h1 className="heading-font text-lg sm:text-xl tracking-wider">SUPERNATURAL INSTITUTE</h1>
            </Link>
            <nav className="hidden lg:flex items-center space-x-4 sm:space-x-6" aria-label="Main">
              {navItems.map((item) => (
                <Link key={item.name} to={item.path} aria-current={isActivePath(item.path) ? "page" : undefined} className={`heading-font text-xs sm:text-sm tracking-widest transition-colors duration-200 ${isActivePath(item.path) ? 'nav-active' : 'text-gray-400 hover:text-white'}`}>
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <div className="hidden lg:flex items-center gap-4">
                <Link to="/dashboard" className="flex items-center bg-white text-black hover:bg-gray-200 px-4 py-2 font-semibold uppercase tracking-wide text-sm">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
                {isSignedIn ? (
                  <UserButton afterSignOutUrl="/" />
                ) : (
                  <SignInButton mode="modal">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 font-semibold uppercase tracking-wide text-sm">
                      Sign In
                    </button>
                  </SignInButton>
                )}
              </div>
              <div className="lg:hidden">
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2" aria-label="Toggle menu" aria-expanded={isMobileMenuOpen ? "true" : "false"} aria-controls="mobile-menu">
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="lg:hidden absolute top-full left-0 w-full bg-black border-t border-gray-800">
            <div className="flex flex-col items-center space-y-6 py-8">
              {navItems.map((item) => (
                <Link key={item.name} to={item.path} aria-current={isActivePath(item.path) ? "page" : undefined} className={`heading-font text-base tracking-widest ${isActivePath(item.path) ? 'nav-active' : 'text-gray-400 hover:text-white'}`} onClick={() => setIsMobileMenuOpen(false)}>
                  {item.name}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-700 w-full flex flex-col items-center gap-4 px-8">
                <Link to="/dashboard" className="w-full flex items-center justify-center bg-white text-black hover:bg-gray-200 px-4 py-3 font-semibold uppercase tracking-wide text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                  Dashboard
                </Link>
                {isSignedIn ? (
                  <div className="flex items-center gap-4">
                    <UserButton afterSignOutUrl="/" />
                    <span className="text-gray-400 text-sm">
                      {user?.firstName || user?.emailAddresses?.[0]?.emailAddress}
                    </span>
                  </div>
                ) : (
                  <SignInButton mode="modal">
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 font-semibold uppercase tracking-wide text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                      Sign In / Sign Up
                    </button>
                  </SignInButton>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
      <main id="main" className="pt-16 sm:pt-20">{children}</main>
      <footer className="bg-black border-t border-gray-800" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <h2 className="heading-font text-xl sm:text-2xl mb-6">{siteName.toUpperCase()}</h2>
            <nav className="flex justify-center flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 mb-8" aria-label="Footer">{footerLinks.map((item) => (
                <Link key={item.name} to={item.path} className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  {item.name.toUpperCase()}
                </Link>
              ))}
            </nav>
            <div className="flex justify-center space-x-5 sm:space-x-6 mb-8">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" aria-label={link.name} title={link.name}>
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </a>
                );
              })}
            </div>
            <p className="text-gray-400 text-xs sm:text-sm">
              © {new Date().getFullYear()} SUPERNATURAL INSTITUTE IS POWERED BY SUPERNATURAL CHURCHES LIMITED ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
