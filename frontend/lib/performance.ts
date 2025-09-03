// Performance monitoring and Core Web Vitals tracking
export interface PerformanceMetrics {
  FCP?: number;
  LCP?: number;
  CLS?: number;
  FID?: number;
  TBT?: number;
  SI?: number;
}

// Performance observer for Core Web Vitals
export class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initCoreWebVitals();
    this.initAdditionalMetrics();
  }

  private initCoreWebVitals() {
    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry;
      this.metrics.FCP = lastEntry.startTime;
      this.reportMetric('FCP', this.metrics.FCP);
    });
    fcpObserver.observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry;
      this.metrics.LCP = lastEntry.startTime;
      this.reportMetric('LCP', this.metrics.LCP);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      const entries = list.getEntries();

      for (const entry of entries) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }

      this.metrics.CLS = clsValue;
      this.reportMetric('CLS', this.metrics.CLS);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // First Input Delay (FID) - replaced by INP in newer versions
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry;
      this.metrics.FID = (lastEntry as any).processingStart - lastEntry.startTime;
      this.reportMetric('FID', this.metrics.FID);
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    this.observers.push(fcpObserver, lcpObserver, clsObserver, fidObserver);
  }

  private initAdditionalMetrics() {
    // Total Blocking Time
    const longTasksObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      let totalBlockingTime = 0;

      for (const entry of entries) {
        const blockingTime = (entry as any).duration - 50; // Tasks over 50ms block
        if (blockingTime > 0) {
          totalBlockingTime += blockingTime;
        }
      }

      this.metrics.TBT = totalBlockingTime;
      this.reportMetric('TBT', this.metrics.TBT);
    });
    longTasksObserver.observe({ entryTypes: ['longtask'] });

    // Speed Index approximation
    const navigationObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      if (entries.length > 0) {
        const navEntry = entries[0] as PerformanceNavigationTiming;
        this.metrics.SI = navEntry.loadEventEnd - navEntry.fetchStart;
        this.reportMetric('SI', this.metrics.SI);
      }
    });
    navigationObserver.observe({ entryTypes: ['navigation'] });

    this.observers.push(longTasksObserver, navigationObserver);
  }

  private reportMetric(name: string, value: number) {
    // Log to console in development
    if (import.meta.env.DEV) {
      console.log(`[Performance] ${name}: ${value.toFixed(2)}ms`);
    }

    // Send to analytics in production
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_label: name,
        value: Math.round(value),
        custom_map: { metric_value: value }
      });
    }

    // Store in localStorage for debugging
    const stored = JSON.parse(localStorage.getItem('performance_metrics') || '{}');
    stored[name] = value;
    localStorage.setItem('performance_metrics', JSON.stringify(stored));
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public getScore(): number {
    // Simplified Lighthouse-like scoring
    const scores = [];

    if (this.metrics.FCP) {
      scores.push(this.metrics.FCP < 1800 ? 100 : this.metrics.FCP < 3000 ? 50 : 0);
    }
    if (this.metrics.LCP) {
      scores.push(this.metrics.LCP < 2500 ? 100 : this.metrics.LCP < 4000 ? 50 : 0);
    }
    if (this.metrics.CLS) {
      scores.push(this.metrics.CLS < 0.1 ? 100 : this.metrics.CLS < 0.25 ? 50 : 0);
    }
    if (this.metrics.FID) {
      scores.push(this.metrics.FID < 100 ? 100 : this.metrics.FID < 300 ? 50 : 0);
    }
    if (this.metrics.TBT) {
      scores.push(this.metrics.TBT < 200 ? 100 : this.metrics.TBT < 600 ? 50 : 0);
    }

    return scores.length > 0 ? scores.reduce((a, b) => a + b) / scores.length : 0;
  }

  public destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Singleton instance
let performanceMonitor: PerformanceMonitor | null = null;

export const initPerformanceMonitoring = () => {
  if (typeof window !== 'undefined' && !performanceMonitor) {
    performanceMonitor = new PerformanceMonitor();

    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
      performanceMonitor?.destroy();
    });
  }
  return performanceMonitor;
};

export const getPerformanceMetrics = () => {
  return performanceMonitor?.getMetrics() || {};
};

export const getPerformanceScore = () => {
  return performanceMonitor?.getScore() || 0;
};

// Utility to measure custom performance marks
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();

  console.log(`[Custom Performance] ${name}: ${(end - start).toFixed(2)}ms`);

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'custom_performance', {
      event_category: 'Custom Performance',
      event_label: name,
      value: Math.round(end - start)
    });
  }
};
