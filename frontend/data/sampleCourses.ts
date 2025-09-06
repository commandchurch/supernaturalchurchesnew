export interface SampleCourse {
  id: number;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  previewVideoUrl?: string;
  previewImageUrl?: string;
  pdfUrl?: string;
  durationMinutes?: number;
  isPublished: boolean;
  isPremium: boolean;
  accessType?: 'free' | 'premium' | 'church';
  createdAt: string;
  instructor?: string;
  rating?: number;
  enrolledCount?: number;
  modules?: Module[];
  quiz?: Quiz;
  certificate?: boolean;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Module {
  id: string;
  title: string;
  duration: number;
  type: 'video';
  content: {
    url: string;
    notes?: string[];
    quiz?: {
      questions: QuizQuestion[];
      passingScore: number;
    };
  };
  completed: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  question: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation?: string;
}

// Sample Courses Data
export const sampleCourses: SampleCourse[] = [
  {
    id: 1,
    title: "Evangelism Essentials",
    description: "Master the fundamentals of sharing the Gospel with confidence and supernatural power. Learn biblical principles, practical techniques, and supernatural strategies for effective evangelism.",
    category: "evangelism",
    subcategory: "Gospel Sharing",
    thumbnailUrl: "/api/placeholder/400/250",
    previewImageUrl: "/api/placeholder/400/250",
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    durationMinutes: 120,
    isPublished: true,
    isPremium: false,
    accessType: "free",
    createdAt: "2024-01-15T00:00:00Z",
    instructor: "Ministry Team",
    rating: 4.8,
    enrolledCount: 1250,
    certificate: true,
    difficulty: "Beginner",
    modules: [
      {
        id: "evangelism-intro",
        title: "Introduction to Supernatural Evangelism",
        duration: 15,
        type: "video",
        content: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          notes: [
            "Understanding the biblical foundation for evangelism",
            "The power of the Holy Spirit in sharing the Gospel",
            "Jesus' Great Commission (Matthew 28:19-20)",
            "The promise of Holy Spirit power (Acts 1:8)",
            "Key principles: Love, Power, Wisdom, Boldness, Relationship"
          ],
          quiz: {
            questions: [
              {
                id: "q1",
                type: "multiple-choice",
                question: "What is the primary biblical foundation for evangelism?",
                options: [
                  "The Great Commission (Matthew 28:19-20)",
                  "The Lord's Prayer",
                  "The Ten Commandments",
                  "The Beatitudes"
                ],
                correctAnswer: 0,
                explanation: "Jesus' Great Commission in Matthew 28:19-20 is the foundational command for evangelism."
              },
              {
                id: "q2",
                type: "multiple-choice",
                question: "According to Acts 1:8, what will empower believers to be witnesses?",
                options: [
                  "Education and training",
                  "The Holy Spirit's power",
                  "Personal charisma",
                  "Church programs"
                ],
                correctAnswer: 1,
                explanation: "Acts 1:8 promises that believers will receive power when the Holy Spirit comes upon them to be effective witnesses."
              },
              {
                id: "q3",
                type: "true-false",
                question: "Evangelism should primarily focus on convincing people through arguments rather than introducing them to Jesus.",
                correctAnswer: false,
                explanation: "Evangelism is about introducing people to Jesus and allowing the Holy Spirit to work in their hearts, not about winning arguments."
              }
            ],
            passingScore: 70
          }
        },
        completed: false
      },
      {
        id: "evangelism-practical",
        title: "Practical Evangelism Techniques",
        duration: 25,
        type: "video",
        content: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          notes: [
            "Practical methods for sharing the Gospel in everyday conversations",
            "Romans Road approach",
            "Bridge Illustration method",
            "Supernatural approaches to evangelism",
            "Building relationships before sharing the message"
          ],
          quiz: {
            questions: [
              {
                id: "q4",
                type: "multiple-choice",
                question: "What is the most important element in effective evangelism?",
                options: [
                  "Perfect presentation",
                  "Genuine love for people",
                  "Extensive biblical knowledge",
                  "Public speaking skills"
                ],
                correctAnswer: 1,
                explanation: "Love is the foundation of all effective evangelism - people can tell when you genuinely care about them."
              },
              {
                id: "q5",
                type: "multiple-choice",
                question: "What should be your first step after someone responds positively to the Gospel?",
                options: [
                  "Immediately schedule their baptism",
                  "Start teaching them theology",
                  "Build relationship and provide follow-up",
                  "Ask them to join your church"
                ],
                correctAnswer: 2,
                explanation: "Building relationship and providing consistent follow-up is crucial for new believers to grow in their faith."
              },
              {
                id: "q6",
                type: "true-false",
                question: "Follow-up is optional in evangelism since the initial sharing is what matters most.",
                correctAnswer: false,
                explanation: "Follow-up is crucial for new believers to grow in their faith and become established in their relationship with Jesus."
              }
            ],
            passingScore: 70
          }
        },
        completed: false
      },
      {
        id: "evangelism-supernatural",
        title: "Supernatural Evangelism Strategies",
        duration: 30,
        type: "video",
        content: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
          notes: [
            "Walking in the supernatural for evangelism",
            "Words of Knowledge - specific information from God",
            "Healing and miracles as powerful testimonies",
            "Dreams and visions preparing hearts for the Gospel",
            "Divine appointments and supernatural timing",
            "Praying for opportunities and listening to the Holy Spirit",
            "Stepping out in faith and obeying promptings",
            "Building relationships and following up effectively"
          ],
          quiz: {
            questions: [
              {
                id: "q7",
                type: "multiple-choice",
                question: "What supernatural sign often confirms God's Word during evangelism?",
                options: [
                  "Words of Knowledge",
                  "Personal success",
                  "Church growth",
                  "Financial blessing"
                ],
                correctAnswer: 0,
                explanation: "Words of Knowledge - when God gives you specific information about someone that you couldn't know naturally - often opens doors for Gospel conversations."
              },
              {
                id: "q8",
                type: "true-false",
                question: "The same power that raised Jesus from the dead lives in every believer.",
                correctAnswer: true,
                explanation: "Romans 8:11 declares that the same Spirit who raised Jesus from the dead lives in us, giving us authority to heal the sick and share the Gospel with supernatural results."
              },
              {
                id: "q9",
                type: "multiple-choice",
                question: "What should you do when you sense the Holy Spirit leading you to share the Gospel?",
                options: [
                  "Wait for perfect conditions",
                  "Step out in faith and obey",
                  "Ask for more confirmation",
                  "Let someone else do it"
                ],
                correctAnswer: 1,
                explanation: "When the Holy Spirit prompts you to share the Gospel, step out in faith and obey - God will confirm His Word with supernatural signs."
              }
            ],
            passingScore: 70
          }
        },
        completed: false
      },
      {
        id: "evangelism-testimony",
        title: "Personal Testimony and Story",
        duration: 15,
        type: "video",
        content: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          notes: [
            "Effectively sharing your personal testimony",
            "The story of what Jesus has done in your life",
            "How to structure your testimony",
            "Making your story relatable and authentic",
            "Using your testimony as a bridge to share the Gospel"
          ],
          quiz: {
            questions: [
              {
                id: "q10",
                type: "multiple-choice",
                question: "What is the most powerful part of sharing your testimony?",
                options: [
                  "Describing your past sins in detail",
                  "Showing how Jesus changed your life",
                  "Impressing people with your knowledge",
                  "Making yourself look good"
                ],
                correctAnswer: 1,
                explanation: "The most powerful part of testimony is showing how Jesus transformed your life - this gives hope to others that Jesus can change theirs too."
              },
              {
                id: "q11",
                type: "true-false",
                question: "Your testimony should focus primarily on your past failures rather than Jesus' power to change lives.",
                correctAnswer: false,
                explanation: "While it's important to be honest about your past, the focus should be on Jesus' power to transform lives, not dwelling on past failures."
              },
              {
                id: "q12",
                type: "multiple-choice",
                question: "How should you end your testimony when sharing the Gospel?",
                options: [
                  "With a challenge to accept Jesus",
                  "With an invitation to church",
                  "With a question about their spiritual journey",
                  "With a prayer for them"
                ],
                correctAnswer: 2,
                explanation: "Ending with a question about their spiritual journey opens the door for conversation and allows the Holy Spirit to work in their heart."
              }
            ],
            passingScore: 70
          }
        },
        completed: false
      },
      {
        id: "evangelism-followup",
        title: "Follow-Up and Discipleship",
        duration: 15,
        type: "video",
        content: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
          notes: [
            "Follow-up is crucial for new believers",
            "Building relationships and answering questions",
            "Spiritual growth and community connection",
            "Providing ongoing support and encouragement",
            "Immediate follow-up (first 24-48 hours)",
            "Short-term follow-up (first week)",
            "Long-term discipleship (ongoing)",
            "Being patient, available, encouraging, and prayerful"
          ],
          quiz: {
            questions: [
              {
                id: "q13",
                type: "multiple-choice",
                question: "When should you begin following up with someone who responded to the Gospel?",
                options: [
                  "After a week or two",
                  "Within 24-48 hours",
                  "Only if they contact you first",
                  "After they've been to church a few times"
                ],
                correctAnswer: 1,
                explanation: "Immediate follow-up within 24-48 hours is crucial to help new believers process their decision and begin their journey with Jesus."
              },
              {
                id: "q14",
                type: "true-false",
                question: "Follow-up should focus primarily on getting people to join your church rather than helping them grow in their relationship with Jesus.",
                correctAnswer: false,
                explanation: "Follow-up should focus on helping people grow in their relationship with Jesus, though connecting them with a church community is also important."
              },
              {
                id: "q15",
                type: "multiple-choice",
                question: "What is the most important quality to demonstrate during follow-up?",
                options: [
                  "Patience",
                  "Knowledge",
                  "Organization",
                  "Enthusiasm"
                ],
                correctAnswer: 0,
                explanation: "Patience is crucial during follow-up because spiritual growth takes time, and new believers need time to process and grow."
              }
            ],
            passingScore: 70
          }
        },
        completed: false
      }
    ],
    quiz: {
      id: "evangelism-essentials-quiz",
      title: "Evangelism Essentials Assessment",
      passingScore: 70,
      questions: [
        {
          id: "q1",
          type: "multiple-choice",
          question: "What is the primary biblical foundation for evangelism?",
          options: [
            "The Great Commission (Matthew 28:19-20)",
            "The Lord's Prayer",
            "The Ten Commandments",
            "The Beatitudes"
          ],
          correctAnswer: 0,
          explanation: "Jesus' Great Commission in Matthew 28:19-20 is the foundational command for evangelism."
        },
        {
          id: "q2",
          type: "multiple-choice",
          question: "According to Acts 1:8, what will empower believers to be witnesses?",
          options: [
            "Education and training",
            "The Holy Spirit's power",
            "Personal charisma",
            "Church programs"
          ],
          correctAnswer: 1,
          explanation: "Acts 1:8 promises that believers will receive power when the Holy Spirit comes upon them to be effective witnesses."
        },
        {
          id: "q3",
          type: "true-false",
          question: "Evangelism should primarily focus on convincing people through arguments rather than introducing them to Jesus.",
          correctAnswer: false,
          explanation: "Evangelism is about introducing people to Jesus and allowing the Holy Spirit to work in their hearts, not about winning arguments."
        },
        {
          id: "q4",
          type: "multiple-choice",
          question: "What is the most important element in effective evangelism?",
          options: [
            "Perfect presentation",
            "Genuine love for people",
            "Extensive biblical knowledge",
            "Public speaking skills"
          ],
          correctAnswer: 1,
          explanation: "Love is the foundation of all effective evangelism - people can tell when you genuinely care about them."
        },
        {
          id: "q5",
          type: "multiple-choice",
          question: "What should be your first step after someone responds positively to the Gospel?",
          options: [
            "Immediately schedule their baptism",
            "Start teaching them theology",
            "Build relationship and provide follow-up",
            "Ask them to join your church"
          ],
          correctAnswer: 2,
          explanation: "Building relationship and providing consistent follow-up is crucial for new believers to grow in their faith."
        }
      ]
    }
  },
  {
    id: 2,
    title: "New Christian Essentials",
    description: "A comprehensive guide for new believers to establish a strong foundation in their faith. Learn the basics of Christianity, prayer, Bible study, and spiritual growth.",
    category: "discipleship",
    subcategory: "New Believer",
    thumbnailUrl: "/api/placeholder/400/250",
    previewImageUrl: "/api/placeholder/400/250",
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    durationMinutes: 90,
    isPublished: true,
    isPremium: false,
    accessType: "free",
    createdAt: "2024-01-20T00:00:00Z",
    instructor: "Ministry Team",
    rating: 4.7,
    enrolledCount: 890,
    certificate: true,
    difficulty: "Beginner",
    modules: [
      {
        id: "new-christian-salvation",
        title: "Understanding Your Salvation",
        duration: 15,
        type: "video",
        content: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          notes: [
            "Congratulations on your decision to follow Jesus!",
            "What happened when you got saved:",
            "Forgiveness: All sins forgiven (Colossians 2:13-14)",
            "New Life: Became a new creation (2 Corinthians 5:17)",
            "Eternal Life: Eternal life with God (John 3:16)",
            "Holy Spirit: God's Spirit lives in you (Romans 8:9)",
            "Family: Part of God's family (Ephesians 2:19)",
            "Next steps: Read Bible daily, pray regularly, find church, get baptized, share faith"
          ],
          quiz: {
            questions: [
              {
                id: "nc-q1",
                type: "multiple-choice",
                question: "What is the first step after accepting Jesus as your Savior?",
                options: [
                  "Get baptized immediately",
                  "Read the entire Bible in one week",
                  "Build a relationship with God through prayer and Bible reading",
                  "Start preaching to everyone you meet"
                ],
                correctAnswer: 2,
                explanation: "Building a relationship with God through prayer and Bible reading is the foundation for your new life in Christ."
              },
              {
                id: "nc-q2",
                type: "true-false",
                question: "The Holy Spirit only comes to certain 'super spiritual' Christians.",
                correctAnswer: false,
                explanation: "The Holy Spirit lives in every believer who has accepted Jesus as their Savior (Romans 8:9)."
              },
              {
                id: "nc-q3",
                type: "multiple-choice",
                question: "What is the most important thing to remember about your salvation?",
                options: [
                  "You must work hard to maintain it",
                  "It's secure in Jesus Christ",
                  "You can lose it if you sin",
                  "Only pastors have real salvation"
                ],
                correctAnswer: 1,
                explanation: "Your salvation is secure in Jesus Christ - it's not based on your performance but on His finished work."
              }
            ],
            passingScore: 70
          }
        },
        completed: false
      },
      {
        id: "new-christian-bible",
        title: "How to Study the Bible",
        duration: 20,
        type: "video",
        content: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
          notes: [
            "Practical methods for reading and studying God's Word",
            "Find a quiet place to study without distractions",
            "Be honest - God knows your thoughts and feelings",
            "Use the Bible as a guide for prayer",
            "Make prayer a daily habit",
            "Listen for God's voice speaking to you",
            "Prayer changes: circumstances, heart, relationship with God, lives of others"
          ],
          quiz: {
            questions: [
              {
                id: "nc-q4",
                type: "multiple-choice",
                question: "What is the primary purpose of prayer?",
                options: [
                  "To get what you want",
                  "To build relationship with God",
                  "To impress other Christians",
                  "To follow religious rituals"
                ],
                correctAnswer: 1,
                explanation: "Prayer is primarily about building and deepening your relationship with God."
              },
              {
                id: "nc-q5",
                type: "true-false",
                question: "Prayer only works if you use the right words and formulas.",
                correctAnswer: false,
                explanation: "Prayer is simply talking to God - He cares about your heart, not perfect words."
              },
              {
                id: "nc-q6",
                type: "multiple-choice",
                question: "What should you do if you don't feel like praying?",
                options: [
                  "Skip it until you feel motivated",
                  "Pray anyway and ask God to help you",
                  "Wait for someone else to pray for you",
                  "Only pray when you're in church"
                ],
                correctAnswer: 1,
                explanation: "Even when you don't feel like it, pray anyway and ask God to help you connect with Him."
              }
            ],
            passingScore: 70
          }
        },
        completed: false
      },
      {
        id: "new-christian-prayer",
        title: "The Power of Prayer",
        duration: 25,
        type: "video",
        content: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          notes: [
            "Prayer is simply talking to God",
            "It's your direct line of communication with the Creator",
            "Why pray: build relationship, receive guidance, experience peace, see miracles, intercede for others",
            "How to pray: find quiet place, be honest, use Bible as guide, pray regularly, listen",
            "Prayer changes: circumstances, heart and mind, relationship with God, lives of others",
            "Start simple: 'God, thank you for loving me. Help me to know you better today. Amen.'"
          ],
          quiz: {
            questions: [
              {
                id: "nc-q7",
                type: "multiple-choice",
                question: "What is the most important element of effective prayer?",
                options: [
                  "Using the right words",
                  "Praying for a long time",
                  "Being honest with God",
                  "Following a strict formula"
                ],
                correctAnswer: 2,
                explanation: "God wants you to be honest with Him - He already knows your thoughts and feelings anyway."
              },
              {
                id: "nc-q8",
                type: "true-false",
                question: "Prayer is primarily about getting God to do what you want.",
                correctAnswer: false,
                explanation: "While God does want to bless you, prayer is primarily about building relationship with Him."
              },
              {
                id: "nc-q9",
                type: "multiple-choice",
                question: "What should you do when you don't know what to pray about?",
                options: [
                  "Don't pray until you figure it out",
                  "Use the Bible as a guide for prayer",
                  "Only pray when others are praying with you",
                  "Wait for someone to tell you what to pray"
                ],
                correctAnswer: 1,
                explanation: "The Bible is an excellent guide for prayer - you can pray through Scripture and let it inspire your prayers."
              }
            ],
            passingScore: 70
          }
        },
        completed: false
      },
      {
        id: "new-christian-church",
        title: "Finding Your Place in the Church",
        duration: 15,
        type: "video",
        content: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
          notes: [
            "Importance of church community for new believers",
            "Getting involved in ministry and serving",
            "Finding your place in God's family",
            "Building relationships with other believers",
            "Growing in faith through community",
            "Discovering your spiritual gifts and calling"
          ],
          quiz: {
            questions: [
              {
                id: "nc-q10",
                type: "multiple-choice",
                question: "Why is church community important for new believers?",
                options: [
                  "To follow religious traditions",
                  "To build relationships and grow in faith together",
                  "To have somewhere to go on Sundays",
                  "To impress other people"
                ],
                correctAnswer: 1,
                explanation: "Church community provides support, accountability, and opportunities to grow in faith together."
              },
              {
                id: "nc-q11",
                type: "true-false",
                question: "As a new believer, you should wait a long time before getting involved in serving at church.",
                correctAnswer: false,
                explanation: "New believers should get involved in serving right away - it's a great way to grow in faith and use your gifts."
              },
              {
                id: "nc-q12",
                type: "multiple-choice",
                question: "What is the primary purpose of the church?",
                options: [
                  "To provide entertainment",
                  "To build God's Kingdom and make disciples",
                  "To collect offerings",
                  "To maintain traditions"
                ],
                correctAnswer: 1,
                explanation: "The church exists to build God's Kingdom by making disciples and helping people grow in their relationship with Jesus."
              }
            ],
            passingScore: 70
          }
        },
        completed: false
      },
      {
        id: "new-christian-holy-spirit",
        title: "Walking in the Holy Spirit",
        duration: 15,
        type: "video",
        content: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          notes: [
            "Holy Spirit is God's presence living inside you",
            "He is your Helper, Guide, and Friend",
            "Who He is: God (Trinity), lives in believers, gives gifts, produces fruit, empowers ministry",
            "What He does: convicts of sin, guides into truth, empowers for service, produces fruit, gives gifts",
            "How to walk: be sensitive to leading, obey promptings, ask for guidance, yield to control, follow peace"
          ],
          quiz: {
            questions: [
              {
                id: "nc-q13",
                type: "multiple-choice",
                question: "What is the Holy Spirit's primary role in a believer's life?",
                options: [
                  "To make you feel guilty",
                  "To be your Helper and Guide",
                  "To give you special powers",
                  "To replace Jesus"
                ],
                correctAnswer: 1,
                explanation: "The Holy Spirit is your Helper, Guide, and Friend who helps you live the Christian life."
              },
              {
                id: "nc-q14",
                type: "true-false",
                question: "The Holy Spirit only lives in certain 'super spiritual' Christians.",
                correctAnswer: false,
                explanation: "The Holy Spirit lives in every believer who has accepted Jesus as their Savior."
              },
              {
                id: "nc-q15",
                type: "multiple-choice",
                question: "How can you be sensitive to the Holy Spirit's leading?",
                options: [
                  "Ignore your conscience",
                  "Follow peace in decisions",
                  "Only do what feels good",
                  "Wait for dramatic experiences"
                ],
                correctAnswer: 1,
                explanation: "Following peace in your decisions is one way to be sensitive to the Holy Spirit's leading."
              }
            ],
            passingScore: 70
          }
        },
        completed: false
      }
    ],
    quiz: {
      id: "new-christian-quiz",
      title: "New Christian Essentials Quiz",
      passingScore: 70,
      questions: [
        {
          id: "nc-q1",
          type: "multiple-choice",
          question: "What is the first step after accepting Jesus as your Savior?",
          options: [
            "Get baptized immediately",
            "Read the entire Bible in one week",
            "Build a relationship with God through prayer and Bible reading",
            "Start preaching to everyone you meet"
          ],
          correctAnswer: 2,
          explanation: "Building a relationship with God through prayer and Bible reading is the foundation for your new life in Christ."
        },
        {
          id: "nc-q2",
          type: "true-false",
          question: "The Holy Spirit only comes to certain 'super spiritual' Christians.",
          correctAnswer: false,
          explanation: "The Holy Spirit lives in every believer who has accepted Jesus as their Savior (Romans 8:9)."
        }
      ]
    }
  },
  {
    id: 3,
    title: "Existing Christian Essentials",
    description: "Deepen your faith and grow spiritually. Learn advanced principles of Christian living, spiritual disciplines, and supernatural ministry.",
    category: "discipleship",
    subcategory: "Spiritual Growth",
    thumbnailUrl: "/api/placeholder/400/250",
    previewImageUrl: "/api/placeholder/400/250",
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    durationMinutes: 150,
    isPublished: true,
    isPremium: false,
    accessType: "free",
    createdAt: "2024-01-25T00:00:00Z",
    instructor: "Ministry Team",
    rating: 4.9,
    enrolledCount: 675,
    certificate: true,
    difficulty: "Intermediate",
    modules: [
      {
        id: "existing-christian-maturity",
        title: "Spiritual Maturity and Growth",
        duration: 25,
        type: "video",
        content: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          notes: [
            "Understanding the journey of spiritual growth and maturity in Christ",
            "Spiritual disciplines help us grow closer to God",
            "Key disciplines: Bible study, prayer, fasting, worship, fellowship",
            "Bible study: read daily, memorize verses, meditate, apply what you learn",
            "Prayer: set aside time, pray through Scripture, listen for God's voice, intercede",
            "Fasting: fast from food/activities, focus on spiritual things, seek direction, break strongholds",
            "Worship: praise, adoration, thanksgiving, corporate and personal worship",
            "Fellowship: church attendance, small groups, accountability, serving others",
            "Disciplines help know God better, transform character, prepare for ministry, keep spiritually healthy"
          ],
          quiz: {
            questions: [
              {
                id: "ec-q1",
                type: "multiple-choice",
                question: "What is the primary purpose of spiritual disciplines?",
                options: [
                  "To earn God's favor",
                  "To position ourselves to receive more of God",
                  "To impress other Christians",
                  "To follow religious rules"
                ],
                correctAnswer: 1,
                explanation: "Spiritual disciplines help us position ourselves to receive more of God's presence and become more like Jesus."
              },
              {
                id: "ec-q2",
                type: "true-false",
                question: "The Bible promises that believers will do greater works than Jesus did.",
                correctAnswer: true,
                explanation: "Jesus said in John 14:12 that whoever believes in Him will do the works He has been doing, and they will do even greater things."
              },
              {
                id: "ec-q3",
                type: "multiple-choice",
                question: "What is the most important spiritual discipline for growth?",
                options: [
                  "Fasting from food",
                  "Regular Bible study and prayer",
                  "Attending church every Sunday",
                  "Memorizing long passages of Scripture"
                ],
                correctAnswer: 1,
                explanation: "Regular Bible study and prayer form the foundation for all other spiritual disciplines and growth."
              }
            ],
            passingScore: 75
          }
        },
        completed: false
      },
      {
        id: "existing-christian-disciplines",
        title: "Spiritual Disciplines",
        duration: 30,
        type: "video",
        content: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
          notes: [
            "Spiritual disciplines are practices that help us grow closer to God and become more like Jesus",
            "Key disciplines: Bible study, prayer, fasting, worship, fellowship",
            "Bible study: read daily, memorize verses, meditate on God's Word, apply what you learn",
            "Prayer: set aside dedicated time, pray through Scripture, listen for God's voice, intercede for others",
            "Fasting: fast from food or activities, focus on spiritual things, seek God's direction, break strongholds",
            "Worship: praise and adoration, thanksgiving, corporate worship, personal worship time",
            "Fellowship: regular church attendance, small group involvement, accountability relationships, serving others",
            "Why practice disciplines: know God better, transform character, prepare for ministry, keep spiritually healthy",
            "Remember: Disciplines are not about earning God's love - they're about positioning ourselves to receive more of Him"
          ],
          quiz: {
            questions: [
              {
                id: "ec-q4",
                type: "multiple-choice",
                question: "Which spiritual discipline involves abstaining from food or activities to focus on God?",
                options: [
                  "Prayer",
                  "Bible study",
                  "Fasting",
                  "Worship"
                ],
                correctAnswer: 2,
                explanation: "Fasting involves abstaining from food or other activities to focus on spiritual things and seek God's direction."
              },
              {
                id: "ec-q5",
                type: "true-false",
                question: "Spiritual disciplines are primarily about earning God's approval.",
                correctAnswer: false,
                explanation: "Spiritual disciplines are about positioning ourselves to receive more of God, not earning His approval which we already have through Jesus."
              },
              {
                id: "ec-q6",
                type: "multiple-choice",
                question: "What is the ultimate goal of practicing spiritual disciplines?",
                options: [
                  "To become a spiritual elite",
                  "To grow closer to God and become more like Jesus",
                  "To impress other believers",
                  "To gain supernatural powers"
                ],
                correctAnswer: 1,
                explanation: "The ultimate goal of spiritual disciplines is to grow closer to God and become more like Jesus in character and ministry."
              }
            ],
            passingScore: 75
          }
        },
        completed: false
      },
      {
        id: "existing-christian-ministry",
        title: "Discovering Your Ministry Calling",
        duration: 35,
        type: "video",
        content: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          notes: [
            "Learn how to discover and step into your unique calling and ministry gifts",
            "Biblical foundation for supernatural living",
            "Jesus said we would do greater works (John 14:12)",
            "We have the same Holy Spirit that raised Jesus (Romans 8:11)",
            "We have authority over sickness and demons (Mark 16:17-18)",
            "Practical steps: believe God's Word, expect supernatural results, step out in faith",
            "Pray with authority using Jesus' name",
            "Flow in the Spirit: be led by Holy Spirit, follow peace in decisions, operate in spiritual gifts",
            "Build faith: hear God's Word, act on what you hear, celebrate small victories, share testimonies"
          ],
          quiz: {
            questions: [
              {
                id: "ec-q7",
                type: "multiple-choice",
                question: "According to John 14:12, what did Jesus promise believers would do?",
                options: [
                  "Build bigger churches",
                  "Greater works than Jesus did",
                  "Travel the world",
                  "Write more books"
                ],
                correctAnswer: 1,
                explanation: "Jesus promised in John 14:12 that believers would do greater works than He did, demonstrating His power through us."
              },
              {
                id: "ec-q8",
                type: "true-false",
                question: "The supernatural is reserved only for certain 'elite' Christians.",
                correctAnswer: false,
                explanation: "The supernatural is available to all believers who step out in faith and follow the Holy Spirit's leading."
              },
              {
                id: "ec-q9",
                type: "multiple-choice",
                question: "What is the first step in living supernaturally?",
                options: [
                  "Believe God's Word literally",
                  "Wait for a special experience",
                  "Get training from a famous minister",
                  "Join a supernatural ministry"
                ],
                correctAnswer: 0,
                explanation: "The first step is to believe God's Word literally and expect supernatural results when you step out in faith."
              }
            ],
            passingScore: 75
          }
        },
        completed: false
      },
      {
        id: "existing-christian-supernatural",
        title: "Living in the Supernatural",
        duration: 30,
        type: "video",
        content: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
          notes: [
            "Christians are called to live supernaturally - walking in God's power and seeing His Kingdom come",
            "Biblical foundation: Jesus said we would do greater works (John 14:12)",
            "We have the same Holy Spirit that raised Jesus (Romans 8:11)",
            "We have authority over sickness and demons (Mark 16:17-18)",
            "Practical steps: believe God's Word, expect supernatural results, step out in faith",
            "Pray with authority: use Jesus' name, command sickness to leave, speak to storms, cast out demons",
            "Flow in the Spirit: be led by Holy Spirit, follow peace in decisions, operate in spiritual gifts, trust God's timing",
            "Build faith: hear God's Word, act on what you hear, celebrate small victories, share testimonies",
            "Remember: The supernatural is normal Christianity! Don't settle for less than what Jesus promised"
          ],
          quiz: {
            questions: [
              {
                id: "ec-q10",
                type: "multiple-choice",
                question: "What authority do believers have according to Mark 16:17-18?",
                options: [
                  "Authority over sickness and demons",
                  "Authority over governments",
                  "Authority over other believers",
                  "Authority over angels"
                ],
                correctAnswer: 0,
                explanation: "Mark 16:17-18 gives believers authority over sickness and demons, and promises that signs will follow those who believe."
              },
              {
                id: "ec-q11",
                type: "true-false",
                question: "Operating in the supernatural requires special training or elite status.",
                correctAnswer: false,
                explanation: "The supernatural is available to all believers who believe God's Word and step out in faith."
              },
              {
                id: "ec-q12",
                type: "multiple-choice",
                question: "What is the key to flowing in the Holy Spirit's power?",
                options: [
                  "Following peace in decisions",
                  "Having dramatic experiences",
                  "Being more religious",
                  "Waiting for others to lead"
                ],
                correctAnswer: 0,
                explanation: "Following peace in your decisions is a key way to be led by the Holy Spirit and flow in His power."
              }
            ],
            passingScore: 75
          }
        },
        completed: false
      },
      {
        id: "existing-christian-leadership",
        title: "Christian Leadership Principles",
        duration: 30,
        type: "video",
        content: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          notes: [
            "Learn biblical principles of leadership and how to lead effectively in ministry",
            "Servant leadership modeled by Jesus",
            "Leading by example and through relationship",
            "Developing and mentoring others",
            "Making decisions with wisdom and prayer",
            "Balancing vision with care for people",
            "Leading with integrity and character",
            "Multiplying leaders through discipleship"
          ],
          quiz: {
            questions: [
              {
                id: "ec-q13",
                type: "multiple-choice",
                question: "What kind of leadership did Jesus model?",
                options: [
                  "Authoritarian leadership",
                  "Servant leadership",
                  "Dictatorial leadership",
                  "Distant leadership"
                ],
                correctAnswer: 1,
                explanation: "Jesus modeled servant leadership, washing His disciples' feet and giving His life for others."
              },
              {
                id: "ec-q14",
                type: "true-false",
                question: "Christian leaders should focus primarily on position and authority rather than serving others.",
                correctAnswer: false,
                explanation: "Christian leadership is about serving others, just as Jesus came not to be served but to serve."
              },
              {
                id: "ec-q15",
                type: "multiple-choice",
                question: "What is the ultimate goal of Christian leadership?",
                options: [
                  "Building a large organization",
                  "Developing and multiplying disciples",
                  "Gaining personal recognition",
                  "Accumulating wealth"
                ],
                correctAnswer: 1,
                explanation: "The ultimate goal of Christian leadership is to develop and multiply disciples who can lead others."
              }
            ],
            passingScore: 75
          }
        },
        completed: false
      }
    ],
    quiz: {
      id: "existing-christian-quiz",
      title: "Existing Christian Essentials Quiz",
      passingScore: 75,
      questions: [
        {
          id: "ec-q1",
          type: "multiple-choice",
          question: "What is the primary purpose of spiritual disciplines?",
          options: [
            "To earn God's favor",
            "To position ourselves to receive more of God",
            "To impress other Christians",
            "To follow religious rules"
          ],
          correctAnswer: 1,
          explanation: "Spiritual disciplines help us position ourselves to receive more of God's presence and become more like Jesus."
        },
        {
          id: "ec-q2",
          type: "true-false",
          question: "The Bible promises that believers will do greater works than Jesus did.",
          correctAnswer: true,
          explanation: "Jesus said in John 14:12 that whoever believes in Him will do the works He has been doing, and they will do even greater things."
        }
      ]
    }
  },
  {
    id: 4,
    title: "Bible Essentials",
    description: "Master the foundational principles of biblical interpretation and understanding. Learn how to study Scripture effectively and apply God's Word to your life.",
    category: "bible-study",
    subcategory: "Scripture Study",
    thumbnailUrl: "/api/placeholder/400/250",
    previewImageUrl: "/api/placeholder/400/250",
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    durationMinutes: 110,
    isPublished: true,
    isPremium: false,
    accessType: "free",
    createdAt: "2024-02-01T00:00:00Z",
    instructor: "Ministry Team",
    rating: 4.6,
    enrolledCount: 920,
    certificate: true,
    difficulty: "Beginner",
    modules: [
      {
        id: "bible-overview",
        title: "Bible Overview and Structure",
        duration: 20,
        type: "video",
        content: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
          notes: [
            "Comprehensive overview of the Bible's structure, books, and major themes",
            "Principles of biblical interpretation: context is king",
            "Historical context: when and why was it written?",
            "Cultural context: what was the culture like?",
            "Literary context: what comes before and after?",
            "Interpret literally: take Bible at face value, look for plain meaning first",
            "Compare Scripture with Scripture: let Bible interpret itself",
            "Consider the genre: poetry, history, prophecy, letters, etc.",
            "Apply personally: what does this mean for my life?",
            "Holy Spirit is your ultimate teacher (John 14:26)"
          ],
          quiz: {
            questions: [
              {
                id: "be-q1",
                type: "multiple-choice",
                question: "What is the most important principle of biblical interpretation?",
                options: [
                  "Context is King",
                  "Always interpret literally",
                  "Use modern translations only",
                  "Focus on prophecy first"
                ],
                correctAnswer: 0,
                explanation: "Understanding the context (historical, cultural, literary) is essential for correctly interpreting any passage of Scripture."
              },
              {
                id: "be-q2",
                type: "true-false",
                question: "The Bible should be interpreted using the same principles as any other book.",
                correctAnswer: false,
                explanation: "While the Bible is literature, it is also God's inspired Word and requires special consideration of its divine authorship and purpose."
              },
              {
                id: "be-q3",
                type: "multiple-choice",
                question: "What should be your primary goal when studying the Bible?",
                options: [
                  "To gain knowledge for debates",
                  "To apply God's Word to your life",
                  "To memorize as many verses as possible",
                  "To understand ancient history"
                ],
                correctAnswer: 1,
                explanation: "The ultimate goal of Bible study is life transformation through applying God's principles to your daily walk."
              }
            ],
            passingScore: 70
          }
        },
        completed: false
      },
      {
        id: "bible-interpretation",
        title: "Principles of Biblical Interpretation",
        duration: 25,
        type: "video",
        content: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          notes: [
            "Learning to interpret the Bible correctly is essential for understanding God's Word",
            "Key principles of biblical interpretation",
            "Context is King: historical, cultural, literary context",
            "Interpret literally: take at face value, plain meaning first, consider figures of speech",
            "Compare Scripture with Scripture: let Bible interpret itself, use clearer passages",
            "Consider the genre: poetry, history, prophecy, letters have different rules",
            "Apply personally: what does this mean for my life? How should I respond?",
            "Holy Spirit is your ultimate teacher (John 14:26)"
          ],
          quiz: {
            questions: [
              {
                id: "be-q4",
                type: "multiple-choice",
                question: "What does 'context is king' mean in biblical interpretation?",
                options: [
                  "The king wrote the Bible",
                  "Understanding historical, cultural, and literary context is essential",
                  "Only kings can interpret the Bible",
                  "Context is more important than the text itself"
                ],
                correctAnswer: 1,
                explanation: "Context is king means that understanding the historical, cultural, and literary context is essential for correctly interpreting any passage."
              },
              {
                id: "be-q5",
                type: "true-false",
                question: "The Bible should always be interpreted literally, never figuratively.",
                correctAnswer: false,
                explanation: "While we should look for the plain meaning first, the Bible does contain figures of speech and different literary genres that require appropriate interpretation."
              },
              {
                id: "be-q6",
                type: "multiple-choice",
                question: "What is the role of the Holy Spirit in biblical interpretation?",
                options: [
                  "To replace the need for study",
                  "To be your ultimate teacher and guide",
                  "To give you special knowledge others don't have",
                  "To make interpretation unnecessary"
                ],
                correctAnswer: 1,
                explanation: "The Holy Spirit is your ultimate teacher (John 14:26) who guides you into truth and helps you understand and apply God's Word."
              }
            ],
            passingScore: 70
          }
        },
        completed: false
      },
      {
        id: "bible-study-methods",
        title: "Effective Bible Study Methods",
        duration: 25,
        type: "video",
        content: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
          notes: [
            "Practical methods for studying the Bible: SOAP, inductive study, topical studies",
            "Knowledge of the Bible is important, but application transforms your life",
            "Steps for application: understand the text, ask personal questions, make it personal",
            "Put into practice: start small, build habits, track progress, celebrate victories",
            "Review and adjust: evaluate what worked, make changes, continue growing",
            "Application areas: relationships, character, ministry, work, finances, health",
            "Goal of Bible study: transformation, not just knowledge"
          ],
          quiz: {
            questions: [
              {
                id: "be-q7",
                type: "multiple-choice",
                question: "What is the SOAP method of Bible study?",
                options: [
                  "Scripture, Observation, Application, Prayer",
                  "Study, Observe, Apply, Pray",
                  "Search, Outline, Analyze, Practice",
                  "See, Observe, Apply, Practice"
                ],
                correctAnswer: 0,
                explanation: "SOAP stands for Scripture, Observation, Application, Prayer - a simple method for studying and applying God's Word."
              },
              {
                id: "be-q8",
                type: "true-false",
                question: "The goal of Bible study is primarily to gain knowledge rather than life transformation.",
                correctAnswer: false,
                explanation: "While knowledge is important, the ultimate goal of Bible study is life transformation through applying God's Word."
              },
              {
                id: "be-q9",
                type: "multiple-choice",
                question: "What should you do after understanding a Bible passage?",
                options: [
                  "Move on to the next passage",
                  "Ask: What does this mean for my life?",
                  "Memorize it immediately",
                  "Share it on social media"
                ],
                correctAnswer: 1,
                explanation: "After understanding a passage, ask personal questions about how it applies to your life and what changes you need to make."
              }
            ],
            passingScore: 70
          }
        },
        completed: false
      },
      {
        id: "bible-application",
        title: "Applying God's Word to Your Life",
        duration: 20,
        type: "video",
        content: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          notes: [
            "Knowledge of the Bible is important, but application transforms your life",
            "Practical steps for applying Scripture",
            "Understand the text: read carefully and prayerfully, consider context",
            "Ask personal questions: what is God saying to me? How does this apply?",
            "Make it personal: replace general principles with specific actions, set deadlines",
            "Put into practice: start small, build habits, track progress, celebrate victories",
            "Review and adjust: evaluate what worked, make necessary changes, continue growing",
            "Application areas: relationships, character, ministry, work, finances, health",
            "Remember: goal of Bible study is transformation, let God's Word change you"
          ],
          quiz: {
            questions: [
              {
                id: "be-q10",
                type: "multiple-choice",
                question: "What is the first step in applying God's Word to your life?",
                options: [
                  "Tell everyone about it",
                  "Understand what the text means",
                  "Change your behavior immediately",
                  "Memorize the passage"
                ],
                correctAnswer: 1,
                explanation: "The first step is to carefully understand what the text means through prayerful reading and consideration of context."
              },
              {
                id: "be-q11",
                type: "true-false",
                question: "Application of God's Word should always be immediate and dramatic.",
                correctAnswer: false,
                explanation: "Application should start small and build habits gradually - it's about consistent obedience, not dramatic one-time changes."
              },
              {
                id: "be-q12",
                type: "multiple-choice",
                question: "What should you do if you struggle to apply a biblical principle?",
                options: [
                  "Give up and move on",
                  "Find accountability partners",
                  "Ignore it since it's too hard",
                  "Wait for motivation to return"
                ],
                correctAnswer: 1,
                explanation: "Find accountability partners who can support you, pray with you, and help you stay committed to applying God's Word."
              }
            ],
            passingScore: 70
          }
        },
        completed: false
      },
      {
        id: "bible-memory",
        title: "Scripture Memory and Meditation",
        duration: 20,
        type: "video",
        content: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          notes: [
            "Effective techniques for memorizing Scripture and meditating on God's Word",
            "Scripture memory: regular review, association techniques, writing it out",
            "Meditation: slow reading, repeating verses, personalizing God's Word",
            "Benefits: spiritual growth, resistance to temptation, wisdom in decisions",
            "Practical tips: start small, use daily routines, review regularly",
            "Make Scripture memory a lifestyle, not a chore"
          ],
          quiz: {
            questions: [
              {
                id: "be-q13",
                type: "multiple-choice",
                question: "What is a practical technique for memorizing Scripture?",
                options: [
                  "Read it once and expect to remember",
                  "Write verses on cards and review daily",
                  "Only memorize short verses",
                  "Wait for God to supernaturally download it"
                ],
                correctAnswer: 1,
                explanation: "Writing verses on cards and reviewing them daily is a proven technique for memorizing Scripture effectively."
              },
              {
                id: "be-q14",
                type: "true-false",
                question: "Scripture memory is only for pastors and Bible teachers.",
                correctAnswer: false,
                explanation: "Scripture memory is for all believers - it helps us grow spiritually, resist temptation, and make wise decisions."
              },
              {
                id: "be-q15",
                type: "multiple-choice",
                question: "What is the best way to meditate on Scripture?",
                options: [
                  "Rush through reading quickly",
                  "Read slowly, repeat verses, personalize God's Word",
                  "Only meditate during church services",
                  "Meditate while doing other activities"
                ],
                correctAnswer: 1,
                explanation: "Effective meditation involves reading slowly, repeating verses, and personalizing God's Word to understand its application to your life."
              }
            ],
            passingScore: 70
          }
        },
        completed: false
      }
    ],
    quiz: {
      id: "bible-essentials-quiz",
      title: "Bible Essentials Quiz",
      passingScore: 70,
      questions: [
        {
          id: "be-q1",
          type: "multiple-choice",
          question: "What is the most important principle of biblical interpretation?",
          options: [
            "Context is King",
            "Always interpret literally",
            "Use modern translations only",
            "Focus on prophecy first"
          ],
          correctAnswer: 0,
          explanation: "Understanding the context (historical, cultural, literary) is essential for correctly interpreting any passage of Scripture."
        },
        {
          id: "be-q2",
          type: "true-false",
          question: "The Bible should be interpreted using the same principles as any other book.",
          correctAnswer: false,
          explanation: "While the Bible is literature, it is also God's inspired Word and requires special consideration of its divine authorship and purpose."
        },
        {
          id: "be-q3",
          type: "multiple-choice",
          question: "What should be your primary goal when studying the Bible?",
          options: [
            "To gain knowledge for debates",
            "To apply God's Word to your life",
            "To memorize as many verses as possible",
            "To understand ancient history"
          ],
          correctAnswer: 1,
          explanation: "The ultimate goal of Bible study is life transformation through applying God's principles to your daily walk."
        }
      ]
    }
  }
];