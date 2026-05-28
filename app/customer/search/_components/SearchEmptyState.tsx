interface SearchEmptyStateProps {
  keyword?: string;
}

export default function SearchEmptyState({ keyword }: SearchEmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3 py-20">
      <div className="size-16 rounded-full bg-background-subtlest flex items-center justify-center text-2xl">
        🔍
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-base font-semibold text-text-default">
          {keyword ? `'${keyword}' 검색 결과가 없어요` : '검색 결과가 없어요'}
        </p>
        <p className="text-sm text-text-subtle">
          필터를 변경하거나 다른 검색어를 입력해 보세요
        </p>
      </div>
    </div>
  );
}
