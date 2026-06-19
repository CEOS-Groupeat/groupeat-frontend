export default function SearchEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-[19px] mt-[112px]">
      <div className="w-39 h-39 rounded-2xl bg-background-subtlest" />
      <div className="flex flex-col items-center">
        <p className="text-label1 font-semibold text-text-subtle font-['Pretendard']">
          검색 결과가 없습니다
        </p>
      </div>
    </div>
  );
}
