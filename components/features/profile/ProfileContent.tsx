'use client';

import ProfileAvatar from './ProfileAvatar';
import ProfileReadOnlyField from './ProfileReadOnlyField';
import ProfileField from './ProfileField';
import GenderSelector from './GenderSelector';
import SocialAccountInfo from './SocialAccountInfo';
import WithdrawLink from './WithdrawLink';

export interface ProfileFormValues {
  name: string;
  phoneNumber: string;
  birthDate: string;
  email: string;
  gender: 'MALE' | 'FEMALE' | null;
}

interface ProfileContentProps {
  values: ProfileFormValues;
  onChange: (values: ProfileFormValues) => void;
  socialProvider: string;
  socialEmail: string;
  onWithdraw: () => void;
}

export default function ProfileContent({
  values,
  onChange,
  socialProvider,
  socialEmail,
  onWithdraw,
}: ProfileContentProps) {
  return (
    <div className="px-4 flex flex-col gap-6 pb-[115px]">
      <ProfileAvatar name={values.name} />

      <div className="flex flex-col gap-6">
        <ProfileReadOnlyField label="이름" value={values.name} />
        <ProfileReadOnlyField label="휴대폰 번호" value={values.phoneNumber} />
        <ProfileField
          label="생년월일"
          value={values.birthDate}
          placeholder="생년월일 입력"
          onChange={(birthDate) => onChange({ ...values, birthDate })}
          type="date"
        />
        <ProfileField
          label="이메일"
          value={values.email}
          placeholder="이메일 입력"
          onChange={(email) => onChange({ ...values, email })}
          type="email"
        />
        <GenderSelector
          value={values.gender}
          onChange={(gender) => onChange({ ...values, gender })}
        />
        <SocialAccountInfo provider={socialProvider} email={socialEmail} />
      </div>

      <WithdrawLink onClick={onWithdraw} />
    </div>
  );
}
