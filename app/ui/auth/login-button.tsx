'use client';

import {useRouter} from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = 'redirect',
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    if (mode === 'redirect') {
      router.push('/auth/login')
    } else {
      console.log('open modal');
    }
    console.log('clicked the login button')
  }
  return (
      <span onClick={onClick}> {children} </span>
  );
};