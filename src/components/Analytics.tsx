import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics configuration
const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || '';

// Initialize Google Analytics
export const initializeGA = () => {
  if (!GA_TRACKING_ID) {
    console.warn('Google Analytics tracking ID not found. Please set VITE_GA_TRACKING_ID in your environment variables.');
    return;
  }

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      page_title: title || document.title,
    });
  }
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Analytics component to track page views
const Analytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when route changes
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null; // This component doesn't render anything
};

export default Analytics;

// TypeScript declarations for gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

