'use client';

import DialogModal from '@/components/ui/DialogModal';
import AlertIcon from '@/public/icons/icon_modal_alert.svg';

interface ReviewDeleteConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function ReviewDeleteConfirmModal({
  onClose,
  onConfirm,
}: ReviewDeleteConfirmModalProps) {
  return (
    <DialogModal
      icon={<AlertIcon />}
      title="해당 리뷰를 삭제하시겠습니까?"
      description="삭제 후 되돌릴 수 없어요"
      primaryButton={{ label: '돌아가기', onClick: onClose }}
      secondaryButton={{ label: '삭제하기', onClick: onConfirm }}
      onClose={onClose}
    />
  );
}