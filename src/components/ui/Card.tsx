import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({ children, className, padding = 'md' }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl shadow-lg',
        {
          'p-0': padding === 'none',
          'p-4': padding === 'sm',
          'p-8': padding === 'md',
          'p-12': padding === 'lg',
        },
        className
      )}
    >
      {children}
    </div>
  );
}
