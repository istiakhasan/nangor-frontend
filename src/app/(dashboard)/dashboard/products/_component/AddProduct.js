"use client";

import React, { useState } from "react";
import NGForm from "../../../../../component/form/NGForm";
import NGInput from "../../../../../component/form/NgInput";
import NgTextArea from "../../../../../component/form/NgTextArea";
import NgSelect from "../../../../../component/form/NGSelect";
import NgFileUpload from "../../../../../component/form/NgFileUpload";
import { Button, Snackbar, Alert } from "@mui/material";
import { uploadImageToImagebb } from "../../../../../utils/util";
import { useCreateSimpleProductMutation } from "../../../../../redux/api/productApi";
import { useGetAllMainCategoryQuery } from "../../../../../redux/api/categoryApi";
import { useGetAuthorApiOptionsQuery } from "@/redux/api/authorApi";
import MaterialRichEditor from "@/component/MaterialRichEditor";
import { useFormContext } from "react-hook-form";

const AddProduct = ({ setOpen }) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [createProduct] = useCreateSimpleProductMutation();
  const { data: categoryData } = useGetAllMainCategoryQuery();
  const { data: authorOptions } = useGetAuthorApiOptionsQuery();

  const handleSubmit = async (data, reset) => {
    try {
      setSubmitLoading(true);

      const mapImages = async (images = []) => {
        const uploadedImages = await Promise.all(
          images.map(async (file) => {
            const formData = new FormData();
            formData.append("image", file);
            const uploaded = await uploadImageToImagebb(formData);
            return uploaded;
          })
        );
        return uploadedImages;
      };

      const { categoryId, badge, author, unit, images, readMoreImages, ...rest } = data;

      const payload = {
        ...rest,
        categoryId,
        unit,
        productType: "Simple product",
        isBaseProduct: false,
        authorId: author,
        badge,
        images: await mapImages(images),
        readMoreImages: (await mapImages(readMoreImages))?.map((img) => img?.url),
      };

      const res = await createProduct(payload).unwrap();

      if (res) {
        setSnackbar({ open: true, message: `Product "${res?.data?.name}" created successfully!`, severity: "success" });
        reset();
        setOpen(false);
      }
    } catch (error) {
      const msg = error?.data?.errorMessages?.map((e) => e.message).join(", ") || "Something went wrong!";
      setSnackbar({ open: true, message: msg, severity: "error" });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <div className="p-6 bg-gray-50 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Create Product</h2>

      <NGForm submitHandler={(data, reset) => handleSubmit(data, reset)}>
        {/* Product Name */}
        <div className="mb-4">
          <NGInput label="Product Name" name="name" placeholder="Enter product name" />
        </div>

        {/* Description */}
        <div className="mb-4">
          <NgTextArea
            name="description"
            label="Description"
            placeholder="Write product description..."
            rows={4}
          />
        </div>

        {/* Prices & Weight */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <NGInput label="Weight" name="weight" placeholder="Weight" />
          <NgSelect
            name="unit"
            label="Unit"
            placeholder="Select unit"
            options={[
              { label: "kg", value: "kg" },
              { label: "gm", value: "gm" },
            ]}
          />
          {["regularPrice", "salePrice", "retailPrice", "distributionPrice", "purchasePrice"].map((field) => (
            <NGInput
              key={field}
              label={field.replace(/([A-Z])/g, " $1")}
              name={field}
              placeholder={field.replace(/([A-Z])/g, " $1")}
            />
          ))}
        </div>

        {/* Category & Author & Badge */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <NgSelect
            name="categoryId"
            label="Category"
            placeholder="Select Category"
            options={categoryData?.data?.map((cat) => ({
              label: cat.label,
              value: cat.id,
            }))}
          />
          <NgSelect
            name="author"
            label="Author"
            placeholder="Select Author"
            options={authorOptions?.map((author) => ({
              label: author.label,
              value: author.value,
            }))}
          />
          <NgSelect
            name="badge"
            label="Badge"
            placeholder="Select Badge"
            options={[
              { label: "New", value: "New" },
              { label: "Hot", value: "Hot" },
              { label: "Sale", value: "Sale" },
              { label: "Trending", value: "Trending" },
              { label: "Top", value: "Top" },
            ]}
          />
        </div>

        {/* Rich Editor */}
        <div className="mb-6">
          <Editor />
        </div>

        {/* File Uploads */}
        <div className="mb-6">
          <NgFileUpload name="images" label="Product Images" multiple accept="image/*" />
        </div>
        <div className="mb-6">
          <NgFileUpload name="readMoreImages" label="Read More Images" multiple accept="image/*" />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <Button onClick={() => setOpen(false)} variant="outlined">
            Close
          </Button>
          <Button type="submit" variant="contained" disabled={submitLoading}>
            {submitLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </NGForm>

      {/* Snackbar for success/error */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddProduct;

// Editor Component integrated with react-hook-form
const Editor = () => {
  const { setValue } = useFormContext();
  return <MaterialRichEditor value={null} onChange={(val) => setValue("htmldescription", val)} />;
};
