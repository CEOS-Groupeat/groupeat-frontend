'use client';

import { useRef } from 'react';
import Image from 'next/image';
import IconAddPhoto from '@/public/icons/icon_add-photo.svg';

const MAX_IMAGES = 3;

interface ReviewImageUploaderProps {
  imageUrls: string[];
  onSelect: (file: File) => void;
  onRemove: (index: number) => void;
  isUploading?: boolean;
}

export default function ReviewImageUploader({
  imageUrls,
  onSelect,
  onRemove,
  isUploading,
}: ReviewImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onSelect(file);
    }
    e.target.value = ''; // 같은 파일 다시 선택 가능하도록 초기화
  };

  const canAddMore = imageUrls.length < MAX_IMAGES;

  return (
    <div className="flex gap-2 flex-wrap">
      {imageUrls.map((url, index) => (
        <div
          key={index}
          className="relative size-24 rounded-lg overflow-hidden"
        >
          <Image
            src={url}
            alt={`업로드 이미지 ${index + 1}`}
            fill
            className="object-cover"
          />
          {/* 임시 삭제 버튼 (피그마 대기중) */}
          <button
            type="button"
            onClick={() => onRemove(index)}
            aria-label="이미지 삭제"
            className="absolute top-1 right-1 size-5 flex items-center justify-center bg-black/50 rounded-full text-white text-xs"
          >
            ×
          </button>
        </div>
      ))}

      {canAddMore && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="size-[90px] bg-background-default rounded-lg outline outline-1 outline-offset-[-1px] outline-border-strong flex items-center justify-center disabled:opacity-50"
        >
          {isUploading ? (
            <span className="text-body text-text-subtlest">업로드 중</span>
          ) : (
            <span className="text-2xl text-icon-subtlest">
              <IconAddPhoto />
            </span>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
