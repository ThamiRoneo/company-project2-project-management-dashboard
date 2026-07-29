import { useState, useEffect } from "react";

/**
 * Custom hook that syncs state with localStorage.
 * Falls back to the initial value if reading/writing fails.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Storage full or unavailable — silently fail
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
