import BackButton from '@/components/ui/BackButton';
import { useRouter } from 'next/navigation';

export default function OrderRequestHeader() {
  return (
    <header className="w-full flex justify-between items-center p-4">
      <BackButton/>
      <h1 className="text-text-default text-headline3 font-semibold">주문 요청</h1>
      <div />
    </header>
  );
}
