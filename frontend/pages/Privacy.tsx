import React from 'react';
import { Shield, Heart, Book, Users } from 'lucide-react';
import SEO from '../components/SEO';
import { siteUrl } from '../config';

export default function Privacy() {
  const sections = [
    {
      icon: Shield,
      title: 'Data Protection',
      content: 'We are committed to protecting your personal information and maintaining its confidentiality.'
    },
    {
      icon: Heart,
      title: 'Faith-Based Approach',
      content: 'Our privacy practices are rooted in Biblical principles of respect, integrity, and love.'
    },
    {
      icon: Book,
      title: 'Transparency',
      content: 'We believe in clear, honest communication about how we handle your information.'
    },
    {
      icon: Users,
      title: 'Community Standards',
      content: 'We foster a respectful environment where diverse perspectives can engage peacefully.'
    }
  ];

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${siteUrl}/privacy` }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-16">
      <SEO
        title="Privacy Policy"
        description="Read the Command Church privacy policy. Learn how we protect your data in accordance with our faith-based principles."
        breadcrumbsJsonLd={breadcrumbs}
      />

      <div className="text-center mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 heading-font">
          Privacy Policy
        </h1>
        <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
          Our commitment to protecting your privacy while practicing our faith in accordance with Biblical principles.
        </p>
      </div>

      {/* Key Principles */}
      <section className="mb-10 sm:mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={index} className="bg-white/5 border border-white/10 backdrop-blur-sm p-5 sm:p-6 text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-3 sm:mb-4">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 heading-font">{section.title}</h3>
                <p className="text-gray-400 text-sm">{section.content}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Privacy Policy Content */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8 space-y-8 text-sm sm:text-base">
        
        {/* Introduction */}
        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">Introduction</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              Welcome to www.commandchurch.com. This Privacy Policy outlines the practices and principles 
              followed by COMMAND CHURCH in relation to the collection, use, storage, and protection of 
              your personal information. As a religious organization built on Biblical principles, we are 
              committed to adhering to the highest standards of privacy protection while practicing our faith 
              in accordance with the Holy Bible.
            </p>
            <p>
              By accessing this website or any of our social channels, you acknowledge and accept the terms 
              and conditions laid out in this Privacy Policy. If you do not agree with these terms, please 
              refrain from using our platforms.
            </p>
          </div>
        </section>

        {/* Collection of Personal Information */}
        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">Collection of Personal Information</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              COMMAND CHURCH is committed to respecting your privacy and safeguarding your personal 
              information. When you engage with our website or social channels, we may collect certain 
              information, such as your name, email address, and contact details. This information is 
              collected for the purpose of providing you with access to our content, events, and community.
            </p>
            <p>
              Please note that as a religious organization, we hold strong beliefs that are reflected in our 
              teachings and practices. By interacting with us, you understand that our beliefs are integral to 
              our community and that we may share these beliefs in our content and interactions.
            </p>
          </div>
        </section>

        {/* Use of Personal Information */}
        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">Use of Personal Information</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>Your personal information may be used for various purposes, including but not limited to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Providing access to our content, events, and community</li>
              <li>Sending communications, updates, and newsletters related to our organization's activities</li>
              <li>Facilitating your participation in our future virtual cryptocurrency ($JTHC) and related projects</li>
              <li>Processing membership subscriptions and affiliate program participation</li>
              <li>Handling and resolving any conflicts or disputes that may arise within our community</li>
            </ul>
          </div>
        </section>

        {/* Storage and Protection */}
        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">Storage and Protection</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              We are committed to protecting your personal information and maintaining its confidentiality. 
              Your data is stored securely and accessed only by authorized personnel. While we take 
              reasonable precautions to safeguard your information, please be aware that no data 
              transmission over the internet can be guaranteed as completely secure.
            </p>
            <p>
              We use industry-standard security measures including encryption, secure servers, and regular 
              security audits to protect your personal information from unauthorized access, disclosure, 
              alteration, or destruction.
            </p>
          </div>
        </section>

        {/* Conflict Resolution */}
        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">Conflict Resolution</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              In the event of conflicts or disagreements within our community, our approach to resolution 
              involves open and respectful communication. Conflict resolution may include private 
              conversations, involving a group of individuals, and, if necessary, addressing the community if 
              conflicts cannot be resolved peacefully. We aim to handle conflicts with sensitivity and 
              understanding, in accordance with our faith-based principles.
            </p>
          </div>
        </section>

        {/* Community Standards */}
        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">Community Standards</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              We welcome individuals of diverse backgrounds and beliefs to engage with our community. 
              While we respect different perspectives, we require that all community members engage in 
              respectful and peaceful interactions. This includes adhering to the following guidelines:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Respect the beliefs of others, even if they differ from your own</li>
              <li>Abstain from disruptive behavior or communication that causes distress to others</li>
              <li>Engage in constructive and open dialogue without attempting to undermine or challenge core faith-based teachings</li>
            </ul>
          </div>
        </section>

        {/* Legal Disclaimer */}
        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">Legal Disclaimer</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              We do not engage in legal action or lawsuits against individuals who hold differing beliefs or 
              have engaged in peaceful interactions within our community. Our approach to conflict 
              resolution is rooted in communication, understanding, and the principles of our faith.
            </p>
          </div>
        </section>

        {/* Faith-Based Practices */}
        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">Legal Disclaimer: Faith-Based Practices</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              At COMMAND CHURCH, our faith-based practices are deeply rooted in our belief in the Holy 
              Bible and the teachings of Jesus Christ. While we hold these practices as integral to our 
              spiritual journey, it is important to clarify our stance regarding the use of faith-based practices 
              as a form of medical treatment.
            </p>
            
            <h3 className="text-lg sm:text-xl font-bold text-white mt-6 mb-3 heading-font">Faith and Health</h3>
            <p>
              We believe in the healing power of faith as a spiritual practice that can have a positive impact 
              on an individual's well-being. Our teachings emphasize the importance of aligning our lives 
              with God's principles, including the practice of faith, prayer, and belief in divine healing. It is 
              our conviction that faith can contribute to physical, emotional, and spiritual healing.
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-white mt-6 mb-3 heading-font">Medical Treatment</h3>
            <p>
              It is important to note that our faith-based practices are not intended to replace or substitute 
              professional medical treatment, diagnosis, or advice. We strongly recommend that 
              individuals seek medical attention from qualified healthcare professionals for any medical 
              concerns, conditions, or emergencies. Our faith-based practices are complementary to medical 
              treatment and are intended to work in conjunction with appropriate medical care.
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-white mt-6 mb-3 heading-font">Medical Disclaimer</h3>
            <p>
              While we believe in the power of faith to positively impact health and well-being, we do not 
              claim to provide medical treatment or make medical claims. We do not diagnose, prescribe, or 
              promise specific medical outcomes through our faith-based practices but we do believe that 
              Jesus has the ability to heal someone of any medical problem and we leave that in the hands of 
              Jesus after we do our part of speaking words of faith or laying hands in faith according to the 
              scriptures or any other biblical practice in the word of God.
            </p>
            <p>
              By participating in our faith-based activities, including prayer, confession, and laying on of 
              hands, you acknowledge and understand that these practices are rooted in our religious beliefs 
              and are intended to enhance spiritual well-being. Any experiences or outcomes from these 
              practices are considered spiritual in nature and are not a substitute for medical evaluation, 
              diagnosis, or treatment.
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-white mt-6 mb-3 heading-font">Consultation with Healthcare Professionals</h3>
            <p>
              We strongly encourage individuals to consult with qualified healthcare professionals before 
              making decisions about medical treatment or altering their healthcare plans. Our faith-based 
              practices are not a replacement for science-based medical care and should be viewed as a 
              supplement to medical treatment rather than a standalone solution and we do not take any 
              responsibility for the choices people make upon learning from our organization, people within 
              the organization and learning material as we fully make it aware anyone who steps outside of 
              the normal practices to seek medical advice does so at their own risk.
            </p>
          </div>
        </section>

        {/* Cookies and Tracking */}
        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">Cookies and Tracking</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              Our website may use cookies and similar tracking technologies to enhance your browsing 
              experience and provide personalized content. These technologies help us understand how 
              you interact with our website and improve our services.
            </p>
            <p>
              You can control cookie settings through your browser preferences. However, disabling 
              certain cookies may affect the functionality of our website.
            </p>
          </div>
        </section>

        {/* Third-Party Services */}
        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">Third-Party Services</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              We may use third-party services for payment processing, email communications, analytics, 
              and other operational purposes. These services have their own privacy policies, and we 
              encourage you to review them. We only share the minimum necessary information with 
              these services to provide our functionality.
            </p>
          </div>
        </section>

        {/* Your Rights */}
        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">Your Rights</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Request data portability where applicable</li>
            </ul>
            <p>
              To exercise these rights, please contact us at commandchurch@gmail.com.
            </p>
          </div>
        </section>

        {/* Updates to Privacy Policy */}
        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">Updates to This Privacy Policy</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices 
              or legal requirements. We will notify you of any significant changes by posting the updated 
              policy on our website and updating the effective date.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">Conclusion</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              Thank you for taking the time to review our Privacy Policy. By continuing to engage with 
              www.commandchurch.com and our social channels, you acknowledge that you have read, 
              understood, and agreed to the terms outlined in this policy. We strive to practice our faith in a 
              manner that respects your privacy while promoting open dialogue and understanding within our 
              community.
            </p>
            <p>
              For any inquiries or concerns about this Privacy Policy, please contact us at 
              commandchurch@gmail.com.
            </p>
            <p className="text-sm text-gray-400 mt-6">
              <strong>Effective Date:</strong> December 2024<br />
              <strong>Last Updated:</strong> December 2024
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
