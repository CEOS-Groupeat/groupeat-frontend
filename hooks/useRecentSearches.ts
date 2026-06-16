import { useState, useCallback } from 'react';

export function getSearches() {
  if (typeof window === 'undefined') return [];
  const searches = localStorage.getItem('recentSearches');
  return searches ? JSON.parse(searches) : [];
}

export function addSearch(keyword: string) {
  if (typeof window === 'undefined') return [];
  const searches = getSearches();
  const filtered = searches.filter((s: string) => s !== keyword);
  const newSearches = [keyword, ...filtered].slice(0, 10);
  localStorage.setItem('recentSearches', JSON.stringify(newSearches));
  return newSearches;
}

export function removeSearch(keyword: string) {
  if (typeof window === 'undefined') return;
  const searches = getSearches();
  const updated = searches.filter((s: string) => s !== keyword);
  localStorage.setItem('recentSearches', JSON.stringify(updated));
}

export function clearSearches() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('recentSearches');
}

export function useRecentSearches() {
  const [searches, setSearches] = useState<string[]>(() => getSearches());

  const add = useCallback((keyword: string) => {
    const updated = addSearch(keyword);
    if (updated) setSearches(updated);
  }, []);

  const remove = useCallback((keyword: string) => {
    removeSearch(keyword);
    setSearches(getSearches());
  }, []);

  const clear = useCallback(() => {
    clearSearches();
    setSearches([]);
  }, []);

  return { searches, add, remove, clear };
}
