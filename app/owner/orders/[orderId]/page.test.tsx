import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';

import { renderWithQueryClient } from '@/test/utils';
import OwnerOrderDetail from '@/app/owner/orders/[orderId]/page';

const { mockUseParams, mockFetchClient } = vi.hoisted(() => ({
  mockUseParams: vi.fn(),
  mockFetchClient: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useParams: mockUseParams,
}));

vi.mock('@/lib/fetchClient', () => ({
  fetchClient: mockFetchClient,
}));

vi.mock('@/components/ui/BackButton', () => ({
  default: () => <button data-testid="back-button">back</button>,
}));

vi.mock('@/public/icons/icon_ellipse.svg', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => <svg data-testid="icon-ellipse" {...props} />,
}));

vi.mock('@/app/customer/order/request/_components/OrderCard', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => (
    <div data-testid="order-card">{JSON.stringify(props)}</div>
  ),
}));

vi.mock('@/app/customer/order/request/_components/OrderPrice', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => (
    <div data-testid="order-price">{JSON.stringify(props)}</div>
  ),
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const buildOrderDetail = (overrides: Record<string, any> = {}) => ({
  ordererInfo: {
    customerName: '안세빈',
    phoneNumber: '010-2653-7513',
    orderDate: '2026-07-02',
    groupName: 'CEOS 하프톤',
    requests: '빨리 준비해주세요',
  },
  orderMenus: [
    {
      menuName: '반반 세트',
      menuImageUrl: 'https://image.url/menu.png',
      quantity: 2,
      options: [{ optionName: '햄치즈 샌드위치' }, { optionName: undefined }],
      discountRate: 10,
      totalAmount: 30000,
    },
  ],
  paymentInfo: {
    paymentMethod: 'PREPAID',
    paymentMeans: 'TOSS',
    discountRate: 10,
    totalDiscountAmount: 5000,
    originalTotalAmount: 35000,
    finalPaymentAmount: 30000,
  },
  ...overrides,
});

const resolveOrder = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>,
  isSuccess = true,
  message = 'error'
) => {
  mockFetchClient.mockResolvedValue({ isSuccess, data, message });
};

const getOrderCardProps = async () => {
  const el = await screen.findByTestId('order-card');
  return JSON.parse(el.textContent || '{}');
};

const getOrderPriceProps = async () => {
  const el = await screen.findByTestId('order-price');
  return JSON.parse(el.textContent || '{}');
};

beforeEach(() => {
  vi.clearAllMocks();
  mockUseParams.mockReturnValue({ orderId: '456' });
});

describe('OwnerOrderDetail', () => {
  it('shows the loading state while the query is pending', () => {
    mockFetchClient.mockReturnValue(new Promise(() => {}));

    renderWithQueryClient(<OwnerOrderDetail />);

    expect(screen.getByText('로딩 중...')).toBeInTheDocument();
  });

  it('calls fetchClient with the owner-specific endpoint built from the route orderId', async () => {
    resolveOrder(buildOrderDetail());

    renderWithQueryClient(<OwnerOrderDetail />);

    await waitFor(() =>
      expect(mockFetchClient).toHaveBeenCalledWith('/api/owner/orders/456')
    );
  });

  it('does not call fetchClient and stays in loading state when orderId is empty', () => {
    mockUseParams.mockReturnValue({ orderId: '' });

    renderWithQueryClient(<OwnerOrderDetail />);

    expect(mockFetchClient).not.toHaveBeenCalled();
    expect(screen.getByText('로딩 중...')).toBeInTheDocument();
  });

  it('stays in the loading state if the API responds with isSuccess: false', async () => {
    resolveOrder(buildOrderDetail(), false, '주문을 찾을 수 없습니다');

    renderWithQueryClient(<OwnerOrderDetail />);

    await waitFor(() => expect(mockFetchClient).toHaveBeenCalled());
    expect(screen.getByText('로딩 중...')).toBeInTheDocument();
  });

  it('renders orderer information once the data has loaded', async () => {
    resolveOrder(buildOrderDetail());

    renderWithQueryClient(<OwnerOrderDetail />);

    expect(await screen.findByText('안세빈')).toBeInTheDocument();
    expect(screen.getByText('010-2653-7513')).toBeInTheDocument();
    expect(screen.getByText('CEOS 하프톤')).toBeInTheDocument();
    expect(screen.getByText('빨리 준비해주세요')).toBeInTheDocument();

    const dateContainer = screen.getByText('시간 확인 불가')
      .parentElement as HTMLElement;
    expect(dateContainer.textContent).toBe('7월 2일시간 확인 불가');
  });

  it('formats a malformed order date by returning the raw string', async () => {
    resolveOrder(
      buildOrderDetail({
        ordererInfo: {
          customerName: '안세빈',
          phoneNumber: '010-2653-7513',
          orderDate: '2026-07',
          groupName: '',
          requests: '',
        },
      })
    );

    renderWithQueryClient(<OwnerOrderDetail />);

    await screen.findByText('안세빈');
    const dateContainer = screen.getByText('시간 확인 불가')
      .parentElement as HTMLElement;
    expect(dateContainer.textContent).toBe('2026-07시간 확인 불가');
  });

  it('renders an empty date when orderDate is missing', async () => {
    resolveOrder(
      buildOrderDetail({
        ordererInfo: {
          customerName: '안세빈',
          phoneNumber: '010-2653-7513',
          orderDate: undefined,
          groupName: '',
          requests: '',
        },
      })
    );

    renderWithQueryClient(<OwnerOrderDetail />);

    await screen.findByText('안세빈');
    const dateContainer = screen.getByText('시간 확인 불가')
      .parentElement as HTMLElement;
    expect(dateContainer.textContent).toBe('시간 확인 불가');
  });

  it('falls back to "없음" for group name and requests when they are empty', async () => {
    resolveOrder(
      buildOrderDetail({
        ordererInfo: {
          customerName: '안세빈',
          phoneNumber: '010-2653-7513',
          orderDate: '2026-07-02',
          groupName: '',
          requests: '',
        },
      })
    );

    renderWithQueryClient(<OwnerOrderDetail />);

    await screen.findByText('안세빈');
    expect(screen.getAllByText('없음')).toHaveLength(2);
  });

  it('renders 선결제/현장결제 and 토스페이/카카오페이 labels in the payment section', async () => {
    resolveOrder(
      buildOrderDetail({
        paymentInfo: { paymentMethod: 'PREPAID', paymentMeans: 'TOSS' },
      })
    );

    renderWithQueryClient(<OwnerOrderDetail />);

    await screen.findByText('선결제');
    expect(screen.getByText('토스페이')).toBeInTheDocument();
  });

  it('falls back to 현장결제/카카오페이 when paymentInfo fields are missing', async () => {
    resolveOrder(buildOrderDetail({ paymentInfo: {} }));

    renderWithQueryClient(<OwnerOrderDetail />);

    await screen.findByText('현장결제');
    expect(screen.getByText('카카오페이')).toBeInTheDocument();
  });

  it('formats the total amount with toLocaleString and defaults to 0원', async () => {
    resolveOrder(
      buildOrderDetail({ paymentInfo: { finalPaymentAmount: 30000 } })
    );
    renderWithQueryClient(<OwnerOrderDetail />);
    expect(await screen.findByText('30,000원')).toBeInTheDocument();
  });

  it('shows 0원 when finalPaymentAmount is missing', async () => {
    resolveOrder(buildOrderDetail({ paymentInfo: {} }));
    renderWithQueryClient(<OwnerOrderDetail />);
    expect(await screen.findByText('0원')).toBeInTheDocument();
  });

  it('passes correctly computed payment values to OrderPrice', async () => {
    resolveOrder(
      buildOrderDetail({
        paymentInfo: {
          originalTotalAmount: 35000,
          totalDiscountAmount: 5000,
          finalPaymentAmount: 30000,
          discountRate: 10,
        },
      })
    );

    renderWithQueryClient(<OwnerOrderDetail />);

    const props = await getOrderPriceProps();
    expect(props).toEqual({
      originalPrice: 35000,
      discountAmount: 5000,
      finalPrice: 30000,
      discountRate: 10,
    });
  });

  it('defaults OrderPrice values to 0 when paymentInfo is missing', async () => {
    resolveOrder(buildOrderDetail({ paymentInfo: undefined }));

    renderWithQueryClient(<OwnerOrderDetail />);

    const props = await getOrderPriceProps();
    expect(props).toEqual({
      originalPrice: 0,
      discountAmount: 0,
      finalPrice: 0,
      discountRate: 0,
    });
  });

  it('maps order menus into the OrderCard storeCart shape, computing unit price from totalAmount/quantity', async () => {
    resolveOrder(
      buildOrderDetail({
        paymentInfo: { originalTotalAmount: 35000 },
        orderMenus: [
          {
            menuName: '반반 세트',
            menuImageUrl: 'https://image.url/menu.png',
            quantity: 2,
            options: [{ optionName: '햄치즈 샌드위치' }, { optionName: undefined }],
            discountRate: 10,
            totalAmount: 30000,
          },
        ],
      })
    );

    renderWithQueryClient(<OwnerOrderDetail />);

    const props = await getOrderCardProps();
    expect(props.storeCart.storeTotalPrice).toBe(35000);
    expect(props.storeCart.cartItems).toEqual([
      {
        cartItemId: 0,
        menuName: '반반 세트',
        imageUrl: 'https://image.url/menu.png',
        quantity: 2,
        optionNames: ['햄치즈 샌드위치', ''],
        unitPrice: 15000,
        discountRate: 10,
        finalPrice: 30000,
      },
    ]);
  });

  it('defaults unit price divisor to 1 when quantity is missing', async () => {
    resolveOrder(
      buildOrderDetail({
        orderMenus: [
          {
            menuName: '단일 메뉴',
            totalAmount: 5000,
          },
        ],
      })
    );

    renderWithQueryClient(<OwnerOrderDetail />);

    const props = await getOrderCardProps();
    expect(props.storeCart.cartItems[0].unitPrice).toBe(5000);
    expect(props.storeCart.cartItems[0].optionNames).toEqual([]);
  });

  it('leaves cartItems undefined when orderMenus is undefined', async () => {
    resolveOrder(buildOrderDetail({ orderMenus: undefined }));

    renderWithQueryClient(<OwnerOrderDetail />);

    const props = await getOrderCardProps();
    expect(props.storeCart.cartItems).toBeUndefined();
  });

  it('does not render an OrderStatusBar or cancel button (owner page has no status/cancel UI)', async () => {
    resolveOrder(buildOrderDetail());

    renderWithQueryClient(<OwnerOrderDetail />);

    await screen.findByText('안세빈');
    expect(screen.queryByTestId('order-status-bar')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: '주문 취소하기' })
    ).not.toBeInTheDocument();
  });
});