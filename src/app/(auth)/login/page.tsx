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
    .email("Mohon masukan email yang benar")
    .nonempty("Email wajib diisi"),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .nonempty("Password wajib diisi"),
});

export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: { email: string; password: string }) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <main className=" flex flex-col items-center justify-between py-2 text-primary w-full h-[85vh]">
      <h1 className="text-primary text-4xl font-bold text-center w-full py-10">
        Log In
      </h1>

      <div className="w-full px-10 space-y-8">
        <section className="mr-auto mb-4">
          <h2 className="text-left text-primary text-3xl font-bold">
            Selamat Datang
          </h2>
          <p>Silakan masukan akun anda untuk masuk</p>
        </section>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-full max-w-md "
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="contoh@gmail.com"
                      className="w-full py-5"
                      {...field}
                    />
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
                      type="password"
                      className="w-full py-5"
                      placeholder="Masukan password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant="default"
              className="w-full py-5 text-lg rounded-full"
              type="submit"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>

      <footer className="mt-10 text-center text-sm text-gray-500">
        <p>CV Mutiara Danatama</p>
      </footer>
    </main>
  );
}
