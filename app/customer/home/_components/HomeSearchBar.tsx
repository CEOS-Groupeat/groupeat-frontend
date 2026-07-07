'use client';

import { useRouter } from 'next/navigation';
import SearchField from '@/components/ui/SearchField';

export default function HomeSearchBar() {
  const router = useRouter();
  return (
    <SearchField
      iconPosition="left"
      onFocus={() => router.push('/customer/search/recent')}
    />
  );
}
