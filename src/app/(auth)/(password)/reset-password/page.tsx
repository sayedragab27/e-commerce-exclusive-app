"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import AppButton from "@/components/AppButton/AppButton";
import { useActionState, useEffect, useState } from "react";

import {
  resetPasswordFormState,
  resetPasswordFormStateType,
  resetPasswordFormValuesType,
} from "@/types/reset-password.type";
import {
  handleResetPassword,
  sendResetCode,
} from "@/api/services/reset-password.service";
import { toast } from "sonner";
import {
  resetPasswordFormSchema,
  resetPasswordFormSchemaType,
} from "@/schemas/reset-password.schema";

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [verifyCodeAction, setVerifyCodeAction, isPending] = useActionState(
    handleResetPassword,
    resetPasswordFormState
  );
  const form = useForm({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      email: "",
      newPassword: "",
      resetCode: "",
    },
  });
  const [codeStatus, setCodeStatus] = useState<resetPasswordFormStateType>({
    success: false,
    error: null,
    message: null,
  });
  const router = useRouter();

  useEffect(() => {
    if (verifyCodeAction?.success && verifyCodeAction?.message) {
      toast.success("Password Reset Successfully");
      router.push("/login");
    } else if (verifyCodeAction?.message) {
      toast.error(
        verifyCodeAction?.message ||
          "Something went wrong during reset password"
      );
    }
  }, [verifyCodeAction, router]);

  // type loginFormType = z.infer<typeof loginFormSchema>;
  return (
    <section className="px-10 py-10 lg:px-40 lg:py-20 flex items-center justify-center ">
      <div className="container max-w-2xl mx-auto shadow-md p-9 shadow-gray-300 rounded">
        <Form {...form}>
          <form action={setVerifyCodeAction} className="space-y-8">
            <h1 className="text-3xl font-semibold">Reset Password</h1>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username@domain.com" {...field} />
                  </FormControl>
                  <FormMessage>
                    {verifyCodeAction?.error?.email?.[0]}
                  </FormMessage>
                </FormItem>
              )}
            />

            <div className="flex  gap-4 justify-between items-end">
              <FormField
                control={form.control}
                name="resetCode"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Validation Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Reset Password Code" {...field} />
                    </FormControl>
                    <FormMessage>
                      {verifyCodeAction?.error?.resetCode?.[0]}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <Button
                type="button"
                className={`${
                  verifyCodeAction?.error?.resetCode?.[0]
                    ? "self-center"
                    : "self-end"
                }`}
                disabled={isLoading}
                variant="outline"
                onClick={async () => {
                  setIsLoading(true);
                  const email = form.getValues("email");

                  const res = await sendResetCode(email);
                  setCodeStatus(res);
                  setIsLoading(false);
                }}
              >
                Send Code
              </Button>
            </div>
            {codeStatus?.error?.email?.[0] && (
              <p className="text-red-500 text-sm mt-0">
                Please enter your email to receive a valid code
              </p>
            )}
            {codeStatus && (
              <p className="text-red-500 text-sm mt-0">{codeStatus?.message}</p>
            )}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="************"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage>
                    {verifyCodeAction?.error?.newPassword?.[0]}
                  </FormMessage>
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <AppButton
                type="submit"
                className="grow"
                disabled={isPending}
                isLoading={isPending}
              >
                Reset Password
              </AppButton>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
