import BackButton from '@/components/ui/BackButton';
import { useRouter } from 'next/navigation';

interface Props {
  onBack?: () => void;
}

export default function OrderRequestHeader({ onBack }: Props) {
  const router = useRouter();

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header className="w-full flex justify-between items-center p-4">
      <button onClick={handleBackClick}>
        <BackButton />
      </button>

      <h1 className="text-text-default text-headline3 font-semibold">
        주문 요청
      </h1>
      <div />
    </header>
  );
}
