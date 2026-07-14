'use client';

interface WithdrawLinkProps {
  onClick: () => void;
}

export default function WithdrawLink({ onClick }: WithdrawLinkProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-xs font-normal text-text-subtlest underline text-left leading-4 font-['Pretendard']"
    >
      회원탈퇴
    </button>
  );
}