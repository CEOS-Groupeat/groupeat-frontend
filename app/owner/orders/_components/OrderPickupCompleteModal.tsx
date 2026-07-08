'use client';

import IllustDialogModal from '@/components/ui/IllustDialogModal';
import OrderPickupCompleteIllustIcon from '@/public/illust/illust_PickupDone.svg';

interface OrderPickupCompleteModalProps {
  onClose: () => void;
  onPickupComplete: () => void;
  isLoading?: boolean;
}

export default function OrderPickupCompleteModal({
  onClose,
  onPickupComplete,
  isLoading,
}: OrderPickupCompleteModalProps) {
  return (
    <IllustDialogModal
      icon={<OrderPickupCompleteIllustIcon className="shrink-0" />}
      title="픽업이 완료되었나요?"
      description="픽업 완료 여부 입력 후에는 수정이 어려워요"
      primaryButton={{
        label: '돌아가기',
        onClick: onClose,
        disabled: isLoading,
      }}
      secondaryButton={{
        label: '픽업 완료',
        onClick: onPickupComplete,
        disabled: isLoading,
      }}
      onClose={onClose}
    />
  );
}
