import * as ToggleGroup from '@radix-ui/react-toggle-group';

const TAB_ITEMS = [
  { value: 'IN_PROGRESS', label: '진행 중' },
  { value: 'PAST', label: '과거 내역' },
] as const;

const ITEM_BASE_CLASSES =
  'flex-1 px-4 py-2 gap-1.5 flex items-center justify-center bg-fill-netural rounded-lg tracking-tight transition-colors overflow-hidden ' +
  'data-[state=on]:bg-fill-normal data-[state=on]:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] data-[state=on]:backdrop-blur-sm';

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
      className="h-11 p-1 bg-fill-netural rounded-xl flex gap-1 mb-4 mx-4"
    >
      {items.map((item) => (
        <ToggleGroup.Item
          key={item.value}
          className={`${ITEM_BASE_CLASSES} group`}
          value={item.value}
          aria-label={`${item.label} 탭`}
        >
          <span className="font-['Pretendard'] text-sm font-medium leading-5 text-label-light group-data-[state=on]:text-label-normal">
            {item.label}
          </span>
          <span className="font-['Pretendard'] text-xs font-semibold leading-4 text-label-alternative group-data-[state=on]:text-label-netural">
            {item.count}
          </span>
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
