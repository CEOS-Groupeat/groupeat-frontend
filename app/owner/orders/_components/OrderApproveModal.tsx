'use client';

import IllustDialogModal from '@/components/ui/IllustDialogModal';
import OrderAcceptIllustIcon from '@/public/illust/illust_OrderAccept.svg';

interface OrderApproveModalProps {
  onClose: () => void;
  onApprove: () => void;
  isLoading?: boolean;
}

export default function OrderApproveModal({
  onClose,
  onApprove,
  isLoading,
}: OrderApproveModalProps) {
  return (
    <IllustDialogModal
      icon={<OrderAcceptIllustIcon className="shrink-0" />}
      title="주문을 승인하시겠습니까?"
      description="픽업 날짜에 맞춰 음식을 준비해 주세요"
      primaryButton={{ label: '돌아가기', onClick: onClose, disabled: isLoading}}
      secondaryButton={{ label: '승인하기', onClick: onApprove, disabled: isLoading }}
      onClose={onClose}
    />
  );
}
