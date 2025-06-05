import { create } from "zustand";

type IState = {
  auth: {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
  } | null;
};

export const useStore = create<IState>(() => ({
  auth: null,
}));
