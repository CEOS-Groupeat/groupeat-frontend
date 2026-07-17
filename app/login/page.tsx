// 'use client';

// import Link from 'next/link';
// import NaverLoginButton from '@/public/icons/icon_login_naver.svg';
// import KakaoLoginButton from '@/public/icons/icon_login_kakao.svg';
// import GoogleLoginButton from '@/public/icons/icon_login_google.svg';
// import CheckLinear from '@/public/icons/icon_check_linear.svg';
// import Close from '@/public/icons/icon_close.svg';

// import CustomerIllust from '@/public/illust/illust_Customer.svg';

// import { useEffect, useState } from 'react';

// export default function HomePage() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     if (isModalOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//     }

//     // 컴포넌트 언마운트 시 초기화 (안전장치)
//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, [isModalOpen]);

//   const handleLogin = (
//     provider: 'naver' | 'kakao' | 'google',
//     memberType: 'CUSTOMER' | 'BUSINESS'
//   ) => {
//     const url = process.env.NEXT_PUBLIC_API_URL;
//     window.location.href = `${url}/api/auth/oauth2/authorize/${provider}?memberType=${memberType}`;
//   };

//   return (
//     <div className="w-full flex flex-col px-4">
//       <div className="w-full flex flex-col mt-68.5">
//         <div className="w-full justify-center">
//           {/* 헤더 영역 */}
//           <h1 className="text-headline1 text-text-default font-semibold text-center">
//             우리 행사에 딱 맞는
//             <br />
//             단체주문 음식점 찾기
//           </h1>
//           <div className="w-full flex justify-center items-center mt-4">
//             <button
//               className="text-headline3 text-text-subtle font-medium cursor-pointer"
//               onClick={() => setIsModalOpen(true)}
//             >
//               서비스 둘러보기 →
//             </button>
//           </div>

//           {/* 소셜 로그인 버튼 영역 */}
//           <div className="w-full flex justify-center items-center mt-14.5">
//             <div className="w-full flex items-center justify-center gap-4">
//               <button
//                 type="button"
//                 onClick={() => handleLogin('kakao', 'CUSTOMER')}
//                 className="flex flex-col items-center transition-opacity cursor-pointer"
//               >
//                 <KakaoLoginButton />
//                 <p className="text-label1 text-text-subtle font-medium">
//                   카카오
//                 </p>
//               </button>

//               <button
//                 type="button"
//                 onClick={() => handleLogin('naver', 'CUSTOMER')}
//                 className="flex flex-col items-center transition-opacity cursor-pointer"
//               >
//                 <NaverLoginButton />
//                 <p className="text-label1 text-text-subtle font-medium">
//                   네이버
//                 </p>
//               </button>

//               <button
//                 type="button"
//                 onClick={() => handleLogin('google', 'CUSTOMER')}
//                 className="flex flex-col items-center transition-opacity cursor-pointer"
//               >
//                 <GoogleLoginButton />
//                 <p className="text-label1 text-text-subtle font-medium">구글</p>
//               </button>
//             </div>
//           </div>

//           {/* 하단 네비게이션 링크 영역 */}
//           <div className="w-full flex items-center justify-center mt-8">
//             <Link
//               href="/owner"
//               className="text-brand-default text-label2 font-semibold underline underline-offset-2 decoration-1 hover:text-brand-hover transition-colors"
//             >
//               사장님이신가요?
//             </Link>
//           </div>
//         </div>
//       </div>
//       {isModalOpen && (
//         <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
//           <button
//             type="button"
//             aria-label="모달 닫기"
//             onClick={() => setIsModalOpen(false)}
//             className="absolute inset-0 bg-background-dim/50 animate-in fade-in duration-200 cursor-default"
//           />

//           {/* 2. 실제 모달 창 (내용물) */}
//           <div className="relative w-82 max-w-sm bg-white rounded-xl p-4 shadow-[0_0_15.2px_0_rgba(0,0,0,0.05)] min-h-80 flex flex-col animate-in fade-in zoom-in-95 duration-200">
//             {/* 상단 닫기(X) 버튼 영역 */}
//             <div className="w-full flex justify-end">
//               <button
//                 type="button"
//                 onClick={() => setIsModalOpen(false)}
//                 className="text-icon-default hover:text-icon-active transition-colors"
//               >
//                 <Close className="text-text-placeholder w-6 h-6" />
//               </button>
//             </div>

//             <div className="flex flex-col items-start gap-4 self-stretch">
//               <div className="flex flex-col w-full items-center gap-3 self-stretch">
//                 <CustomerIllust className="w-18 h-18" />
//                 <div className="flex flex-col items-center gap-1">
//                   <p className="text-text-default text-[20px] text-center leading-7 font-bold">
//                     로그인 후 그루핏을 이용해보세요
//                   </p>
//                 </div>

//                 <div className="flex px-4 py-3 flex-col items-start gap-2.5 self-stretch rounded-lg bg-background-transparent">
//                   <div className="flex flex-col items-start gap-1">
//                     <div className="flex items-center justify-center gap-1">
//                       <CheckLinear className="text-[#42BE65]" />
//                       <p className="text-label2 text-text-subtlest font-medium">
//                         플랫폼 입점 시 단체주문 고객에게 자동 노출
//                       </p>
//                     </div>
//                     <div className="flex items-center justify-center gap-1">
//                       <CheckLinear className="text-[#42BE65]" />
//                       <p className="text-label2 text-text-subtlest font-medium">
//                         날짜별 픽업 가능 시간 및 수량 사전 설정 가능
//                       </p>
//                     </div>
//                     <div className="flex items-center justify-center gap-1">
//                       <CheckLinear className="text-[#42BE65]" />
//                       <p className="text-label2 text-text-subtlest font-medium">
//                         주문 승인/거절 선택 및 상세 주문 관리 가능
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="w-full flex items-center justify-center h-11 bg-brand-default mt-5 rounded-lg">
//               <Link
//                 className="text-text-inverse text-label1 font-semibold"
//                 href="/signup"
//               >
//                 회원가입 →
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import Link from 'next/link';
import Image from 'next/image';
import LogoText from '@/public/images/image_logo_text_brand.svg';
import NaverLoginButton from '@/public/components/loginbutton_naver.svg';
import KakaoLoginButton from '@/public/components/loginbutton_kakao.svg';
import GoogleLoginButton from '@/public/components/loginbutton_google.svg';
import CheckLinear from '@/public/icons/icon_check_linear.svg';
import Close from '@/public/icons/icon_close.svg';

import CustomerIllust from '@/public/illust/illust_Customer.svg';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleLogin = (provider: 'naver' | 'kakao' | 'google') => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${url}/api/auth/oauth2/authorize/${provider}`;
  };

  return (
    <div className="relative w-full max-w-md mx-auto min-h-screen flex flex-col px-4 overflow-hidden">
      <div className="absolute inset-0 z-hide">
        <Image
          src="/illust/illust_login.png"
          alt="로그인 배경화면"
          fill
          priority
          className="object-cover object-top"
        />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center mt-[42dvh]">
        <div className="w-full flex flex-col gap-8">
          <div className="w-full flex flex-col items-center gap-2.5">
            <LogoText />
            <h1 className="text-[#777A83] text-body font-medium leading-6">
              우리 행사에 딱 맞는 단체주문 음식점 찾기
            </h1>
          </div>

          <div className="w-full flex flex-col justify-center items-center">
            {/* 소셜 로그인 버튼 영역 */}
            <div className="w-full flex justify-center">
              <div className="w-full flex flex-col items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => handleLogin('kakao')}
                  className="w-full flex flex-col items-center transition-opacity cursor-pointer"
                >
                  <KakaoLoginButton className="w-full h-auto" />
                </button>

                <button
                  type="button"
                  onClick={() => handleLogin('naver')}
                  className="w-full flex flex-col items-center transition-opacity cursor-pointer"
                >
                  <NaverLoginButton className="w-full h-auto" />
                </button>

                <button
                  type="button"
                  onClick={() => handleLogin('google')}
                  className="w-full flex flex-col items-center transition-opacity cursor-pointer"
                >
                  <GoogleLoginButton className="w-full h-auto" />
                </button>
              </div>
            </div>

            <button
              className="flex mt-9 pl-4.5 pr-4 py-2 justify-center items-center gap-1 transition-opacity cursor-pointer border border-border-default bg-background-default shadow-[6px_6px_54px_0_rgba(0,0,0,0.03)] rounded-full"
              onClick={() => setIsModalOpen(true)}
            >
              <p className="text-text-subtle text-label1 font-semibold">
                서비스 둘러보기 →
              </p>
            </button>

            {/* 하단 네비게이션 링크 영역 */}
            <div className="w-full flex items-center justify-center mt-8">
              <Link
                href="/owner"
                className="text-text-subtlest text-label2 underline underline-offset-2 decoration-1 hover:text-brand-hover transition-colors"
              >
                사장님이신가요?
              </Link>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="모달 닫기"
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-background-dim/50 animate-in fade-in duration-200 cursor-default"
          />

          {/* 실제 모달 창 (내용물) */}
          <div className="relative w-82 max-w-sm bg-white rounded-xl p-4 shadow-[0_0_15.2px_0_rgba(0,0,0,0.05)] min-h-80 flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* 상단 닫기(X) 버튼 영역 */}
            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-icon-default hover:text-icon-active transition-colors"
              >
                <Close className="text-text-placeholder w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col items-start gap-4 self-stretch">
              <div className="flex flex-col w-full items-center gap-3 self-stretch">
                <CustomerIllust className="w-18 h-18" />
                <div className="flex flex-col items-center gap-1">
                  <p className="text-text-default text-[20px] text-center leading-7 font-bold">
                    로그인 후 그루핏을 이용해보세요
                  </p>
                </div>

                <div className="flex px-4 py-3 flex-col items-start gap-2.5 self-stretch rounded-lg bg-background-transparent">
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center justify-center gap-1">
                      <CheckLinear className="text-[#42BE65]" />
                      <p className="text-label2 text-text-subtlest font-medium">
                        플랫폼 입점 시 단체주문 고객에게 자동 노출
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <CheckLinear className="text-[#42BE65]" />
                      <p className="text-label2 text-text-subtlest font-medium">
                        날짜별 픽업 가능 시간 및 수량 사전 설정 가능
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <CheckLinear className="text-[#42BE65]" />
                      <p className="text-label2 text-text-subtlest font-medium">
                        주문 승인/거절 선택 및 상세 주문 관리 가능
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center justify-center h-11 bg-brand-default mt-5 rounded-lg">
              <Link
                className="text-text-inverse text-label1 font-semibold"
                href="/signup"
              >
                회원가입 →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
