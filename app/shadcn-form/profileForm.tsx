"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    // id: z.string(),
    stt: z.number(),
    website: z.string(),
    platform: z.string().optional(),
    position: z.string().optional(),
    demo: z.string().optional(),
    url: z.string().optional(),
    buying_method: z.string().optional(),
    csr: z.number().optional(),
    ctr: z.string().optional(),
    detailed_csr: z.number().optional(),
    dimensions: z.string().optional(),
    est: z.string().optional(),
    homepage: z.number().optional(),
    week: z.string().optional(),
    month: z.string().optional(),
    quarter_year: z.string().optional(),
    note: z.string().optional(),
    price: z.number().optional(),
    type: z.number(),
})

export function ProfileForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
})

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}