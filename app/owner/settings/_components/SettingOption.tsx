import MyIcon from '@/public/icons/icon_my.svg';
import BagIcon from '@/public/icons/icon_bag_suitcase.svg';
import AlarmBellIcon from '@/public/icons/icon_ringing_bell.svg';
import TermsIcon from '@/public/icons/icon_terms.svg';
import ReviewIcon from '@/public/icons/icon_review.svg';

interface SettingOptionProps {
  text: string;
  icon: string;
}

export default function SettingOption({ text, icon }: SettingOptionProps) {
  return (
    <div className="w-full flex h-12 pb-3 flex-col justify-center items-start border-b border-border-subtle">
      <div className="w-full flex items-center gap-3">
        {icon === 'profile' ? <MyIcon /> : icon === 'bag' ? <BagIcon/> : icon === 'alarm' ? <AlarmBellIcon /> : icon === 'terms' ? <TermsIcon /> : icon === 'review' ? <ReviewIcon /> : null}
        <p className="text-text-default text-body font-medium">{text}</p>
      </div>
    </div>
  );
}
