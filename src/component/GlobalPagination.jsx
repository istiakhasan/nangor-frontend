"use client";
import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const GlobalPagination = ({
  page,
  total,
  limit,
  onChange,
}) => {
  const pageCount = Math.ceil(total / limit);

  if (pageCount <= 1) return null;

  return (
    <Stack spacing={2} alignItems="center" className="mt-4">
      <Pagination
        count={pageCount}
        page={page}
        onChange={onChange}
        color="primary"
        shape="rounded"
        size="medium"
      />
    </Stack>
  );
};

export default GlobalPagination;
