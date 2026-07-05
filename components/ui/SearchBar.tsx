'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import SearchField from '@/components/ui/SearchField';
import DeleteIcon from '@/public/icons/icon_close.svg';

interface SearchBarProps {
  onFocus?: () => void;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
  initialKeyword?: string;
}

export default function SearchBar({
  onFocus,
  onChange,
  autoFocus,
  initialKeyword = '',
}: SearchBarProps) {
  const router = useRouter();

  const [keyword, setKeyword] = useState(initialKeyword);

  const handleSearch = (kw: string) => {
    const trimmed = kw.trim();
    if (!trimmed) return;
    router.push(`/customer/search?keyword=${encodeURIComponent(trimmed)}`);
  };

  const handleChange = (value: string) => {
    setKeyword(value);
    onChange?.(value);
  };

  return (
    <SearchField
      value={keyword}
      onChange={handleChange}
      onSearch={handleSearch}
      onFocus={onFocus}
      iconPosition={keyword ? undefined : 'right'}
      autoFocus={autoFocus}
    >
      {keyword && (
        <button
          type="button"
          onClick={() => {
            setKeyword('');
            onChange?.('');
          }}
        >
          <DeleteIcon className="size-5 text-icon-subtlest" />
        </button>
      )}
    </SearchField>
  );
}
