'use client';
import DefaultButton from '@/components/ui/ButtonDefault';
import ArrowLeftIcon from '@/public/icons/icon_arrow_left_padding.svg';
import PencilIcon from '@/public/icons/icon_pencil.svg';

export default function MenuEditPage() {
  return (
    <div className="w-full flex pt-16 flex-col items-start bg-background-default">
      <div className="w-full flex flex-col px-4 gap-0.5">
        <div className="w-full flex items-center">
          <ArrowLeftIcon className="w-5 h-5" />
          <h1 className="text-text-default text-headline3 font-semibold">
            메뉴 수정
          </h1>
        </div>
      </div>

      <main className="flex pb-6 flex-col items-start gap-6 self-stretch px-4 pt-3">
        <div className="flex items-start gap-3 self-stretch">
          <div className="flex flex-col gap-6 self-stretch">
            <div className="flex justify-end items-center gap-1.5 self-stretch">
              <section className="flex flex-col items-start gap-2 self-stretch">
                <p className="text-icon-subtlest text-label1 font-medium">
                  메뉴 사진
                </p>
                <div className=''></div>
                <button className="w-6.5 h-6.5 p-1.5 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <PencilIcon className="w-4 h-4 text-icon-default" />
                </button>
              </section>
            </div>
          </div>
        </div>
        <DefaultButton onClick={() => {}}>저장하기</DefaultButton>
      </main>
    </div>
  );
}
