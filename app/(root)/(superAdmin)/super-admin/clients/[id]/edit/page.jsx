"use client";
import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save, Image as ImageIcon, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { zodSchema } from "@/lib/validations.zod";

export default function EditClient({ clientData }) {
  const [preview, setPreview] = useState(clientData?.logo || null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      name: clientData?.name || "",
      email: clientData?.email || "",
      plan: clientData?.plan || "",
      website: clientData?.website || "",
      logo: clientData?.logo || "",
      aiStatus: clientData?.aiStatus || "Inactive",
      notes: clientData?.notes || "",
    },
  });

  // 🖼️ Handle logo drop/upload
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const previewURL = URL.createObjectURL(file);
        setPreview(previewURL);
        setValue("logo", previewURL);
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  // ✅ Handle submit
  const onSubmit = (data) => {
    console.log("✏️ Updated Client Data:", data);
    toast.success(`${data.name} updated successfully!`);
    // TODO: integrate with PUT /api/clients/:id
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card className="shadow-sm border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Edit Client — {clientData?.name}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Name */}
            <div className="grid gap-2">
              <Label>Client Name</Label>
              <Input placeholder="Enter client name" {...register("name")} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input type="email" placeholder="client@example.com" {...register("email")} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            {/* Plan */}
            <div className="grid gap-2">
              <Label>Plan</Label>
              <Select onValueChange={(val) => setValue("plan", val)} defaultValue={clientData?.plan}>
                <SelectTrigger>
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Free">Free</SelectItem>
                  <SelectItem value="Basic">Basic</SelectItem>
                  <SelectItem value="Pro">Pro</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Website */}
            <div className="grid gap-2">
              <Label>Website</Label>
              <Input placeholder="https://clientwebsite.com" {...register("website")} />
              {errors.website && <p className="text-sm text-red-500">{errors.website.message}</p>}
            </div>

            {/* AI Status */}
            <div className="grid gap-2">
              <Label>AI Status</Label>
              <Select onValueChange={(val) => setValue("aiStatus", val)} defaultValue={clientData?.aiStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select AI Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Logo Upload */}
            <div className="grid gap-3">
              <Label>Client Logo</Label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition 
                ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"}`}
              >
                <input {...getInputProps()} />
                {preview ? (
                  <div className="relative">
                    <img src={preview} alt="Logo Preview" className="w-24 h-24 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => {
                        setPreview(null);
                        setValue("logo", "");
                      }}
                      className="absolute top-0 right-0 bg-white rounded-full p-1 shadow"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 flex flex-col items-center gap-2">
                    <ImageIcon className="w-6 h-6 text-gray-400" />
                    <p className="text-sm">Drag & drop or click to upload</p>
                  </div>
                )}
              </div>

              <Input
                placeholder="Or paste image URL"
                {...register("logo")}
                onChange={(e) => {
                  setValue("logo", e.target.value);
                  setPreview(e.target.value);
                }}
              />
            </div>

            {/* Notes */}
            <div className="grid gap-2">
              <Label>Notes</Label>
              <Textarea placeholder="Any internal note..." {...register("notes")} />
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <Button type="submit" className="flex items-center gap-2 text-white">
                <Save className="w-4 h-4" />
                Update Client
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
