import { useCallback, useEffect, useMemo, useState } from 'react';

export const useLocalStorage = <T>(key: string, defaultValue: T): [T, (v: T) => void] => {
  const [getHook, setHook] = useState(defaultValue);
  const [isLocalhost, setIslocalhost] = useState(false);

  const getStoredValue = useCallback(() => {
    if (!isLocalhost) return undefined;
    const value = localStorage.getItem(key);

    if (!value) {
      return value;
    }
    return JSON.parse(value);
  }, [isLocalhost, key]);

  const setStoredValue = useCallback(
    (newValue: T) => {
      if (isLocalhost) {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    },
    [isLocalhost, key],
  );

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      setIslocalhost(true);
      const v = localStorage.getItem(key);

      if (v) {
        setHook(JSON.parse(v));
      }
    }
  }, [key, setHook]);

  const value = useMemo(() => {
    const v = getStoredValue();

    if (v) {
      return v;
    }
    return getHook;
  }, [getHook, getStoredValue]);

  const setValue = useCallback(
    (newValue: T) => {
      setStoredValue(newValue);
      setHook(newValue);
    },
    [setHook, setStoredValue],
  );

  return [value, setValue];
};
