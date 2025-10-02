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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AppButton from "@/components/AppButton/AppButton";
import { useActionState, useEffect } from "react";
import { checkoutFormSchema, checkoutFormType } from "@/schemas/order.schema";
import { handlePayment } from "@/api/services/orders.service";
import { useCart } from "@/context/CartContext";
import { checkoutFormState } from "@/types/orderForm.type";

export default function CheckoutPage() {
  const router = useRouter();
  const [checkoutFormAction, setCheckoutFormAction] = useActionState(
    handlePayment,
    checkoutFormState
  );
  const form = useForm<checkoutFormType>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      cartId: "",
      details: "",
      phone: "",
      city: "",
      payementMethod: "cash",
    },
  });
  const { cartDetails, setCartDetails } = useCart();

  useEffect(() => {
    if (cartDetails) {
      form.setValue("cartId", cartDetails.cartId);
    }
  }, [cartDetails]);

  useEffect(() => {
    if (checkoutFormAction.success && checkoutFormAction.message) {
      toast.success(
        checkoutFormAction.message instanceof Error
          ? checkoutFormAction.message.message
          : checkoutFormAction.message || "Operation successful"
      );
      router.push(checkoutFormAction.callBackUrl);
      setCartDetails(null);
    } else if (checkoutFormAction.success && checkoutFormAction.message) {
      toast.error(
        checkoutFormAction.message instanceof Error
          ? checkoutFormAction.message.message
          : checkoutFormAction.message || "Something went wrong during checkout"
      );
    }
  }, [checkoutFormAction, router, setCartDetails]);

  return (
    <section className="px-10 py-10 lg:px-40 lg:pb-20 flex items-center justify-center ">
      <div className="container max-w-2xl mx-auto shadow-md p-9 shadow-gray-300 rounded">
        <Form {...form}>
          <form action={setCheckoutFormAction} className="space-y-8">
            <h1 className="text-3xl font-semibold">Checkout</h1>
            <FormField
              control={form.control}
              name="cartId"
              render={({ field }) => (
                <FormItem hidden>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage>
                    {checkoutFormAction.error?.details?.[0]}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="************" {...field} />
                  </FormControl>
                  <FormMessage>
                    {checkoutFormAction.error?.city?.[0]}
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
                    {checkoutFormAction.error?.phone?.[0]}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payementMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Payement Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      name={field.name}
                      className="flex flex-col"
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="cash" />
                        </FormControl>
                        <FormLabel className="font-normal">Cash</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="card" />
                        </FormControl>
                        <FormLabel className="font-normal">card</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-center">
              <AppButton
                disabled={form.formState.isSubmitting}
                isLoading={form.formState.isSubmitting}
                type="submit"
              >
                Checkout
              </AppButton>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
