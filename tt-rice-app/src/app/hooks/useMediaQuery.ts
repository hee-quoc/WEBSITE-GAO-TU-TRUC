// src/hooks/useMediaQuery.ts

import { useState, useEffect } from 'react';

/**
 * A custom hook to check if a media query matches.
 * It's SSR-safe and ensures consistency between server and client.
 * @param query The media query string, e.g., '(max-width: 767px)'
 * @returns boolean
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // The `window` object is only available on the client.
    // This check prevents the code from crashing on the server.
    if (typeof window === 'undefined') {
      return;
    }

    const media = window.matchMedia(query);

    // This function updates the state when the media query status changes.
    const listener = () => {
      setMatches(media.matches);
    };

    // Set the initial state correctly on the client.
    listener();

    // Add the event listener for window resize.
    window.addEventListener('resize', listener);

    // Cleanup function to remove the listener when the component unmounts.
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [query]); // The effect re-runs only if the query string changes.

  return matches;
};