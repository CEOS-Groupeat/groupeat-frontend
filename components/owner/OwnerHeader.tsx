import Bell from '@/public/icons/icon-bell.svg';
import Link from 'next/link';

export default function OwnerHeader() {
  return (
    <div className="flex flex-col justify-center items-start self-stretch pt-14 pb-4 gap-2.5 bg-static-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.06)] border-b border-border-subtle">
      <div className="flex flex-col justify-center items-center gap-2.5 self-stretch px-4">
        <div className="flex justify-between items-center self-stretch">
          <div className="flex items-center gap-2">
            <header className="text-headline2 text-brand-default font-poppins font-medium">
              Groupeat
            </header>
            <div className="flex rounded-full bg-brand-default px-3 py-1 items-center justify-center">
              <p className="text-caption2 text-text-inverse font-semibold">
                사장님용
              </p>
            </div>
          </div>
          <Link href="/owner/alert">
            <Bell className="text-icon-disable" />
          </Link>
        </div>
      </div>
    </div>
  );
}
