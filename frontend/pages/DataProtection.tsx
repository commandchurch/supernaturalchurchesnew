import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, Lock, Eye, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { siteUrl } from '../config';

const DataProtection: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEO 
        title="Data Protection – Supernatural Institute of Ministry"
        description="Data protection measures and security practices for personal information at Supernatural Institute of Ministry."
        canonicalUrl={`${siteUrl}/legal/data-protection`}
      />

      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/legal" 
            className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-blue-400" />
          </Link>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white heading-font">Data Protection</h1>
            <p className="text-gray-400">Last updated: January 2025</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">1. Our Commitment to Data Protection</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                <strong className="text-white">Supernatural Churches Limited</strong> is committed to protecting your personal information in accordance with the Australian Privacy Principles under the Privacy Act 1988 (Cth). This document outlines our comprehensive data protection measures for Supernatural Institute of Ministry.
              </p>
              <p>
                We understand the sensitive nature of spiritual and ministry-related information and implement the highest standards of data protection.
              </p>
            </div>
          </section>

          {/* Data Security Measures */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">2. Technical Security Measures</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              
              <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-blue-400" />
                  Encryption and Data Security
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>TLS 1.3 Encryption:</strong> All data transmission is encrypted</li>
                  <li><strong>Database Encryption:</strong> Personal data encrypted at rest</li>
                  <li><strong>Payment Security:</strong> PCI DSS compliant payment processing</li>
                  <li><strong>API Security:</strong> Authenticated and rate-limited API endpoints</li>
                  <li><strong>Secure Hosting:</strong> Enterprise-grade cloud infrastructure</li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  Access Controls
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Role-Based Access:</strong> Staff access limited by job function</li>
                  <li><strong>Multi-Factor Authentication:</strong> Required for admin accounts</li>
                  <li><strong>Regular Access Reviews:</strong> Quarterly access audits</li>
                  <li><strong>Automated Monitoring:</strong> 24/7 security monitoring</li>
                  <li><strong>Incident Response:</strong> Immediate security breach protocols</li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-purple-400" />
                  Monitoring and Auditing
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Activity Logging:</strong> All system access logged and monitored</li>
                  <li><strong>Regular Audits:</strong> Monthly security assessments</li>
                  <li><strong>Vulnerability Scanning:</strong> Automated security scanning</li>
                  <li><strong>Penetration Testing:</strong> Annual third-party security testing</li>
                  <li><strong>Compliance Monitoring:</strong> Ongoing privacy law compliance</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Special Protection for Spiritual Data */}
          <section className="bg-orange-500/10 border border-orange-500/30 p-6 rounded-lg">
            <h2 className="text-2xl font-black text-white mb-4 heading-font flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-orange-400" />
              3. Special Protection for Spiritual Information
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-orange-100 font-semibold">
                Enhanced Security for Ministry-Related Data:
              </p>
              
              <h3 className="text-xl font-semibold text-white">Prayer Requests</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Stored in separate, highly encrypted database</li>
                <li>Access limited to authorized ministry team only</li>
                <li>Pastoral privilege protection applied</li>
                <li>Option for immediate deletion upon request</li>
                <li>No sharing with third parties under any circumstances</li>
              </ul>

              <h3 className="text-xl font-semibold text-white">Ministry Training Records</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Course progress and spiritual development tracking</li>
                <li>Certification and ordination records</li>
                <li>Ministry feedback and assessment data</li>
                <li>Supernatural testimony documentation</li>
              </ul>

              <h3 className="text-xl font-semibold text-white">Pastoral Communications</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Private counseling session notes</li>
                <li>Spiritual guidance correspondence</li>
                <li>Ministry support communications</li>
                <li>Prophetic words and spiritual encounters</li>
              </ul>
            </div>
          </section>

          {/* Data Processing Principles */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">4. Data Processing Principles</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                We process personal information according to these core principles:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Lawful Processing</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Consent for marketing communications</li>
                    <li>Contract performance for memberships</li>
                    <li>Legitimate interests for ministry services</li>
                    <li>Legal obligations for financial records</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Data Minimization</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Collect only necessary information</li>
                    <li>Regular data cleansing processes</li>
                    <li>Automatic deletion of expired data</li>
                    <li>Purpose limitation enforcement</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Accuracy and Quality</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Regular data accuracy checks</li>
                    <li>User self-service data updates</li>
                    <li>Correction of inaccurate information</li>
                    <li>Data validation processes</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Transparency</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Clear privacy notices</li>
                    <li>Regular policy updates</li>
                    <li>Data access upon request</li>
                    <li>Processing purpose explanations</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">5. Data Retention Periods</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                We retain personal information only as long as necessary for legitimate purposes:
              </p>
              
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Account Information</h3>
                  <p className="text-sm mb-2">Retained while account is active, plus:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Basic account data: 3 years after closure</li>
                    <li>Financial records: 7 years (Australian tax law)</li>
                    <li>Course completion: 10 years (certification purposes)</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Ministry Records</h3>
                  <p className="text-sm mb-2">Special retention for ministry purposes:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Prayer requests: Until deletion requested</li>
                    <li>Ordination records: Permanent (with consent)</li>
                    <li>Ministry feedback: 5 years</li>
                    <li>Pastoral communications: As long as relevant</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Marketing Data</h3>
                  <p className="text-sm mb-2">Consent-based retention:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Email subscriptions: Until unsubscribed</li>
                    <li>Analytics data: 2 years (aggregated)</li>
                    <li>Affiliate tracking: 3 years</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">6. Data Transfers and Storage</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <h3 className="text-xl font-semibold text-white">Australian-First Approach</h3>
              <p>
                As an Australian ministry serving Australian residents, we prioritize local data handling:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Primary data storage in Australian data centers</li>
                <li>Australian-based support and administration</li>
                <li>Compliance with Australian privacy laws</li>
                <li>Local backup and disaster recovery</li>
              </ul>

              <h3 className="text-xl font-semibold text-white">Necessary International Services</h3>
              <p>
                Some trusted international services are used with appropriate safeguards:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Payment processing (Stripe, PayPal) - with adequate protection</li>
                <li>Email services - with privacy-compliant providers</li>
                <li>Cloud services - with appropriate data residency requirements</li>
                <li>Analytics - with anonymized data only</li>
              </ul>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">7. Your Data Protection Rights</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Under Australian privacy law, you have the following rights:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Access Rights</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Request copies of your personal data</li>
                    <li>Understand how your data is processed</li>
                    <li>Access your ministry and course records</li>
                  </ul>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Correction Rights</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Update incorrect information</li>
                    <li>Complete incomplete records</li>
                    <li>Clarify ministry documentation</li>
                  </ul>
                </div>
                
                <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Deletion Rights</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Request deletion of personal data</li>
                    <li>Remove prayer requests immediately</li>
                    <li>Close accounts and data</li>
                  </ul>
                </div>
                
                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Control Rights</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Opt-out of marketing communications</li>
                    <li>Control cookie preferences</li>
                    <li>Manage consent settings</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Breach Response */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">8. Data Breach Response</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                In the unlikely event of a data breach, we have comprehensive response procedures:
              </p>
              
              <h3 className="text-xl font-semibold text-white">Immediate Response (0-24 hours)</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Contain and assess the breach</li>
                <li>Notify law enforcement if required</li>
                <li>Implement remediation measures</li>
                <li>Document the incident thoroughly</li>
              </ul>

              <h3 className="text-xl font-semibold text-white">Notification Process (24-72 hours)</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Notify OAIC if required by law</li>
                <li>Inform affected individuals</li>
                <li>Provide clear guidance on protective actions</li>
                <li>Offer appropriate support and remediation</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-white/5 border border-white/10 p-6 rounded-lg">
            <h2 className="text-2xl font-black text-white mb-4 heading-font">9. Data Protection Contact</h2>
            <div className="text-gray-300 leading-relaxed">
              <p>For data protection questions, requests, or concerns:</p>
              <div className="mt-4 space-y-2">
                <p><strong className="text-white">Supernatural Churches Limited</strong></p>
                <p>Data Protection Officer</p>
                <p>Email: privacy@supernatural.institute</p>
                <p>Subject Line: "Data Protection Inquiry"</p>
                <p>Response Time: Within 48 hours</p>
              </div>
              <p className="mt-4 text-sm">
                For complaints about data handling, you may contact the Office of the Australian Information Commissioner (OAIC) at www.oaic.gov.au or phone 1300 363 992.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DataProtection;
