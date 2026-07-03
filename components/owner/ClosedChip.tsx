export default function ClosedChip() {
  return (
    <div className="inline-flex pl-3 pr-4 py-1 items-center gap-1.5 bg-background-subtle rounded-full">
      <div className="w-1.5 h-1.5 rounded-[3px] bg-text-subtlest" />
      <p className="text-label2 text-text-subtlest font-semibold">영업 종료</p>
    </div>
  );
}
