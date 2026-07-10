'use client';

import { useState, useRef } from 'react';
import InputField from '@/components/ui/InputField';
import TextAreaField from '@/components/ui/TextAreaField';
import DefaultButton from '@/components/ui/ButtonDefault';
import PencilIcon from '@/public/icons/icon_pencil.svg';
import AlertIcon from '@/public/icons/icon_alert.svg';
import ShopCategorySelector from './ShopCategorySelector';
import { useShopInfo } from '../_hooks/useShopInfo';
import { useSaveShopInfo } from '../_hooks/useSaveShopInfo';
import { useShopImageUpload } from '../_hooks/useShopImageUpload';
import type { ShopInfoData } from '../_types/shop.type';

function ShopInfoForm({ shopInfo }: { shopInfo: ShopInfoData }) {
  const { mutateAsync: saveShopInfo, isPending: isSaving } = useSaveShopInfo();
  const { mutateAsync: uploadImage, isPending: isUploading } =
    useShopImageUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [values, setValues] = useState({
    imageUrl: shopInfo.imageUrl ?? '',
    storeName: shopInfo.storeName ?? '',
    address: shopInfo.location?.address ?? '',
    phoneNumber: shopInfo.phoneNumber ?? '',
    description: shopInfo.description ?? '',
    category: shopInfo.category ?? null,
    discountConditionQuantity: String(
      shopInfo.discount?.conditionQuantity ?? ''
    ),
    discountRate: String(shopInfo.discount?.rate ?? ''),
  });

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);
      setValues((prev) => ({ ...prev, imageUrl }));
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      // TODO: 에러 토스트
    }
    e.target.value = '';
  };

  const handleSubmit = async () => {
    try {
      await saveShopInfo({
        imageUrl: shopInfo.imageUrl ?? '',
        storeName: values.storeName,
        location: {
          address: values.address,
          district: shopInfo.location?.district ?? '',
          neighborhood: shopInfo.location?.neighborhood ?? '',
          detailAddress: shopInfo.location?.detailAddress ?? '',
        },
        category: values.category!,
        phoneNumber: values.phoneNumber,
        description: values.description,
        discount: {
          conditionQuantity: Number(values.discountConditionQuantity),
          rate: Number(values.discountRate),
        },
      });
      // TODO: 성공 토스트
    } catch (error) {
      console.error('가게 정보 저장 실패:', error);
      // TODO: 에러 토스트
    }
  };

  return (
    <main className="w-full flex flex-col px-4 items-start gap-4.5 ">
      <div className="flex flex-col items-start gap-3 self-stretch ">
        <h1 className="text-text-default text-headline3 font-semibold">
          가게 정보
        </h1>

        <div className="flex flex-col items-start gap-5 self-stretch">
          <div className="flex flex-col items-start gap-2 self-stretch ">
            <label className="text-text-subtlest text-label1 font-medium">
              대표 이미지
            </label>
            <div
              className="w-full h-37 bg-black pr-3 pb-2.5 rounded-xl"
              style={{
                backgroundImage: values.imageUrl
                  ? `url(${shopInfo.imageUrl})`
                  : undefined,
              }}
            >
              <div className="w-full flex h-full justify-end items-end">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="flex w-8 h-8 justify-center items-center aspect-square rounded-full bg-static-white shadow-[0_0_16px_0_rgba(0, 0, 0, 0.20);]"
                >
                  <PencilIcon className="w-[19.7px] h-[19.7px] text-text-subtle" />
                </button>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>

          <InputField
            label="가게명"
            value={values.storeName}
            onChange={(e) =>
              setValues({ ...values, storeName: e.target.value })
            }
            labelClassName="text-text-subtlest"
          />
          <InputField
            label="위치"
            value={values.address}
            onChange={(e) => setValues({ ...values, address: e.target.value })}
            labelClassName="text-text-subtlest"
          />
          <InputField
            label="연락처"
            value={values.phoneNumber}
            onChange={(e) =>
              setValues({ ...values, phoneNumber: e.target.value })
            }
            labelClassName="text-text-subtlest"
          />
          <TextAreaField
            label="한 줄 소개"
            value={values.description}
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
            labelClassName="text-text-subtlest"
          />

          <div className="flex flex-col items-start gap-2">
            <label className="text-text-subtlest text-label1 font-medium">
              카테고리
            </label>
            <ShopCategorySelector
              value={values.category}
              onChange={(category) => setValues({ ...values, category })}
            />
          </div>

          <div className="flex flex-col items-start gap-2 self-stretch">
            <p className="text-icon-subtlest text-label1 font-medium">할인율</p>
            <div className="flex justify-between items-start self-stretch">
              <div className="flex items-center gap-2">
                <InputField
                  label=""
                  value={values.discountConditionQuantity}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      discountConditionQuantity: e.target.value,
                    })
                  }
                  className="w-25"
                />
                <p className="text-text-default text-body">개 이상</p>
              </div>
              <div className="flex items-center gap-2">
                <InputField
                  label=""
                  value={values.discountRate}
                  onChange={(e) =>
                    setValues({ ...values, discountRate: e.target.value })
                  }
                  className="w-25"
                />
                <p className="text-text-default text-body">% 할인</p>
              </div>
            </div>

            <div className="w-full flex items-start gap-1">
              <AlertIcon className="text-icon-subtlest w-3.75 h-3.75" />
              <p className="text-icon-subtle text-label2">
                할인이 시작되는 주문 수량과 할인율을 설정해 주세요
              </p>
            </div>
          </div>
        </div>
      </div>

      <DefaultButton onClick={handleSubmit} disabled={isSaving}>
        저장하기
      </DefaultButton>
    </main>
  );
}

export default function ShopSection() {
  const { data: shopInfo, isLoading, isError } = useShopInfo();

  if (isLoading) {
    return (
      <div className="w-full flex-1 flex items-center justify-center py-20">
        <span className="text-sm text-text-subtle">로딩 중...</span>
      </div>
    );
  }

  if (isError || !shopInfo) {
    return (
      <div className="w-full flex-1 flex items-center justify-center py-20">
        <span className="text-sm text-text-subtle">
          가게 정보를 불러오지 못했어요.
        </span>
      </div>
    );
  }

  return <ShopInfoForm shopInfo={shopInfo} />;
}
