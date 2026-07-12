'use client';

import DialogModal from '@/components/ui/DialogModal';
import AlertIcon from '@/public/icons/icon_modal_alert.svg';

interface WithdrawConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function WithdrawConfirmModal({
  onClose,
  onConfirm,
}: WithdrawConfirmModalProps) {
  return (
    <DialogModal
      icon={<AlertIcon />}
      title="계정을 탈퇴하시겠습니까?"
      description="계정 삭제 후에는 되돌릴 수 없어요"
      primaryButton={{ label: '돌아가기', onClick: onClose }}
      secondaryButton={{ label: '삭제하기', onClick: onConfirm }}
      onClose={onClose}
    />
  );
}
