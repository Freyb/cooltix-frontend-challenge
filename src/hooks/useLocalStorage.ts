import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';

export const useLocalStorage = <T>(key: string, hook: [T, Dispatch<SetStateAction<T>>]): [T, (v: T) => void] => {
  const [getHook, setHook] = hook;
  const [isLocalhost, setIslocalhost] = useState(false);

  const getStoredValue = useCallback(() => {
    if (!isLocalhost) return undefined;
    const value = localStorage.getItem(key);

    if (!value) {
      return value;
    }
    return JSON.parse(value);
  }, [isLocalhost, key]);

  const setStoredValue = (newValue: T) => {
    if (isLocalhost) {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  };

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      setIslocalhost(true);
      const v = getStoredValue();
      if (v) {
        setHook(v);
      }
    }
  }, [getStoredValue, setHook]);

  const value = useMemo(() => {
    const v = getStoredValue();

    if (v) {
      return v;
    }
    return getHook;
  }, [getHook, getStoredValue]);

  const setValue = (newValue: T) => {
    setHook(newValue);
    setStoredValue(newValue);
  };

  return [value, setValue];
};
