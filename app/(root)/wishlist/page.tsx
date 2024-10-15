import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function WishList() {
  return (
    <div className="mt-[160px] lg:px-20 md:px-10 px-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead className="hidden lg:flex items-center">Price</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="flex flex-col gap-8">
              <div className="flex gap-4 items-center">
                <Image
                  src="/img/harry.jpg"
                  alt="book image cover"
                  width={100}
                  height={200}
                />
                <div className="flex flex-col justify-between gap-2">
                  <p className="font-bold text-base">
                    Harry Potter And The Cursed Child
                  </p>
                  <p>By J.K. Rowling</p>
                  <p className="font-bold text-teal-600 text-xl lg:hidden">
                    13.99$
                  </p>
                  <p className="font-bold text-teal-500">100 in stock</p>
                </div>
              </div>

              <div className="flex md:hidden gap-6 items-center justify-center">
                <Button className="bg-teal-100 hover:bg-teal-50 text-amber-900">
                  Add to cart
                </Button>
                <Button className="bg-red-100 hover:bg-red-50 text-amber-900">
                  Delete from wish list
                </Button>
              </div>
            </TableCell>

            <TableCell>
              <div className="font-bold text-teal-600 text-xl hidden lg:flex">
                13.99$
              </div>
            </TableCell>
            <TableCell>
              <div className="hidden md:flex gap-6 items-center justify-center">
                <Button className="bg-teal-100 hover:bg-teal-50 text-amber-900">
                  Add to cart
                </Button>
                <Button className="bg-red-100 hover:bg-red-50 text-amber-900">
                  Delete from wish list
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
