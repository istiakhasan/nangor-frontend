/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddCategory from "./_component/AddCategory";
import { Modal,  IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { useGetAllMainCategoryQuery,useDeleteCategoryMutation } from "../../../../redux/api/categoryApi";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import GlobalPagination from "../../../../component/GlobalPagination";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const limit = 5;

  const { data } = useGetAllMainCategoryQuery({
    page,
    limit,
    searchTerm,
  });

  const [deleteCategory] = useDeleteCategoryMutation();

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedProduct) {
      try {
      const result=  await deleteCategory({id:selectedProduct.id}).unwrap();
      console.log(result,"result")
      } catch (err) {
        console.error("Failed to delete category:", err);
      }
      setConfirmOpen(false);
      setSelectedProduct(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="p-6 bg-gray-50">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <div className="flex-1">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search..."
            className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 shadow-sm"
          />
        </div>
        <div>
          <Button onClick={() => setOpen(true)} variant="contained">
            Create
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto global-table-responsive">
        <table>
  <thead>
    <tr>
      <th className="text-start">Name</th>
      <th className="text-start">Created At</th>
      <th className="text-start">Image</th>
      <th className="text-end">Actions</th>
    </tr>
  </thead>
  <tbody>
    {data?.data?.map((item) => {
      return (
        <tr key={item?.id}>
          <td>{item?.label}</td>
          <td>{moment(item?.createdAt).format("DD-MM-YYYY")}</td>

          <td>
            <img
              className="w-10 h-10 object-cover rounded-lg shadow-sm border"
              src={item?.image}
              alt={item?.name}
            />
          </td>
          <td className="text-end">
            <IconButton color="error" onClick={() => handleDeleteClick(item)}>
              <DeleteIcon />
            </IconButton>
          </td>
        </tr>
      );
    })}
  </tbody>
</table>

      </div>

      {/* Pagination */}
      <div className="flex justify-end">
        <GlobalPagination page={page} total={data?.meta?.total || 0} limit={limit} onChange={handlePageChange} />
      </div>

      {/* Product Create Modal */}
      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-title" aria-describedby="modal-description">
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-[500px] max-h-[90vh] flex flex-col shadow-lg">
            <div className="overflow-y-scroll px-6 py-4 hide-scrollbar">
              <AddCategory setOpen={setOpen} />
            </div>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the category{" "}
            <strong>{selectedProduct?.label}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button color="error" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Tailwind hidden scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default Page;
