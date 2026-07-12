import BoxIcon from '@/public/icons/icon_box.svg';
import TerminatedIcon from '@/public/icons/icon_terminated.svg';

interface DashboardCardAProps {
  text: string;
  icon?: string;
  count?: number;
}

export default function DashboardCardA({ text, icon, count }: DashboardCardAProps) {
  return (
    <div className="flex w-1/2 h-18.5 p-3 justify-between items-center bg-static-white border border-px border-border-subtle shadow-[6px_6px_54px_0_rgba(0,0,0,0.05)] rounded-lg">
      <div className="flex w-full justify-between items-center shrink-0 self-stretch">
        <div className="flex flex-col justify-center items-start gap-1.5 self-stretch">
          <div className="flex items-center gap-5">
            <p className="text-text-subtlest text-label2 font-semibold">
              {text}
            </p>
          </div>
          <div className="flex w-11.5 items-end gap-1.5">
            <div className="flex items-end gap-1">
              <p className="flex h-6 flex-col justify-center font-bold text-headline2 text-text-default">
                {count}
              </p>
              <div className="flex w-4 pb-0.5 flex-col justify-end items-center gap-2.5 self-stretch">
                <p className="text-label2 text-text-default">건</p>
              </div>
            </div>
          </div>
        </div>
        {icon === 'box' ? <BoxIcon /> : icon === 'terminated' ? <TerminatedIcon /> : null}
      </div>
    </div>
  );
}
