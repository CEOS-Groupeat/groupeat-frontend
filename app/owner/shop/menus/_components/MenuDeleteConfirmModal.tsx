'use client';

import DialogModal from '@/components/ui/DialogModal';
import AlertIcon from '@/public/icons/icon_modal_alert.svg';

interface MenuDeleteConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function MenuDeleteConfirmModal({
  onClose,
  onConfirm,
}: MenuDeleteConfirmModalProps) {
  return (
    <DialogModal
      icon={<AlertIcon />}
      title="해당 메뉴를 삭제하시겠습니까?"
      description="삭제 후 되돌릴 수 없어요"
      primaryButton={{ label: '돌아가기', onClick: onClose }}
      secondaryButton={{ label: '삭제하기', onClick: onConfirm }}
      onClose={onClose}
    />
  );
}