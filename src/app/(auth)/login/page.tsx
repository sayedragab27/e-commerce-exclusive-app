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
import { loginFormSchema, loginFormType } from "@/schemas/login.schema";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AppButton from "@/components/AppButton/AppButton";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  async function handleLoginOnSubmit(loginData: loginFormType) {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: loginData.email,
        password: loginData.password,
        redirect: false,
        callbackUrl: "/",
      });
      if (res?.ok) {
        router.push("/");
        toast.success("Login Successfully");
        setIsLoading(false);
      } else {
        toast.error(res?.error || "Login Failed");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // type loginFormType = z.infer<typeof loginFormSchema>;
  return (
    <section className="px-10 py-10 lg:px-40 lg:py-20 flex items-center justify-center ">
      <div className="container max-w-2xl mx-auto shadow-md p-9 shadow-gray-300 rounded">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLoginOnSubmit)}
            className="space-y-8"
          >
            <h1 className="text-3xl font-semibold">Login</h1>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Username@domain.com" {...field} />
                  </FormControl>
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <AppButton
                disabled={isLoading}
                isLoading={isLoading}
                type="submit"
                className="grow"
              >
                Login
              </AppButton>
              <Button asChild variant="link" className="underline py-0.5">
                <Link href="/reset-password">Forgot Password</Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
