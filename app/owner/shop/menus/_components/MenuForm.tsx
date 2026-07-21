'use client';

import { useState, useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
import PhotoIcon from '@/public/icons/icon_photo.svg';
import PencilIcon from '@/public/icons/icon_pencil.svg';
import AddIcon from '@/public/icons/icon_add.svg';
import InputField from '@/components/ui/OwnerInputField';
import DefaultButton from '@/components/ui/ButtonDefault';
import { imageAPI } from '@/src/api/image.api';
import MenuDeleteConfirmModal from './MenuDeleteConfirmModal';
import loadingAnimation from '@/public/lottie/loading.json';
import SuccessToast from '@/components/ui/SuccessToast';
import ToastError from '@/components/ui/ToastError';

export type OptionInput = { id: string; name: string; additionalPrice: string };
export type GroupInput = { id: string; name: string; options: OptionInput[] };

export interface MenuFormData {
  name: string;
  description: string;
  basePrice: string;
  imageUrl: string | null;
  optionGroups: GroupInput[];
}

interface MenuFormProps {
  initialData?: MenuFormData;
  isEditMode?: boolean;
  isPending: boolean;
  isDeleting?: boolean;
  onSave: (data: MenuFormData) => void;
  onDelete?: () => void;
}

export default function MenuForm({
  initialData,
  isEditMode = false,
  isPending,
  isDeleting = false,
  onSave,
  onDelete,
}: MenuFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(
    initialData?.description || ''
  );
  const [basePrice, setBasePrice] = useState(initialData?.basePrice || '');
  const [optionGroups, setOptionGroups] = useState<GroupInput[]>(
    initialData?.optionGroups || []
  );

  const [imageUrl, setImageUrl] = useState<string | null>(
    initialData?.imageUrl || null
  );
  const [isUploading, setIsUploading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const uploadedUrl = await imageAPI.uploadToS3(file, 'MENU');
      setImageUrl(uploadedUrl);

      if (successTimerRef.current) clearTimeout(successTimerRef.current);
      setShowSuccessToast(true);
      successTimerRef.current = setTimeout(() => {
        setShowSuccessToast(false);
      }, 2000);
    } catch (error: unknown) {
      const err = error as Error;
      alert(err.message || '이미지 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAddGroup = () => {
    setOptionGroups((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: '',
        options: [{ id: crypto.randomUUID(), name: '', additionalPrice: '' }],
      },
    ]);
  };

  const handleAddOption = (groupId: string) => {
    setOptionGroups((groups) =>
      groups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              options: [
                ...g.options,
                { id: crypto.randomUUID(), name: '', additionalPrice: '' },
              ],
            }
          : g
      )
    );
  };

  const handleRemoveOption = (groupId: string, optionId: string) => {
    setOptionGroups((groups) =>
      groups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              options: g.options.filter((o) => o.id !== optionId),
            }
          : g
      )
    );
  };

  const handleGroupChange = (groupId: string, newName: string) => {
    setOptionGroups((groups) =>
      groups.map((g) => (g.id === groupId ? { ...g, name: newName } : g))
    );
  };

  const handleOptionChange = (
    groupId: string,
    optionId: string,
    field: 'name' | 'additionalPrice',
    value: string
  ) => {
    setOptionGroups((groups) =>
      groups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              options: g.options.map((o) =>
                o.id === optionId ? { ...o, [field]: value } : o
              ),
            }
          : g
      )
    );
  };

  const handleRemoveGroup = (groupId: string) => {
    setOptionGroups((groups) => groups.filter((g) => g.id !== groupId));
  };

  const isFormValid =
    name.trim() !== '' &&
    basePrice.trim() !== '' &&
    (optionGroups.length === 0 ||
      optionGroups.every(
        (g) =>
          g.name.trim() !== '' &&
          g.options.every(
            (o) => o.name.trim() !== '' && o.additionalPrice.trim() !== ''
          )
      ));

  return (
    <>
      <main className="flex pb-6 flex-col items-start gap-5 self-stretch px-4 bg-background-default">
        <div className="flex flex-col items-start gap-6 self-stretch">
          <div className="flex pt-3 flex-col justify-center items-start gap-5 self-stretch">
            <div className="flex flex-col items-start gap-5 self-stretch">
              <label className="text-text-subtlest text-label1 font-medium font-['Pretendard']">
                메뉴 사진
              </label>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
              />

              <div
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className={`flex w-21 h-21 justify-center items-center rounded-xl relative cursor-pointer overflow-hidden -mt-3 ${
                  imageUrl ? 'bg-neutral-20 bg-cover bg-center' : ''
                }`}
                style={
                  imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined
                }
              >
                {isUploading ? (
                  <div className="absolute inset-0 bg-black/50 flex justify-center items-center">
                    <Lottie
                      animationData={loadingAnimation}
                      loop
                      className="w-[84px]"
                    />
                  </div>
                ) : imageUrl ? (
                  <div className="absolute bottom-1.5 right-1.5 flex w-6.5 h-6.5 justify-center items-center shrink-0 aspect-square rounded-full bg-static-white shadow-[0_0_13px_0_rgba(0, 0, 0, 0.20)] z-10 hover:bg-neutral-10 transition-colors">
                    <PencilIcon className="w-4 h-4" />
                  </div>
                ) : (
                  <PhotoIcon className="w-21 h-21" />
                )}
              </div>

              <InputField
                label="메뉴명"
                labelClassName="text-text-subtlest font-['Pretendard']"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="메뉴명을 입력해주세요"
              />

              <InputField
                label="설명"
                labelClassName="text-text-subtlest font-['Pretendard']"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="설명을 입력해주세요"
              />

              <InputField
                label="가격"
                labelClassName="text-text-subtlest font-['Pretendard']"
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                placeholder="가격을 입력해주세요"
              />

              {optionGroups.length === 0 ? (
                <div className="w-full flex flex-col items-start gap-3 font-['Pretendard']">
                  <h2 className="text-text-subtlest text-label1 font-medium">
                    옵션 그룹
                  </h2>
                  <button
                    onClick={handleAddGroup}
                    className="w-full flex h-11 px-4 py-3 justify-center items-center rounded-lg bg-brand-background hover:bg-brand-background/80 transition-colors"
                  >
                    <div className="flex pb-px justify-center items-center gap-1">
                      <AddIcon className="w-3.5 h-3.5" />
                      <p className="text-brand-default text-label1 font-medium">
                        그룹 추가하기
                      </p>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="w-full flex flex-col items-start gap-5 font-['Pretendard']">
                  <h2 className="text-text-subtlest text-label1 font-medium">
                    메뉴 옵션
                  </h2>
                  <div className="w-full flex flex-col gap-5">
                    {optionGroups.map((group) => (
                      <div
                        key={group.id}
                        className="flex flex-col items-start gap-5 self-stretch"
                      >
                        <div className="flex flex-col items-start gap-2 self-stretch">
                          <div className="flex justify-between items-start self-stretch">
                            <span className="text-text-default text-label2 font-normal">
                              그룹명
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveGroup(group.id)}
                              className="text-text-placeholder text-caption1 font-semibold"
                            >
                              삭제
                            </button>
                          </div>
                          <InputField
                            label=""
                            labelClassName="text-label2 font-normal text-text-default"
                            value={group.name}
                            onChange={(e) =>
                              handleGroupChange(group.id, e.target.value)
                            }
                            placeholder="ex. 시그니쳐 세트"
                          />
                        </div>

                        <div className="flex flex-col items-start gap-2 self-stretch">
                          <div className="flex justify-between self-stretch">
                            <p className="text-text-default text-label2 font-normal">
                              세부 옵션
                            </p>
                            <button
                              onClick={() => handleAddOption(group.id)}
                              className="text-brand-default text-caption1 font-semibold font-['Pretendard'] hover:underline"
                            >
                              추가하기
                            </button>
                          </div>
                          <div className="flex flex-col items-start gap-2 self-stretch">
                            {group.options.map((opt) => (
                              <div
                                key={opt.id}
                                className="flex items-start self-stretch gap-2"
                              >
                                <InputField
                                  label=""
                                  placeholder="ex. 에그마요 추가"
                                  value={opt.name}
                                  onChange={(e) =>
                                    handleOptionChange(
                                      group.id,
                                      opt.id,
                                      'name',
                                      e.target.value
                                    )
                                  }
                                />
                                <InputField
                                  label=""
                                  placeholder="추가 금액"
                                  type="number"
                                  value={opt.additionalPrice}
                                  onChange={(e) =>
                                    handleOptionChange(
                                      group.id,
                                      opt.id,
                                      'additionalPrice',
                                      e.target.value
                                    )
                                  }
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRemoveOption(group.id, opt.id)
                                  }
                                  className="w-14 h-11 bg-background-default rounded-lg outline outline-1 outline-offset-[-1px] outline-border-default flex justify-center items-center shrink-0"
                                >
                                  <span className="text-text-default text-label1 font-medium">
                                    삭제
                                  </span>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleAddGroup}
                    className="w-full flex h-11 px-4 py-3 justify-center items-center rounded-lg bg-brand-background hover:bg-brand-background/80 transition-colors"
                  >
                    <div className="flex pb-px justify-center items-center gap-1">
                      <AddIcon className="w-3.5 h-3.5" />
                      <p className="text-brand-default text-label1 font-medium">
                        그룹 추가하기
                      </p>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {isEditMode && onDelete && (
            <button
              onClick={() => setShowDeleteModal(true)}
              disabled={isDeleting}
              className="text-text-subtlest text-label2 font-medium font-['Pretendard'] hover:text-status-danger transition-colors"
            >
              {isDeleting ? '삭제 중...' : '메뉴 삭제'}
            </button>
          )}
        </div>

        <DefaultButton
          onClick={() =>
            onSave({ name, description, basePrice, imageUrl, optionGroups })
          }
          disabled={!isFormValid || isPending || isUploading}
        >
          {isPending ? '저장 중...' : '저장하기'}
        </DefaultButton>
      </main>

      {showDeleteModal && (
        <MenuDeleteConfirmModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            setShowDeleteModal(false);
            onDelete?.();
          }}
        />
      )}

      {showSuccessToast && (
        <SuccessToast text="사진 업로드가 완료되었습니다" bottom={102} />
      )}
      {showErrorToast && <ToastError text={errorMessage} />}
    </>
  );
}
