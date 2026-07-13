'use client';

import StarIcon from '@/public/icons/icon_star.svg';

interface StarRatingInputProps {
  value: number;
  onChange: (rating: number) => void;
}

export default function StarRatingInput({
  value,
  onChange,
}: StarRatingInputProps) {
  return (
    <div className="inline-flex justify-start items-center gap-2">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            aria-label={`${star}점`}
          >
            <StarIcon
              className={`size-8 ${star <= value ? 'text-icon-star' : 'text-icon-subtlest'}`}
            />
          </button>
        ))}
      </div>
      {value > 0 && (
        <span className="text-text-default text-body font-semibold font-['Pretendard']">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}
