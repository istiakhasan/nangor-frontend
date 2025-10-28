/* eslint-disable @next/next/no-img-element */
// import NewProducts from "../../../../component/NewProducts";
// import ProductDetailsSection from "../_component/ProductDetailsSection";
// const Page = () => {
//   return (
//     <div className="p-[20px] container mx-auto md:grid grid-cols-5 gap-5">
//       <div className="col-span-4">
//         <ProductDetailsSection />
//       </div>
//       <div className="sticky top-[100px] h-fit">
//         <NewProducts />
       
//       </div>
//     </div>
//   );
// };

// export default Page;
/* eslint-disable @next/next/no-img-element */
import { getBaseUrl } from "@/helpers/config/envConfig";
import NewProducts from "../../../../component/NewProducts";
import ProductDetailsSection from "../_component/ProductDetailsSection";

export async function generateMetadata({ params }) {

  const res = await fetch(`${getBaseUrl()}/products/${params.slug}`, {
    next: { revalidate: 60 }, // optional caching
  });

  if (!res.ok) {
    return {
      title: "Product not found",
      description: "This product may not exist or is unavailable.",
    };
  }

  const result = await res.json();
  const product = result?.data?.data;

  const title = product?.name || "Product Details";
  const description =
    product?.shortDescription ||
    product?.description ||
    "View product details and specifications.";

  // ✅ Must use absolute image URL for WhatsApp preview
  const imageUrl = product?.images?.[0]?.url
    ? product.images[0].url.startsWith("http")
      ? product.images[0].url
      : `${getBaseUrl()}${product.images[0].url}`
    : `${getBaseUrl()}/default-image.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${getBaseUrl()}/product/${params.slug}`,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

const Page = () => {
  return (
    <div className="p-[20px] container mx-auto md:grid grid-cols-5 gap-5">
      <div className="col-span-4">
        <ProductDetailsSection />
      </div>
      <div className="sticky top-[100px] h-fit">
        <NewProducts />
      </div>
    </div>
  );
};

export default Page;
