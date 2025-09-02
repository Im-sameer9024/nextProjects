"use client";

import React, { useCallback, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductSchema } from "@/validation/Schemas";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const AddProduct = () => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [loadingStates, setLoadingStates] = useState<boolean[]>(
    Array(4).fill(false)
  );

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,

    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      images: [],
      title: "",
      description: "",
      category: "",
      price: 0,
    },
  });

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      if (e.target.files?.[0]) {
        const file = e.target.files[0];

        // Set loading state
        setLoadingStates((prev) => {
          const newStates = [...prev];
          newStates[index] = true;
          return newStates;
        });

        // Update form value
        const currentImages = getValues("images") || [];
        const newImages = [...currentImages];
        newImages[index] = file;
        setValue("images", newImages as File[]);

        // Update preview
        const newPreviews = [...previews];
        if (newPreviews[index]) {
          URL.revokeObjectURL(newPreviews[index]); // Clean up memory
        }
        newPreviews[index] = URL.createObjectURL(file);
        setPreviews(newPreviews);

        // Clear loading state
        setLoadingStates((prev) => {
          const newStates = [...prev];
          newStates[index] = false;
          return newStates;
        });
      }
    },
    [getValues, setValue, previews]
  );

  const removeImage = useCallback(
    (index: number) => {
      // Update form value
      const currentImages = getValues("images") || [];
      const newImages = [...currentImages];
      newImages.splice(index, 1);
      setValue("images", newImages as File[]);

      // Update preview
      const newPreviews = [...previews];
      if (newPreviews[index]) {
        URL.revokeObjectURL(newPreviews[index]); // Clean up memory
      }
      newPreviews.splice(index, 1);
      setPreviews(newPreviews);

      // Clear loading state
      setLoadingStates((prev) => {
        const newStates = [...prev];
        newStates[index] = false;
        return newStates;
      });
    },
    [getValues, setValue, previews]
  );

  const onSubmit = async (data: z.infer<typeof addProductSchema>) => {
    console.log("data is here", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        {/*---------------- Product Images----------- */}
        <div className="space-y-2">
          <Label className=" font-bold text-md">Product Image</Label>
          <div className="flex flex-wrap gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="relative">
                {/* Hidden file input */}
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id={`image-${index}`}
                  onChange={(e) => handleFileChange(e, index)}
                />

                {/* Upload box or preview */}
                {loadingStates[index] ? (
                  <div className="flex items-center justify-center h-24 w-24 border rounded-md">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                  </div>
                ) : previews[index] ? (
                  <div className="relative h-24 w-24">
                    <Image
                      src={previews[index]}
                      alt={`Preview ${index}`}
                      width={96}
                      height={96}
                      className="h-full w-full rounded-md object-cover border"
                    />
                    <Button
                      type="button"
                      size="icon"
                      className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-1"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Label
                    htmlFor={`image-${index}`}
                    className="flex items-center justify-center h-24 w-24 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50"
                  >
                    <span>Upload</span>
                  </Label>
                )}
              </div>
            ))}
          </div>
          {errors.images && (
            <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>
          )}
        </div>

        {/*-------------- Product Name ---------- */}
        <div>
          <Label className=" font-bold text-md">Product Name</Label>
          <Input
            type="text"
            placeholder="Enter product name"
            {...register("title", { required: "Product name is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/*-------------- Product Description ---------- */}
        <div>
          <Label className=" font-bold text-md">Product Description</Label>
          <Textarea
            placeholder="Enter product description"
            rows={4}
            {...register("description", {
              required: "Product description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/*-------------- Product Category ---------- */}
        <div>
          <Label className=" font-bold text-md">Product Category</Label>
          <Select
            value={watch("category")}
            onValueChange={(value) =>
              setValue("category", value, { shouldValidate: true })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/*-------------- Product Price ---------- */}
        <div>
          <Label className=" font-bold text-md">Product Price</Label>
          <Input
            type="number"
            placeholder="Enter product price"
            {...register("price", { required: "Product price is required" })}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </>
  );
};

export default AddProduct;
