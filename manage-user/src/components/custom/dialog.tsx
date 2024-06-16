import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

type ButtonVariant =
  | "link"
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | null
  | undefined;

const DialogPage = (props: {
  buttonTitle: string;
  buttonVariant?: ButtonVariant;
  title: string;
  children: React.ReactNode;
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      {/* <DialogTrigger
        className={`${
          props.buttonVariant
            ? props.buttonVariant
            : "bg-black py-2 px-4 hover:bg-gray-800 text-white rounded-md"
        }`}
      >
        {props.buttonTitle}
      </DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          {props.children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPage;
