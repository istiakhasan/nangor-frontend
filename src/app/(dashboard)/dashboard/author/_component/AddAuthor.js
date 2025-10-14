"use client";
import React, { useState } from "react";
import NGForm from "../../../../../component/form/NGForm";
import NGInput from "../../../../../component/form/NgInput";
import NgTextArea from "../../../../../component/form/NgTextArea";
import NgFileUpload from "../../../../../component/form/NgFileUpload";
import { Button } from "@mui/material";
import { uploadImageToImagebb } from "../../../../../utils/util";
import { useCreateAuthorMutation } from "../../../../../redux/api/authorApi"; // ✅ assuming you have this mutation

const AddAuthor = ({ setOpen }) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [createAuthor] = useCreateAuthorMutation();

  const handleSubmit = async (data, reset) => {
    try {
      setSubmitLoading(true);

      let uploadedImageUrl = "";

      // ✅ Upload profile picture to ImageBB
      if (data?.profilePicture?.length > 0) {
        const formData = new FormData();
        formData.append("image", data.profilePicture[0]);
        const uploadedImage = await uploadImageToImagebb(formData);
        uploadedImageUrl = uploadedImage;
      }

      // ✅ Prepare payload according to the required format
      const payload = {
        name: data.name,
        bio: data.bio,
        email: data.email,
        profilePicture: uploadedImageUrl?.url,
      };

      const res = await createAuthor(payload).unwrap();

      if (res) {
        // ✅ Success handling (you can use toast or snackbar here)
        reset();
        setOpen(false);
      }
    } catch (error) {
      console.error("Author creation failed:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Create Author
      </h2>

      <NGForm submitHandler={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <NGInput
            label="Full Name"
            name="name"
            placeholder="Enter author name"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <NGInput
            label="Email"
            name="email"
            type="email"
            placeholder="Enter author email"
            required
          />
        </div>

        {/* Bio */}
        <div className="mb-4">
          <NgTextArea
            name="bio"
            label="Bio"
            placeholder="Write short biography..."
            rows={4}
          />
        </div>

        {/* Profile Picture */}
        <div className="mb-6">
          <NgFileUpload
            name="profilePicture"
            label="Profile Picture"
            accept="image/*"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <Button onClick={() => setOpen(false)} variant="outlined">
            Close
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={submitLoading}
          >
            {submitLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </NGForm>
    </div>
  );
};

export default AddAuthor;
