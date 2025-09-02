"use client";

import { z } from "zod";
import { addCategorySchema } from "@/validation/Schemas";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Loader2, X } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

const AddCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>("");

  const {
    setValue,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof addCategorySchema>>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      image: undefined,
      title: "",
      catSlug: "",
    },
  });

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        const file = e.target.files[0];

        setLoading(true);

        // upload from value

        setValue("image", file, { shouldValidate: true });

        setPreview(URL.createObjectURL(file));

        // waiting for the set preview
        await new Promise((resolve) => setTimeout(resolve, 500));

        setLoading(false);
      }
    },
    [setValue]
  );

  const removeImage = useCallback(() => {
    // Clear the preview
    if (preview) {
      URL.revokeObjectURL(preview); // Clean up memory
      setPreview("");
    }

    // Reset the form value
    setValue("image", undefined);

    // Reset the file input
    const fileInput = document.getElementById("image") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  }, [preview, setValue]);

  const onSubmit = (data: z.infer<typeof addCategorySchema>) => {
    console.log("data of category", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        {/*--------------- Product Category Image ---------------- */}
        <div>
          <Label className=" font-bold text-md">Category Image</Label>
          <div>
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              id="image"
              onChange={handleFileChange}
            />

            {/* upload box or preview box */}
            {loading ? (
              <div className="flex items-center justify-center h-24 w-24 border rounded-md">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
              </div>
            ) : preview ? (
              <div className="relative h-24 w-24">
                <Image
                  src={preview}
                  alt={`Preview`}
                  width={96}
                  height={96}
                  className="h-full w-full rounded-md object-cover border"
                />
                <Button
                  type="button"
                  size="icon"
                  className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-1"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Label
                htmlFor="image"
                className="flex items-center justify-center h-24 w-24 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50"
              >
                <span>Upload</span>
              </Label>
            )}
          </div>
        </div>

        {/*-------------- Category Title ---------- */}
        <div>
          <Label className=" font-bold text-md">Category Title</Label>
          <Input
            type="text"
            placeholder="Enter Category title"
            {...register("title", { required: "Category title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/*-------------- CatSlug Name ---------- */}
        <div>
          <Label className=" font-bold text-md">CatSlug</Label>
          <Input
            type="text"
            placeholder="Enter catSlug name"
            {...register("catSlug", {
              required: "Product catSlug is required",
            })}
          />
          {errors.catSlug && (
            <p className="text-red-500 text-sm mt-1">
              {errors.catSlug.message}
            </p>
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

export default AddCategory;
