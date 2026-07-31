import DialogModal from '@/components/ui/DialogModal';
import AlertIcon from '@/public/icons/icon_modal_alert.svg';

interface NoExistStoreModalProps {
  onClose: () => void;
}

export default function NoExistStoreModal({
  onClose,
}: NoExistStoreModalProps) {
  return (
    <DialogModal
      icon={<AlertIcon />}
      title="가게 정보를 불러올 수 없습니다"
      description="운영이 종료된 가게에요"
      primaryButton={{ label: '돌아가기', onClick: onClose }}
      onClose={onClose}
    />
  );
}
