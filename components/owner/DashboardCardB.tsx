import Statistics from '@/public/icons/icon_statistics.svg';
import People from '@/public/icons/icon_people.svg';

interface DashboardCardBProps {
  text: string;
  icon: string;
  count: number;
  increasedCount: number;
}

export default function DashBoardCardB({ text, icon, count, increasedCount }: DashboardCardBProps){
    return (
        <div className="flex w-1/2 pt-3.5 px-3 pb-3 flex-col items-start gap-4 rounded-lg border border-px border-border-subtle bg-static-white shadow-[6px_6px_54px_0_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-5 self-stretch">
                <p className="text-text-subtlest text-label2 font-semibold">{text}</p>
            </div>
            <div className="w-full flex justify-between items-start">
                <div className="flex flex-col items-start">
                    <p className="text-brand-default text-caption1 font-medium">
                        + {increasedCount} 건
                    </p>
                    <div className="flex justify-center items-start gap-0.5">
                        <p className="text-text-default text-headline3 font-bold leading-6.5">{count}</p>
                        <p className="text-text-default leading-6">건</p>
                    </div>
                </div>
                {icon === 'statistics' ? <Statistics /> : icon === 'people' ? <People /> : null}
            </div>
        </div>
    )
}