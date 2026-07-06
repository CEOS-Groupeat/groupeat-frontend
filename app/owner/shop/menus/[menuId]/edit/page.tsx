'use client';

import { useRouter, useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import Link from 'next/link';

import ArrowLeftIcon from '@/public/icons/icon_arrow_left_padding.svg';
import { components } from '@/src/types/schema';
import MenuForm, {
  MenuFormData,
} from '@/app/owner/shop/menus/_components/MenuForm';

type OwnerMenuRequest = components['schemas']['OwnerMenuRequest'];
type ApiResponseOwnerMenuResponse =
  components['schemas']['ApiResponseOwnerMenuResponse'];
type ApiResponseString = components['schemas']['ApiResponseString'];

export default function MenuEditPage() {
  const router = useRouter();
  const params = useParams();
  const menuId = params.menuId as string;
  const queryClient = useQueryClient();

  const { data: menuData, isLoading } = useQuery({
    queryKey: ['ownerMenu', menuId],
    queryFn: async () => {
      const res = await fetchClient<ApiResponseOwnerMenuResponse>(
        `/api/owner/store/menus/${menuId}`
      );
      if (!res.isSuccess) throw new Error(res.message);
      return res.data;
    },
    enabled: !!menuId,
  });

  const updateMenuMutation = useMutation({
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
        `/api/owner/store/menus/${menuId}`,
        {
          method: 'PUT',
          body: JSON.stringify(payload),
        }
      );
      if (!res.isSuccess) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ownerMenus'] });
      queryClient.invalidateQueries({ queryKey: ['ownerMenu', menuId] });
      router.push('/owner/shop/menus');
    },
    onError: (error: Error) => {
      alert(`메뉴 수정에 실패했습니다: ${error.message}`);
    },
  });

  const deleteMenuMutation = useMutation({
    mutationFn: async () => {
      const res = await fetchClient<ApiResponseString>(
        `/api/owner/store/menus/${menuId}`,
        {
          method: 'DELETE',
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
      alert(`메뉴 삭제에 실패했습니다: ${error.message}`);
    },
  });

  if (isLoading && !menuData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-background-default">
        로딩 중...
      </div>
    );
  }

  const initialData: MenuFormData | undefined = menuData
    ? {
        name: menuData.name || '',
        description: menuData.description || '',
        basePrice: menuData.basePrice?.toString() || '',
        imageUrl: menuData.imageUrl || null,
        optionGroups: menuData.optionGroups
          ? menuData.optionGroups.map((g) => ({
              id: crypto.randomUUID(),
              name: g.name || '',
              options: (g.options || []).map((o) => ({
                id: crypto.randomUUID(),
                name: o.name || '',
                additionalPrice: o.additionalPrice?.toString() || '0',
              })),
            }))
          : [],
      }
    : undefined;

  return (
    <section className="w-full min-h-screen flex flex-col items-start bg-background-default">
      <div className="w-full flex pt-16 flex-col justify-end items-center px-3">
        <div className="w-full flex h-11 items-center gap-2">
          <header className="flex items-center gap-0.5 flex-1">
            <Link href="/owner/shop/menus">
              <ArrowLeftIcon className="w-5 h-5" />
            </Link>
            <h1 className="text-text-default text-headline3 font-semibold">
              메뉴 수정
            </h1>
          </header>
        </div>
      </div>

      {initialData && (
        <MenuForm
          initialData={initialData}
          isEditMode={true}
          isPending={updateMenuMutation.isPending}
          isDeleting={deleteMenuMutation.isPending}
          onSave={(data) => updateMenuMutation.mutate(data)}
          onDelete={() => deleteMenuMutation.mutate()}
        />
      )}
    </section>
  );
}
