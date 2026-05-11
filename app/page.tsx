import Image from 'next/image';
import logo from '@/public/images/image_logo.png';
import logo_text from '@/public/images/image_logo_text.png';
import mainImage from '@/public/images/image_landingPage.png';
import MailIcon from '@/public/icons/icon_email_unread.svg';
import AlarmIcon from '@/public/icons/icon_alarm.svg';

{
  /* 랜딩 페이지입니다. 해당 페이지에서는 비로그인 사용자의 둘러보기 페이지, 로그인/회원가입 페이지, 사업자용 랜딩 페이지로 이동합니다. */
}
export default function CustomerLandingPage() {
  return (
    <div className="flex flex-col w-full min-h-dvh bg-white">
      {/* 헤더 영역 (고정) */}
      <div className="flex items-center shrink-0 self-stretch w-full h-16 px-5 border-b border-neutral-5 border-px backdrop-blur-[6px]">
        <Image src={logo} alt="Logo" width={130} height={25} />
      </div>

      {/* 메인 콘텐츠 영역 */}
      <section className="relative flex flex-col flex-1 w-full justify-center items-center py-12 overflow-hidden">
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
          <div className="w-110.5 h-110.5 opacity-30 bg-[radial-gradient(ellipse_70.71%_70.71%_at_50.00%_50.00%,#FCD2C6_0%,rgba(252,210,198,0)_70%)] rounded-[260px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center w-full">
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-neutral-60 text-h-20 text-center">
              단체 주문의 고민이 멈추는 곳
            </h1>
            <Image src={logo_text} alt="Logo Text" width={200} height={40} />
          </div>

          <Image
            src={mainImage}
            alt="Main Image"
            width={330}
            height={258}
            className="mt-6 object-contain"
          />

          <div className="w-full flex flex-col justify-center items-center gap-2 mt-8">
            <p className="text-l-14 text-neutral-60 font-semibold text-center">
              행사에 딱 맞는 음식을 가장 쉽고 빠르게
            </p>
            <div className="flex px-2 py-0.5 justify-center items-center bg-white rounded-sm">
              <p className="text-b-18 text-orange-60 font-bold">
                원하는 일정과 예산 그대로
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-3 mt-8">
            <button className="flex w-39.5 h-12 px-5 py-2 bg-white justify-center items-center gap-1.5 rounded-full border border-px border-neutral-10 z-20">
              <MailIcon />
              <p className="text-neutral-80 text-b-16 font-semibold">
                협업 문의하기
              </p>
            </button>
            <button className="flex w-39.5 h-12 px-5 py-2 bg-orange-60 justify-center items-center gap-1.5 rounded-full border border-px border-orange-60 z-20">
              <AlarmIcon />
              <p className="text-white text-b-16 font-semibold">
                출시 알림받기
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* 푸터 영역, 폰트 지정 예정 */}
      <footer className="flex shrink-0 w-full pl-5 pr-4 pt-11 pb-9 items-center bg-neutral-5 border-t border-px border-neutral-10">
        <div className="flex flex-col items-start gap-6 w-full">
          <p className="text-neutral-40 text-[21.583px] font-medium">Groupeat</p>
          <div className="flex flex-col items-start gap-1.5">
            <p className="text-l-14 font-semibold text-neutral-70 opacity-70">Contact</p>
            <div className="flex flex-col items-start gap-1.5">
              <p className="text-l-14 text-neutral-40">Email: contact@groupeat.com</p>
              <p className="text-l-14 text-neutral-40">Instagram: @groupeat_official</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
