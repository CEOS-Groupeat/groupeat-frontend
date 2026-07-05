'use client';

import CloseIcon from '@/public/icons/icon_close.svg';

interface RecentKeywordChipProps {
  keyword: string;
  onClick: () => void;
  onRemove: () => void;
}

export default function RecentKeywordChip({
  keyword,
  onClick,
  onRemove,
}: RecentKeywordChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 pl-2.5 pr-3.5 py-2 bg-background-default rounded-full outline outline-1 outline-offset-[-1px] outline-border-default flex items-center gap-1"
    >
      <CloseIcon
        className="size-4 text-icon-subtle shrink-0"
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          onRemove();
        }}
      />
      <span className="text-label2 whitespace-nowrap font-normal text-text-default font-['Pretendard']">
        {keyword}
      </span>
    </button>
  );
}
