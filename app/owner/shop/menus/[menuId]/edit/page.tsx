'use client';

import Link from 'next/link';
import TextAreaField from '@/components/ui/TextAreaField';

// 사용할 아이콘들을 임포트합니다 (경로는 프로젝트에 맞게 수정)
import BackIcon from '@/public/icons/icon_arrow_Left.svg';
import PencilIcon from '@/public/icons/icon_pencil.svg';
import CheckIcon from '@/public/icons/icon_check.svg';
import InputField from '@/components/ui/InputField';

export default function MenuEditPage() {
  return (
    <div className="w-full max-w-md mx-auto min-h-dvh flex flex-col bg-background-default">
      {/* 1. 헤더 영역 */}
      <header className="flex items-center h-11 px-4 pt-14 pb-2 sticky top-0 bg-background-default z-10">
        <button
          type="button"
          className="p-1 -ml-1 flex items-center justify-center"
        >
          <BackIcon className="w-5 h-5 text-icon-default" />
        </button>
        <h1 className="ml-2 text-lg font-semibold text-text-default">
          메뉴 수정
        </h1>
      </header>

      {/* 2. 폼 입력 영역 */}
      <main className="flex-1 flex flex-col gap-6 px-4 pt-6 pb-24">
        {/* 메뉴 사진 */}
        <section className="flex flex-col gap-2">
          <label className="text-sm font-medium text-text-subtlest">
            메뉴 사진
          </label>
          <div className="relative w-20 h-20 bg-background-subtle rounded-xl cursor-pointer">
            {/* 이미지가 들어갈 자리 (next/image 사용) */}
            <button
              type="button"
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
            >
              <PencilIcon className="w-3.5 h-3.5 text-text-subtle" />
            </button>
          </div>
        </section>

        {/* 기본 정보 입력 */}
        <section className="flex flex-col gap-5">
          <InputField
            label="메뉴명"
            defaultValue="시그니쳐 메뉴 세트"
            labelClassName="text-sm text-text-subtlest"
          />
          <TextAreaField
            label="설명"
            defaultValue="샌드위치 반, 김밥 반으로 구성된 세트입니다"
            labelClassName="text-sm text-text-subtlest"
          />
          <InputField
            label="기본 가격"
            defaultValue="6,000"
            labelClassName="text-sm text-text-subtlest"
          />
        </section>

        {/* 메뉴 옵션 영역 */}
        <section className="flex flex-col gap-4 mt-2">
          <label className="text-sm font-medium text-text-subtlest">
            메뉴 옵션
          </label>

          <div className="flex flex-col gap-5">
            {/* 옵션 그룹 1 */}
            <div className="flex flex-col gap-4">
              <InputField
                label="그룹명"
                defaultValue="샌드위치"
                labelClassName="text-xs text-text-default"
              />
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-default">세부 옵션</span>
                  <button
                    type="button"
                    className="text-xs font-semibold text-brand-default"
                  >
                    추가하기
                  </button>
                </div>
                {/* 세부 옵션 리스트 */}
                <div className="flex gap-2">
                  <InputField label="" defaultValue="에그마요" />
                  <InputField label="" defaultValue="+ 1,000" />
                </div>
                <div className="flex gap-2">
                  <InputField label="" defaultValue="참치마요" />
                  <InputField label="" defaultValue="+ 800" />
                </div>
              </div>
            </div>

            {/* 옵션 그룹 2 */}
            <div className="flex flex-col gap-4">
              <InputField
                label="그룹명"
                defaultValue="음료수"
                labelClassName="text-xs text-text-default"
              />
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-default">세부 옵션</span>
                  <button
                    type="button"
                    className="text-xs font-semibold text-brand-default"
                  >
                    추가하기
                  </button>
                </div>
                {/* 세부 옵션 리스트 */}
                <div className="flex gap-2">
                  <InputField label="" defaultValue="아이스 아메리카노" />
                  <InputField label="" defaultValue="+ 500" />
                </div>
                <div className="flex gap-2">
                  <InputField label="" defaultValue="아이스 라떼" />
                  <InputField label="" defaultValue="+ 800" />
                </div>
              </div>
            </div>
          </div>

          {/* 그룹 추가하기 버튼 */}
          <button
            type="button"
            className="w-full h-11 mt-2 bg-brand-background text-brand-default rounded-lg font-medium text-sm flex justify-center items-center gap-1.5 transition-colors hover:bg-brand-default/10"
          >
            + 그룹 추가하기
          </button>
        </section>

        {/* 사장님 추천 메뉴 체크박스 */}
        <label className="flex items-center gap-2 cursor-pointer mt-2 w-fit">
          <div className="w-6 h-6 rounded flex items-center justify-center bg-brand-default">
            <CheckIcon className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm text-text-default">사장님 추천 메뉴</span>
        </label>

        {/* 삭제 버튼 */}
        <div className="flex justify-end mt-2">
          <button
            type="button"
            className="text-xs font-medium text-text-subtle underline hover:text-text-default transition-colors"
          >
            메뉴 삭제
          </button>
        </div>
      </main>

      {/* 3. 하단 고정 저장하기 버튼 */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center bg-background-default pb-6 pt-2 px-4 shadow-[0px_-4px_16px_rgba(0,0,0,0.05)]">
        <div className="w-full max-w-md">
          {/* 상태에 따라 disabled 일 땐 bg-background-subtlest text-text-subtlest 사용 */}
          <button
            disabled
            type="submit"
            className="w-full h-12 rounded-xl font-semibold text-base transition-colors bg-background-subtlest text-text-subtlest"
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
