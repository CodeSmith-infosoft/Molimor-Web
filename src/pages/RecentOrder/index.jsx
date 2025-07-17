import { useState, useEffect, useRef, useContext } from "react";
import { ChevronDown } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import useAxios from "@/customHook/fetch-hook";
import { formatCurrency, formatted } from "@/utils";
import MainContext from "@/context/MainContext";

export default function RecentOrder() {
  const [filterStatus, setFilterStatus] = useState("All");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { language, currency } = useContext(MainContext);
  const dropdownRef = useRef(null);
  const { data: orderList, fetchData: getAllUserOrders } = useAxios({
    method: "GET",
    url: `/order/getAllUserOrders`,
  });

  useEffect(() => {
    if (filterStatus === "All") {
      setFilteredOrders(orderList);
    } else {
      setFilteredOrders(
        orderList.filter((order) => order.status === filterStatus)
      );
    }
  }, [filterStatus, orderList]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    getAllUserOrders();
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const uniqueStatuses = [
    "All",
    ...new Set(orderList?.map((order) => order.status)),
  ];

  return (
    <div className="flex max-w-[1576px] py-[70px] px-10 mx-auto items-start justify-center">
      <div className="w-full bg-white border border-[#E5E7EB] rounded-[8px]">
        {/* Header with background and bottom border */}
        <div className="flex flex-row items-center justify-between py-5 px-9 border-b border-gray-200">
          <h2 className="">Recent Order History</h2>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white hover:bg-gray-50 h-9 px-3 py-2 gap-1 text-gray-700"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              Status <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 w-[150px] origin-top-right rounded-md border border-gray-200 bg-white p-1 shadow-lg outline-none">
                {uniqueStatuses.map((status) => (
                  <div
                    key={status}
                    className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-gray-800 outline-none hover:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    onClick={() => {
                      setFilterStatus(status);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {status}
                    {status === filterStatus && (
                      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                        {/* Checkmark icon if needed, not visible in original image */}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#E5E7EB] bg-[#F3F4F6]">
                  {" "}
                  {/* Table header row has a bottom border */}
                  <TableHead className="text-gray-500 font-medium py-3 px-4 text-left">
                    Order ID
                  </TableHead>
                  <TableHead className="text-gray-500 font-medium py-3 px-4 text-left">
                    Date
                  </TableHead>
                  <TableHead className="text-gray-500 font-medium py-3 px-4 text-left">
                    Total
                  </TableHead>
                  <TableHead className="text-gray-500 font-medium py-3 px-4 text-left">
                    Status
                  </TableHead>
                  <TableHead className="text-right text-gray-500 font-medium py-3 px-4">
                    {" "}
                  </TableHead>{" "}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders?.map((order, index) => (
                  <TableRow
                    key={order.id}
                    className={
                      index < filteredOrders.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }
                  >
                    {" "}
                    {/* Subtle border between rows */}
                    <TableCell className="font-medium py-3 px-4 border-b-0">
                      {order?.orderId}
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b-0">
                      {formatted(order?.createdAt)}
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b-0">
                      {formatCurrency(order?.totalAmount, currency, language)}
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b-0">
                      {order.status}
                    </TableCell>
                    <TableCell className="text-right py-3 px-4 border-b-0">
                      <Link
                        to={`/recent-order/${order.orderId}`}
                        className="text-green text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
