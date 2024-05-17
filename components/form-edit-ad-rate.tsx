'use client';

import { Data, TypeIncludeHeaders } from '@/lib/definetions';

import { createFormSchema } from '@/schemas';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';

export function EditAdRateForm({
  data,
  type,
}: {
  data: Data;
  type: TypeIncludeHeaders;
}) {
  const formSchema = createFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      typeId: type.id,
      website: data.website.name,
      position: data.position.name,
      dimension: data.position.dimension,
      platform: data.position.platform,
      demoList: data.position.demoList,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'demoList',
  });

  function onSubmit() {
    console.log(form.getValues());
    const dialogCloseButton = document.querySelector(
      '.dialog-close-button',
    ) as HTMLButtonElement;
    if (dialogCloseButton) {
      dialogCloseButton.click();
    }
  }

  return (
    <>
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

          {type &&
            type.headers.map((header) => (
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
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
            <DialogClose asChild>
                <button type="button" className="dialog-close-button" hidden></button>
            </DialogClose>
        </form>

      </Form>
    </>
  );
}
