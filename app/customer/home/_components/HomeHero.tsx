import Logo from '@/public/icons/icon-logo_customer_home.svg';
import Bell from '@/public/icons/icon-bell.svg';
import Cart from '@/public/icons/icon-shopping_cart.svg';
import HomeSearchBar from './HomeSearchBar';

export default function HomeHero() {
  return (
    <section className="w-full bg-brand-default">
      {/* Header Container */}
      <div className="h-[58px] py-2.5 px-4 flex items-center justify-between mb-[6px]">
        <div className="flex items-center gap-[4.86px]">
          <Logo />
          <span className="text-static-white text-lg font-medium font-poppins leading-6 tracking-[-0.02em]">
            Groupeat
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Bell />
          <Cart />
        </div>
      </div>

      {/* Header and Search Container */}

      <div className="px-4 pt-3 pb-5 flex flex-col gap-4">
        <h1 className="text-text-inverse text-[22px] font-bold font-['Pretendard'] leading-8 tracking-[-0.01em]">
          우리 행사에 딱 맞는
          <br />
          단체주문 음식점 찾기
        </h1>

        <HomeSearchBar />
      </div>
    </section>
  );
}
