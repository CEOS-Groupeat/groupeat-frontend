'use client';

interface ProfileFieldProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  type?: 'text' | 'date' | 'email';
}

export default function ProfileField({
  label,
  value,
  placeholder,
  onChange,
  type = 'text',
}: ProfileFieldProps) {
  return (
    <div className="flex flex-col gap-2 font-['Pretendard']">
      <span className="text-label1 font-normal text-text-default">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-11 pl-4 pr-3 py-3 rounded-lg outline outline-1 outline-offset-[-1px] outline-border-strong text-body font-normal text-text-default placeholder:text-body placeholder:font-normal placeholder:text-text-placeholder"
      />
    </div>
  );
}
