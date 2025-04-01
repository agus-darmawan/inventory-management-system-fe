"use client";

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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .nonempty("Password is required"),
});

export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: { email: string; password: string }) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <main className="m-10 mr-auto w-full space-y-6">
      <h1 className="text-primary text-4xl font-bold text-center w-full">
        Log In
      </h1>

      <section className="mr-auto">
        <h2 className="text-left text-primary text-3xl font-bold">Welcome</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, quam!
        </p>
      </section>

      <section className="mr-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your login email.</FormDescription>
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
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Use at least 6 characters for your password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant="default"
              className="px-24 py-7 text-xl rounded-full"
              type="submit"
            >
              Login
            </Button>
          </form>
        </Form>
      </section>
    </main>
  );
}
