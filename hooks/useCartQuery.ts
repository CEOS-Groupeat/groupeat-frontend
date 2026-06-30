// Tanstack Query로 받아온 Cart API를 Zustand로 전역상태관리
import { fetchClient } from "@/lib/fetchClient";
import { CartListResponse, StoreCart } from "@/src/types/api";
import { useCartStore } from "@/store/useCartStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function useCartQuery(){
    const setStoreCarts = useCartStore((state) => state.setStoreCarts);

    const query = useQuery<StoreCart[]>({
        queryKey: ['cart'],
        queryFn: async() => {
            const res = await fetchClient<CartListResponse>('/api/carts');
            if(!res.isSuccess) {
                throw new Error(res.message || '장바구니를 불러오지 못했습니다.');
            }
            return res.data?.storeCarts || [];
        },
    });

    useEffect(() => {
        if(query.data) {
            setStoreCarts(query.data);
        }
    }, [query.data]);

    return query;
}