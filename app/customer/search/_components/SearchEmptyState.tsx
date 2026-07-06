import EmptyState from '@/public/illust/illust_NoResults.svg';

export default function SearchEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center mt-[94px]">
      <EmptyState />
      <div className="flex flex-col items-center">
        <p className="text-label1 font-semibold text-text-subtle font-['Pretendard']">
          검색 결과가 없습니다
        </p>
      </div>
    </div>
  );
}
