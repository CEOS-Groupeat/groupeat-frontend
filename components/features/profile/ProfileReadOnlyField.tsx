'use client';

interface ProfileReadOnlyFieldProps {
  label: string;
  value: string;
}

export default function ProfileReadOnlyField({
  label,
  value,
}: ProfileReadOnlyFieldProps) {
  return (
    <div className="flex flex-col gap-2 font-['Pretendard']">
      <span className="text-label1 font-normal text-text-default">{label}</span>
      <div className="w-full h-11 pl-4 pr-3 py-3 rounded-lg flex items-center bg-background-subtle">
        <span className="text-body font-normal text-text-placeholder">
          {value}
        </span>
      </div>
    </div>
  );
}
