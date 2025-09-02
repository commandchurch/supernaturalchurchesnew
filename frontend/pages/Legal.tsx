import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Shield,
  Scale,
  Eye,
  BookOpen,
  Gavel,
  MessageCircle,
  Download,
  ExternalLink,
  Users,
  CreditCard,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import SEO from '../components/SEO';
import { siteUrl } from '../config';

const Legal: React.FC = () => {
  const legalCategories = [
    {
      id: 'user-agreements',
      title: 'User Agreements',
      description: 'Terms and conditions for using our supernatural ministry platform.',
      icon: <FileText className="w-8 h-8" />,
      documents: [
        { name: 'Terms of Service', link: '/legal/terms-of-service', icon: <FileText className="w-5 h-5" /> },
        { name: 'User Agreement', link: '/legal/user-agreement', icon: <Users className="w-5 h-5" /> }
      ]
    },
    {
      id: 'privacy-rights',
      title: 'Privacy & Rights',
      description: 'How we protect your data and respect your privacy rights.',
      icon: <Shield className="w-8 h-8" />,
      documents: [
        { name: 'Privacy Policy', link: '/legal/privacy-policy', icon: <Shield className="w-5 h-5" /> },
        { name: 'Cookie Policy', link: '/legal/cookie-policy', icon: <Eye className="w-5 h-5" /> },
        { name: 'Data Protection', link: '/legal/data-protection', icon: <Shield className="w-5 h-5" /> }
      ]
    },
    {
      id: 'financial-legal',
      title: 'Financial & Legal',
      description: 'Policies governing donations, purchases, and financial transactions.',
      icon: <CreditCard className="w-8 h-8" />,
      documents: [
        { name: 'Refund Policy', link: '/legal/refund-policy', icon: <BookOpen className="w-5 h-5" /> },
        { name: 'Donation Terms', link: '/legal/donation-terms', icon: <CreditCard className="w-5 h-5" /> },
        { name: 'Compensation Plan', link: '/legal/compensation-plan', icon: <Users className="w-5 h-5" /> }
      ]
    },
    {
      id: 'disclaimers-notices',
      title: 'Disclaimers & Notices',
      description: 'Important legal notices, disclaimers, and regulatory information.',
      icon: <AlertTriangle className="w-8 h-8" />,
      documents: [
        { name: 'Legal Disclaimer', link: '/legal/disclaimer', icon: <Scale className="w-5 h-5" /> },
        { name: 'Medical Disclaimer', link: '/legal/medical-disclaimer', icon: <AlertTriangle className="w-5 h-5" /> }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO 
        title="Legal Information – Supernatural Institute of Ministry"
        description="Comprehensive legal information, policies, and terms for Supernatural Institute of Ministry. Access privacy policies, terms of service, and legal documents."
        canonicalUrl={`${siteUrl}/legal`}
      />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="w-20 h-20 bg-white/10 border border-white/20 flex items-center justify-center">
              <Scale className="w-10 h-10 text-blue-400" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 heading-font">
            LEGAL INFORMATION
          </h1>

          <p className="text-base sm:text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Comprehensive legal information for the Supernatural Institute of Ministry platform. Access all our policies, terms, and legal documents in one centralized location.
          </p>
        </div>

        {/* Legal Categories */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {legalCategories.map((category, index) => (
            <div
              key={category.id}
              className="bg-white/5 border border-white/10 p-6 sm:p-8 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/10 border border-white/20 flex items-center justify-center">
                    <div className="text-blue-400">
                      {category.icon}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white mb-2 heading-font">{category.title}</h2>
                    <p className="text-gray-400 text-sm sm:text-base">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {category.documents.map((doc, docIndex) => (
                  <div key={docIndex} className="flex items-center justify-between p-3 bg-black/30 hover:bg-black/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="text-blue-400">
                        {doc.icon}
                      </div>
                      <span className="text-white font-medium text-sm sm:text-base">{doc.name}</span>
                    </div>
                    <Link 
                      to={doc.link}
                      className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 text-sm border border-white/20 transition-colors"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>



        {/* Important Notice */}
        <div className="bg-white/5 border border-white/10 p-6 sm:p-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-black text-white mb-6 heading-font flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-400" />
              Commitment to Transparency
            </h2>
            
            <div className="space-y-6">
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                At Supernatural Institute of Ministry, we believe in complete transparency and accountability in all our supernatural ministry operations. These legal documents reflect our commitment to ethical practices, user protection, and compliance with all applicable laws and regulations.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-white text-lg heading-font">Our Legal Standards</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">GDPR Compliant Data Protection</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">DMCA Copyright Compliance</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Secure Payment Processing</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-white text-lg heading-font">Contact Information</h3>
                  <div className="space-y-2 text-gray-400">
                    <p><strong>Email:</strong> legal@supernatural.institute</p>
                    <p><strong>Response Time:</strong> Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;
