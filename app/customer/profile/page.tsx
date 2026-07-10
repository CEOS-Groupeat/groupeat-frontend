'use client';

import { useState } from 'react';
import { useCustomerAccount } from './_hooks/useCustomerAccount';
import { useUpdateCustomerAccount } from './_hooks/useUpdateCustomerAccount';
import { useWithdrawCustomer } from './_hooks/useWithdrawCustomer';
import ProfileHeader from '@/components/features/profile/ProfileHeader';
import ProfileContent, {
  type ProfileFormValues,
} from '@/components/features/profile/ProfileContent';
import SubmitButton from '@/components/features/profile/SubmitButton';
import type { CustomerAccountData } from './_types/profile.type';

interface ProfileFormProps {
  account: CustomerAccountData;
}

function ProfileForm({ account }: ProfileFormProps) {
  const { mutateAsync: updateAccount, isPending: isUpdating } =
    useUpdateCustomerAccount();
  const { mutateAsync: withdraw } = useWithdrawCustomer();

  const [values, setValues] = useState<ProfileFormValues>({
    name: account.name ?? '',
    phoneNumber: account.phoneNumber ?? '',
    birthDate: account.birthDate ?? '',
    email: account.email ?? '',
    gender:
      account.gender === 'MALE' || account.gender === 'FEMALE'
        ? account.gender
        : null,
  });

  const isFormValid =
    values.birthDate.trim().length > 0 &&
    values.email.trim().length > 0 &&
    values.gender !== null;

  const handleSubmit = async () => {
    if (!isFormValid) return;
    try {
      await updateAccount({
        email: values.email,
        birthDate: values.birthDate,
        gender: values.gender!,
      });
      // TODO: 수정 완료 토스트
    } catch (error) {
      console.error('계정 정보 수정 실패:', error);
      // TODO: 에러 토스트
    }
  };

  const handleWithdraw = async () => {
    // TODO: 확인 모달
    try {
      await withdraw();
    } catch (error) {
      console.error('회원 탈퇴 실패:', error);
    }
  };

  return (
    <>
      <ProfileContent
        values={values}
        onChange={setValues}
        socialProvider={account.socialAccount?.provider ?? ''}
        socialEmail={account.socialAccount?.email ?? ''}
        onWithdraw={handleWithdraw}
      />
      <SubmitButton
        disabled={!isFormValid}
        isLoading={isUpdating}
        onClick={handleSubmit}
      />
    </>
  );
}

export default function CustomerProfilePage() {
  const { data: account, isLoading, isError } = useCustomerAccount();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <span className="text-sm text-text-subtle">로딩 중...</span>
      </div>
    );
  }

  if (isError || !account) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <span className="text-sm text-text-subtle">
          계정 정보를 불러오지 못했어요.
        </span>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background-default flex flex-col">
      <ProfileHeader />
      <ProfileForm account={account} />
    </div>
  );
}
