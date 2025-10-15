"use client";

import React, { useState } from "react";
import NGForm from "../../../../../component/form/NGForm";
import NGInput from "../../../../../component/form/NgInput";
import NgFileUpload from "../../../../../component/form/NgFileUpload";
import { Button, Snackbar, Alert, CircularProgress } from "@mui/material";
import { uploadImageToImagebb } from "../../../../../utils/util";
import { useCreateMainCategoryMutation } from "../../../../../redux/api/categoryApi";

const AddCategory = ({ setOpen }) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [createCategory] = useCreateMainCategoryMutation();

  // Handle form submission
  const handleSubmit = async (data, reset) => {
    if (!data?.label) {
      setSnackbar({ open: true, message: "Category name is required!", severity: "error" });
      return;
    }

    setSubmitLoading(true);
    try {
      // Upload first image if exists
      let imageUrl = "";
      if (data?.images?.length) {
        const formData = new FormData();
        formData.append("image", data.images[0]);
        const uploaded = await uploadImageToImagebb(formData);
        imageUrl = uploaded?.url || "";
      }

      const payload = {
        label: data.label,
        image: imageUrl,
      };

      const res = await createCategory(payload).unwrap();

      setSnackbar({ open: true, message: `Category "${res?.data?.name}" created successfully!`, severity: "success" });
      reset();
      setOpen(false);
    } catch (error) {
      const msg = error?.data?.errorMessages?.map((e) => e.message).join(", ") || "Something went wrong!";
      setSnackbar({ open: true, message: msg, severity: "error" });
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-md  w-full">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Create Category</h2>

      <NGForm submitHandler={handleSubmit}>
        <div className="mb-4">
          <NGInput label="Category Name" name="label" placeholder="Enter name" required />
        </div>

        <div className="mb-6">
          <NgFileUpload name="images" label="Category Image" accept="image/*" />
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
          <Button onClick={() => setOpen(false)} variant="outlined">
            Close
          </Button>
          <Button type="submit" variant="contained" disabled={submitLoading} startIcon={submitLoading && <CircularProgress size={20} />}>
            {submitLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </NGForm>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddCategory;
