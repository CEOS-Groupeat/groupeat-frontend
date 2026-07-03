interface OpenChipProps {
  isOpen: boolean;
}

const CHIP_VARIANTS = {
  open: {
    bg: 'bg-status-success-bg',
    dot: 'bg-green-60',
    textClass: 'text-green-60',
    label: '영업중',
  },
  closed: {
    bg: 'bg-background-subtle',
    dot: 'bg-text-subtlest',
    textClass: 'text-text-subtlest',
    label: '영업 종료',
  },
} as const;

export default function OpenChip({ isOpen }: OpenChipProps) {
  const status = isOpen ? 'open' : 'closed';
  const { bg, dot, textClass, label } = CHIP_VARIANTS[status];

  return (
    <div className={`inline-flex pl-3 pr-4 py-1 items-center gap-1.5 ${bg}`}>
      <div className={`w-1.5 h-1.5 rounded-[3px] ${dot}`} />
      <p className={`text-label2 font-semibold ${textClass}`}>{label}</p>
    </div>
  );
}
