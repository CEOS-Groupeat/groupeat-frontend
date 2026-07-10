'use client';

import UserIcon from '@/public/icons/icon_profile.svg'; 

interface ProfileAvatarProps {
  name: string;
}

export default function ProfileAvatar({ name }: ProfileAvatarProps) {
  return (
    <div className="inline-flex items-center gap-3">
        <UserIcon className="size-12 shrink-0" />
      <span className="text-headline3 font-semibold text-text-default font-['Pretendard']">{name}</span>
    </div>
  );
}