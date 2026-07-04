interface SectionDividerProps {
  className?: string;
}

export default function SectionDivider({ className }: SectionDividerProps) {
  return <div className={`w-full bg-border-divider ${className}`} />;
}
