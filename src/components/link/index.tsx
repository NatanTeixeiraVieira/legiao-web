import { cn } from '@/lib/utils';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode } from 'react';

type LinkProps = NextLinkProps & {
  children: ReactNode;
  className?: string;
};

export default function Link({ className, ...rest }: LinkProps) {
  return <NextLink className={cn('cursor-pointer', className)} {...rest} />;
}
