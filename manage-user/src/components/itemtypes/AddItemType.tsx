import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { CREATE_ITEM_TYPE } from "@/services/graphql/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { ReloadContext } from "@/contexts/reloadContext";

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Tên danh mục không được để trống"
  })
});

const AddCategoryForm = ({ closeDialog }: { closeDialog: () => void }) => {
  const { handleReload } = useContext(ReloadContext);
  const [addCategory] = useMutation(CREATE_ITEM_TYPE);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: ""
    }
  });

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    if (formData.name === "") return;
    try {
      const { data } = await addCategory({
        variables: {
          bodyReq: {
            name: formData.name
          }
        }
      });
      console.log(data);
      toast({
        title: "Thêm thành công:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        )
      });
      // handle success (e.g. clear the form, show a success message, etc.)
    } catch (error) {
      handleReload();
      toast({
        title: "Thêm thất bại:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">Có lỗi xảy ra.</code>
          </pre>
        )
      });
    } finally {
      handleReload();
      closeDialog();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-2 w-full"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên danh mục</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên danh mục" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Thêm</Button>
      </form>
    </Form>
  );
};

export default AddCategoryForm;
