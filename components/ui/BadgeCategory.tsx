interface BadgeCategoryProps {
  label: string;
}

export default function BadgeCategory({ label }: BadgeCategoryProps) {
  return (
    <div className="w-fit px-1.5 py-0.5 bg-background-subtlest rounded-sm inline-flex justify-center items-center">
      <span className="text-xs font-medium text-text-subtle leading-4">
        {label}
      </span>
    </div>
  );
}
