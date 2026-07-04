'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import MenuItem from '@/components/ui/MenuItem';
import { OwnerMenu, ApiResponseOwnerMenuList } from '@/types/menu';
import Link from 'next/link';
import PencilIcon from '@/public/icons/icon_pencil.svg';

export default function MenuSection() {
  const {
    data: menuData,
    isLoading,
    isError,
  } = useQuery<OwnerMenu[]>({
    queryKey: ['ownerMenus'],
    queryFn: async () => {
      const response = await fetchClient<ApiResponseOwnerMenuList>(
        `/api/owner/store/menus`
      );

      if (!response.isSuccess) {
        throw new Error(response.message || '메뉴를 불러오는데 실패했습니다.');
      }

      return response.data?.menus || [];
    },
  });

  if (isLoading) {
    return (
      <div className="w-full py-8 text-center text-label1 text-text-subtlest">
        메뉴를 불러오는 중입니다...
      </div>
    );
  }

  if (isError || !menuData || menuData.length === 0) {
    return (
      <div className="w-full py-8 text-center text-label1 text-text-subtlest">
        등록된 메뉴가 없습니다.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col px-4">
      {menuData.map((menu) => (
        <MenuItem
          key={menu.menuId}
          menu={menu}
          actionSlot={
            <Link
              href={`/owner/shop/menus/${menu.menuId}/edit`}
              className="w-6.5 h-6.5 p-1.5 bg-white rounded-full flex items-center justify-center shadow-sm"
            >
              <PencilIcon className="w-4 h-4 text-icon-default" />
            </Link>
          }
        />
      ))}
    </div>
  );
}
