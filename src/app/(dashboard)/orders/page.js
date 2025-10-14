"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Tooltip, IconButton } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import moment from "moment";
import { useGetAllOrdersQuery } from "../../../redux/api/orderApi";
import GlobalPagination from "../../../component/GlobalPagination";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 5;

  const { data, isLoading } = useGetAllOrdersQuery({
    page: searchTerm ? 1 : page,
    limit,
    searchTerm,
    statusId: 1,
  });

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (isLoading) {
    return <div className="p-6 text-center text-gray-600">Loading orders...</div>;
  }
  return (
     <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search by receiver name or phone..."
          className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 shadow-sm"
        />
        <Button onClick={() => setOpen(true)} variant="contained">
          Create Order
        </Button>
      </div>

      {/* Table */}
      <div className="global-table-responsive">
        <table className=" text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 border-b">
              <th className="p-3">Order #</th>
              <th className="p-3">Receiver</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Address</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Created At</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.length ? (
              data.data.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 font-medium text-gray-900">
                    {order.orderNumber}
                  </td>
                  <td className="p-3">{order.receiverName}</td>
                  <td className="p-3">{order.receiverPhoneNumber}</td>
                  <td className="p-3 max-w-[250px] truncate">
                    {order.receiverAddress || "N/A"}
                    {order.receiverAddress?.length > 20 && (
                      <Tooltip
                        title={order.receiverAddress}
                        arrow
                        placement="top"
                      >
                        <IconButton size="small">
                          <InfoOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </td>
                  <td className="p-3 text-sm">
                    <span className="block font-medium text-gray-800">
                      {order.paymentMethod}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        order.paymentStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3">{order.totalPrice} Tk</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        order.status?.label === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status?.label === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status?.label}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600">
                    {moment(order.createdAt).format("DD MMM YYYY")}
                  </td>
                  <td className="p-3">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => alert(`Viewing order ${order.id}`)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="p-6 text-center text-gray-500 italic"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
       
      </div>

      {/* Pagination */}
      <div className="flex justify-end">
       <GlobalPagination
        page={data?.meta?.page}
        total={data?.meta?.total || 0}
        limit={limit}
        onChange={handlePageChange}
      />
     </div>
    </div>
  );
};

export default Page;
