'use client';

import {useRouter} from "next/navigation";

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: 'modal' | 'redirect';
    asChild?: boolean;
}

export const SignUpButton = ({
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
        console.log('clicked the sign up button')
    }
    return (
        <span onClick={onClick}> {children} </span>
    );
};
