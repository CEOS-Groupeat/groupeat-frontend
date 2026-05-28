import Search from '@/public/icons/icon-search.svg';

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (keyword: string) => void;
  placeholder?: string;
  variant?: 'filled' | 'outlined';
  children?: React.ReactNode;
  showIcon?: boolean;
}

export default function SearchField({
  value,
  onChange,
  onSearch,
  placeholder,
  variant = 'outlined',
  children,
  showIcon,
}: SearchFieldProps) {
  return (
    <div
      className={`w-full min-h-11 bg-background-default rounded-[36px] pr-1.5 pl-4 py-1.5 flex justify-between items-center overflow-hidden ${
        variant === 'filled'
          ? 'bg-background-subtle'
          : 'bg-background-default outline outline-1 outline-border-strong'
      }`}
    >
      <div className="flex items-center gap-1.5 flex-1">
        {showIcon && <Search className="shrink-0" />}

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && value.trim()) {
              onSearch(value.trim());
            }
          }}
          placeholder={placeholder}
          className="w-full outline-none text-body text-text-default placeholder:text-text-placeholder"
        />
      </div>
      {children}
    </div>
  );
}
