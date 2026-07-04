'use client';
import CategorySection from '@/app/customer/home/_components/CategorySection';
import InputField from '@/components/ui/InputField';
import TextAreaField from '@/components/ui/TextAreaField';
import PencilIcon from '@/public/icons/icon_pencil.svg';
import AlertIcon from '@/public/icons/icon_alert.svg';
import { useState } from 'react';
import DefaultButton from '@/components/ui/ButtonDefault';

export default function ShopSection() {
  const [storeName, setStoreName] = useState('');
  const [storeLocation, setStoreLocation] = useState('');
  const [storeContactNumber, setStoreContactNumber] = useState('');
  const [storeIntroduction, setStoreIntroduction] = useState('');
  const [storeDiscountAmount, setStoreDiscountAmount] = useState('');
  const [storeDiscountRate, setStoreDiscountRate] = useState('');

  const handleSelectCategory = () => {
    return;
  };

  const handleSubmit = () => {

  }
  return (
    <main className="w-full flex flex-col px-4 items-start gap-4.5">
      <div className="flex flex-col items-start gap-3 self-stretch">
        <h1 className="text-text-default text-headline3 font-semibold">
          가게 정보
        </h1>

        <div className="flex flex-col items-start gap-5 self-stretch">
          <div className="flex flex-col items-start gap-2 self-stretch ">
            <label
              htmlFor="text"
              className="text-text-subtlest text-label1 font-medium"
            >
              대표 이미지
            </label>
            <div className="w-full h-37 bg-black pr-3 pb-2.5 rounded-xl">
              <div className="w-full flex h-full justify-end items-end">
                <div className="w-8 h-8 shrink-0">
                  <button className="flex w-8 h-8 justify-center items-center aspect-square rounded-full bg-static-white shadow-[0_0_16px_0_rgba(0, 0, 0, 0.20);]">
                    <PencilIcon className="w-[19.7px] h-[19.7px] text-text-subtle" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <InputField
            label="가게명"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            labelClassName="text-text-subtlest"
          />
          <InputField
            label="위치"
            value={storeLocation}
            onChange={(e) => setStoreLocation(e.target.value)}
            labelClassName="text-text-subtlest"
          />
          <InputField
            label="연락처"
            value={storeContactNumber}
            onChange={(e) => setStoreContactNumber(e.target.value)}
            labelClassName="text-text-subtlest"
          />
          <TextAreaField
            label="한 줄 소개"
            value={storeIntroduction}
            onChange={(e) => setStoreIntroduction(e.target.value)}
            labelClassName="text-text-subtlest"
          />

          <div className="flex flex-col items-start gap-2">
            <label
              htmlFor="text"
              className="text-text-subtlest text-label1 font-medium"
            >
              카테고리
            </label>
            <CategorySection onCategoryClick={handleSelectCategory} />
          </div>

          <div className="flex flex-col items-start gap-2 self-stretch">
            <p className="text-icon-subtlest text-label1 font-medium">할인율</p>
            <div className="flex justify-between items-start self-stretch">
              <div className="flex items-center gap-2">
                <InputField
                  label=""
                  value={storeDiscountAmount}
                  onChange={(e) => setStoreDiscountAmount(e.target.value)}
                  className="w-25"
                />
                <p className="text-text-default text-body">개 이상</p>
              </div>
              <div className="flex items-center gap-2">
                <InputField
                  label=""
                  value={storeDiscountRate}
                  onChange={(e) => setStoreDiscountRate(e.target.value)}
                  className="w-25"
                />
                <p className="text-text-default text-body">% 할인</p>
              </div>
            </div>

            <div className='w-full flex items-start gap-1'>
                <AlertIcon className="text-icon-subtlest w-3.75 h-3.75"/>
                <p className='text-icon-subtle text-label2'>할인이 시작되는 주문 수량과 할인율을 설정해 주세요</p>
            </div>
          </div>
        </div>
      </div>

      <DefaultButton onClick={handleSubmit}>
        저장하기
      </DefaultButton>
    </main>
  );
}
