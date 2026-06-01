'use client';

import { useRouter } from 'next/navigation';
import SearchBar from '@/components/ui/SearchBar';

export default function HomeSearchBar() {
  const router = useRouter();
  return <SearchBar onFocus={() => router.push('/customer/search/recent')} />;
}
