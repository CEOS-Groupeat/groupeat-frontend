import DialogModal from '../ui/DialogModal';
import AlertIcon from '@/public/icons/icon_modal_alert.svg';

interface OrderRejectModalProps {
  onClose: () => void;
  onReject: () => void;
}

export default function OrderRejectModal({
  onClose,
  onReject,
}: OrderRejectModalProps) {
  return (
    <DialogModal
      icon={<AlertIcon />}
      title="해당 주문을 거절하시겠습니까?"
      description="거절 시 고객에게 전달되며, 결제금이 전액 환불돼요."
      primaryButton={{ label: '돌아가기', onClick: onClose }}
      secondaryButton={{ label: '거절하기', onClick: onReject }}
      onClose={onClose}
    />
  );
}
