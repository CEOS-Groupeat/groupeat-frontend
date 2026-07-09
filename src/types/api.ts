import { components, paths } from './schema';

export type GetResponse<T extends keyof paths> = paths[T] extends {
  get: { responses: { 200: { content: { '*/*': infer R } } } };
}
  ? R
  : never;

export type PostResponse<T extends keyof paths> = paths[T] extends {
  post: { responses: { 200: { content: { '*/*': infer R } } } };
}
  ? R
  : never;

export type PatchResponse<T extends keyof paths> = paths[T] extends {
  patch: { responses: { 200: { content: { '*/*': infer R } } } };
}
  ? R
  : never;

export type DeleteResponse<T extends keyof paths> = paths[T] extends {
  delete: { responses: { 200: { content: { '*/*': infer R } } } };
}
  ? R
  : never;

export type PostRequest<T extends keyof paths> = paths[T] extends {
  post: { requestBody: { content: { 'application/json': infer R } } };
}
  ? R
  : never;

// -------------------------------------------------------------------------------------------------

// Cart APIs
// /api/carts에 get요청 -> isSuccess, code, message, data 도착
// data 내부에는 storeCarts라는 객체 존재
// storeCarts 내부에는 storeId, storeName, cartItems 배열이 존재
// cartItems 내부에는 cartItemId, menuSummary, ... 등이 존재
// 이 모든 흐름을 제어하기 위해 다음과 같은 타입을 정의하였음.
export type CartListResponse = GetResponse<'/api/carts'>;
export type CartData = NonNullable<CartListResponse['data']>;
export type StoreCart = NonNullable<CartData['storeCarts']>[number];
export type CartItem = NonNullable<StoreCart['cartItems']>[number];
export type AddCartItemPayload = PostRequest<'/api/carts/items'>;
export type CartCalculateResponse = PostResponse<'/api/carts/calculate'>;
export type CalculatedCartData = NonNullable<CartCalculateResponse['data']>;
export type CalculatedCartItem = NonNullable<
  CalculatedCartData['calculatedItems']
>[number];
export type CalculateCartRequest = PostRequest<'/api/carts/calculate'>;
export type DeleteCartItem = DeleteResponse<'/api/carts/items/{cartItemId}'>;
// 장바구니 전체 비우기
export type ClearCartResponse = DeleteResponse<'/api/carts'>;

// Menu APIs
export type MenuListApiResponse = GetResponse<'/api/stores/{storeId}/menus'>;
export type Menu = components['schemas']['MenuDetailDTO'];

// Order APIs (Customer-Order-Status)
export type CustomerOrderListResponse = GetResponse<'/api/orders'>;
export type CustomerOrderListData = NonNullable<
  CustomerOrderListResponse['data']
>;
export type CustomerOrder = NonNullable<
  CustomerOrderListData['orderList']
>[number];
