'use client';

import { Data, TypeIncludeHeaders } from '@/lib/definetions';
import { createEditFormSchema } from '@/schemas';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ObjectId } from 'bson';
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
import { updateAdRate } from '@/actions/ad-rate';
import { useToast } from '@/components/ui/use-toast';

export function EditAdRateForm({
  data,
  type,
}: {
  data: Data;
  type: TypeIncludeHeaders;
}) {
  const formSchema = createEditFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: data.id,
      typeId: type.id,
      websiteId: data.website.id,
      website: data.website.name,
      positionId: data.position.id,
      position: data.position.name,
      dimension: data.position.dimension,
      platform: data.position.platform,
      demoList: data.position.demoList.map((demo) => ({
        id: demo.id,
        display: demo.display,
        url: demo.url,
      })),
    },
  });
  const { toast } = useToast();

  type.headers.forEach((header) => {
    if (!form.getValues()[header.id]) {
      form.setValue(
        header.id,
        data.cells.find((cell) => cell.headerId === header.id)?.value,
      );
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'demoList',
  });

  const generateTemporaryId = () => {
    return new ObjectId().toString();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateAdRate(values);
      const dialogCloseButton = document.querySelector(
        '.dialog-close-button',
      ) as HTMLButtonElement;
      if (dialogCloseButton) {
        dialogCloseButton.click();
      }
      toast({
        title: 'Success',
        description: 'Data updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update data',
        variant: 'destructive',
      });
    }
  };

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
            name="websiteId"
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
            name="positionId"
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
              {item.id && (
                <FormField
                  control={form.control}
                  name={`demoList.${index}.id`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="hidden" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
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
                    <FormLabel>Demo URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Demo URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                onClick={() => remove(index)}
                className="self-end"
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() =>
              append({ id: generateTemporaryId(), display: '', url: '' })
            } // Generate temporary id for new demo
          >
            Add Demo
          </Button>
          {type.headers.map((header) => (
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
            <button
              type="button"
              className="dialog-close-button"
              hidden
            ></button>
          </DialogClose>
        </form>
      </Form>
    </>
  );
}
