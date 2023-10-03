import { useEffect, useRef, useState } from 'react';

export const useMediaQuery = ({ breakpoint, type }: { breakpoint: string; type: 'min' | 'max' }) => {
  const [matches, setMatches] = useState(false);
  const queryRef = useRef<MediaQueryList>();

  const query = `(${type}-width:${breakpoint})`;

  const callback = (event: MediaQueryListEvent) => {
    setMatches(event.matches);
  };

  useEffect(() => {
    if ('matchMedia' in window) {
      queryRef.current = window.matchMedia(query);
      setMatches(queryRef.current.matches);

      queryRef.current.addEventListener('change', callback);

      return () => queryRef.current?.removeEventListener('change', callback);
    }
    return undefined;
  }, [query]);

  return matches;
};
