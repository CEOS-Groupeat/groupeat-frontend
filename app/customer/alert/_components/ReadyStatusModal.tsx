'use client';

import { useRouter } from 'next/navigation';
import DialogModal from '@/components/ui/DialogModal';
import ReadyStatusIllust from '@/public/illust/illust_Client.svg';

export default function ReadyStatusModal() {
  const router = useRouter();

  return (
    <DialogModal
      icon={<ReadyStatusIllust />}
      title={'아직 준비 중인 기능이에요'}
      description="조금만 기다려주세요!"
      primaryButton={{
        label: '돌아가기',
        onClick: () => router.replace('/customer/home'),
      }}
      onClose={() => {}}
    />
  );
}
