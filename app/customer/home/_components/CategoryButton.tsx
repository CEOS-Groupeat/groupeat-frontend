interface CategoryButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export default function CategoryButton({
  icon,
  label,
  onClick,
}: CategoryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-[79.25px] h-[66px] px-3 py-1.5 bg-static-white rounded-lg outline outline-1 outline-offset-[-1px] outline-border-subtle flex flex-col justify-center items-center gap-1"
    >
      <div className="size-8">{icon}</div>
      <span className="text-text-subtle text-caption1 font-semibold">
        {label}
      </span>
    </button>
  );
}
