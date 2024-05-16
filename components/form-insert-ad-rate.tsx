'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { useMemo, useState } from 'react';
import { TypeIncludeHeaders } from '@/lib/definetions';
import { Textarea } from '@/components/ui/textarea';
import { createAdRate } from '@/actions/ad-rate';
import SubmitButton from '@/components/submit-button';
import { useToast } from '@/components/ui/use-toast';
import {revalidatePath} from "next/cache";

function createFormSchema(selectedType: TypeIncludeHeaders | null) {
  let schema: any = z.object({
    website: z.string().min(1, 'Website is required'),
    position: z.string().min(1, 'Position is required'),
    dimension: z.string().min(1, 'Dimension is required'),
    platform: z.string().default('PC'),
    demoList: z
      .array(
        z.object({
          url: z.string().url('Invalid URL format'),
          display: z.string().min(1, 'Display text is required'),
        }),
      )
      .optional(),
    typeId: z.string().min(1, 'Type ID is required'), // Ensure typeId is included and required
  });

  if (selectedType) {
    let dynamicFields: any = {};
    selectedType.headers.forEach((header) => {
      switch (header.datatype) {
        case 'string':
          dynamicFields[header.id] = z
            .string()
            .min(1, `${header.display} is required`);
          break;
        case 'number':
          dynamicFields[header.id] = z.coerce
            .number()
            .min(0, `${header.display} must be a positive number`);
          break;
        case 'boolean':
          dynamicFields[header.id] = z.coerce.boolean();
          break;
        default:
          dynamicFields[header.id] = z
            .string()
            .min(1, `${header.display} is required`);
      }
    });
    schema = schema.extend(dynamicFields);
  }

  return schema;
}

export function AddAdRateForm({
  types,
  initType,
}: {
  types: TypeIncludeHeaders[];
  initType?: TypeIncludeHeaders;
}) {
  const [selectedType, setSelectedType] = useState<TypeIncludeHeaders | null>(
    initType ? initType : types[0],
  );
  const { toast } = useToast();
  const handleTypeChange = (selectedTypeId: string) => {
    const selectedType = types.find((type) => type.id === selectedTypeId);
    if (selectedType) {
      setSelectedType(selectedType);
      form.setValue('typeId', selectedTypeId);
      window.history.pushState(null, '', `/form/type/${selectedTypeId}`);
    }
  };

  const formSchema = useMemo(
    () => createFormSchema(selectedType),
    [selectedType],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      typeId: selectedType?.id,
      website: '',
      position: '',
      dimension: '',
      platform: 'PC',
      demoList: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'demoList',
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createAdRate(values);
      toast({
        title: 'Success',
        description: 'Data added successfully',
      });
    } catch (error) {
      console.error('Failed to add data:', error);
      toast({
        title: 'Error',
        description: 'Failed to add data',
        variant: 'destructive',
      });
    } finally {

    }
  };

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
            name="typeId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Platform</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                      <SelectItem value="PC_MB">PC & Mobile</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {fields.map((item, index) => (
            <div key={item.id} className="flex space-x-4">
              <FormField
                control={form.control}
                name={`demoList.${index}.display`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Demo Display</FormLabel>
                    <FormControl>
                      <Input placeholder="Demo Display" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`demoList.${index}.url`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button" onClick={() => remove(index)}>
                Remove
              </Button>
            </div>
          ))}

          <Button
            type="button"
            onClick={() => append({ display: '', url: '' })}
          >
            Add Demo
          </Button>

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
          {form.formState.isSubmitting ? (
            <Button type="submit" disabled>
              submitting
            </Button>
          ) : (
            <Button type="submit">submit</Button>
          )}
        </form>
      </Form>
    </>
  );
}
