import { useEffect } from 'react';

export const useOutsideClick = (ref: any, callback: (event: MouseEvent) => void) => {
  useEffect(() => {
    function handleEvent(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event);
      }
    }

    document.addEventListener('mousedown', handleEvent);
    return () => {
      document.removeEventListener('mousedown', handleEvent);
    };
  }, [ref, callback]);
};
