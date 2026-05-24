'use client';

import { ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
}

export default function DefaultButton({
  onClick,
  children,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full h-12 rounded-xl flex justify-center items-center py-3 px-12 font-semibold transition-colors duration-200
        ${
          disabled
            ? 'bg-background-subtlest text-body text-text-subtlest cursor-not-allowed'
            : 'bg-brand-default text-text-inverse'
        }
      `}
    >
      {children}
    </button>
  );
}
