interface SectionDividerProps {
  className?: string;
}

export default function SectionDivider({ className }: SectionDividerProps) {
  return <div className={`w-full h-2 bg-border-divider ${className}`} />;
}
