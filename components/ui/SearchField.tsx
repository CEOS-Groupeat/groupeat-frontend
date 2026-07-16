import Search from '@/public/icons/icon-search.svg';

interface SearchFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (keyword: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  children?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  autoFocus?: boolean;
}

export default function SearchField({
  value,
  onChange,
  onSearch,
  onFocus,
  placeholder = '원하는 조건의 가게를 검색해요',
  children,
  iconPosition,
  autoFocus,
}: SearchFieldProps) {
  return (
    <div className="w-full h-11 bg-background-subtle rounded-lg px-3 py-1.5 flex justify-between items-center overflow-hidden font-['Pretendard']">
      <div className="flex items-center gap-2 flex-1">
        {iconPosition === 'left' && (
          <Search className="shrink-0 text-icon-subtlest" />
        )}
        <input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={onFocus}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch?.(value?.trim() ?? '');
            }
          }}
          placeholder={placeholder}
          autoFocus={autoFocus}
          aria-label={placeholder ?? '가게 검색'}
          className="w-full outline-none text-body font-normal text-text-default placeholder:text-body placeholder:font-normal placeholder:text-text-placeholder"
        />
        {iconPosition === 'right' && (
          <Search className="shrink-0 text-icon-subtlest" />
        )}
      </div>
      {children}
    </div>
  );
}
