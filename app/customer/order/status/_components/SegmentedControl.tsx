import * as ToggleGroup from '@radix-ui/react-toggle-group';

const TAB_ITEMS = [
  { value: 'IN_PROGRESS', label: '진행 중' },
  { value: 'PAST', label: '지난 주문' },
] as const;

const ITEM_BASE_CLASSES =
  'flex-1 px-4 py-2 gap-1.5 flex items-center justify-center bg-border-divider rounded-lg tracking-tight transition-colors overflow-hidden ' +
  'data-[state=on]:bg-background-default data-[state=on]:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] data-[state=on]:backdrop-blur-sm';

type TabValue = (typeof TAB_ITEMS)[number]['value'];

interface TabCount {
  value: TabValue;
  count: number;
}

export default function SegmentedControl({
  value,
  onChange,
  counts,
}: {
  value: TabValue;
  onChange: (value: TabValue) => void;
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
      onValueChange={(val) => val && onChange(val as TabValue)}
      className="h-10 p-1 bg-border-divider rounded-xl flex gap-1 mb-3"
    >
      {items.map((item) => (
        <ToggleGroup.Item
          key={item.value}
          className={`${ITEM_BASE_CLASSES} group`}
          value={item.value}
          aria-label={`${item.label} 탭`}
        >
          <span className="font-['Pretendard'] text-label2 font-medium text-text-subtlest group-data-[state=on]:text-text-default">
            {item.label}
          </span>
          <span className="font-['Pretendard'] text-label2 font-semibold text-text-subtlest group-data-[state=on]:text-text-subtle">
            {item.count}
          </span>
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
