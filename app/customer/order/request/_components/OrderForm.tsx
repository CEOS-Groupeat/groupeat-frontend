'use client';

import InputField from '@/components/ui/InputField';

interface OrderFormProps {
  customerName: string;
  setCustomerName: (val: string) => void;
  customerPhone: string;
  setCustomerPhone: (val: string) => void;
  groupName: string;
  setGroupName: (val: string) => void;
  requests: string;
  setRequests: (val: string) => void;
}

export default function OrderForm({
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  groupName,
  setGroupName,
  requests,
  setRequests,
}: OrderFormProps) {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full font-pretendard">
      <h2 className="mb-6 text-xl font-bold text-gray-900">추가 정보 입력</h2>

      <div className="flex flex-col gap-6">
        <InputField
          label="주문자명"
          name="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          placeholder="이름 입력"
        />

        <InputField
          label="연락처"
          name="customerPhone"
          type="tel"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          required
          placeholder="010-0000-0000"
        />

        <InputField
          label="단체명 / 행사명"
          name="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="단체명 / 행사명 입력"
        />

        <InputField
          label="요청사항"
          name="requests"
          value={requests}
          onChange={(e) => setRequests(e.target.value)}
          placeholder="요청사항 입력"
        />
      </div>
    </form>
  );
}
