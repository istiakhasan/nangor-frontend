/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddProduct from "./_component/AddProduct";
import { Modal, Tooltip, IconButton } from "@mui/material";
import { useGetAllProductQuery } from "../../../../redux/api/productApi";
import moment from "moment";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import GlobalPagination from "../../../../component/GlobalPagination";


const Page = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm,setSearchTerm]=useState('')
  const limit = 5;

  const { data } = useGetAllProductQuery({
    page,
    limit,
    searchTerm
  });

  const handlePageChange = (
    event,
    value
  ) => {
    setPage(value);
  };

  return (
    <div className="p-6 bg-gray-50">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <div className="flex-1">
          <input
            onChange={(e)=>setSearchTerm(e.target.value)}
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
              <th className="text-start">ID</th>
              <th className="text-start">Created At</th>
              <th className="text-start">Description</th>
              <th className="text-start">Image</th>
              <th className="text-start">Stock</th>
              <th className="text-start">Price</th>
              <th className="text-start">Badge</th>
              <th className="text-start">Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item) => {
              const isLong = item?.description?.length > 50;
              const shortDesc = isLong
                ? item?.description.slice(0, 50) + "..."
                : item?.description;

              return (
                <tr key={item?.id}>
                  <td>{item?.name}</td>
                  <td>{item?.id}</td>
                  <td>{moment(item?.createdAt).format("DD-MM-YYYY")}</td>
                  <td className="max-w-[200px] truncate">
                    {shortDesc}
                    {isLong && (
                      <Tooltip
                        slotProps={{
                          tooltip: {
                            sx: {
                              background: "white",
                              color: "black",
                              fontSize: "12px",
                              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3) ",
                            },
                          },
                        }}
                        title={item?.description}
                        arrow
                        placement="top"
                      >
                        <IconButton size="small" className="ml-1">
                          <InfoOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </td>
                  <td>
                    <img
                      className="w-10 h-10 object-cover rounded-lg shadow-sm border"
                      src={item?.images[0]?.url}
                      alt={item?.name}
                    />
                  </td>
                  <td>{item?.stock ?? "N/A"}</td>
                  <td>{item?.salePrice} Tk</td>
                  <td>
                    <span className="bg-green-100 text-green-800 px-3 py-1  text-sm font-medium">
                      {item?.badge || "N/A"}
                    </span>
                  </td>
                  <td>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1  text-sm font-medium">
                      Available
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
     <div className="flex justify-end">
       <GlobalPagination
        page={page}
        total={data?.meta?.total || 0}
        limit={limit}
        onChange={handlePageChange}
      />
     </div>

      {/* Product Create Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-[700px] max-h-[90vh] flex flex-col shadow-lg">
            <div className="overflow-y-scroll px-6 py-4 hide-scrollbar">
              <AddProduct setOpen={setOpen} />
            </div>
          </div>
        </div>
      </Modal>

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
