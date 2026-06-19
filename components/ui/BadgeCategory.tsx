interface BadgeCategoryProps {
  label: string;
}

export default function BadgeCategory({ label }: BadgeCategoryProps) {
  return (
    <div className="w-fit px-1.5 py-0.5 bg-background-subtlest rounded-sm flex justify-center items-center">
      <span className="text-caption2 font-medium text-text-subtle font-['Pretendard']">
        {label}
      </span>
    </div>
  );
}