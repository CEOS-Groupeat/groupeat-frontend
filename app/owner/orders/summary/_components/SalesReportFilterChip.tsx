'use client';

interface SalesReportFilterChipProps {
  text: string;
  className: string;
}

export default function SalesReportFilterChip({
  text,
  className,
}: SalesReportFilterChipProps) {
  return (
    <div
      className={`flex-shrink-0 px-3.5 py-2 rounded-full flex items-center gap-1 transition-colors ${
        className
          ? 'bg-brand-background text-brand-default'
          : 'bg-background-default outline outline-1 outline-offset-[-1px] outline-border-default text-text-default'
      }`}
    >
      <span
        className={`text-label2 whitespace-nowrap ${className ? 'font-semibold' : 'font-normal'}`}
      >
        {text}
      </span>
    </div>
  );
}
