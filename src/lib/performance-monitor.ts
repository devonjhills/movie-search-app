"use client";

/**
 * Performance monitoring utilities for Core Web Vitals and custom metrics
 */

interface PerformanceMetric {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  timestamp: number;
}

interface WebVitalData {
  name: "CLS" | "INP" | "FCP" | "LCP" | "TTFB";
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  id: string;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private isEnabled: boolean;
  private onMetric?: (metric: PerformanceMetric) => void;

  constructor(enabled = process.env.NODE_ENV === "development") {
    this.isEnabled = enabled;
    this.setupWebVitals();
    this.setupCustomMetrics();
  }

  /**
   * Set up Core Web Vitals monitoring
   */
  private setupWebVitals() {
    if (!this.isEnabled || typeof window === "undefined") return;

    // Import web-vitals dynamically to avoid SSR issues
    import("web-vitals")
      .then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
        onCLS(this.handleWebVital);
        onINP(this.handleWebVital); // FID is deprecated, use INP instead
        onFCP(this.handleWebVital);
        onLCP(this.handleWebVital);
        onTTFB(this.handleWebVital);
      })
      .catch(() => {
        // Fallback if web-vitals is not available
        console.warn("Web Vitals not available");
      });
  }

  private handleWebVital = (vital: WebVitalData) => {
    const metric: PerformanceMetric = {
      name: vital.name,
      value: vital.value,
      rating: vital.rating,
      timestamp: Date.now(),
    };

    this.addMetric(metric);

    // Log poor performance
    if (vital.rating === "poor") {
      console.warn(`Poor ${vital.name}: ${vital.value}`, vital);
    }
  };

  /**
   * Set up custom performance metrics
   */
  private setupCustomMetrics() {
    if (!this.isEnabled || typeof window === "undefined") return;

    // Monitor long tasks
    if ("PerformanceObserver" in window) {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            this.addMetric({
              name: "Long Task",
              value: entry.duration,
              rating:
                entry.duration > 100
                  ? "poor"
                  : entry.duration > 50
                    ? "needs-improvement"
                    : "good",
              timestamp: Date.now(),
            });
          });
        });
        longTaskObserver.observe({ entryTypes: ["longtask"] });

        // Monitor layout shifts
        const layoutShiftObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            const layoutShiftEntry = entry as PerformanceEntry & {
              value: number;
              hadRecentInput: boolean;
            };
            if (layoutShiftEntry.hadRecentInput) return; // Ignore user-initiated shifts

            this.addMetric({
              name: "Layout Shift",
              value: layoutShiftEntry.value,
              rating:
                layoutShiftEntry.value > 0.25
                  ? "poor"
                  : layoutShiftEntry.value > 0.1
                    ? "needs-improvement"
                    : "good",
              timestamp: Date.now(),
            });
          });
        });
        layoutShiftObserver.observe({ entryTypes: ["layout-shift"] });

        // Monitor largest contentful paint
        const lcpObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            this.addMetric({
              name: "LCP Element",
              value: entry.startTime,
              rating:
                entry.startTime > 4000
                  ? "poor"
                  : entry.startTime > 2500
                    ? "needs-improvement"
                    : "good",
              timestamp: Date.now(),
            });
          });
        });
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
      } catch (e) {
        console.warn("Performance Observer not fully supported:", e);
      }
    }

    // Monitor page load metrics
    window.addEventListener("load", () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType(
          "navigation",
        )[0] as PerformanceNavigationTiming;
        if (navigation) {
          this.addMetric({
            name: "DOM Content Loaded",
            value:
              navigation.domContentLoadedEventEnd -
              navigation.domContentLoadedEventStart,
            rating:
              navigation.domContentLoadedEventEnd -
                navigation.domContentLoadedEventStart >
              2000
                ? "poor"
                : "good",
            timestamp: Date.now(),
          });

          this.addMetric({
            name: "Page Load",
            value: navigation.loadEventEnd - navigation.loadEventStart,
            rating:
              navigation.loadEventEnd - navigation.loadEventStart > 4000
                ? "poor"
                : "good",
            timestamp: Date.now(),
          });
        }
      }, 0);
    });
  }

  /**
   * Add a custom metric
   */
  addMetric(metric: PerformanceMetric) {
    if (!this.isEnabled) return;

    this.metrics.push(metric);
    this.onMetric?.(metric);

    // Keep only last 100 metrics
    if (this.metrics.length > 100) {
      this.metrics.shift();
    }
  }

  /**
   * Measure function execution time
   */
  measure<T>(name: string, fn: () => T): T {
    if (!this.isEnabled) return fn();

    const start = performance.now();
    const result = fn();
    const end = performance.now();
    const duration = end - start;

    this.addMetric({
      name: `Function: ${name}`,
      value: duration,
      rating:
        duration > 100 ? "poor" : duration > 16 ? "needs-improvement" : "good",
      timestamp: Date.now(),
    });

    return result;
  }

  /**
   * Measure async function execution time
   */
  async measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    if (!this.isEnabled) return fn();

    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    const duration = end - start;

    this.addMetric({
      name: `Async Function: ${name}`,
      value: duration,
      rating:
        duration > 1000
          ? "poor"
          : duration > 500
            ? "needs-improvement"
            : "good",
      timestamp: Date.now(),
    });

    return result;
  }

  /**
   * Mark a custom timing
   */
  mark(name: string) {
    if (!this.isEnabled || typeof window === "undefined") return;

    try {
      performance.mark(name);
    } catch (e) {
      console.warn("Performance mark failed:", e);
    }
  }

  /**
   * Measure between two marks
   */
  measureBetween(name: string, startMark: string, endMark: string) {
    if (!this.isEnabled || typeof window === "undefined") return;

    try {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name, "measure")[0];

      if (measure) {
        this.addMetric({
          name: `Measure: ${name}`,
          value: measure.duration,
          rating:
            measure.duration > 100
              ? "poor"
              : measure.duration > 16
                ? "needs-improvement"
                : "good",
          timestamp: Date.now(),
        });
      }
    } catch (e) {
      console.warn("Performance measure failed:", e);
    }
  }

  /**
   * Get all metrics
   */
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  /**
   * Get metrics by name
   */
  getMetricsByName(name: string): PerformanceMetric[] {
    return this.metrics.filter((metric) => metric.name === name);
  }

  /**
   * Get average metric value
   */
  getAverageMetric(name: string): number {
    const metrics = this.getMetricsByName(name);
    if (metrics.length === 0) return 0;

    const sum = metrics.reduce((acc, metric) => acc + metric.value, 0);
    return sum / metrics.length;
  }

  /**
   * Set metric callback
   */
  setOnMetric(callback: (metric: PerformanceMetric) => void) {
    this.onMetric = callback;
  }

  /**
   * Clear all metrics
   */
  clear() {
    this.metrics = [];
  }

  /**
   * Get performance summary
   */
  getSummary() {
    const summary: Record<
      string,
      { avg: number; count: number; poor: number }
    > = {};

    this.metrics.forEach((metric) => {
      if (!summary[metric.name]) {
        summary[metric.name] = { avg: 0, count: 0, poor: 0 };
      }

      summary[metric.name].count++;
      summary[metric.name].avg =
        (summary[metric.name].avg * (summary[metric.name].count - 1) +
          metric.value) /
        summary[metric.name].count;

      if (metric.rating === "poor") {
        summary[metric.name].poor++;
      }
    });

    return summary;
  }
}

// Create global instance
export const performanceMonitor = new PerformanceMonitor();

// Export types
export type { PerformanceMetric, WebVitalData };

// Utility functions
export function measureImageLoad(src: string) {
  return new Promise<number>((resolve) => {
    const start = performance.now();
    const img = new Image();

    img.onload = () => {
      const end = performance.now();
      const duration = end - start;

      performanceMonitor.addMetric({
        name: "Image Load",
        value: duration,
        rating:
          duration > 2000
            ? "poor"
            : duration > 1000
              ? "needs-improvement"
              : "good",
        timestamp: Date.now(),
      });

      resolve(duration);
    };

    img.onerror = () => {
      const end = performance.now();
      resolve(end - start);
    };

    img.src = src;
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function reportWebVitals(_metric: WebVitalData) {
  // Send to analytics service if needed
  if (process.env.NODE_ENV === "production") {
    // Example: Send to Google Analytics
    // gtag('event', metric.name, {
    //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    //   event_category: 'Web Vitals',
    //   event_label: metric.id,
    //   non_interaction: true,
    // });
  }
}

export default performanceMonitor;
