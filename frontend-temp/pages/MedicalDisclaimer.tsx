import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Heart, Shield } from 'lucide-react';
import SEO from '../components/SEO';
import { siteUrl } from '../config';

const MedicalDisclaimer: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEO 
        title="Medical Disclaimer – Supernatural Institute of Ministry"
        description="Medical disclaimer for healing ministry and spiritual services provided by Supernatural Churches Limited."
        canonicalUrl={`${siteUrl}/legal/medical-disclaimer`}
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
            <h1 className="text-3xl sm:text-4xl font-black text-white heading-font">Medical Disclaimer</h1>
            <p className="text-gray-400">Last updated: January 2025</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Critical Medical Notice */}
          <section className="bg-red-500/10 border border-red-500/30 p-6 rounded-lg">
            <h2 className="text-2xl font-black text-white mb-4 heading-font flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              IMPORTANT MEDICAL DISCLAIMER
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-red-100 font-semibold text-lg">
                READ THIS CAREFULLY BEFORE PARTICIPATING IN ANY HEALING MINISTRY OR SPIRITUAL SERVICES
              </p>
              
              <div className="bg-white/10 border border-white/20 p-6 rounded-lg">
                <h3 className="text-white font-bold text-xl mb-4">MEDICAL EMERGENCY NOTICE:</h3>
                <p className="text-red-100 font-semibold mb-3">
                  If you are experiencing a medical emergency, call 000 (Australia) immediately or go to your nearest emergency department. Do not rely on prayer or ministry as your primary response to serious medical conditions.
                </p>
                <p className="text-yellow-100 font-medium mb-3">
                  <strong>Should you desire to not follow this advice and prefer to contact us, you do so at your own risk.</strong>
                </p>
                <p className="text-white text-sm">
                  We believe in Jesus having defeated all manner of sickness and disease (1 Corinthians 15:26; Hebrews 2:14), and by having faith in Him we can receive healing and remain in health (Mark 11:22-24; 3 John 1:2). This is a gift for Christians, not people that deny Jesus. People that deny Jesus can receive a miracle healing from us certainly, but for them to remain healthy long term afterwards is impossible in our opinion unless they convert to the faith and receive the free gift of health received the same way by accepting Jesus as Lord and Saviour for eternal life (Romans 6:23; John 3:16).
                </p>
              </div>
            </div>
          </section>

          {/* Ministry vs Medical Treatment */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">1. Ministry Services Are Not Medical Treatment</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                <strong className="text-white">Supernatural Churches Limited</strong> and its representatives through Supernatural Institute of Ministry provide spiritual ministry services, not medical treatment.
              </p>
              
              <h3 className="text-xl font-semibold text-white">What We Provide</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Spiritual Ministry:</strong> Prayer, laying on of hands, prophetic ministry</li>
                <li><strong>Pastoral Care:</strong> Spiritual counseling and emotional support</li>
                <li><strong>Faith-Based Teaching:</strong> Biblical principles for divine health</li>
                <li><strong>Community Support:</strong> Fellowship and encouragement</li>
              </ul>

              <h3 className="text-xl font-semibold text-white">What We Do NOT Provide</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Medical diagnosis, treatment, or cure</li>
                <li>Licensed healthcare or psychological services</li>
                <li>Prescription medications or medical advice</li>
                <li>Surgical procedures or medical interventions</li>
                <li>Mental health treatment or psychiatric care</li>
                <li>Substitute for professional medical care</li>
              </ul>
            </div>
          </section>

          {/* Professional Qualifications */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">2. Our Ministry Team Qualifications</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-blue-400" />
                  Ministry Qualifications
                </h3>
                <p className="mb-3">Our ministry team members are qualified in truth, having been taught all things from the Holy Spirit who teaches all things (John 14:26; 1 John 2:27). We don't believe in being conformed to the patterns of this world (Romans 12:2) and following religious institutions that create teachings that result in people not walking in power. The kingdom of God is demonstrated in power (1 Corinthians 4:20). The kingdom of God comes to live within the believer (Luke 17:21). We focus on the New Covenant today (Hebrews 8:13) but also provide an overview of the Old Covenant understanding for believers to understand the difference between the Old and New Testament (Covenant) (2 Corinthians 3:6-11).</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Biblical studies and theological training</li>
                  <li>Supernatural ministry and healing prayer</li>
                  <li>Pastoral care and spiritual counseling</li>
                  <li>Deliverance and Exorcisms (Mark 16:17; Luke 10:19)</li>
                  <li>Prophetic ministry and spiritual gifts (1 Corinthians 12:1-11)</li>
                  <li>Church leadership and administration (Ephesians 4:11-13)</li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3">What We Are NOT</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Licensed medical doctors or physicians</li>
                  <li>Registered nurses or healthcare practitioners</li>
                  <li>Licensed psychologists or psychiatrists</li>
                  <li>Counselors, therapists, or social workers</li>
                  <li>Pharmacists or medical technicians</li>
                  <li>Any form of licensed healthcare providers</li>
                </ul>
                <p className="mt-3 text-orange-100 font-medium">
                  We operate as ministers of the Gospel, providing spiritual services from a position of compassion and mercy.
                </p>
              </div>
            </div>
          </section>

          {/* Divine Healing Teaching */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">3. Our Position on Divine Healing</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <h3 className="text-xl font-semibold text-white">Biblical Foundation</h3>
              <p>
                We boldly confess that <span className="text-white font-semibold">Jesus Christ is the Great Physician</span>. He bore our sicknesses and carried our pains; by His stripes we were healed (Isaiah 53:4–5; 1 Peter 2:24). We train believers to receive and walk in divine health and to minister healing in Jesus' Name (Mark 16:17–18; James 5:14–16).
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-lg space-y-4">
                <h4 className="text-white font-semibold">How We Minister Healing</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Prayer of faith according to Scripture (James 5:15)</li>
                  <li>Laying on of hands and commanding wholeness in Jesus' Name</li>
                  <li>Teaching believers to hold fast their confession of faith (Hebrews 10:23)</li>
                  <li>Renewing the mind to God's Word to live in ongoing divine health (Romans 12:2)</li>
                </ul>

                <h4 className="text-white font-semibold">Single‑Minded Faith</h4>
                <p>
                  Scripture teaches that a double‑minded person should not expect to receive (James 1:6–8). We therefore teach believers to reject unbelief, doubt, and negative confession, and to speak in agreement with God's Word.
                </p>
                <p className="text-sm text-gray-400">
                  Training matters: If someone does not receive healing, it may be due to a lack of training or application of the Word. Our SCHOOL exists to equip believers to receive and keep their healing, and to walk in divine health.
                </p>
              </div>
            </div>
          </section>

          {/* Healing Ministry Waiver */}
          <section className="bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-lg">
            <h2 className="text-2xl font-black text-white mb-4 heading-font flex items-center gap-3">
              <Shield className="w-6 h-6 text-yellow-400" />
              4. Healing Ministry Participation Waiver
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-yellow-100 font-semibold">
                By receiving prayer or ministry from Supernatural Churches Limited, you acknowledge and agree:
              </p>
              
              <div className="bg-white/10 border border-white/20 p-6 rounded-lg">
                <h3 className="text-white font-semibold mb-3">Voluntary Participation</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>I voluntarily request and receive spiritual ministry</li>
                  <li>I understand this is religious/spiritual service, not medical treatment</li>
                  <li>I maintain responsibility for my healthcare decisions</li>
                  <li>I will continue appropriate medical care as needed</li>
                </ul>

                <h3 className="text-white font-semibold mb-3 mt-4">Waiver of Claims</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>I waive any claims against the ministry for healing outcomes</li>
                  <li>I understand healing results are not guaranteed</li>
                  <li>I release all legal recourse related to ministry services</li>
                  <li>I acknowledge the spiritual nature of all ministry received</li>
                </ul>

                <h3 className="text-white font-semibold mb-3 mt-4">Personal Responsibility</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>I am responsible for my medical and healthcare decisions</li>
                  <li>I will seek appropriate medical care when needed</li>
                  <li>I understand ministry complements but doesn't replace medical care</li>
                  <li>I take full responsibility for faith and healing choices</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Training & Pastoral Pathways */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">5. Training & Pastoral Pathways</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Our conviction is simple: <span className="text-white font-semibold">Jesus heals</span>. We therefore provide two pathways to serve you:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">1) Get Equipped</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Enroll in the SCHOOL and complete the healing modules</li>
                    <li>Renew your mind daily with God's Word</li>
                    <li>Hold fast your confession without wavering</li>
                    <li>Practice what you are taught with single‑minded faith</li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">2) Request Prayer</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Submit a prayer request to our ministry team</li>
                    <li>Receive the prayer of faith from trained leaders (James 5:15)</li>
                    <li>Address unbelief and doubt; receive forgiveness where needed</li>
                    <li>Continue in the Word to remain in divine health</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Note: Outcomes vary by the hearer's response to the Word. Lack of training or application is not attributable to the instructors.
              </p>
            </div>
          </section>

          {/* Our Expectation & Pastoral Care */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">6. Our Expectation & Pastoral Care</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                We expect believers to look to Jesus as their Physician and to act on the Word. If a person chooses not to rely on Jesus, they may seek assistance from the world's systems at their discretion. Our focus remains on teaching believers to receive from God and to keep their healing by continuing in the Word.
              </p>
            </div>
          </section>

          {/* Faith Declaration */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">7. Our Faith Declaration & Ministry Practice</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3">Speaking Life Through Faith</h3>
                <p className="mb-3">
                  The Bible says to call those things that be not as though they were (Romans 4:17). When we speak a command known as a prayer of faith in accordance with Mark 11:23-24, knowing God watches over His word to perform it (Jeremiah 1:12) and He said "concerning the work of my hands command ye me" (Isaiah 45:11), we may speak life into you even if in the natural it doesn't look like you've changed whatsoever. It is our biblical faith right to practice our faith whether you accept it or not. We will speak the desired outcome of faith.
                </p>
                <p className="mb-3">
                  We are children of God and called to act like Jesus and do His works and greater works (John 14:12). We will never minister to a child without the child's parents' permission. In the event we had to minister to a child knowing it would benefit the child, we will do so with the company of another individual.
                </p>
                <p className="mb-3">
                  A hypothetical situation may be: we see a child on the ground in public. We call 000; however, at the same time whilst waiting for 000, we command "be healed in Jesus' name" and then we praise God, looking like "yes, crazy people to the world" however not crazy to the spiritual realm. As we give thanks praising God, we are rejoicing at the outcome believing the child is healed.
                </p>
                <p className="mb-3">
                  Please note such practice will be done everywhere when required. We command and thank God with joy. The joy of the Lord is our strength (Nehemiah 8:10). God watches over His word to perform it, period (Isaiah 55:11). We just have to hold fast our confession (Hebrews 10:23). It will come to pass what we believe in our heart and speak with our mouths as believers in Jesus who called us to heal the sick, cast out demons, raise the dead, etc. (Matthew 10:8; Mark 16:17-18).
                </p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-white/5 border border-white/10 p-6 rounded-lg">
            <h2 className="text-2xl font-black text-white mb-4 heading-font">8. Ministry Contact Information</h2>
            <div className="text-gray-300 leading-relaxed">
              <p>For questions about our healing ministry or this medical disclaimer:</p>
              <div className="mt-4 space-y-2">
                <p><strong className="text-white">Supernatural Churches Limited</strong></p>
                <p>Ministry Team</p>
                <p>Email: ministry@supernatural.institute</p>
                <p>Phone: [Phone Number]</p>
                <p>Response Time: Within 24 hours</p>
              </div>
              <p className="mt-4 text-sm text-gray-400">
                Note: We minister healing according to God's Word. Participation is voluntary and outcomes depend on personal faith and adherence to the Word taught.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MedicalDisclaimer;
