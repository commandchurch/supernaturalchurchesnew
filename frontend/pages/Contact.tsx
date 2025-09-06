import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import SEO from '../components/SEO';
import ChurchPartnershipCTA from '../components/ChurchPartnershipCTA';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'Australia',
    phoneNumber: '',
    organisation: '',
    message: ''
  });

  const [charCount, setCharCount] = useState({
    organisation: 0,
    message: 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'organisation' || name === 'message') {
      setCharCount(prev => ({
        ...prev,
        [name]: value.length
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You would typically send this to your backend
  };

  return (
    <div className="min-h-screen text-white">
      <SEO
        title="Contact Us | Supernatural Churches Limited"
        description="Get in touch with Supernatural Churches Limited. We respond to all inquiries within 48 hours. Contact us for partnership, ordination, or church-related questions."
      />

      {/* Header */}
      <section className="bg-black py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 heading-font">
              CONTACT US
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Get in touch with our team. We respond to all inquiries within 48 hours and are here to help you connect with supernatural churches and apostolic ministry.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* National Office */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 heading-font">
            NATIONAL OFFICE
          </h2>
          <p className="text-gray-300 mb-6">
            Please use the following information to get in touch with our Head Office.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 border border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="font-medium">Phone: (02) 8853 5150</p>
                    <p className="text-sm">Fax: (02) 8853 5100</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-orange-500" />
                  <a href="mailto:contact@supernaturalchurches.org" className="hover:text-white">
                    contact@supernaturalchurches.org
                  </a>
                </div>
                <div className="flex items-start gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-orange-500 mt-1" />
                  <div>
                    <p className="font-medium">Postal Address</p>
                    <p>PO Box 8093</p>
                    <p>Norwest NSW 2153</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-800/50 border border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="Australia">Australia (+61)</option>
                    </select>
                    <input
                      type="tel"
                      id="phone"
                      name="phoneNumber"
                      required
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                      className="flex-1 bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Organisation */}
                <div>
                  <label htmlFor="organisation" className="block text-sm font-medium text-gray-300 mb-1">
                    Organisation <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="organisation"
                    name="organisation"
                    required
                    maxLength={100}
                    value={formData.organisation}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">{charCount.organisation}/100 characters remaining</p>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    maxLength={500}
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">{charCount.message}/500 characters remaining</p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 font-semibold uppercase tracking-wide flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Response Time Promise */}
        <div className="mb-12 bg-green-500/10 border border-green-500/30 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-green-500" />
            <h3 className="text-lg font-semibold text-green-400">48-Hour Response Guarantee</h3>
          </div>
          <p className="text-gray-300">
            We are committed to responding to all inquiries within 48 hours. Your feedback and questions are important to us, and we're here to help you connect with supernatural churches and apostolic ministry opportunities.
          </p>
        </div>

        {/* Child Protection Notice */}
        <div className="mb-12 bg-red-500/10 border border-red-500/30 p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-red-500" />
            <h3 className="text-lg font-semibold text-red-400">Child Protection</h3>
          </div>
          <p className="text-gray-300 mb-4">
            If you have concerns regarding the safety of children at any church, please call our National Child Protection Helpline immediately:
          </p>
          <p className="text-white font-semibold text-lg">1800 070 511</p>
        </div>

        {/* Privacy Notice */}
        <div className="mb-12 bg-gray-800/50 border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Privacy Policy</h3>
          <p className="text-gray-300 mb-4">
            By contacting us and providing your personal information, you consent to Supernatural Churches Limited using your personal information in the manner described in our Privacy Policy. If you disagree with any part of our Privacy Policy, please do not provide your personal information to us or use our website. You may also withdraw your consent at anytime by contacting us.
          </p>
          <a href="/privacy-policy" className="text-orange-500 hover:text-orange-400 underline">
            Read our Privacy Policy
          </a>
        </div>

        {/* Social Media */}
        <div className="mb-12 text-center">
          <h3 className="text-xl font-semibold text-white mb-4 heading-font">CONNECT WITH US ON SOCIAL MEDIA</h3>
          <p className="text-gray-300 mb-6">@supernaturalchurches</p>
          <div className="flex justify-center space-x-6">
            <a href="https://www.facebook.com/supernaturalchurches/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="w-8 h-8" />
            </a>
            <a href="https://x.com/SupernaturalInst" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-8 h-8" />
            </a>
            <a href="https://www.instagram.com/supernaturalchurches" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="w-8 h-8" />
            </a>
            <a href="https://www.youtube.com/@supernaturalinstitute" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Youtube className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <ChurchPartnershipCTA />
      </div>
    </div>
  );
};

export default Contact;
