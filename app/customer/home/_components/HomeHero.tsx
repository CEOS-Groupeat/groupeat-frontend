import Logo from '@/public/icons/icon-logo_customer_home.svg';
import Bell from '@/public/icons/icon-bell.svg';
import Cart from '@/public/icons/icon-shopping_cart.svg';
import Search from '@/public/icons/icon-search.svg';
import Filter from '@/public/icons/icon-filter.svg';

export default function HomeHero() {
  return (
    <section className="w-[375px] bg-brand-default overflow-hidden">
      {/* HEADER */}
      <div className="h-16 overflow-hidden">
        <div className="h-14 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center">
            <Logo />

            <span className="text-static-white text-lg font-medium font-['Poppins'] leading-6">
              Groupeat
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Bell />
            <Cart />
          </div>
        </div>
      </div>

      {/* CONTENT */}

      <div className="px-4 pt-3 pb-5 flex flex-col gap-4">
        <h1 className="text-text-inverse text-xl font-bold font-['Pretendard'] leading-8">
          우리 행사에 딱 맞는
          <br />
          단체주문 음식점 찾기
        </h1>

        <div className="w-full h-11 bg-background-default rounded-[36px] pr-1.5 px-4 py-[6px] flex justify-between items-center overflow-hidden">
          <div className="flex items-center gap-1.5">
            <Search />

            <span className="text-body text-text-placeholder">
              가게나 메뉴를 검색해 보세요
            </span>
          </div>

          <button className="w-14 self-stretch px-3 py-2.5 bg-background-subtlest rounded-3xl flex justify-center items-center gap-1">
            <Filter />
          </button>
        </div>
      </div>
    </section>
  );
}
