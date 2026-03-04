// src/posthogClient.js
import posthog from "posthog-js";

// Replace with your Project API key and PostHog instance URL
posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
  api_host: "https://app.posthog.com", // or your self-hosted URL
  autocapture: true, // enables automatic event tracking
  capture_pageview: true,
  capture_pageleave: true,
});

export default posthog;
