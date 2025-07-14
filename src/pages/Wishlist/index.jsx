// "use client";

// import { useState } from "react";
// import { X } from "lucide-react";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

// const wishlistItems = [
//   {
//     id: "1",
//     image: "/placeholder.svg?height=40&width=40",
//     name: "Women's wallet Hand Purse",
//     price: "$70",
//     stockStatus: "In Stock",
//   },
//   {
//     id: "2",
//     image: "/placeholder.svg?height=40&width=40",
//     name: "Rose Gold Earring",
//     price: "$80",
//     stockStatus: "In Stock",
//   },
//   {
//     id: "3",
//     image: "/placeholder.svg?height=40&width=40",
//     name: "Apple",
//     price: "$12",
//     stockStatus: "In Stock",
//   },
//   {
//     id: "4",
//     image: "/placeholder.svg?height=40&width=40",
//     name: "Apple",
//     price: "$12",
//     stockStatus: "In Stock",
//   },
//   {
//     id: "5",
//     image: "/placeholder.svg?height=40&width=40",
//     name: "Apple",
//     price: "$12",
//     stockStatus: "In Stock",
//   },
//   {
//     id: "6",
//     image: "/placeholder.svg?height=40&width=40",
//     name: "Leather Backpack",
//     price: "$120",
//     stockStatus: "In Stock",
//   },
//   {
//     id: "7",
//     image: "/placeholder.svg?height=40&width=40",
//     name: "Bluetooth Headphones",
//     price: "$99",
//     stockStatus: "In Stock",
//   },
//   {
//     id: "8",
//     image: "/placeholder.svg?height=40&width=40",
//     name: "Smartwatch",
//     price: "$150",
//     stockStatus: "In Stock",
//   },
//   {
//     id: "9",
//     image: "/placeholder.svg?height=40&width=40",
//     name: "Coffee Maker",
//     price: "$45",
//     stockStatus: "In Stock",
//   },
//   {
//     id: "10",
//     image: "/placeholder.svg?height=40&width=40",
//     name: "Desk Lamp",
//     price: "$25",
//     stockStatus: "In Stock",
//   },
// ];

// const ITEMS_PER_PAGE = 5;

// const Wishlist = () => {
//   const [currentPage, setCurrentPage] = useState(1);

//   const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
//   const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
//   const currentItems = wishlistItems.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(wishlistItems.length / ITEMS_PER_PAGE);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };
//   return (
//     <>
//       <section className="py-[70px] bg-[#f3f4f6]">
//         <div className="max-w-[1536px] mx-auto py-8">
//           <div className="border rounded-lg overflow-hidden">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-gray-50">
//                   <TableHead className="w-[40%]">Product</TableHead>
//                   <TableHead className="w-[20%]">Price</TableHead>
//                   <TableHead className="w-[20%]">Stock Status</TableHead>
//                   <TableHead className="w-[20%] text-right">Action</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {currentItems.map((item) => (
//                   <TableRow key={item.id}>
//                     <TableCell className="flex items-center gap-4 py-4">
//                       <img
//                         src={item.image || "/placeholder.svg"}
//                         alt={item.name}
//                         width={40}
//                         height={40}
//                         className="rounded-md object-cover"
//                       />
//                       <span>{item.name}</span>
//                     </TableCell>
//                     <TableCell>{item.price}</TableCell>
//                     <TableCell>
//                       <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
//                         {item.stockStatus}
//                       </span>
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <div className="flex items-center justify-end gap-2">
//                         <Button
//                           className="bg-green-700 hover:bg-green-800 text-white rounded-full px-4 py-2"
//                           size="sm"
//                         >
//                           Add to Cart
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="rounded-full w-8 h-8"
//                         >
//                           <X className="h-4 w-4" />
//                           <span className="sr-only">Remove item</span>
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//           <div className="flex justify-between items-center mt-6">
//             <a href="#" className="text-blue-600 hover:underline text-sm">
//               Continue Shopping
//             </a>
//             <Pagination>
//               <PaginationContent>
//                 <PaginationItem>
//                   <PaginationPrevious
//                     href="#"
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     className={
//                       currentPage === 1 ? "pointer-events-none opacity-50" : ""
//                     }
//                   />
//                 </PaginationItem>
//                 {[...Array(totalPages)].map((_, index) => (
//                   <PaginationItem key={index}>
//                     <PaginationLink
//                       href="#"
//                       isActive={currentPage === index + 1}
//                       onClick={() => handlePageChange(index + 1)}
//                     >
//                       {index + 1}
//                     </PaginationLink>
//                   </PaginationItem>
//                 ))}
//                 <PaginationItem>
//                   <PaginationNext
//                     href="#"
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     className={
//                       currentPage === totalPages
//                         ? "pointer-events-none opacity-50"
//                         : ""
//                     }
//                   />
//                 </PaginationItem>
//               </PaginationContent>
//             </Pagination>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Wishlist;
