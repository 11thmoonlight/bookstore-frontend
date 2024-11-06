"use client";

import React, { useEffect, useState } from "react";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { GrAdd } from "react-icons/gr";
import { FaMinus } from "react-icons/fa6";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCart } from "@/data/services/cart-services";
import { useUser } from "@/context/userContext";

export default function Cart() {
  const { user } = useUser();
  console.log(typeof user?.data);

  return (
    <div className="mt-[160px] lg:px-20 px-2 md:flex md:flex-row flex flex-col gap-4 mb-6 justify-center items-center">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="flex gap-4 items-center">
              <Image
                src="/img/harry.jpg"
                alt="book image cover"
                width={110}
                height={210}
              />
              <div className="flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2 justify-center">
                  <p className="md:font-bold lg:text-lg font-semibold text-base">
                    {}
                  </p>
                  <p>By J.K. Rowling</p>
                  <p className="font-bold text-teal-600 text-lg lg:text-2xl">
                    27.98$
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <Button className="bg-white hover:bg-amber-50 rounded-full">
                    <FaMinus size={18} className="text-amber-800" />
                  </Button>
                  <p>2</p>
                  <Button className="bg-white hover:bg-amber-50 rounded-full">
                    <GrAdd size={18} className="text-amber-800" />
                  </Button>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Card className="bg-amber-50 w-full md:w-96 h-fit">
        <CardHeader>
          <CardTitle className="pb-4 text-amber-800 border-b-2">
            Order Summery
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <p className="text-amber-800 text-sm">ITEMS</p>
              <p className="text-amber-800 text-sm">2</p>
            </div>

            <div className="flex justify-between">
              <p className="text-amber-800 text-sm">Delivery</p>
              <p className="text-amber-800 text-sm">1.25$</p>
            </div>

            <div className="flex justify-between">
              <p className="text-amber-800 text-sm">Discount</p>
              <p className="text-amber-800 text-sm">0</p>
            </div>

            <div className="flex justify-between my-4 bg-stone-200 p-2 rounded-md">
              <p className="text-amber-800 text-base">Total</p>
              <p className="text-lg text-teal-600 font-semibold">29.23$</p>
            </div>
          </div>
        </CardContent>
        <Button className="w-full bg-teal-700 hover:bg-teal-600 font-bold text-teal-50 text-lg py-6">
          Accept and Continue
        </Button>
      </Card>
    </div>
  );
}
