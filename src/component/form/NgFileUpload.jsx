"use client";
import React, { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

const NgFileUpload = ({
  name,
  label = "Upload Images",
  multiple = false,
  accept = "image/*",
  defaultValue = [],
  disabled = false,
  preview = true,
}) => {
  const { control, setValue, watch } = useFormContext();
  const [filePreviews, setFilePreviews] = useState([]);

  const watchedFiles = watch(name, defaultValue);

  useEffect(() => {
    if (preview && watchedFiles?.length) {
      const previews = Array.from(watchedFiles).map((file) =>
        file instanceof File ? URL.createObjectURL(file) : file
      );
      setFilePreviews(previews);
    }
  }, [watchedFiles, preview]);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div className="flex flex-col w-full">
          {label && <label className="mb-2 font-medium text-gray-700">{label}</label>}

          {/* Upload Box */}
          <label
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors hover:border-blue-500 ${
              disabled ? "opacity-50 cursor-not-allowed" : "border-gray-300"
            }`}
          >
            <i className="ri-upload-cloud-2-line text-blue-500 text-4xl mb-2"></i>
            <span className="text-gray-500 text-sm">
              {multiple ? "Drag & drop images here or click to select" : "Click to select an image"}
            </span>
            <input
              type="file"
              multiple={multiple}
              accept={accept}
              disabled={disabled}
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setValue(name, files);
                field.onChange(files);
              }}
            />
          </label>

          {/* Image Previews */}
          {preview && filePreviews.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {filePreviews.map((url, idx) => (
                <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden shadow-sm">
                  <img
                    src={url}
                    alt={`Preview ${idx}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    />
  );
};

export default NgFileUpload;
