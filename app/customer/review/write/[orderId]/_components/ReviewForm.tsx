'use client';

import type { OrderDetail } from '../_types/orderDetail.type';
import type { EventType } from '../_types/reviewWrite.type';
import { useReviewImageUpload } from '../_hooks/useReviewImageUpload';

import OrderSummaryCard from './OrderSummaryCard';
import StarRatingInput from './StarRatingInput';
import EventTypeSelector from './EventTypeSelector';
import HeadcountInput from './HeadcountInput';
import BudgetSlider from './BudgetSlider';
import ReviewImageUploader from './ReviewImageUploader';
import ReviewContentInput from './ReviewContentInput';

export interface ReviewFormValues {
  rating: number;
  eventType: EventType | null;
  headcount: number | null;
  perPersonBudget: number;
  imageUrls: string[];
  content: string;
}

interface ReviewFormProps {
  order: OrderDetail;
  values: ReviewFormValues;
  onChange: (values: ReviewFormValues) => void;
}

export default function ReviewForm({
  order,
  values,
  onChange,
}: ReviewFormProps) {
  const { mutateAsync: uploadImage, isPending: isUploading } =
    useReviewImageUpload();

  const handleImageSelect = async (file: File) => {
    try {
      const imageUrl = await uploadImage(file);
      onChange({ ...values, imageUrls: [...values.imageUrls, imageUrl] });
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  const handleImageRemove = (index: number) => {
    onChange({
      ...values,
      imageUrls: values.imageUrls.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="px-4 flex flex-col gap-8 font-['Pretendard']">
      <div className="flex flex-col gap-2">
        <span className="text-label1 font-semibold text-text-subtlest">
          주문 내역
        </span>
        <OrderSummaryCard order={order}>
          <StarRatingInput
            value={values.rating}
            onChange={(rating) => onChange({ ...values, rating })}
          />
        </OrderSummaryCard>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-label1 font-semibold text-text-subtlest">
          행사 유형
        </span>
        <EventTypeSelector
          value={values.eventType}
          onChange={(eventType) => onChange({ ...values, eventType })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-label1 font-semibold text-text-subtlest">
          참여 인원
        </span>
        <HeadcountInput
          value={values.headcount}
          onChange={(headcount) => onChange({ ...values, headcount })}
        />
      </div>

      <div className="flex flex-col">
        <span className="text-label1 font-semibold text-text-subtlest">
          1인당 예산
        </span>
        <BudgetSlider
          value={values.perPersonBudget}
          onChange={(perPersonBudget) =>
            onChange({ ...values, perPersonBudget })
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-label1 font-semibold text-text-subtlest">
          사진 업로드
        </span>
        <ReviewImageUploader
          imageUrls={values.imageUrls}
          onSelect={handleImageSelect}
          onRemove={handleImageRemove}
          isUploading={isUploading}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-label1 font-semibold text-text-subtlest">
          후기 작성
        </span>
        <ReviewContentInput
          value={values.content}
          onChange={(content) => onChange({ ...values, content })}
        />
      </div>
    </div>
  );
}
