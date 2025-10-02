"use client";
import { Button } from "../ui/button";

import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { ButtonHTMLAttributes, ClassAttributes } from "react";

type AppButtonProps = {
  children: React.ReactNode;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
} & ClassAttributes<HTMLButtonElement> &
  ButtonHTMLAttributes<HTMLButtonElement>;
export default function AppButton({
  children,
  isLoading,
  ...props
}: AppButtonProps) {
  return (
    <Button {...props}>
      <div className="flex items-center justify-center gap-2 w-full">
        {isLoading && <Spinner size="w-4 h-4" variant="circle-filled" />}
        <span className="block">{children}</span>
      </div>
    </Button>
  );
}
