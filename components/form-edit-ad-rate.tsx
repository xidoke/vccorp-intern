'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Type } from '@prisma/client';
import { useMemo, useState, useEffect } from 'react';
import { TypeIncludeHeaders } from '@/lib/definetions';
import { Textarea } from '@/components/ui/textarea';

function createFormSchema(selectedType: TypeIncludeHeaders | null) {
    let schema: any = z.object({
        website: z.string().min(1),
        position: z.string().min(1),
        dimension: z.string().min(1),
        platform: z.string(),
        demoList: z.array(
            z.object({
                id: z.string(),
                url: z.string(),
                display: z.string(),
            }),
        ),
    });

    if (selectedType) {
        let dynamicFields: any = {};
        selectedType.headers.forEach((header) => {
            switch (header.datatype) {
                case 'string':
                    dynamicFields[header.id] = z.string().min(1);
                    break;
                case 'number':
                    dynamicFields[header.id] = z.number().min(0);
                    break;
                case 'boolean':
                    dynamicFields[header.id] = z.boolean();
                    break;
                // Add more cases as needed
                default:
                    dynamicFields[header.id] = z.string().min(1);
            }
        });
        schema = schema.extend(dynamicFields);
    }

    return schema;
}

export function EditAdRateForm({
                                   types,
                                   initType,
                                   initData,
                               }: {
    types: TypeIncludeHeaders[];
    initType?: TypeIncludeHeaders;
    initData: any; // dữ liệu quảng cáo cần chỉnh sửa
}) {
    const [selectedType, setSelectedType] = useState<TypeIncludeHeaders | null>(
        initType ? initType : types[0],
    );

    const handleTypeChange = (selectedTypeId: string) => {
        const selectedType = types.find((type) => type.id === selectedTypeId);
        if (selectedType) {
            setSelectedType(selectedType);
        }
    };

    const formSchema = useMemo(
        () => createFormSchema(selectedType),
        [selectedType],
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initData, // Sử dụng dữ liệu ban đầu để điền vào form
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        // Gửi dữ liệu đã chỉnh sửa lên server
    }

    return (
        <>
            <Select onValueChange={handleTypeChange} defaultValue={selectedType?.id}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Type</SelectLabel>
                        {types.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                                {type.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                    <Input placeholder="website" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="position"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Position</FormLabel>
                                <FormControl>
                                    <Input placeholder="position" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dimension"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Dimension</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="dimension" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="platform"
                        defaultValue={'PC'}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Platform</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={'PC'}>
                                    <FormControl>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select platform" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Platform</SelectLabel>
                                            <SelectItem value="PC">PC</SelectItem>
                                            <SelectItem value="Mobile">Mobile</SelectItem>
                                            <SelectItem value="PC_MB">PC_MB</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {selectedType &&
                        selectedType.headers.map((header) => (
                            <FormField
                                key={header.id}
                                control={form.control}
                                name={header.id}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{header.display}</FormLabel>
                                        <FormControl>
                                            {header.datatype === 'number' ? (
                                                <Input
                                                    placeholder={header.display}
                                                    {...field}
                                                    type="number"
                                                />
                                            ) : (
                                                header.datatype === 'string' && (
                                                    <Textarea placeholder={header.display} {...field} />
                                                )
                                            )}
                                        </FormControl>
                                        <FormDescription>
                                            datatype of {header.display} is {header.datatype}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </>
    );
}
