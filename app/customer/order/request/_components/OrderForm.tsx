'use client';

import InputField from '@/components/ui/InputField';
import { useState } from 'react';

export default function OrderForm() {
  const [formData, setFormData] = useState({
    ordererName: '',
    contact: '',
    eventName: '',
    requestStr: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 최신 표준 SubmitEvent 적용 완료
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('최종 주문 데이터:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full font-pretendard">
      <h2 className="mb-6 text-xl font-bold text-gray-900">추가 정보 입력</h2>

      <div className="flex flex-col gap-6">
        <InputField
          label="주문자명"
          name="ordererName"
          value={formData.ordererName}
          onChange={handleChange}
          required
          placeholder="이름 입력"
        />

        <InputField
          label="연락처"
          name="contact"
          type="tel"
          value={formData.contact}
          onChange={handleChange}
          required
          placeholder="010-0000-0000"
        />

        <InputField
          label="단체명 / 행사명"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          placeholder="단체명 / 행사명 입력"
        />

        <InputField
          label="요청사항"
          name="requestStr"
          value={formData.requestStr}
          onChange={handleChange}
          placeholder="요청사항 입력"
        />
      </div>
    </form>
  );
}
