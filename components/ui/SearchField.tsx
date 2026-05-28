interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (keyword: string) => void;
  placeholder?: string;
  variant?: 'filled' | 'outlined'; // filled: 키워드 있음, outlined: 비어있음
}

export default function SearchField({
  value,
  onChange,
  onSearch,
  placeholder = '검색어를 입력하세요',
  variant = 'outlined',
}: SearchFieldProps) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && value.trim()) {
          onSearch(value.trim());
        }
      }}
      placeholder={placeholder}
      className={`flex-1 h-11 pl-4 pr-3 py-1 rounded-full outline-none ${
        variant === 'filled'
          ? 'bg-background-subtle'
          : 'bg-background-default outline outline-1 outline-border-strong'
      }`}
    />
  );
}
