'use client';

import { use, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOrderDetail } from './_hooks/useOrderDetail';
import { useCreateReview } from './_hooks/useCreateReview';
import ToastError from '@/components/ui/ToastError';
import SuccessToast from '@/components/ui/SuccessToast';
import ReviewWriteHeader from './_components/ReviewWriteHeader';
import ReviewForm, { type ReviewFormValues } from './_components/ReviewForm';
import SubmitButton from './_components/SubmitButton';
import ReviewSuccessModal from './_components/ReviewSuccessModal';

interface PageProps {
  params: Promise<{ orderId: string }>;
}

const initialValues: ReviewFormValues = {
  rating: 0,
  eventType: null,
  headcount: null,
  perPersonBudget: 3000,
  imageUrls: [],
  content: '',
};

export default function ReviewWritePage({ params }: PageProps) {
  const { orderId } = use(params);
  const router = useRouter();

  const { data: order, isLoading, isError } = useOrderDetail(orderId);

  const [formValues, setFormValues] = useState<ReviewFormValues>(initialValues);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const errorToastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { mutateAsync: createReview, isPending: isSubmitting } =
    useCreateReview();

  const showError = (message: string) => {
    if (errorToastTimerRef.current) {
      clearTimeout(errorToastTimerRef.current);
    }
    setErrorMessage(message);
    setShowErrorToast(true);
    errorToastTimerRef.current = setTimeout(() => {
      setShowErrorToast(false);
      errorToastTimerRef.current = null;
    }, 2000);
  };

  const showSuccess = () => {
    if (successTimerRef.current) clearTimeout(successTimerRef.current);
    setShowSuccessToast(true);
    successTimerRef.current = setTimeout(() => {
      setShowSuccessToast(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (errorToastTimerRef.current) clearTimeout(errorToastTimerRef.current);
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, []);

  const isFormValid =
    formValues.rating > 0 &&
    formValues.eventType !== null &&
    formValues.headcount !== null &&
    formValues.headcount > 0 &&
    formValues.content.trim().length > 0;

  const handleSubmit = async () => {
    if (!isFormValid || !formValues.eventType || formValues.headcount === null)
      return;

    try {
      await createReview({
        orderId: Number(orderId),
        rating: formValues.rating,
        eventType: formValues.eventType,
        headcount: formValues.headcount,
        perPersonBudget: formValues.perPersonBudget,
        content: formValues.content,
        imageUrls: formValues.imageUrls,
      });
      setShowSuccessModal(true);
    } catch (error) {
      console.error('리뷰 작성 실패:', error);
      showError('리뷰 등록에 실패했어요. 다시 시도해주세요.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <span className="text-sm text-text-subtle">로딩 중...</span>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="flex-1 flex flex-col gap-3 items-center justify-center min-h-screen">
        <span className="text-sm text-text-subtle">주문 정보가 없어요.</span>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-brand-default underline"
        >
          이전 화면으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background-default flex flex-col pb-32">
      <ReviewWriteHeader />
      <ReviewForm
        order={order}
        values={formValues}
        onChange={setFormValues}
        onImageUploadSuccess={showSuccess}
        onImageUploadError={() => showError('이미지 업로드에 실패했어요.')}
      />
      <SubmitButton
        disabled={!isFormValid || isSubmitting}
        isLoading={isSubmitting}
        onClick={handleSubmit}
      />
      {showSuccessModal && (
        <ReviewSuccessModal
          onComplete={() => router.push('/customer/order/status')}
        />
      )}
      {showSuccessToast && <SuccessToast text="사진 업로드가 완료되었습니다" />}
      {showErrorToast && <ToastError text={errorMessage} />}
    </div>
  );
}
