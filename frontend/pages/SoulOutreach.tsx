import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Award, Target, Heart, ExternalLink, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import { siteUrl } from '../config';

export default function SoulOutreach() {

  return (
    <div>
      <SEO
        title="Outreach - Affiliate Program | Supernatural Institute"
        description="Join our Outreach Affiliate Program and earn commissions while sharing the Gospel. Complete Evangelism Essentials and start your ministry outreach journey."
        canonicalUrl={`${siteUrl}/outreach`}
        type="website"
      />

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 lg:mb-6 heading-font tracking-tight leading-tight">
            OUTREACH AFFILIATE PROGRAM
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 lg:mb-8 max-w-4xl mx-auto leading-relaxed px-2">
            Share the Gospel and earn commissions through our ministry outreach program. We equip you with training and support to naturally connect people with the life-changing message of Jesus Christ.
          </p>
          <div className="bg-white/10 border border-white/20 p-4 lg:p-6 rounded max-w-3xl mx-auto mx-4">
            <h2 className="text-lg lg:text-xl font-bold text-white mb-3">Our Heart for Souls</h2>
            <p className="text-gray-300 text-xs lg:text-sm leading-relaxed">
              "Freely you have received, freely give" - Matthew 10:8. We never require payment for salvation, healing, or deliverance. Our mission is to win souls, nurture them through free training, and naturally connect them with our community. As they grow in faith and see the value, many choose to become members to access deeper training.
            </p>
          </div>
        </div>
      </section>

      {/* Program Benefits */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 lg:mb-6 heading-font">
              Ministry Partnership Benefits
            </h2>
            <p className="text-base lg:text-lg text-gray-300 max-w-3xl mx-auto px-2">
              Join our outreach network and receive support while sharing the Gospel naturally through relationships and genuine care.
            </p>
          </div>

          {/* Benefits Grid - Brand Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 lg:mb-16">
            <div className="bg-white/5 border border-white/10 p-4 lg:p-6 text-center">
              <div className="bg-white/10 border border-white/20 p-2 lg:p-3 w-fit mx-auto mb-3 lg:mb-4">
                <Heart className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <h3 className="text-base lg:text-lg font-bold text-white mb-2">Soul Care Support</h3>
              <p className="text-gray-400 text-xs lg:text-sm">Training and resources for effective, loving outreach</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 lg:p-6 text-center">
              <div className="bg-white/10 border border-white/20 p-2 lg:p-3 w-fit mx-auto mb-3 lg:mb-4">
                <Users className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <h3 className="text-base lg:text-lg font-bold text-white mb-2">Build Relationships</h3>
              <p className="text-gray-400 text-xs lg:text-sm">Develop lasting connections through ministry</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 lg:p-6 text-center">
              <div className="bg-white/10 border border-white/20 p-2 lg:p-3 w-fit mx-auto mb-3 lg:mb-4">
                <Target className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <h3 className="text-base lg:text-lg font-bold text-white mb-2">Ministry Tools</h3>
              <p className="text-gray-400 text-xs lg:text-sm">Access proven evangelism resources and training</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 lg:p-6 text-center">
              <div className="bg-white/10 border border-white/20 p-2 lg:p-3 w-fit mx-auto mb-3 lg:mb-4">
                <Award className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <h3 className="text-base lg:text-lg font-bold text-white mb-2">Commission Rewards</h3>
              <p className="text-gray-400 text-xs lg:text-sm">Earn 20% when people naturally choose membership</p>
            </div>
          </div>

          {/* Ministry Approach */}
          <div className="bg-white/5 border border-white/10 p-4 lg:p-8">
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6 text-center">Our Ministry Approach</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="text-center">
                <div className="bg-white/10 border border-white/20 p-3 lg:p-4 w-fit mx-auto mb-3 lg:mb-4">
                  <Heart className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <h4 className="text-base lg:text-lg font-bold text-white mb-2">1. WIN SOULS</h4>
                <p className="text-gray-300 text-xs lg:text-sm">Share the Gospel with love and genuine care. Focus on salvation, healing, and deliverance - all freely given.</p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 border border-white/20 p-3 lg:p-4 w-fit mx-auto mb-3 lg:mb-4">
                  <BookOpen className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <h4 className="text-base lg:text-lg font-bold text-white mb-2">2. NURTURE GROWTH</h4>
                <p className="text-gray-300 text-xs lg:text-sm">Stay in contact, encourage participation in free training, and provide ongoing spiritual support.</p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 border border-white/20 p-3 lg:p-4 w-fit mx-auto mb-3 lg:mb-4">
                  <Users className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <h4 className="text-base lg:text-lg font-bold text-white mb-2">3. NATURAL CONNECTION</h4>
                <p className="text-gray-300 text-xs lg:text-sm">As they grow and see value, many naturally choose membership for deeper training and community.</p>
              </div>
            </div>
          </div>
        </div>
      </section>





      {/* Join Program CTA */}
      <section className="py-12 sm:py-16 lg:py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 lg:mb-6 heading-font">
            Ready to Start Winning Souls?
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4 text-xs lg:text-sm text-gray-300 mb-4 lg:mb-6 px-4">
            <span className="bg-white/10 px-3 py-1 rounded">📚 4 modules</span>
            <span className="bg-white/10 px-3 py-1 rounded">⏱️ 2 hours</span>
            <span className="bg-white/10 px-3 py-1 rounded">🆓 FREE</span>
          </div>

          <p className="text-base lg:text-lg text-gray-300 mb-6 lg:mb-8 max-w-2xl mx-auto px-2">
            Master the foundational principles of effective soul-winning and Gospel outreach. This foundational course equips you with the knowledge and skills for effective soul-winning.
          </p>

          <div className="flex justify-center px-4">
            <Link
              to="/academy"
              className="bg-orange-700 text-white hover:bg-orange-800 px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold uppercase tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2"
            >
              Complete Evangelism Essentials
              <ExternalLink className="w-4 h-4 lg:w-5 lg:h-5" />
            </Link>
          </div>

          <p className="text-xs lg:text-sm text-gray-300 mt-4 lg:mt-6 px-4">
            Program participation requires active membership • Commissions paid monthly • Terms apply
          </p>
        </div>
      </section>
    </div>
  );
}
