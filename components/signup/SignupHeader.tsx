'use client';

import ArrowLeft from '@/public/icons/icon_arrow_Left.svg';

interface SignupHeaderProps {
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function SignupHeader({
  showBackButton = true,
  onBack,
}: SignupHeaderProps) {
  return (
    <div className="w-full flex flex-col pt-10">
      <div className="flex py-4 items-center justify-between self-stretch">
        {showBackButton ? (
          <ArrowLeft
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={onBack}
          />
        ) : (
          <div className="w-5 h-5" />
        )}
        <span className="text-headline3 font-bold">회원가입</span>
        <div className="w-5 h-5" />
      </div>
    </div>
  );
}
