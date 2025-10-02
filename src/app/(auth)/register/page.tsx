"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AppButton from "@/components/AppButton/AppButton";
import { registerFormSchema } from "@/schemas/register.schema";
import { handRegisterUp } from "@/api/services/register.service";
import { useActionState, useEffect } from "react";
import { ApiError } from "@/components/shared/ApiError";
import { formState } from "@/types/form.type";

export default function RegisterPage() {
  const router = useRouter();
  const [registerFormAction, setRegisterFormAction] = useActionState(
    handRegisterUp,
    formState
  );
  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (registerFormAction) {
      if (!registerFormAction.success && registerFormAction.message) {
        toast.error(registerFormAction.message);
      }
      if (registerFormAction.success) {
        toast.success("Register Successfully");
        router.push("/login");
      }
    }
  }, [registerFormAction, router]);

  return (
    <section className="px-40 py-20 flex items-center justify-center ">
      <div className="container max-w-2xl mx-auto shadow-md p-9 shadow-gray-300 rounded">
        {!registerFormAction.success &&
          registerFormAction.message &&
          ApiError({
            title: "Failed to register",
            message: registerFormAction.message,
          })}
        <Form {...form}>
          <form
            // onSubmit={form.handleSubmit(handRegisterOnSubmit)}
            action={setRegisterFormAction}
            className="space-y-8"
          >
            <h1 className="text-3xl font-semibold">Register</h1>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="sayed ragab" {...field} />
                  </FormControl>
                  <FormMessage>
                    {registerFormAction.error?.name?.[0]}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Username@domain.com" {...field} />
                  </FormControl>
                  <FormMessage>
                    {registerFormAction.error?.email?.[0]}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="************"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage>
                    {registerFormAction.error?.password?.[0]}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="************"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage>
                    {registerFormAction.error?.rePassword?.[0]}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="************" {...field} type="tel" />
                  </FormControl>
                  <FormMessage>
                    {registerFormAction.error?.phone?.[0]}
                  </FormMessage>
                </FormItem>
              )}
            />
            <div className="flex items-center justify-center">
              <AppButton
                disabled={form.formState.isSubmitting}
                isLoading={form.formState.isSubmitting}
                type="submit"
              >
                Register
              </AppButton>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
