import AlertComponent from '@/components/ui/Alert';

const alerts_mock = [
  {
    id: 1,
    isSucceded: true,
    message: '데이브런치 | 반반세트 56개 26.04.23(목) 10:00',
    storeName: '데이브런치',
    menus: '반반세트',
    menuQuantity: '56',
    pickupDate: '26.04.23 (목) 10:00',
  },
  {
    id: 1,
    isSucceded: true,
    message: '데이브런치 | 반반세트 56개 26.04.23(목) 10:00',
    storeName: '데이브런치',
    menus: '반반세트',
    menuQuantity: '56',
    pickupDate: '26.04.23 (목) 10:00',
  },
];
export default function CustomerAlertPage() {
  return (
    <div className="flex w-full min-h-dvh justify-center items-center">
      {alerts_mock.map((a) => {
        return (
          <div key={a.id} className="flex flex-col">
            <AlertComponent isSucceded={a.isSucceded} message={a.message} />
          </div>
        );
      })}
    </div>
  );
}
