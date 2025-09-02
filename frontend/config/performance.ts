// Performance optimization configuration for Command Church

// Query optimization patterns
export const queryOptimization = {
  // Cache strategy for different data types
  cacheStrategies: {
    // Static content can be cached longer
    staticContent: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
    // User data should be fresher
    userData: {
      staleTime: 30 * 1000, // 30 seconds
      gcTime: 5 * 60 * 1000, // 5 minutes
    },
    // Real-time data needs frequent updates
    realTimeData: {
      staleTime: 0, // Always considered stale
      gcTime: 1 * 60 * 1000, // 1 minute
    },
  },

  // Prefetch strategies
  prefetch: {
    // Prefetch critical data on app load
    criticalData: [
      'membership.getSubscriptionPlans',
      'church.getEvents',
      'academy.getCourses',
    ],
    // Prefetch on route hover/focus
    routeBasedPrefetch: {
      '/dashboard': [
        'outreach.getStats',
        'academy.getUserProgress',
      ],
      '/admin': [
        'church.getAllEvents',
        'staff.listStaff',
        'fund.getAllFundingRequests',
      ],
    },
  },

  // Bundle optimization
  bundleOptimization: {
    // Code splitting by route
    splitPoints: [
      '/admin', // Admin components are large
      '/dashboard', // Dashboard has many components
      '/academy', // Course content is heavy
    ],
    // Lazy load heavy components
    lazyComponents: [
      'CourseManagerSupercharged',
      'TeachingsManagerEnhanced',
      'AffiliateNetworkAdmin',
    ],
  },

  // Image optimization
  imageOptimization: {
    formats: ['webp', 'avif', 'jpg'],
    sizes: [320, 640, 1280, 1920],
    quality: 80,
    lazy: true,
  },

  // API optimization
  apiOptimization: {
    // Batch similar requests
    batchRequests: true,
    // Use compression
    compression: true,
    // Request deduplication
    deduplication: true,
  },
};

// Performance monitoring thresholds
export const performanceThresholds = {
  // Core Web Vitals targets
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100,  // First Input Delay (ms)
  CLS: 0.1,  // Cumulative Layout Shift
  
  // Custom metrics
  timeToInteractive: 3000, // ms
  totalBlockingTime: 300,  // ms
  speedIndex: 3000,        // ms
  
  // Bundle size limits
  bundleSizes: {
    main: 250, // KB (gzipped)
    vendor: 150, // KB (gzipped)
    individual: 50, // KB per chunk (gzipped)
  },
};

// Performance best practices checklist
export const performanceBestPractices = {
  loading: {
    // Implement loading states for all async operations
    skeletons: true,
    progressIndicators: true,
    optimisticUpdates: true,
  },
  
  errorHandling: {
    // Graceful error handling
    errorBoundaries: true,
    retryMechanisms: true,
    fallbackContent: true,
  },
  
  accessibility: {
    // Performance impacts a11y
    focusManagement: true,
    screenReaderOptimization: true,
    reducedMotion: true,
  },
  
  mobile: {
    // Mobile-first performance
    touchOptimization: true,
    networkAware: true,
    batteryAware: true,
  },
};

export default {
  queryOptimization,
  performanceThresholds,
  performanceBestPractices,
};
