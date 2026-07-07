interface CategoryButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

export default function CategoryButton({
  icon,
  label,
  onClick,
  isActive = false,
}: CategoryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`w-[79.25px] h-[66px] py-1.5 rounded-lg outline outline-1 outline-offset-[-1px] outline-border-subtle flex flex-col justify-center items-center gap-1 shrink-0
        ${isActive ? 'bg-background-subtle' : 'bg-static-white'}`}
    >
      <div className="size-8">{icon}</div>
      <span className="text-text-subtle text-caption1 font-semibold">
        {label}
      </span>
    </button>
  );
}
