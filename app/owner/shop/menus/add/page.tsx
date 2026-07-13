'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import Link from 'next/link';

import ArrowLeftIcon from '@/public/icons/icon_arrow_left_padding.svg';
import { components } from '@/src/types/schema';
import MenuForm, { MenuFormData } from '../_components/MenuForm';

type OwnerMenuRequest = components['schemas']['OwnerMenuRequest'];
type ApiResponseOwnerMenuResponse =
  components['schemas']['ApiResponseOwnerMenuResponse'];

export default function AddMenuPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createMenuMutation = useMutation({
    mutationFn: async (formData: MenuFormData) => {
      const payload: OwnerMenuRequest = {
        name: formData.name,
        description: formData.description,
        basePrice: parseInt(formData.basePrice.replace(/[^0-9]/g, ''), 10) || 0,
        imageUrl: formData.imageUrl || undefined,
        optionGroups: formData.optionGroups.map((g) => ({
          name: g.name,
          isRequired: false,
          isMultiple: false,
          options: g.options.map((o) => ({
            name: o.name,
            additionalPrice:
              parseInt(o.additionalPrice.replace(/[^0-9]/g, ''), 10) || 0,
          })),
        })),
      };

      const res = await fetchClient<ApiResponseOwnerMenuResponse>(
        '/api/owner/store/menus',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      );

      if (!res.isSuccess) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ownerMenus'] });
      router.push('/owner/shop/menus');
    },
    onError: (error: Error) => {
      alert(`메뉴 등록에 실패했습니다: ${error.message}`);
    },
  });

  return (
    <section className="w-full min-h-screen flex flex-col items-start bg-background-default">
      <div className="w-full flex pt-16 flex-col justify-end items-center px-3">
        <div className="w-full flex h-11 items-center gap-2">
          <header className="flex items-center gap-0.5 flex-1">
            <Link href="/owner/shop/menus">
              <ArrowLeftIcon className="w-5 h-5" />
            </Link>
            <h1 className="text-text-default text-headline3 font-semibold">
              메뉴 추가
            </h1>
          </header>
        </div>
      </div>

      <MenuForm
        isPending={createMenuMutation.isPending}
        onSave={(data) => createMenuMutation.mutate(data)}
      />
    </section>
  );
}
