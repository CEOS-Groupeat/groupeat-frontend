import PickerButton from './PickerButton';
import CalendarIcon from '@/public/illusts/illust-calendar.svg';
import BudgetIcon from '@/public/illusts/illust-budget.svg';
import PersonIcon from '@/public/illusts/illust-people.svg';
import { StoreSearchParams } from '@/app/customer/search/_types/store.type';
import { formatChipLabel } from '@/app/customer/search/_utils/formatChipLabel';

const PICKERS = [
  {
    value: 'pickupDate' as keyof StoreSearchParams,
    label: '날짜',
    icon: CalendarIcon,
    defaultValue: '날짜 선택',
  },
  {
    value: 'budget' as keyof StoreSearchParams,
    label: '예산',
    icon: BudgetIcon,
    defaultValue: '예산 선택',
  },
  {
    value: 'quantity' as keyof StoreSearchParams,
    label: '인원',
    icon: PersonIcon,
    defaultValue: '인원 선택',
  },
] as const;

const formatPickerValue = (
  key: keyof StoreSearchParams,
  value: unknown
): string => {
  if (!value) return '';
  if (key === 'quantity') return `${value}명`; // 명으로 표시
  return formatChipLabel(key, value);
};

interface PickerSectionProps {
  onPickerClick: (filter: keyof StoreSearchParams) => void;
  appliedFilters: StoreSearchParams;
}

export default function PickerSection({
  onPickerClick,
  appliedFilters,
}: PickerSectionProps) {
  return (
    <div className="flex gap-2">
      {PICKERS.map((picker) => (
        <PickerButton
          key={picker.value}
          icon={<picker.icon />}
          label={picker.label}
          value={
            appliedFilters[picker.value as keyof StoreSearchParams]
              ? formatPickerValue(
                  picker.value as keyof StoreSearchParams,
                  appliedFilters[picker.value as keyof StoreSearchParams]
                )
              : picker.label
          }
          onClick={() => onPickerClick(picker.value as keyof StoreSearchParams)}
        />
      ))}
    </div>
  );
}
