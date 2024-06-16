import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { UPDATE_ITEM_TYPE } from "@/services/graphql/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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

const ChangeCategoryForm = ({
  closeDialog,
  id,
  name
}: {
  closeDialog: () => void;
  id: number | undefined;
  name: string | undefined;
}) => {
  const { handleReload } = useContext(ReloadContext);
  const [changeCategory] = useMutation(UPDATE_ITEM_TYPE);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: name
    }
  });

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    if (formData.name === "") return;
    else if (!id) return;
    try {
      const { data } = await changeCategory({
        variables: {
          updateItemTypeId: id,
          bodyReq: {
            name: formData.name
          }
        },
        fetchPolicy: "network-only"
      });
      console.log("data sua: ", data);
      console.log("id sua: ", id);
      console.log("name sua: ", name);
      toast({
        title: "Sửa thành công:",
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
        title: "Sửa thất bại:",
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
        <Button type="submit">Sửa</Button>
      </form>
    </Form>
  );
};

export default ChangeCategoryForm;
