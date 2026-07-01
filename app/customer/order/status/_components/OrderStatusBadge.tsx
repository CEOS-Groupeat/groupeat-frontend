interface OrderStatusBadgeProps {
  badgeText: string;
}

export default function OrderStatusBadge({ badgeText }: OrderStatusBadgeProps) {
  return (
    <span className="px-1.5 py-0.5 bg-brand-background rounded-sm text-caption2 font-semibold text-brand-default w-fit">
      {badgeText}
    </span>
  );
}
