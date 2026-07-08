import IllustDialogModal from '@/components/ui/IllustDialogModal';
import OrderPickupCompleteIllustIcon from '@/public/illust/illust_PickupDone.svg';
interface OrderPickupCompleteModalProps {
  onClose: () => void;
  onPickupComplete: () => void;
}

export default function OrderPickupCompleteModal({
  onClose,
  onPickupComplete,
}: OrderPickupCompleteModalProps) {
  return (
    <IllustDialogModal
      icon={<OrderPickupCompleteIllustIcon className="shrink-0" />}
      title="픽업이 완료되었나요?"
      description="픽업 완료 여부 입력 후에는 수정이 어려워요"
      primaryButton={{ label: '돌아가기', onClick: onClose }}
      secondaryButton={{ label: '픽업 완료', onClick: onPickupComplete }}
      onClose={onClose}
    />
  );
}
