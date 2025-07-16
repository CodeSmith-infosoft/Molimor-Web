import React, { useEffect, useMemo, useRef, useState } from "react";
import { Country, State } from "country-state-city";
import { ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = [
    {
      id: "1",
      image: "/images/dummy/khichadi.png",
      name: "Women's wallet Hand Purse",
      price: "$70",
      quantity: 1,
    },
    {
      id: "2",
      image: "/images/dummy/khichadi.png",
      name: "Women's wallet Hand Purse",
      price: "$70",
      quantity: 1,
    },
    {
      id: "3",
      image: "/images/dummy/khichadi.png",
      name: "Women's wallet Hand Purse",
      price: "$70",
      quantity: 1,
    },
    {
      id: "4",
      image: "/images/dummy/khichadi.png",
      name: "Women's wallet Hand Purse",
      price: "$70",
      quantity: 1,
    },
    {
      id: "5",
      image: "/images/dummy/khichadi.png",
      name: "Women's wallet Hand Purse",
      price: "$70",
      quantity: 1,
    },
    {
      id: "6",
      image: "/images/dummy/khichadi.png",
      name: "Women's wallet Hand Purse",
      price: "$70",
      quantity: 1,
    },
    {
      id: "7",
      image: "/images/dummy/khichadi.png",
      name: "Women's wallet Hand Purse",
      price: "$70",
      quantity: 1,
    },
    {
      id: "8",
      image: "/images/dummy/khichadi.png",
      name: "Women's wallet Hand Purse",
      price: "$70",
      quantity: 1,
    },
    {
      id: "9",
      image: "/images/dummy/khichadi.png",
      name: "Women's wallet Hand Purse",
      price: "$70",
      quantity: 1,
    },
  ];

  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(cartItems.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [allItems, setAllItems] = useState(cartItems);

  const itemsPerPage = 5;

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return allItems.slice(indexOfFirstItem, indexOfLastItem);
  }, [allItems, currentPage, itemsPerPage]);

  const handleQuantityChange = (itemId, amount) => {
    setAllItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const handleDeleteItem = (itemId) => {
    setAllItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const parsePrice = (priceString) => {
    return Number.parseFloat(priceString.replace(/[^0-9.-]+/g, ""));
  };

  const { subTotal, deliveryCharges, totalAmount } = useMemo(() => {
    const calculatedSubTotal = allItems.reduce((sum, item) => {
      return sum + parsePrice(item.price) * item.quantity;
    }, 0);

    // Example: 20% delivery charges (you can adjust this logic)
    const calculatedDeliveryCharges = calculatedSubTotal * 0.2;
    const calculatedTotalAmount =
      calculatedSubTotal + calculatedDeliveryCharges;

    return {
      subTotal: `$${calculatedSubTotal.toFixed(2)}`,
      deliveryCharges: `$${calculatedDeliveryCharges.toFixed(2)}`,
      totalAmount: `$${calculatedTotalAmount.toFixed(2)}`,
    };
  }, [allItems]);

  const [formData, setFormData] = useState({
    country: "",
    state: "",
    pincode: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);

  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchState, setSearchState] = useState("");

  const selectedCountryRef = useRef("");
  const countryDropdownRef = useRef(null);
  const stateDropdownRef = useRef(null);

  // Load countries on mount
  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
    setFilteredCountries(allCountries);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setIsCountryOpen(false);
      }
      if (
        stateDropdownRef.current &&
        !stateDropdownRef.current.contains(event.target)
      ) {
        setIsStateOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCountrySearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredCountries(
      countries.filter((country) => country.name.toLowerCase().includes(value))
    );
  };

  const handleStateSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchState(value);
    setFilteredStates(
      states.filter((state) => state.name.toLowerCase().includes(value))
    );
  };

  const handleCountrySelect = (country) => {
    selectedCountryRef.current = country.isoCode;
    setFormData((prev) => ({ ...prev, country: country.name, state: "" }));

    const countryStates = State.getStatesOfCountry(country.isoCode);
    setStates(countryStates);
    setFilteredStates(countryStates);

    setIsCountryOpen(false);
    setSearchTerm("");
  };

  const handleStateSelect = (state) => {
    setFormData((prev) => ({ ...prev, state: state.name }));
    setIsStateOpen(false);
    setSearchState("");
  };

  const handlePincodeChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setFormData((prev) => ({ ...prev, pincode: value }));
    }
  };

  return (
    <>
      <div className="bg-[#f3f4f6] py-[70px]">
        <div className="bg-white py-[50px]">
          <div className="max-w-[1576px] mx-auto px-10">
            <div className="grid grid-cols-3 gap-[100px]">
              <div>
                <Card className="w-full p-[22px] !rounded-[5px] !border-[#E5E7EB]">
                  <CardHeader className="pb-5 border-b gap-0 px-0">
                    <CardTitle className="text-[20px] mb-[10px] font-bold">
                      Summary
                    </CardTitle>
                    <p className="text-[16px] font-light">Estimate Shipping</p>
                  </CardHeader>
                  <CardContent className="space-y-6 px-0">
                    <div className="space-y-4">
                      <p className="text-sm font-light">
                        Enter your destination to get a shipping estimate
                      </p>
                      <div className="bg-white space-y-4">
                        {/* Country Dropdown */}
                        <div>
                          <label className="block text-sm font-medium mb-[9px] ">
                            Country *
                          </label>
                          <div className="relative" ref={countryDropdownRef}>
                            <button
                              type="button"
                              onClick={() => setIsCountryOpen(!isCountryOpen)}
                              className="w-full px-3 py-2 text-left bg-white border rounded-[5px] border-gray-300 flex items-center justify-between"
                            >
                              <span
                                className={
                                  formData.country
                                    ? "text-black"
                                    : "text-gray-500"
                                }
                              >
                                {formData.country || "Select Country"}
                              </span>
                              <ChevronDown className="h-4 w-4 text-gray-400" />
                            </button>

                            {isCountryOpen && (
                              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto">
                                <div className="p-2">
                                  <input
                                    type="text"
                                    placeholder="Search country..."
                                    value={searchTerm}
                                    onChange={handleCountrySearch}
                                    className="w-full px-2 py-1 border border-gray-300 text-sm"
                                  />
                                </div>
                                {filteredCountries.map((country) => (
                                  <button
                                    key={country.isoCode}
                                    onClick={() => handleCountrySelect(country)}
                                    className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm"
                                  >
                                    {country.name}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* State Dropdown */}
                        <div>
                          <label className="block text-sm font-medium mb-[9px] ">
                            State/Province
                          </label>
                          <div className="relative" ref={stateDropdownRef}>
                            <button
                              type="button"
                              onClick={() => setIsStateOpen(!isStateOpen)}
                              disabled={!formData.country}
                              className={`w-full px-3 py-2 text-left bg-white border rounded-[5px] border-gray-300 flex items-center justify-between ${
                                !formData.country
                                  ? "bg-gray-50 cursor-not-allowed"
                                  : ""
                              }`}
                            >
                              <span
                                className={
                                  formData.state
                                    ? "text-black"
                                    : "text-gray-500"
                                }
                              >
                                {formData.state || "Select State"}
                              </span>
                              <ChevronDown className="h-4 w-4 text-gray-400" />
                            </button>

                            {isStateOpen && formData.country && (
                              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto">
                                <div className="p-2">
                                  <input
                                    type="text"
                                    placeholder="Search state..."
                                    value={searchState}
                                    onChange={handleStateSearch}
                                    className="w-full px-2 py-1 border border-gray-300 text-sm"
                                  />
                                </div>
                                {filteredStates.map((state) => (
                                  <button
                                    key={state.isoCode}
                                    onClick={() => handleStateSelect(state)}
                                    className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm"
                                  >
                                    {state.name}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Pin Code */}
                        <div>
                          <label className="block text-sm font-medium mb-[9px] ">
                            Zip/Postal Code
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={formData.pincode}
                              onChange={handlePincodeChange}
                              placeholder="Enter pin code"
                              className="w-full px-3 py-2 text-left bg-white border rounded-[5px] border-gray-300 flex items-center justify-between"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between mb-4">
                        <span className="text-sm">Sub-Total</span>
                        <span className="text-sm font-medium">{subTotal}</span>
                      </div>
                      <div className="flex justify-between pb-[20px]">
                        <span className="text-sm">Delivery Charges</span>
                        <span className="text-sm font-medium">
                          {deliveryCharges}
                        </span>
                      </div>
                      <div className="flex justify-between pt-[20px] border-t border-gray-200 dark:border-gray-700">
                        <span className="text-base font-semibold">
                          Total Amount
                        </span>
                        <span className="text-base font-semibold">
                          {totalAmount}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="col-span-2">
                <div className="w-full overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[35%] text-[15px] font-medium">
                          Product
                        </TableHead>
                        <TableHead className="w-[15%] text-[15px] font-medium">
                          Price
                        </TableHead>
                        <TableHead className="w-[20%] text-[15px] font-medium">
                          Quantity
                        </TableHead>
                        <TableHead className="w-[15%] text-[15px] font-medium">
                          Total
                        </TableHead>
                        <TableHead className="w-[15%] text-[15px] font-medium text-center">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentItems?.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="flex items-center gap-4 py-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              width={60}
                              height={50}
                              className="rounded-md object-cover"
                            />
                            <span>{item.name}</span>
                          </TableCell>
                          <TableCell className={"text-[15px] font-medium"}>
                            {item.price}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center w-fit py-[3px] px-1 border border-gray-300 rounded-md">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-[16px]"
                                onClick={() =>
                                  handleQuantityChange(item.id, -1)
                                }
                              >
                                -
                              </Button>
                              <span className="w-[20px] text-center text-sm font-semibold">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-[16px]"
                                onClick={() => handleQuantityChange(item.id, 1)}
                              >
                                +
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className={"text-[15px] font-medium"}>
                            {`$${(
                              parsePrice(item.price) * item.quantity
                            ).toFixed(2)}`}
                          </TableCell>
                          <TableCell className="">
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full w-8 cursor-pointer h-8"
                                onClick={() => handleDeleteItem(item.id)}
                              >
                                <svg
                                  width="18"
                                  height="22"
                                  viewBox="0 0 18 22"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="!w-[24px] !h-[20px]"
                                >
                                  {" "}
                                  <g clip-path="url(#clip0_76_2914)">
                                    {" "}
                                    <path
                                      d="M6.80855 9.0357V16.1071C6.80855 16.2217 6.77236 16.3158 6.69997 16.3895C6.62759 16.4632 6.5351 16.5 6.4225 16.5H5.65042C5.53782 16.5 5.44533 16.4632 5.37295 16.3895C5.30056 16.3158 5.26437 16.2217 5.26437 16.1071V9.0357C5.26437 8.92112 5.30056 8.82699 5.37295 8.75333C5.44533 8.67967 5.53782 8.64284 5.65042 8.64284H6.4225C6.5351 8.64284 6.62759 8.67967 6.69997 8.75333C6.77236 8.82699 6.80855 8.92112 6.80855 9.0357ZM9.89691 9.0357V16.1071C9.89691 16.2217 9.86071 16.3158 9.78833 16.3895C9.71595 16.4632 9.62346 16.5 9.51086 16.5H8.73877C8.62618 16.5 8.53369 16.4632 8.4613 16.3895C8.38892 16.3158 8.35273 16.2217 8.35273 16.1071V9.0357C8.35273 8.92112 8.38892 8.82699 8.4613 8.75333C8.53369 8.67967 8.62618 8.64284 8.73877 8.64284H9.51086C9.62346 8.64284 9.71595 8.67967 9.78833 8.75333C9.86071 8.82699 9.89691 8.92112 9.89691 9.0357ZM12.9853 9.0357V16.1071C12.9853 16.2217 12.9491 16.3158 12.8767 16.3895C12.8043 16.4632 12.7118 16.5 12.5992 16.5H11.8271C11.7145 16.5 11.622 16.4632 11.5497 16.3895C11.4773 16.3158 11.4411 16.2217 11.4411 16.1071V9.0357C11.4411 8.92112 11.4773 8.82699 11.5497 8.75333C11.622 8.67967 11.7145 8.64284 11.8271 8.64284H12.5992C12.7118 8.64284 12.8043 8.67967 12.8767 8.75333C12.9491 8.82699 12.9853 8.92112 12.9853 9.0357ZM14.5294 17.9241V6.2857H3.72019V17.9241C3.72019 18.1042 3.74834 18.2699 3.80464 18.4213C3.86094 18.5727 3.91925 18.6832 3.97957 18.7528C4.03989 18.8223 4.08211 18.8571 4.10624 18.8571H14.1434C14.1675 18.8571 14.2097 18.8223 14.2701 18.7528C14.3304 18.6832 14.3887 18.5727 14.445 18.4213C14.5013 18.2699 14.5294 18.1042 14.5294 17.9241ZM6.4225 4.71427H11.8271L11.2481 3.27789C11.1918 3.20423 11.1234 3.15921 11.043 3.14284H7.21872C7.1383 3.15921 7.06993 3.20423 7.01364 3.27789L6.4225 4.71427ZM17.6178 5.10713V5.89284C17.6178 6.00743 17.5816 6.10155 17.5092 6.17521C17.4368 6.24887 17.3443 6.2857 17.2318 6.2857H16.0736V17.9241C16.0736 18.6034 15.8846 19.1906 15.5066 19.6858C15.1286 20.181 14.6742 20.4286 14.1434 20.4286H4.10624C3.57543 20.4286 3.12102 20.1892 2.74302 19.7104C2.36502 19.2316 2.17601 18.6525 2.17601 17.9732V6.2857H1.01788C0.905284 6.2857 0.812794 6.24887 0.740411 6.17521C0.668028 6.10155 0.631836 6.00743 0.631836 5.89284V5.10713C0.631836 4.99255 0.668028 4.89842 0.740411 4.82476C0.812794 4.7511 0.905284 4.71427 1.01788 4.71427H4.74562L5.5901 2.66405C5.71074 2.36122 5.92789 2.10341 6.24155 1.89061C6.55521 1.67781 6.87289 1.57141 7.19459 1.57141H11.055C11.3767 1.57141 11.6944 1.67781 12.0081 1.89061C12.3217 2.10341 12.5389 2.36122 12.6595 2.66405L13.504 4.71427H17.2318C17.3443 4.71427 17.4368 4.7511 17.5092 4.82476C17.5816 4.89842 17.6178 4.99255 17.6178 5.10713Z"
                                      fill="#FF0000"
                                    />{" "}
                                  </g>{" "}
                                  <defs>
                                    {" "}
                                    <clipPath id="clip0_76_2914">
                                      {" "}
                                      <rect
                                        width="17"
                                        height="22"
                                        fill="white"
                                        transform="matrix(1 0 0 -1 0.625 22)"
                                      />{" "}
                                    </clipPath>{" "}
                                  </defs>{" "}
                                </svg>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-[30px] flex justify-end">
                  <div>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 text-sm rounded ${
                              currentPage === 1
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            Previous
                          </button>
                        </PaginationItem>

                        {[...Array(totalPages)].map((_, index) => (
                          <PaginationItem key={index}>
                            <button
                              onClick={() => handlePageChange(index + 1)}
                              className={`px-3 py-1 text-sm rounded ${
                                currentPage === index + 1
                                  ? "bg-green text-white"
                                  : "bg-gray-100 hover:bg-gray-200"
                              }`}
                            >
                              {index + 1}
                            </button>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1 text-sm rounded ${
                              currentPage === totalPages
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            Next
                          </button>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-[30px]">
                  <Link to={"/products"} className=" text-sm underline">
                    Continue Shopping
                  </Link>
                  <div>
                    <button className="underline cursor-pointer text-[15px] font-medium py-[10px] px-5 bg-green rounded-[5px] text-white">
                      Check Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
