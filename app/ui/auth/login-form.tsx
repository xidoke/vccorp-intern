'use client';

import React from 'react';
import { CardWrapper } from '@/app/ui/auth/card-wrapper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LoginSchema } from '@/schemas';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
  useFormField,
} from '@/components/ui/form';
import { login } from "@/actions/login";

const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    login(values)
  }
  return (
    <CardWrapper
      headerLabel={'Sign in'}
      backButtonHref={'/auth/register'}
      showSocial
      backButtonLabel="don't have an account? Sign up"
      description={'to continue to VCCorp'}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
                  <FormMessage/>
                </FormItem>
              )}
            />

          </div>
            <Button type="submit" className="w-full" >Login</Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
