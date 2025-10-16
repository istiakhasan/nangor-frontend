import * as yup from "yup";

export const productSchema = yup.object().shape({
  // Basic info
  name: yup.string().required("Product name is required"),
  description: yup.string().required("Description is required"),

  // Numeric & unit fields
  weight: yup
    .string()
    .typeError("Weight must be a number")
    .required("Weight is required"),
  unit: yup.string().required("Unit is required"),

  // Pricing fields
  regularPrice: yup
    .string()
    .typeError("Regular price must be a number")
    .required("Regular price is required"),
  salePrice: yup
    .string().required("Sale  price is required")
   ,
  retailPrice: yup
    .string()
    .required("Retail price is required"),
  distributionPrice: yup
    .string()
    .required("Distribution price is required"),
  purchasePrice: yup
    .string()
    .required("Purchase price is required"),

  // Relations
  categoryId: yup.string().required("Category is required"),
  author: yup.string().required("Author is required"),
  badge: yup.string().required('Badge is required'),

  // Rich editor field
  htmldescription: yup
    .string(),
    // .min(10, "HTML description must be at least 10 characters long"),

  // Image uploads
  images: yup
    .array()
    .of(yup.mixed())
    .min(1, "At least one product image is required")
    .required("Product images are required"),

});
