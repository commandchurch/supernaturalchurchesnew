import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Church,
  Zap,
  Globe,
  Shield,
  Crown
} from 'lucide-react';
import SEO from '../components/SEO';
import { siteUrl } from '../config';


const breadcrumbs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` }
  ]
};

const About = function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Performance Optimizations - Preconnect to critical origins */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://immune-opossum-44.clerk.accounts.dev" />
      <link rel="preconnect" href="https://drive.google.com" />
      <link rel="dns-prefetch" href="https://www.youtube.com" />
      <link rel="dns-prefetch" href="https://www.google.com" />

      {/* Optimized font loading with display=swap for better performance */}
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin=""
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
        media="print"
        onLoad={() => {
          const link = document.querySelector('link[href*="fonts.googleapis.com"]') as HTMLLinkElement;
          if (link) {
            link.media = 'all';
          }
        }}
      />
      <noscript>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" />
      </noscript>

      {/* Preload critical images */}
      <link rel="preload" href="/samuel-waterhouse.png" as="image" fetchPriority="high" />
      <link rel="preload" href="/logo.png" as="image" fetchPriority="low" />

      {/* Security headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />

      {/* Performance hints */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#000000" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-16">
        <SEO
          title="About Supernatural Churches Limited — Safe Supernatural Churches & Ordination"
          description="Supernatural Churches Limited provides ordination and ensures safe supernatural churches. We guarantee healing teaching that works for everyone, with comprehensive training and vetting processes."
          breadcrumbsJsonLd={breadcrumbs}
        />

      <div className="text-center mb-12 sm:mb-16">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 border border-white/20 flex items-center justify-center">
            <Church className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
          </div>
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 border border-white/20 flex items-center justify-center">
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
          </div>
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 border border-white/20 flex items-center justify-center">
            <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 heading-font">
          About Supernatural Churches Limited
        </h1>
        <div className="text-base sm:text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
          <p className="mb-3">We provide ordination and ensure safe supernatural churches. Our vision is to restore doctrine and order to churches around the world, starting with Australia.</p>
          <p className="mb-3">We have a comprehensive vetting process and guarantee healing teaching that works for everyone - not just some. We teach everything needed including every question and reason for someone not getting healing.</p>
        </div>
      </div>

      {/* Core Mission */}
      <div className="bg-gray-800/50 border border-gray-700 p-8 mb-8">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 heading-font">
            Our Mission: Safe Supernatural Churches
          </h2>
          <p className="text-gray-300 leading-relaxed mb-8 text-lg">
            We exist to ensure people attend safe supernatural churches where doctrine is sound, leadership is vetted, and the power of God flows freely through proper biblical teaching and apostolic oversight.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-500/20 border border-blue-500/30 p-6 rounded text-center">
              <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-blue-200 font-bold mb-2">Vetting Process</h3>
              <p className="text-blue-100 text-sm">Comprehensive background checks and doctrinal alignment for all church leaders</p>
            </div>

            <div className="bg-green-500/20 border border-green-500/30 p-6 rounded text-center">
              <Zap className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-green-200 font-bold mb-2">Guaranteed Healing</h3>
              <p className="text-green-100 text-sm">Proven protocols that work for everyone - we teach every question and reason for healing</p>
            </div>

            <div className="bg-purple-500/20 border border-purple-500/30 p-6 rounded text-center">
              <Crown className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-purple-200 font-bold mb-2">Apostolic Oversight</h3>
              <p className="text-purple-100 text-sm">Senior leadership guidance ensuring biblical accuracy and supernatural power</p>
            </div>
          </div>
        </div>
      </div>

      {/* Church Partnership CTA */}
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 p-8 mb-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 heading-font">
            Join Our Network
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Partner with us for $99/month and receive apostolic oversight, supernatural training, and guaranteed healing protocols for your church.
          </p>
          <div className="text-4xl font-black text-white mb-4">$99 AUD/month</div>
          <Link
            to="/membership"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 font-semibold uppercase tracking-wide text-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Become a Partner Church
          </Link>
        </div>
      </div>

















    </div>
    </>
  );
};

export default About;


