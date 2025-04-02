"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { LoginFormData } from "@/types/auth";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

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
import Link from "next/link";
import PasswordInput from "@/components/form/password-input";

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
  const router = useRouter();
  const { login } = useAuth();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      await login(data);
      // router.push("/home");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-between py-2 text-primary w-full h-[85vh]">
      <h1 className="text-primary text-4xl font-bold text-center w-full py-10">
        Log In
      </h1>

      <div className="w-full px-10 space-y-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-full max-w-md"
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
                  <PasswordInput
                    label="Password"
                    placeholder="Masukan password"
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-2 text-right">
              <Link
                href="/forgot-password"
                className="text-primary font-semibold"
              >
                Lupa password?
              </Link>
            </div>
            <Button
              variant="default"
              className="w-full py-5 text-lg rounded-full"
              type="submit"
            >
              Login
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center">
          <span>Belum punya akun? </span>
          <Link href="/register" className="text-primary font-semibold">
            Daftar
          </Link>
        </div>
      </div>

      <footer className="mt-10 text-center text-sm text-gray-500">
        <p>CV Mutiara Danatama</p>
      </footer>
    </main>
  );
}
