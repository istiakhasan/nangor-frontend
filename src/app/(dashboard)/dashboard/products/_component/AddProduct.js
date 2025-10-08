"use client";
import React, { useState } from "react";
import NGForm from "../../../../../component/form/NGForm";
import NGInput from "../../../../../component/form/NgInput";
import NgTextArea from "../../../../../component/form/NgTextArea";
import NgSelect from "../../../../../component/form/NGSelect";
import NgFileUpload from "../../../../../component/form/NgFileUpload";
import { Button } from "@mui/material";
import { uploadImageToImagebb } from "../../../../../utils/util";
import { useCreateSimpleProductMutation } from "../../../../../redux/api/productApi";
import { useGetAllMainCategoryQuery } from "../../../../../redux/api/categoryApi";

const AddProduct = ({setOpen}) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [createProduct] = useCreateSimpleProductMutation();
  const { data: categoryData } = useGetAllMainCategoryQuery(undefined);
  const handleSubmit = async (data, reset) => {
    try {
      setSubmitLoading(true);
      const mapImages = async (images) => {
        const imagePromises = images.map(async (item) => {
          const formData = new FormData();
          formData.append("image", item);
          const uploadedImage = await uploadImageToImagebb(formData);
          return uploadedImage;
        });
        const uploadedImages = await Promise.all(imagePromises);
        return uploadedImages;
      };

      const { categoryId,badge, unit, images, ...rest } = data;
      const payload = { ...rest };
      payload["categoryId"] = categoryId;
      payload["unit"] = unit;
      payload["images"] = await mapImages(data.images || []);
      payload["productType"] = "Simple product";
      payload["isBaseProduct"] = false;
      payload["badge"] = badge;
      const res = await createProduct(payload).unwrap();

      if (!!res?.success) {
        showNotification(res?.data?.name);
        // message.success(res?.message);
        setDrawerOpen(false);
        setSelectedValue([]);
        reset();
      }
    } catch (error) {
      if (error?.data?.errorMessages) {
        error?.data?.errorMessages?.forEach((item) => {
          // toast.error(item?.message);
        });
      } else {
        // message.error("Something went wrong ,please debug the error");
      }
    } finally {
      setSubmitLoading(false);
    }
  };
  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Create Product
      </h2>

      <NGForm submitHandler={(data) => handleSubmit(data)}>
        {/* Product Name */}
        <div className="mb-4">
          <NGInput
            label="Product Name"
            name="name"
            placeholder="Enter product name"
          />
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

        {/* Prices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div className="flex-1">
            <NGInput label="Weight" name="weight" placeholder="Weight" />
          </div>
          <div className="flex-1">
            <NgSelect
              name="unit"
              label="Unit"
              placeholder="Select unit"
              options={[
                { label: "kg", value: "kg" },
                { label: "gm", value: "gm" },
              ]}
            />
          </div>
          {[
            "regularPrice",
            "salePrice",
            "retailPrice",
            "distributionPrice",
            "purchasePrice",
          ].map((priceField) => (
            <NGInput
              key={priceField}
              label={priceField.replace(/([A-Z])/g, " $1")}
              name={priceField}
              placeholder={priceField.replace(/([A-Z])/g, " $1")}
            />
          ))}

          <div className="mb-4">
            <NgSelect
              name="categoryId"
              label="Category"
              placeholder="Select Category"
              options={categoryData?.data?.map((item) => ({
                label: item?.label,
                value: item?.id,
              }))}
            />
          </div>
          <div className="mb-4">
            <NgSelect
              name="badge"
              label="Badge"
              placeholder="Select Category"
              options={[
                {
                  label:'New',
                  value:'New'
                },
                {
                  label:'Hot',
                  value:'Hot'
                },
                {
                  label:'Sale',
                  value:'Sale'
                },
                {
                  label:'Trending',
                  value:'Trending'
                },
                {
                  label:'Top',
                  value:'Top'
                },
              ]}
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <NgFileUpload
            name="images"
            label="Product Images"
            multiple
            accept="image/*"
          />
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <Button onClick={() => setOpen(false)} variant="outlined">
            Close
          </Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </NGForm>
    </div>
  );
};

export default AddProduct;
