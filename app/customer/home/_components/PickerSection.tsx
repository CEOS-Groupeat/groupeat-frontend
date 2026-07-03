import PickerButton from './PickerButton';
import CalendarIcon from '@/public/illusts/illust-calendar.svg';
import BudgetIcon from '@/public/illusts/illust-budget.svg';
import PersonIcon from '@/public/illusts/illust-people.svg';

const PICKERS = [
  {
    value: 'date',
    label: '날짜',
    icon: CalendarIcon,
    defaultValue: '날짜 선택',
  },
  {
    value: 'budget',
    label: '예산',
    icon: BudgetIcon,
    defaultValue: '예산 선택',
  },
  {
    value: 'person',
    label: '인원',
    icon: PersonIcon,
    defaultValue: '인원 선택',
  },
] as const;

export default function PickerSection() {
  return (
    <div className="flex gap-2">
      {PICKERS.map((picker) => (
        <PickerButton
          key={picker.value}
          icon={<picker.icon />}
          label={picker.label}
          value={picker.defaultValue}
        />
      ))}
    </div>
  );
}
