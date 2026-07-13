'use client';

import DialogModal from '@/components/ui/DialogModal';
import AlertIcon from '@/public/icons/icon_modal_alert.svg';

interface ActiveOrderExistsModalProps {
  onClose: () => void;
}

export default function ActiveOrderExistsModal({
  onClose,
}: ActiveOrderExistsModalProps) {
  return (
    <DialogModal
      icon={<AlertIcon />}
      title="진행 중인 주문이 있어 탈퇴할 수 없어요"
      description="픽업까지 완료된 후 다시 시도해 주세요"
      primaryButton={{ label: '돌아가기', onClick: onClose }}
      onClose={onClose}
    />
  );
}