'use client';

import { useRouter } from 'next/navigation';
import IllustDialogModal from '@/components/ui/IllustDialogModal';
import CustomerIllustIcon from '@/public/illust/illust_PickupDone.svg';

interface CartMismatchModalProps {
  onClose: () => void;
}

export default function CartMismatchModal({ onClose }: CartMismatchModalProps) {
  const router = useRouter();

  return (
    <IllustDialogModal
      icon={<CustomerIllustIcon className="shrink-0" />}
      title="같은 날짜의 가게만 담을 수 있어요"
      description="날짜를 수정하거나 담은 메뉴를 삭제해주세요"
      primaryButton={{
        label: '닫기',
        onClick: onClose,
      }}
      secondaryButton={{
        label: '장바구니 가기',
        onClick: () => {
          onClose();
          router.push('/customer/cart');
        },
      }}
      onClose={onClose}
    />
  );
}
