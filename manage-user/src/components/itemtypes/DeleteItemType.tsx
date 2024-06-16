import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { DELETE_ITEM_TYPE } from "@/services/graphql/mutations";
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

const DeleteCategoryForm = ({
  closeDialog,
  id,
  name
}: {
  closeDialog: () => void;
  id: number | undefined;
  name: string | undefined;
}) => {
  const { handleReload } = useContext(ReloadContext);
  const [deleteCategory] = useMutation(DELETE_ITEM_TYPE);

  async function onSubmit() {
    if (!id) return;
    try {
      const { data } = await deleteCategory({
        variables: {
          deleteItemTypeId: id
        }
      });
      console.log(data);
      toast({
        title: "Xoá thành công:",
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
        title: "Xoá thất bại:",
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
    <form className="flex flex-col space-y-6 p-2 w-full">
      <p>
        Bạn có chắc chắn muốn xoá danh mục{" "}
        <span className="font-bold">{name}</span> không?
      </p>
      <Button onClick={onSubmit} type="submit">
        Xác nhận xoá
      </Button>
    </form>
  );
};

export default DeleteCategoryForm;
