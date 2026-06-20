import * as ToggleGroup from '@radix-ui/react-toggle-group';

const TAB_ITEMS = [
  { value: 'pending', label: '대기 중' },
  { value: 'confirmed', label: '확정' },
  { value: 'past', label: '지난 주문' },
] as const;

const ITEM_BASE_CLASSES =
  'flex-1 px-4 py-2 gap-1 flex items-center justify-center bg-border-divider rounded-lg text-label2 text-text-subtlest transition-colors overflow-hidden ' +
  'data-[state=on]:bg-background-default data-[state=on]:focus:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] data-[state=on]:backdrop-blur-sm';

interface TabCount {
  value: string;
  count: number;
}

export default function SegmentedControl({
  value,
  onChange,
  counts,
}: {
  value: string;
  onChange: (value: string) => void;
  counts?: TabCount[];
}) {
  const items = TAB_ITEMS.map((tab) => ({
    ...tab,
    count: counts?.find((c) => c.value === tab.value)?.count ?? 0,
  }));

  return (
    <ToggleGroup.Root
      type="single"
      value={value}
      onValueChange={(val) => val && onChange(val)}
      className="h-10 p-1 bg-border-divider rounded-xl flex gap-1 mb-3 mx-4"
    >
      {items.map((item) => (
        <ToggleGroup.Item
          key={item.value}
          className={ITEM_BASE_CLASSES}
          value={item.value}
          aria-label={`${item.label} 탭`}
        >
          <span className="font-medium group-data-[state=on]:text-text-default">
            {item.label}
          </span>
          {item.count !== undefined && (
            <span className="font-semibold data-[state=on]:text-text-subtle">
              {item.count}
            </span>
          )}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
