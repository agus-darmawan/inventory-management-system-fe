"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react"; // Using icons from lucide-react
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm, FormProvider } from "react-hook-form";
import { Form, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";

type FormData = {
  type: string;
  weight: number;
  price: number;
};

export default function PurchasesPage() {
  // Load purchases from localStorage on mount
  const loadPurchases = () => {
    const storedPurchases = localStorage.getItem("purchases");
    return storedPurchases ? JSON.parse(storedPurchases) : [];
  };

  const [purchases, setPurchases] = useState<FormData[]>(loadPurchases());
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<FormData | null>(null);
  const [formData, setFormData] = useState<FormData>({
    type: "",
    weight: 0,
    price: 0,
  });

  // Use react-hook-form
  const methods = useForm<FormData>({
    defaultValues: formData,
  });

  // Effect to save purchases in localStorage on change
  useEffect(() => {
    localStorage.setItem("purchases", JSON.stringify(purchases));
  }, [purchases]);

  const handleAddOrEdit = () => {
    if (currentItem) {
      // Edit item
      const updatedPurchases = purchases.map((item) =>
        item.type === currentItem.type ? { ...item, ...formData } : item
      );
      setPurchases(updatedPurchases);
    } else {
      // Add new item
      setPurchases([...purchases, formData]);
    }
    setShowModal(false);
    setFormData({ type: "", weight: 0, price: 0 });
    setCurrentItem(null);
  };

  const handleDelete = (type: string) => {
    const updatedPurchases = purchases.filter((item) => item.type !== type);
    setPurchases(updatedPurchases);
  };

  const totalAllItems = purchases.reduce(
    (acc, item) => acc + item.weight * item.price,
    0
  );

  return (
    <div>
      <section className="mt-5 mx-2 p-5">
        <h1 className="text-xl text-center font-semibold mb-3">Penjualan</h1>
        <Button onClick={() => setShowModal(true)} className="mb-4">
          Add Item
        </Button>

        {/* ShadCN Table to display purchases */}
        <div className="overflow-x-auto">
          <Table className="w-full text-sm sm:text-base">
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Weight (kg)</TableHead>
                <TableHead>Price (IDR)</TableHead>
                <TableHead>Total (IDR)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchases.map((item) => {
                const totalItemPrice = item.weight * item.price;
                return (
                  <TableRow key={item.type}>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.weight}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{totalItemPrice}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowModal(true);
                          setFormData({
                            type: item.type,
                            weight: item.weight,
                            price: item.price,
                          });
                          setCurrentItem(item);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(item.type)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 text-right">
          <strong>Total Semua: {totalAllItems} IDR</strong>
        </div>
      </section>

      {/* Modal for Add/Edit */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogTrigger asChild>{/* Triggering button */}</DialogTrigger>

        <DialogContent>
          <DialogTitle>{currentItem ? "Edit Item" : "Add Item"}</DialogTitle>
          <DialogDescription>
            <FormProvider {...methods}>
              {" "}
              {/* Wrap the form with FormProvider */}
              <form onSubmit={(e) => e.preventDefault()}>
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                    />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={formData.weight}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          weight: Number(e.target.value),
                        })
                      }
                    />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormLabel>Price (IDR)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: Number(e.target.value),
                        })
                      }
                    />
                  </FormControl>
                </FormItem>

                <div className="mt-4">
                  <Button onClick={handleAddOrEdit}>
                    {currentItem ? "Update Item" : "Add Item"}
                  </Button>
                </div>
              </form>
            </FormProvider>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
