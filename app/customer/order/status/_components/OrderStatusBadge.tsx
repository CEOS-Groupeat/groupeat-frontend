interface OrderStatusBadgeProps {
  badgeText: string;
  status: string;
}

export default function OrderStatusBadge({
  badgeText,
  status,
}: OrderStatusBadgeProps) {
  const isNegative = status === 'REJECTED' || status === 'CANCELLED';

  return (
    <span
      className={`px-1.5 py-0.5 rounded-sm text-caption2 font-['Pretendard'] w-fit ${
        isNegative
          ? 'bg-background-subtlest text-text-subtle font-medium'
          : 'bg-brand-background text-brand-default font-semibold'
      }`}
    >
      {badgeText}
    </span>
  );
}
