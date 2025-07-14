import posthog from 'posthog-js';

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    // Optionally set defaults or other config here
    // See https://posthog.com/docs/libraries/js#config for more
  });
}

export default posthog; 