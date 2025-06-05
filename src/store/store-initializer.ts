"use client";

import { useRef } from "react";
import { useStore } from "@/store";

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

const StoreInitializer = ({ auth }: IState) => {
  const initialized = useRef(false);

  if (!initialized.current) {
    useStore.setState({ auth });
    initialized.current = true;
  }
  return null;
};

export default StoreInitializer;
