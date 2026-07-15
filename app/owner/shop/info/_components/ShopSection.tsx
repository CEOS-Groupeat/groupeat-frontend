'use client';

import { useState, useEffect, useRef } from 'react';
import InputField from '@/components/ui/OwnerInputField';
import TextAreaField from '@/components/ui/TextAreaField';
import DefaultButton from '@/components/ui/ButtonDefault';
import PencilIcon from '@/public/icons/icon_pencil.svg';
import AlertIcon from '@/public/icons/icon_alert.svg';
import ShopCategorySelector from './ShopCategorySelector';
import SuccessToast from '@/components/ui/SuccessToast';
import ToastError from '@/components/ui/ToastError';
import { useShopInfo } from '../_hooks/useShopInfo';
import { useSaveShopInfo } from '../_hooks/useSaveShopInfo';
import { useShopImageUpload } from '../_hooks/useShopImageUpload';
import { isValidPhoneNumber } from '../_utils/validatePhoneNumber';
import type { ShopInfoData } from '../_types/shop.type';

import { extractDistrict, extractNeighborhood } from '../_utils/extractDistrict';

interface ShopInfoFormProps {
  shopInfo: ShopInfoData | null;
}

function ShopInfoForm({ shopInfo }: ShopInfoFormProps) {
  const { mutateAsync: saveShopInfo, isPending: isSaving } = useSaveShopInfo();
  const { mutateAsync: uploadImage, isPending: isUploading } =
    useShopImageUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [values, setValues] = useState({
    imageUrl: shopInfo?.imageUrl ?? '',
    storeName: shopInfo?.storeName ?? '',
    address: shopInfo?.location?.address ?? '',
    phoneNumber: shopInfo?.phoneNumber ?? '',
    description: shopInfo?.description ?? '',
    category: shopInfo?.category ?? null,
    discountConditionQuantity: String(
      shopInfo?.discount?.conditionQuantity ?? ''
    ),
    discountRate: String(shopInfo?.discount?.rate ?? ''),
  });

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [phoneError, setPhoneError] = useState(false);

  useEffect(() => {
    return () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    };
  }, []);

  const showError = (message: string) => {
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    setErrorMessage(message);
    setShowErrorToast(true);
    errorTimerRef.current = setTimeout(() => {
      setShowErrorToast(false);
    }, 2000);
  };

  const isFormValid =
    values.storeName.trim().length > 0 &&
    values.address.trim().length > 0 &&
    values.phoneNumber.trim().length > 0 &&
    values.category !== null;

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);
      setValues((prev) => ({ ...prev, imageUrl }));
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      showError('이미지 업로드에 실패했어요. 다시 시도해주세요.');
    }
    e.target.value = '';
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;

    if (!isValidPhoneNumber(values.phoneNumber)) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);

    const hasDiscount =
      values.discountConditionQuantity.trim().length > 0 &&
      values.discountRate.trim().length > 0;

    try {
      await saveShopInfo({
        imageUrl: values.imageUrl ?? '',
        storeName: values.storeName,
        location: {
          address: values.address,
          district: extractDistrict(values.address) || shopInfo?.location?.district || '',
          neighborhood: extractNeighborhood(values.address) || shopInfo?.location?.neighborhood || '',
          detailAddress: shopInfo?.location?.detailAddress ?? '',
        },
        category: values.category!,
        phoneNumber: values.phoneNumber,
        description: values.description,
        discount: hasDiscount
          ? {
              conditionQuantity: Number(values.discountConditionQuantity),
              rate: Number(values.discountRate),
            }
          : undefined,
      });

      if (successTimerRef.current) clearTimeout(successTimerRef.current);
      setShowSuccessToast(true);
      successTimerRef.current = setTimeout(() => {
        setShowSuccessToast(false);
      }, 2000);
    } catch (error) {
      console.error('가게 정보 저장 실패:', error);
      showError('저장에 실패했어요. 다시 시도해주세요.');
    }
  };

  return (
    <main className="w-full flex flex-col px-4 items-start gap-4.5 font-['Pretendard']">
      <div className="flex flex-col items-start gap-[18px] self-stretch">
        <div className="flex flex-col items-start gap-5 self-stretch">
          <div className="flex flex-col items-start gap-2 self-stretch">
            <label className="mt-3 text-text-subtlest text-label1 font-medium">
              대표 이미지
            </label>
            <div
              className="w-full h-37 bg-black pr-3 pb-2.5 rounded-xl bg-cover bg-center bg-no-repeat relative"
              style={{
                backgroundImage: values.imageUrl
                  ? `url(${values.imageUrl})`
                  : undefined,
              }}
            >
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                  <span className="text-static-white text-sm font-medium font-['Pretendard']">
                    업로드 중...
                  </span>
                </div>
              )}
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
          <div className="flex flex-col gap-2 self-stretch">
            <InputField
              label="연락처"
              value={values.phoneNumber}
              onChange={(e) => {
                setValues({ ...values, phoneNumber: e.target.value });
                if (phoneError) setPhoneError(false);
              }}
              placeholder="010-1234-5678"
              labelClassName="text-text-subtlest"
              inputClassName={phoneError ? '!outline-status-danger' : ''}
            />
            {phoneError && (
              <div className="flex items-center gap-1">
                <span className="text-status-danger text-xs font-medium font-['Pretendard'] leading-4">
                  올바른 형식을 입력해주세요
                </span>
              </div>
            )}
          </div>
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
            <p className="text-text-subtlest text-label1 font-medium">할인율</p>
            <div className="flex justify-between items-start self-stretch">
              <div className="flex items-center gap-2">
                <input
                  value={values.discountConditionQuantity}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      discountConditionQuantity: e.target.value,
                    })
                  }
                  className={`w-25 h-11 pl-4 pr-3 py-3 rounded-lg font-pretendard font-normal text-body text-text-default outline-none transition-colors border ${
                    values.discountConditionQuantity.trim().length > 0
                      ? 'bg-background-subtle border-transparent'
                      : 'bg-white border-border-strong'
                  }`}
                />
                <p className="text-text-default text-body">개 이상</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  value={values.discountRate}
                  onChange={(e) =>
                    setValues({ ...values, discountRate: e.target.value })
                  }
                  className={`w-25 h-11 pl-4 pr-3 py-3 rounded-lg font-pretendard font-normal text-body text-text-default outline-none transition-colors border ${
                    values.discountRate.trim().length > 0
                      ? 'bg-background-subtle border-transparent'
                      : 'bg-white border-border-strong'
                  }`}
                />
                <p className="text-text-default font-normal text-body">
                  % 할인
                </p>
              </div>
            </div>

            <div className="w-full flex items-start gap-1">
              <AlertIcon className="text-icon-subtlest w-3.75 h-3.75" />
              <p className="text-text-subtle font-normal text-label2">
                할인이 시작되는 주문 수량과 할인율을 설정해 주세요
              </p>
            </div>
          </div>
        </div>
      </div>

      <DefaultButton onClick={handleSubmit} disabled={!isFormValid || isSaving}>
        {isSaving ? '저장 중...' : '저장하기'}
      </DefaultButton>

      {showSuccessToast && <SuccessToast text="저장이 완료되었습니다" />}
      {showErrorToast && <ToastError text={errorMessage} />}
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

  if (isError) {
    return (
      <div className="w-full flex-1 flex items-center justify-center py-20">
        <span className="text-sm text-text-subtle">
          가게 정보를 불러오지 못했어요.
        </span>
      </div>
    );
  }

  // shopInfo가 null이면 아직 등록 안 한 신규 사장님 → 빈 폼으로 시작
  return <ShopInfoForm shopInfo={shopInfo ?? null} />;
}
