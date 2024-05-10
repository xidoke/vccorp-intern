import React from 'react';
import { CardWrapper } from '@/app/ui/auth/card-wrapper';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { LoginButton } from '@/app/ui/auth/login-button';
import { Button } from '@/components/ui/button';
import {redirect} from "next/navigation";
import {SignUpButton} from "@/app/ui/auth/sign-up-button";

const SignUpForm = () => {
    return (
        <CardWrapper
            headerLabel={'Sign up'}
            backButtonHref={'/auth/login'}
            backButtonLabel="already have an account? Sign in"
            description={'create an account to continue to VCCorp'}
        >
            <form
                action={async () => {
                    'use server';
                    console.log('submit');
                }}
                className="grid gap-4"
            >
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder=""/>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" type="text" placeholder=""/>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password"/>
                </div>
                <SignUpButton>
                    <Button className="w-full">Sign up</Button>
                </SignUpButton>
            </form>
        </CardWrapper>
    );
};

export default SignUpForm;
