
import React, { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, Linkedin, Twitter, Youtube } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SEO from './SEO';
import { siteName, siteUrl } from '../config';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { name: 'HOME', path: '/' },
  { name: 'PARTNER', path: '/partner' },
  { name: 'GIVE', path: '/give' },
  { name: 'STATEMENT OF FAITH', path: '/statement-of-faith' },
  { name: 'FIND A CHURCH', path: '/find-church' },
  { name: 'CONTACT', path: '/contact' },
];

  const footerLinks = [
    { name: 'GIVE', path: '/give' },
    { name: 'Statement of Faith', path: '/statement-of-faith' },
    { name: 'Legal', path: '/legal' },
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
  logo: "https://supernaturalchurches.org/logo.png",
  description: "Supernatural Churches Limited provides ordination and ensures safe supernatural churches. We guarantee healing teaching that works for everyone, with comprehensive training and vetting processes.",
  foundingDate: "2020",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "info@supernaturalchurches.org"
  },
  sameAs: [
    "https://www.facebook.com/supernaturalchurches/",
    "https://x.com/SupernaturalChurches",
    "https://www.youtube.com/@supernaturalchurches",
    "https://au.linkedin.com/company/supernatural-churches-limited"
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Supernatural Churches Limited Ministry Programs",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "Church Partnership Program",
          description: "Complete church partnership with supernatural training, ordination, and guaranteed healing protocols"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Church Vetting & Safety",
          description: "Comprehensive vetting process ensuring safe supernatural churches for children, leadership, and attendees"
        }
      }
    ]
  }
};

export default function Layout({ children }: LayoutProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

  const isActivePath = useCallback((path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="Supernatural Churches Limited - Safe Supernatural Churches & Ordination"
        description="Supernatural Churches Limited provides ordination and ensures safe supernatural churches. We guarantee healing teaching that works for everyone, with comprehensive training and vetting processes."
        type="website"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Montserrat:wght@700;800&family=Inter:wght@400;500;700&display=swap&v=2025" rel="stylesheet" />
        <link rel="preload" href="https://fonts.gstatic.com/s/dancingscript/v25/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7BMSo3Rep8h-4EePjA.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM70w.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </Helmet>
      <style>
        {`
          :root {
            --font-primary: 'Montserrat', sans-serif;
            --font-accent: 'Dancing Script', cursive;
            --font-body: 'Inter', sans-serif;
            --color-orange: #FF7A1A;
            --color-white: #FFFFFF;
            --color-gray: #CCCCCC;
            --color-gray-light: #888888;
            --color-black: #000000;
          }
          
          body { 
            font-family: var(--font-body); 
            background-color: var(--color-black); 
            background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px); 
            background-size: 32px 32px; 
          }
          
          .heading-font { 
            font-family: var(--font-primary); 
            font-weight: 700; 
            text-transform: uppercase; 
            letter-spacing: -0.02em; 
          }
          
          /* Logo container */
          .logo {
            display: flex;
            align-items: center;
            gap: 6px;
          }
          
          /* Supernatural cursive */
          .logo .supernatural {
            font-family: 'Dancing Script', cursive, 'Brush Script MT', 'Lucida Handwriting', fantasy;
            font-weight: 700;
            font-size: 1.8rem;
            color: #ffffff;
          }
          
          /* CHURCHES bold */
          .logo .churches {
            font-family: 'Montserrat', sans-serif, 'Arial Black', 'Helvetica Bold', sans-serif;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 1.6rem;
            color: #ffffff;
          }
          
          /* Logo hover effect */
          .logo:hover {
            text-shadow: 0 0 8px rgba(255,140,0,0.7);
          }
          
          /* Legacy logo classes for backward compatibility */
          .logo-supernatural { 
            font-family: var(--font-accent); 
            font-size: 1.25em; 
            color: var(--color-white); 
            text-shadow: 0 0 8px rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.5); 
            line-height: 0.9; 
            margin-bottom: -0.1em; 
          }
          
          .logo-churches { 
            font-family: var(--font-primary); 
            font-weight: 800; 
            font-size: 0.85em; 
            color: var(--color-white); 
            text-shadow: 0 0 6px rgba(255,255,255,0.3), 0 2px 3px rgba(0,0,0,0.5); 
            text-transform: uppercase; 
            letter-spacing: -0.02em; 
          }
          
          .scripture-text {
            font-family: var(--font-primary);
            font-style: italic;
            font-weight: 600;
            color: var(--color-orange);
          }
          
          .body-text {
            font-family: var(--font-primary);
            font-weight: 400;
            color: var(--color-white);
          }
          
          .cta-button {
            font-family: var(--font-primary);
            font-weight: 700;
            text-transform: uppercase;
            background-color: var(--color-orange);
            color: var(--color-white);
            padding: 12px 24px;
            border-radius: 4px;
            border: none;
            transition: background-color 0.2s;
          }
          
          .cta-button:hover {
            background-color: #e66a17;
          }
          
          .nav-active { color: var(--color-white); }
          .skip-link { 
            position: absolute; 
            left: -999px; 
            top: auto; 
            width: 1px; 
            height: 1px; 
            overflow: hidden; 
            z-index: -999; 
          }
          .skip-link:focus { 
            left: 1rem; 
            top: 1rem; 
            width: auto; 
            height: auto; 
            z-index: 9999; 
            background: var(--color-white); 
            color: var(--color-black); 
            padding: 0.5rem 0.75rem; 
            outline: 2px solid var(--color-white); 
          }
        `}
      </style>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <nav role="navigation" aria-label="Primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24 py-2">
            <Link to="/" className="flex items-center gap-2 lg:gap-3 mr-4 lg:mr-6 xl:mr-8" aria-label="Home">
              <div className="logo">
                <span className="supernatural">Supernatural</span>
                <span className="churches">CHURCHES</span>
              </div>
            </Link>
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 2xl:space-x-10" aria-label="Main">
              {navItems.map((item) => (
                <Link key={item.name} to={item.path} aria-current={isActivePath(item.path) ? "page" : undefined} className={`heading-font text-xs sm:text-sm tracking-widest transition-colors duration-200 whitespace-nowrap ${isActivePath(item.path) ? 'nav-active' : 'text-gray-400 hover:text-white'}`}>
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4 xl:gap-6 ml-8 xl:ml-12">
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
            <div className="flex flex-col items-center space-y-8 py-10">
              {navItems.map((item) => (
                <Link key={item.name} to={item.path} aria-current={isActivePath(item.path) ? "page" : undefined} className={`heading-font text-base tracking-widest ${isActivePath(item.path) ? 'nav-active' : 'text-gray-400 hover:text-white'}`} onClick={() => setIsMobileMenuOpen(false)}>
                  {item.name}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-700 w-full flex flex-col items-center gap-4 px-8">
              </div>
            </div>
          </div>
        )}
        </nav>
      </header>
      <main id="main" className="pt-16 sm:pt-20">{children}</main>
      <footer className="bg-black border-t border-gray-800" role="contentinfo">
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 ${location.pathname === '/training' ? 'max-w-none md:ml-72 lg:ml-80' : 'max-w-7xl'}`}>
          <div className="text-center">
            <div className="flex flex-col items-center leading-tight mb-6">
              <div className="logo">
                <span className="supernatural text-2xl sm:text-3xl">Supernatural</span>
                <span className="churches text-lg sm:text-xl">CHURCHES</span>
              </div>
            </div>
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
              © {new Date().getFullYear()} SUPERNATURAL CHURCHES LIMITED ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}

