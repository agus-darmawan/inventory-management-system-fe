"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { RegisterFormData } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

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

const registerSchema = z.object({
  full_name: z
    .string()
    .nonempty("Nama lengkap wajib diisi")
    .min(3, "Nama lengkap minimal 3 karakter"),
  email: z
    .string()
    .email("Mohon masukan email yang benar")
    .nonempty("Email wajib diisi"),
  phone_number: z
    .string()
    .nonempty("Nomor HP wajib diisi")
    .min(10, "Nomor HP minimal 10 karakter")
    .max(15, "Nomor HP maksimal 15 karakter"),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .nonempty("Password wajib diisi"),
  password_confirmation: z.string().nonempty("Konfirmasi password wajib diisi"),
});

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      await register(data);
      router.push("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-between py-2 text-primary w-full h-[85vh]">
      <h1 className="text-primary text-4xl font-bold text-center w-full py-8">
        Register
      </h1>

      <div className="w-full px-10 space-y-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-full max-w-md"
          >
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Nama lengkap"
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
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor HP</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="08xxxxxxxxx"
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

            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <PasswordInput
                    label="Konfirmasi Password"
                    placeholder="Masukan kembali password"
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant="default"
              className="w-full py-5 text-lg rounded-full"
              type="submit"
            >
              Register
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center">
          <span>Sudah memiliki akun? </span>
          <Link href="/login" className="text-primary font-semibold">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
