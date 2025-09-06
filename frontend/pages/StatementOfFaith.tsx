import React, { useEffect } from 'react';
import { Book, Heart, Shield, Zap } from 'lucide-react';
import SEO from '../components/SEO';
import { siteUrl } from '../config';

export default function StatementOfFaith() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: Zap,
      title: 'Power, Not Just Words',
      content: 'The kingdom of God operates in miraculous power, demonstrating supernatural abilities that set true faith apart.'
    },
    {
      icon: Book,
      title: 'Scriptural Authority',
      content: 'The Scriptures serve as our definitive guide, unbroken and fulfilled through Jesus Christ.'
    },
    {
      icon: Heart,
      title: 'Divine Healing',
      content: 'Christ\'s sacrifice provides healing for all, making it a divine mandate for Christians to facilitate healing.'
    },
    {
      icon: Shield,
      title: 'Spiritual Warfare',
      content: 'We acknowledge spiritual beings and operate in the authority given to believers through Christ.'
    }
  ];

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Statement of Faith", item: `${siteUrl}/statement-of-faith` }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <SEO
        title="Statement of Faith"
        description="Read the Supernatural Churches statement of faith. Our foundational beliefs are rooted in Scripture and demonstrated through supernatural power."
        breadcrumbsJsonLd={breadcrumbs}
      />

      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-3 lg:mb-4 heading-font">
          Statement of Faith
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-3xl mx-auto px-2">
          Our foundational beliefs rooted in Scripture and demonstrated through supernatural&nbsp;power.
        </p>
      </div>

      {/* Key Principles */}
      <section className="mb-8 sm:mb-10 lg:mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 xl:gap-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={index} className="bg-white/5 border border-white/10 backdrop-blur-sm p-4 lg:p-5 xl:p-6 text-center">
                <div className="inline-flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-3 lg:mb-4">
                  <Icon className="h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-blue-400" />
                </div>
                <h3 className="text-sm lg:text-base xl:text-lg font-bold text-white mb-2 heading-font">{section.title}</h3>
                <p className="text-gray-400 text-xs lg:text-sm leading-relaxed">{section.content}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Statement of Faith Content */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8 text-xs lg:text-sm xl:text-base">

        <section>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-white mb-3 lg:mb-4 heading-font">The difference between our faith vs any other made up faith in the world.</h2>
          <div className="text-gray-300 leading-relaxed space-y-3 lg:space-y-4">
            <p className="px-2">
              <strong>1 Corinthians 4:20</strong> - For the kingdom of God is not in word but in power. The word power here is dunamis which means (miraculous) power, might, strength. Every other religion or faith talks words but they don't have the power to heal the sick, cast out demons or raise the dead. They can't even talk to the rain and tell the rain to stop raining. We have the ability to do the impossible because it says whatsoever things you desire when you pray believe that you receive them and you shall have them in Mark 11:23-24 and whoever believes on the Lord Jesus Christ shall not be put to shame in Romans 10:11.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-white mb-3 lg:mb-4 heading-font">Scriptural Authority</h2>
          <div className="text-gray-300 leading-relaxed space-y-3 lg:space-y-4">
            <p className="px-2">
              We affirm that the Scriptures, as the breath of God, serve as the definitive guide for Christian life and practice. These Scriptures stand unbroken and are fulfilled through Jesus Christ. The Old Testament foreshadows the fullness revealed in the New Testament. Through the teachings of the Apostles, we understand Christ's work in and through us.
            </p>
            <p className="text-xs text-gray-400 px-2">
              (2 Timothy 3:16-17; Hebrews 1:1-3; John 10:35; Matthew 5:19, 19:17; 1 John 2:3-4; Psalm 8:4-6; Matthew 9:8; Ephesians 4:15)
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-white mb-3 lg:mb-4 heading-font">Humanity's Divine Image</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              At Supernatural Churches, we hold a fundamental belief that humanity is composed of spiritual beings temporarily dwelling in earthly bodies, each with a soul. The soul serves as the seat of our carnal mind, where emotions, feelings, and thoughts find their abode. The physical body, often referred to as the flesh, serves as the vessel that cloaks the invisible spirit, bestowing life upon our earthly existence.
            </p>
            <p>
              In our conviction, every man and woman is meticulously crafted in the image of God, reflecting His divine attributes. This intrinsic likeness to our Creator is woven into the very fabric of our being.The human body, or flesh, operates primarily through the five senses—taste, smell, vision, hearing, and touch. These senses enable us to interact with the physical world around us.However, it is the spirit within us that embodies our true essence. When our earthly journey comes to an end, our spirit lives on, destined for either the eternal bliss of Heaven or the somber depths of Hell.
            </p>
            <p>
              We believe that as Christians, we become new spiritual creations, and our spirit possesses a spiritual mind. Our mission at Supernatural Churches is to assist fellow believers and church ministries in bridging the gap between their perfect spirit and their carnal mind, renewing their thoughts and attitudes to become more Christ-like on Earth. It is through the alignment of our renewed minds and bodies with the Spirit of God that divine works manifest in our lives, allowing God to operate effectively through us to impact the world for His glory.
            </p>
            <p className="text-xs text-gray-400">
              (Romans 5:12; John 3:16; Romans 5:8; John 14:12)
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">Humanity's Downfall</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              Despite our willful defiance and fall, Christ's sacrificial death offers us redemption. Our righteousness alone is insufficient; we must profess the righteousness of Christ as our redemption.
            </p>
            <p className="text-xs text-gray-400">
              (Romans 5:12; John 3:16; Romans 5:8; Ephesians 2:8)
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">Redemption</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              Even while engulfed in sin, Christ's sacrificial death offers us redemption. Our own righteousness is insufficient; we must seek God, professing the righteousness of Christ as our solitary redemption.
            </p>
            <p className="text-xs text-gray-400">
              (John 3:16; Romans 5:8; Ephesians 2:8)
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">Divine Empowerment through the Holy Spirit</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              We profess that the Holy Spirit emboldens believers to lead a life honoring God, emulate Christ's deeds, and cater to humanity's needs.
            </p>
            <p className="text-xs text-gray-400">
              (John 14:12; 16:7-16; Acts 1:8)
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">The Earthly Church: Christ's Body</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              We understand the earthly church as encompassing all who embrace the Spirit of Christ. It represents Christ's body on earth, continually evolving to reflect Him.
            </p>
            <p className="text-xs text-gray-400">
              (Romans 8:9; Ephesians 1:23; 4:12-16)
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">Grace and Renouncing Fruitless Actions</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              The grace, manifested through Jesus Christ, beckons all towards faith in Him. This grace encompasses both the chance and the capacity granted to humanity to seek repentance and embrace Christ for the absolution of sins. Turning away from fruitless deeds implies renouncing any action that one might deem worthy of God's favor or salvation.
            </p>
            <p className="text-xs text-gray-400">
              (John 1:16, 17; Romans 11:6; Hebrews 6:1; 9:14)
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">The Divine Trinity</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              We profess our belief in the Triune God: The Father, Son, and Holy Spirit, each distinct yet equally divine, embodying the fullness of deity.
            </p>
            <p className="text-xs text-gray-400">
              (1 John 5:7-8; Matthew 1:20-25; 2 Corinthians 13:14)
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">Spiritual Beings: Adversaries and Protectors</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              We acknowledge the existence of the Devil, our spiritual adversary, alongside spirit entities known as demons and angels. They operate from the spiritual realm.
            </p>
            <p className="text-xs text-gray-400">
              (1 Peter 5:8; Matthew 8:16; Mark 16:17; Hebrews 1:7, 13-14)
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">The Nature of Sin</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              Sin, in essence, is the absence of faith. Yet, we rejoice in the belief that our transgressions are forgiven and not counted against us. And, in moments of weakness, our advocate, Jesus Christ, stands ready to purify us.
            </p>
            <p className="text-xs text-gray-400">
              (Romans 4:8; 6:14; 14:23; 1 John 1:9-2:1)
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">The Process of Sanctification</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              In receiving Christ, we also receive sanctification, for He embodies it. Our spiritual journey in Christ is one of continuous growth in grace and a deeper commitment to holiness. Lifes choices may take us steps forward and steps back but the Holy Spirit will lead us into all truth and it's up to us to hold fast onto that truth which is God's word.
            </p>
            <p className="text-xs text-gray-400">
              (1 Corinthians 1:30; 1 Thessalonians 4:3; 2 Thessalonians 2:13; 1 Peter 1:2; 2 Peter 3:18)
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">Healing Through Christ's Sacrifice</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              We uphold the belief in Divine Healing. God's power can heal both the physical mind and physical body. Christ's sacrifice at the whipping post encompasses healing for all, making it not only possible but a divine mandate for Christians to facilitate healing, always and for everyone.
            </p>
            <p className="text-xs text-gray-400">
              (Psalm 103:2; Isaiah 53:4; Matthew 8:16-17; 1 Peter 2:24; John 14:12)
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">We go deeper into the meaning of Health</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              We believe, as Scripture attests, that by Jesus' wounds we have been healed. Grounded in the Holy passages of Isaiah 53:5, Matthew 8:17, and 1 Peter 2:24, our faith maintains that believers can reside in a continuous state of divine health, protected from illness and affliction. Quick to recover from pain or anything that may try opress the flesh. Yet, even as our earthly journey may occasionally bring minor mishaps or unforeseen events, we fervently counteract any profound misfortune and assert God's shield over all disciples in the powerful name of Jesus. Embracing and cherishing this truth, we confide in His pledge of restoration and safeguard. Additionally, we affirm that just as faith in the sanctity of Jesus' blood is essential for the gracious gift of salvation, similarly, faith in His broken body bestows upon believers the free gift of divine health. Nonetheless, to truly receive these divine blessings, one must approach with unwavering faith, avoiding a double-minded stance towards God and His Word (James 1:8). We do not force or advise anyone to stop taking medication or to stop following advice from medical professionals however we give people the word of God then let them decide what they think is best suited to them then they have an opportunity to choose which knowledge they want to serve. The knowledge of a doctors report or the knowledge of standing by faith in God's word for example. We provide factual information about the Bible and general advice and then personal advice to those who desire personal advice on the Holy Bible's opinions about one's choices and those people who want personal advice on their current situation then we provide it if they come to us for knowledge about God's word assuming consent is received if we're approached for opinions and/or advice on God's opinion or approach on a matter.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">The Ministry's Role</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              God has appointed specific individuals to guide and nurture the Body of Christ on earth. These leaders, entrusted with the growth and well-being of the faithful, are to lead until the church matures in Christ's likeness. They are designed to serve the Church not be an idol of worship. Worship is due only to the Lord Jesus Christ.
            </p>
            <p className="text-xs text-gray-400">
              (Ephesians 4:11-15; Acts 20:28; 1 Peter 5:1-3)
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">Unwavering Faith in God</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              Our faith leans not on our understanding but on God's promises and His unwavering faithfulness. We place our trust not in the strength of our faith, but in God's commitment to fulfill His Word.
            </p>
            <p className="text-xs text-gray-400">
              (Mark 11:22-23; Hebrews 6:1; 11:11; 2 Timothy 2:13)
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">Bible Teaching</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              We are committed to teaching from Bibles that provide accurate and contextual representation of the Scriptures, often referring to the Greek definitions as found in Strong's Concordance for clarity. While we may respect many translations, we do not utilise versions like the NIV that may omit verses, such as Mark 11:26. Our intention is not to be overly particular but rather to ensure that our teachings deliver the comprehensive and true essence of God's Word so you can receive clear how to instructions from the word of God.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">Christian Mission</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              We believe that the Christian Mission, rooted in Scripture, is to: Love the Lord our God with all our heart, soul, and mind, and to love our neighbour as ourselves. This love is actualised by treating others as we wish to be treated. Our deep affection for both God and humanity is showcased by multiplying and nurturing disciples of the Lord Jesus Christ, both within our borders and abroad, employing all methods affirmed in the Holy Scriptures.
            </p>
            <p className="text-xs text-gray-400">
              (Matt. 7:11-29; Matt. 28:18-20)
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
