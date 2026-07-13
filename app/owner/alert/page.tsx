'use client';

import AlertComponent from '@/components/ui/Alert';
import BackButton from '@/components/ui/BackButton';
import NoAlarmIllust from '@/public/illust/ilust_NoAlarm.svg';
import { useRouter } from 'next/navigation';

const alerts_mock = [
  {
    id: 1,
    isSucceded: true,
    message: '데이브런치 | 반반세트 56개 26.04.23(목) 10:00',
    storeName: '데이브런치',
    menus: '반반세트',
    menuQuantity: 70,
    pickupDate: '26.04.23 (목) 10:00',
    isRead: false,
  },
  {
    id: 2,
    isSucceded: false,
    message: '데이브런치 | 반반세트 56개 26.04.23(목) 10:00',
    storeName: '데이브런치',
    menus: '반반세트',
    menuQuantity: 56,
    pickupDate: '26.04.23 (목) 10:00',
    isRead: false,
  },
  {
    id: 3,
    isSucceded: false,
    message: '데이브런치 | 반반세트 56개 26.04.23(목) 10:00',
    storeName: '데이브런치',
    menus: '반반세트',
    menuQuantity: 56,
    pickupDate: '26.04.23 (목) 10:00',
    isRead: true,
  },
];
export default function CustomerAlertPage() {
  const router = useRouter();

  const handleReadAllButton = () => {};

  return (
    <div className="flex w-full items-center flex-col">
      <div className="w-full flex px-4 pt-16 flex-col justify-end items-center self-stretch">
        <div className="w-full flex h-11 items-center gap-2">
          <div className="flex items-center gap-1 flex-1">
            <BackButton />
          </div>
        </div>
      </div>

      {alerts_mock.length > 0 ? (
        <>
          <main className="flex pt-2 flex-col items-end gap-1 self-stretch">
            <div className="flex px-4 justify-between items-center self-stretch">
              <h1 className="text-text-default text-headline2 font-semibold">
                알림 목록
              </h1>
              <button className="flex h-8 px-3 flex-col justify-center items-center border border-px border-border-default rounded-lg bg-background-default">
                <p className="text-text-default text-caption1 font-semibold">
                  모두 읽음
                </p>
              </button>
            </div>
          </main>
          {alerts_mock.map((a) => {
            return (
              <div key={a.id} className="w-full flexw">
                <AlertComponent
                  isSucceded={a.isSucceded}
                  message={a.message}
                  storeName={a.storeName}
                  isRead={a.isRead}
                  menus={a.menus}
                  menuQuantity={a.menuQuantity}
                  pickupDate={a.pickupDate}
                />
              </div>
            );
          })}
        </>
      ) : (
        <div className="w-full h-dvh flex justify-center pt-40">
          <div className="flex flex-col items-center gap-3">
            <NoAlarmIllust />
            <p className='text-text-subtle text-body font-medium'>알림이 없습니다</p>
          </div>
        </div>
      )}
    </div>
  );
}
