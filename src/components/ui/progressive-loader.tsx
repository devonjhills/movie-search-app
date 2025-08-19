"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ProgressiveLoaderProps {
  children: React.ReactNode;
  delay?: number;
  threshold?: number;
  className?: string;
  fallback?: React.ReactNode;
}

export function ProgressiveLoader({
  children,
  delay = 0,
  threshold = 0.1,
  className,
  fallback,
}: ProgressiveLoaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            setTimeout(() => setHasLoaded(true), 100);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-300 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className,
      )}
    >
      {hasLoaded ? children : fallback}
    </div>
  );
}

interface StaggeredListProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  className?: string;
}

export function StaggeredList({
  children,
  staggerDelay = 50,
  className,
}: StaggeredListProps) {
  const [visibleItems, setVisibleItems] = useState(new Set<number>());

  useEffect(() => {
    children.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems((prev) => new Set([...prev, index]));
      }, index * staggerDelay);
    });
  }, [children, staggerDelay]);

  return (
    <div className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={cn(
            "transition-all duration-300 ease-out",
            visibleItems.has(index)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4",
          )}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

interface InViewAnimationProps {
  children: React.ReactNode;
  animation?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale";
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export function InViewAnimation({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 300,
  threshold = 0.1,
  className,
}: InViewAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [delay, threshold]);

  const animations = {
    fadeUp: isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
    fadeIn: isVisible ? "opacity-100" : "opacity-0",
    slideLeft: isVisible
      ? "opacity-100 translate-x-0"
      : "opacity-0 translate-x-4",
    slideRight: isVisible
      ? "opacity-100 translate-x-0"
      : "opacity-0 -translate-x-4",
    scale: isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        animations[animation],
        className,
      )}
      style={{
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default ProgressiveLoader;
