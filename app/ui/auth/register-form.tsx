'use client';

import React, {useState, useTransition} from 'react';
import { CardWrapper } from '@/app/ui/auth/card-wrapper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RegisterSchema } from '@/schemas';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {login, register} from '@/actions/login';
import { LoaderCircle } from 'lucide-react';
import {useToast} from "@/components/ui/use-toast";
import FormError from "@/app/ui/auth/form-error";
import FormSuccess from "@/app/ui/auth/form-success";
import {redirect, useRouter} from "next/navigation";

const RegisterForm = () => {
    const router = useRouter();
    const [ isPending, startTransition ] = useTransition();
    const [ error, setError ] = useState<string | undefined>('');
    const [ success, setSuccess ] = useState<string | undefined>('');
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            username: '',
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        setError('');
        setSuccess('');
        startTransition( ()=> {
            register(values).then((data ) => {
                setError(data.error)
                setSuccess(data.success)
                if (data.success) {
                    router.push('/login')
                }
            })
        })

    };

    return (
        <CardWrapper
            headerLabel={'Sign up'}
            backButtonHref={'/login'}
            showSocial={false}
            backButtonLabel="already have an account? Sign in"
            description={'create an account'}

        >
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4 md:min-w-[400px]" >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} id="email" placeholder="Email" type={"email"} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="username">Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} id="username" placeholder="Username" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id="password"
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />

                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting && <LoaderCircle className="animate-spin"/>}
                            Register
                        </Button>

                </form>
            </Form>
        </CardWrapper>
    );
};

export default RegisterForm;
