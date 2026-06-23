import DialogModal from '../../../../components/ui/DialogModal';
import InfoIcon from '@/public/icons/icon_modal_info.svg';

interface OrderProcessModalProps {
  onClose: () => void;
}

export default function OrderProcessModal({ onClose }: OrderProcessModalProps) {
  return (
    <DialogModal
      icon={<InfoIcon />}
      title={'주문 일시로부터 24시간 이내로\n 승인/거절 처리를 완료해주세요'}
      description="미처리 시 주문 취소 및 전액 환불돼요."
      primaryButton={{ label: '닫기', onClick: onClose }}
      onClose={onClose}
    />
  );
}
