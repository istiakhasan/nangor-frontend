import React, { Suspense } from "react";
import Shop from "./_component/Shop";

const Page =async ({ searchParams }) => {
  return (
    <>
      <Shop searchParams={searchParams} />
    </>
  );
};

export default Page;
