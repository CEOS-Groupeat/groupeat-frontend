'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCustomerAccount } from './_hooks/useCustomerAccount';
import { useUpdateCustomerAccount } from './_hooks/useUpdateCustomerAccount';
import { useWithdrawCustomer } from './_hooks/useWithdrawCustomer';
import { ApiError } from './_hooks/useWithdrawCustomer';
import ProfileHeader from '@/components/features/profile/ProfileHeader';
import ProfileContent, {
  type ProfileFormValues,
} from '@/components/features/profile/ProfileContent';
import SubmitButton from '@/components/features/profile/SubmitButton';
import ToastError from '@/components/ui/ToastError';
import WithdrawConfirmModal from '@/components/features/profile/WithdrawConfirmModal';
import ActiveOrderExistsModal from '@/components/features/profile/ActiveOrderExistModal';
import type { CustomerAccountData } from './_types/profile.type';
import { isValidEmail } from './_utils/validateEmail';
import { isValidBirthDate } from './_utils/validateBirthDate';

interface ProfileFormProps {
  account: CustomerAccountData;
}

function ProfileForm({ account }: ProfileFormProps) {
  const router = useRouter();
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

  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const errorToastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showActiveOrderModal, setShowActiveOrderModal] = useState(false);

  const showError = (message: string) => {
    if (errorToastTimerRef.current) {
      clearTimeout(errorToastTimerRef.current);
    }
    setErrorMessage(message);
    setShowErrorToast(true);
    errorToastTimerRef.current = setTimeout(() => {
      setShowErrorToast(false);
      errorToastTimerRef.current = null;
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (errorToastTimerRef.current) {
        clearTimeout(errorToastTimerRef.current);
      }
    };
  }, []);

  const handleWithdrawConfirm = async () => {
    try {
      await withdraw();
      router.push('/login');
    } catch (error) {
      console.error('회원 탈퇴 실패:', error);
      setShowWithdrawModal(false);

      if (error instanceof ApiError && error.code === 'MEMBER4092') {
        setShowActiveOrderModal(true);
      } else {
        showError('회원 탈퇴에 실패했어요. 다시 시도해주세요.');
      }
    }
  };

  const isFormValid =
    values.birthDate.trim().length > 0 &&
    values.email.trim().length > 0 &&
    values.gender !== null;

  const handleSubmit = async () => {
    if (!isFormValid) return;

    if (!isValidBirthDate(values.birthDate)) {
      showError('생년월일은 YYYY-MM-DD 형식으로 입력해주세요.');
      return;
    }

    if (!isValidEmail(values.email)) {
      showError('올바른 이메일 형식으로 입력해주세요.');
      return;
    }

    try {
      await updateAccount({
        email: values.email,
        birthDate: values.birthDate,
        gender: values.gender!,
      });
      router.push('/customer/settings?toast=profile-updated');
    } catch (error) {
      console.error('계정 정보 수정 실패:', error);
      showError('계정 정보 수정에 실패했어요. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <ProfileContent
        values={values}
        onChange={setValues}
        socialProvider={account.socialAccount?.provider ?? ''}
        socialEmail={account.socialAccount?.email ?? ''}
        onWithdraw={() => setShowWithdrawModal(true)}
      />
      <SubmitButton
        disabled={!isFormValid}
        isLoading={isUpdating}
        onClick={handleSubmit}
      />
      {showErrorToast && <ToastError text={errorMessage} />}
      {showWithdrawModal && (
        <WithdrawConfirmModal
          onClose={() => setShowWithdrawModal(false)}
          onConfirm={handleWithdrawConfirm}
        />
      )}
      {showActiveOrderModal && (
        <ActiveOrderExistsModal
          onClose={() => setShowActiveOrderModal(false)}
        />
      )}
    </>
  );
}

export default function CustomerProfilePage() {
  const router = useRouter();
  const { data: account, isLoading, isError } = useCustomerAccount();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background-default min-h-screen">
        <span className="text-sm text-text-subtle">로딩 중...</span>
      </div>
    );
  }

  if (isError || !account) {
    return (
      <div className="flex-1 flex flex-col gap-3 items-center justify-center bg-background-default min-h-screen">
        <span className="text-sm text-text-subtle">계정 정보가 없어요.</span>
        <button
          type="button"
          onClick={() => router.push('/login')}
          className="text-sm text-brand-default underline"
        >
          로그인 페이지로 이동하기
        </button>
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
