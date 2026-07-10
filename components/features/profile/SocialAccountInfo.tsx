'use client';

import NaverIcon from '@/public/icons/icon_profile_naver.svg';
import GoogleIcon from '@/public/icons/icon_profile_google.svg';
import KakaoIcon from '@/public/icons/icon_profile_kakao.svg';

interface SocialAccountInfoProps {
  provider: string; // 'KAKAO' | 'NAVER' | 'GOOGLE' 등
  email: string;
}

const PROVIDER_LABEL: Record<string, string> = {
  KAKAO: '카카오',
  NAVER: '네이버',
  GOOGLE: '구글',
};

const PROVIDER_ICON: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  KAKAO: KakaoIcon,
  NAVER: NaverIcon,
  GOOGLE: GoogleIcon,
};

export default function SocialAccountInfo({
  provider,
  email,
}: SocialAccountInfoProps) {
  const label = PROVIDER_LABEL[provider] ?? provider;
  const Icon = PROVIDER_ICON[provider];

  return (
    <div className="w-full px-4 py-3.5 bg-background-subtle rounded-xl flex items-center gap-3 font-['Pretendard']">
      {Icon && <Icon className="size-11 shrink-0" />}
      <div className="flex flex-col justify-center">
        <span className="text-label1 font-semibold text-text-subtle">
          {label}로 연결된 계정
        </span>
        <span className="text-label2 font-normal text-text-subtlest">
          {email || '이메일 정보 없음'}
        </span>
      </div>
    </div>
  );
}
