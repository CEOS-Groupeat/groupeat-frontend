import Image from 'next/image';
import { OwnerMenu } from '@/types/menu';
import { ReactNode } from 'react';
import Logo from '@/public/illust/illust_Customer.svg';

interface MenuItemProps {
  menu: OwnerMenu;
  actionSlot?: ReactNode;
}

export default function MenuItem({ menu, actionSlot }: MenuItemProps) {
  return (
    <div className="flex flex-col w-full gap-6 py-4 border-b border-border-default">
      <div className="flex justify-between items-start w-full">
        <div className="flex flex-col w-[calc(100%-106px)] pr-4">
          <p className="text-label1 font-medium text-text-default">
            {menu.name}
          </p>
          <p className="text-body font-bold text-text-default">
            {(menu.basePrice || 0).toLocaleString()}원
          </p>
          <p className="text-label2 text-text-subtlest mt-1.5 line-clamp-2">
            {menu.description}
          </p>
        </div>

        <div className="w-22.5 h-22.5 bg-neutral-10 rounded-xl shrink-0 flex items-end justify-end p-1.5 relative overflow-hidden">
          {menu.imageUrl ? (
            <Image
              src={menu.imageUrl}
              alt={menu.name || '메뉴 이미지'}
              className="absolute inset-0 object-cover"
              fill
              sizes="(max-width: 768px) 90px, 90px"
            />
          ) : (
            <div className="absolute inset-0 bg-brand-background">
              <Logo />
            </div>
          )}

          {actionSlot && <div className="relative z-10">{actionSlot}</div>}
        </div>
      </div>
    </div>
  );
}
