'use client'; // 피그마 토큰

interface TimeRangeFieldProps {
  label: string;
  timeRange: { startTime: string; endTime: string } | null;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
  onAdd: () => void;
  onRemove: () => void;
}

export default function TimeRangeField({
  label,
  timeRange,
  onStartChange,
  onEndChange,
  onAdd,
  onRemove,
}: TimeRangeFieldProps) {
  const hasTimeRange = timeRange !== null;

  return (
    <div className="flex flex-col justify-center items-start gap-2 font-['Pretendard']">
      <span className="text-text-subtle text-label2 font-normal">
        {label}
      </span>
      <div className="w-full flex justify-start items-start gap-2">
        <div className="w-72 flex justify-start items-center gap-2">
          <div className="flex-1 h-11 pl-4 pr-3 py-3 bg-background-default rounded-lg outline outline-1 outline-offset-[-1px] outline-border-strong flex justify-start items-center overflow-hidden">
            <div className="flex-1 flex justify-center items-center gap-6">
              {hasTimeRange ? (
                <>
                  <input
                    type="text"
                    value={timeRange.startTime}
                    onChange={(e) => onStartChange(e.target.value)}
                    className="w-20 text-center text-text-default text-body font-medium font-['Pretendard'] placeholder:font-normal placeholder:text-text-placeholder leading-6 bg-transparent"
                  />
                  <span className="text-text-subtlest text-base font-normal">
                    -
                  </span>
                  <input
                    type="text"
                    value={timeRange.endTime}
                    onChange={(e) => onEndChange(e.target.value)}
                    className="w-20 text-center text-text-default text-base font-medium font-['Pretendard'] leading-6 bg-transparent"
                  />
                </>
              ) : (
                <>
                  <span className="w-20 text-center text-text-placeholder text-body font-normal">
                    시간 : 분
                  </span>
                  <span className="text-text-subtlest text-body font-normal">
                    -
                  </span>
                  <span className="w-20 text-center text-text-placeholder text-body font-normal">
                    시간 : 분
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {hasTimeRange ? (
          <button
            type="button"
            onClick={onRemove}
            className="h-11 px-4 py-3 bg-background-subtle rounded-lg flex justify-center items-center overflow-hidden"
          >
            <span className="text-center text-text-subtlest text-label1 font-medium">
              수정
            </span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onAdd}
            className="h-11 px-4 py-3 bg-background-default rounded-lg outline outline-1 outline-offset-[-1px] outline-border-strong flex justify-center items-center overflow-hidden"
          >
            <span className="text-center text-text-default text-label1 font-medium">
              추가
            </span>
          </button>
        )}
      </div>
    </div>
  );
}