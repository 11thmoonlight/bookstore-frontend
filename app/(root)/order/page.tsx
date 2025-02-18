"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GoCheckCircleFill } from "react-icons/go";
import { BsClipboardCheck } from "react-icons/bs";
import { LuPackageCheck } from "react-icons/lu";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GoCheckCircle } from "react-icons/go";
import { Separator } from "@/components/ui/separator";
import { useFetchOrder } from "@/hooks/useOrder";
import { useUser } from "@/context/userContext";
import { formatDate } from "@/lib/utils";
import { useCartManager } from "@/hooks/useCartManager";
import Image from "next/image";

const stages = [
  {
    label: "Order Placed",
    icon: (size) => <BsClipboardCheck size={size} />,
    status: "order placed",
  },
  {
    label: "Processing",
    icon: (size) => <LuPackageCheck size={size} />,
    status: "processing",
  },
  {
    label: "Shipped",
    icon: (size) => <LiaShippingFastSolid size={size} />,
    status: "shipped",
  },
  {
    label: "Delivered",
    icon: (size) => <GoCheckCircle size={size} />,
    status: "delivered",
  },
];

const OrderProcessingChart = ({ currentStage }) => {
  return (
    <div className="flex justify-between items-center w-full p-4 bg-amber-50 dark:bg-stone-900 rounded-lg">
      {stages.map((stage, index) => (
        <>
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center rounded-full transition-all
                w-8 h-8 text-[20px] sm:w-12 sm:h-12 sm:text-[24px]
                ${
                  index <= currentStage
                    ? "bg-lime-400 text-lime-900"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {stage.icon(20)}
              </div>
              <span
                className={`mt-2 text-xs sm:text-xs whitespace-nowrap transition-all
                ${index <= currentStage ? "text-lime-700" : "text-gray-500"}`}
              >
                {stage.label}
              </span>
            </div>
          </div>
          {index < stages.length - 1 && (
            <Separator
              orientation="horizontal"
              className="flex-1 mx-2 bg-gray-300 dark:bg-gray-600 h-[2px]"
            />
          )}
        </>
      ))}
    </div>
  );
};

export default function Order() {
  const { user } = useUser();
  const { order, loading, error } = useFetchOrder(
    user?.orders[0]?.documentId || ""
  );

  const {
    totalPrice,
    cart,
    quantities,
    handleIncreaseItem,
    handleDecreaseItem,
    totalItems,
    discounts,
  } = useCartManager();

  const formattedDate = formatDate(order?.createdAt);

  console.log("order", order);

  // Find the current status of the order
  const currentStatus = order?.orderStatus || "order placed"; // Default to "order placed" if not available
  const currentStage = stages.findIndex(
    (stage) => stage.status === currentStatus
  ); // Get the stage index based on the status

  return (
    <div className="mt-[160px] md:px-20 px-2 md:flex md:flex-row flex flex-col gap-4 mb-6 justify-center items-start text-sm md:text-base">
      <Tabs defaultValue="current" className="w-full">
        <TabsList className="w-full bg-amber-700 text-amber-50">
          <TabsTrigger value="current">Current Order</TabsTrigger>
          <TabsTrigger value="delivered">Delivered Order</TabsTrigger>
        </TabsList>
        <TabsContent
          className="text-center min-h-[250px] rounded-lg border-1 border-2 border-gray-100 border-solid"
          value="current"
        >
          <OrderProcessingChart currentStage={currentStage} />

          <div className="flex flex-col p-7 gap-6">
            <div className="flex flex-col justify-between gap-10 lg:flex-row">
              <div className="flex flex-col gap-5 w-full bg-stone-50 dark:bg-stone-700 p-5 rounded-lg overflow-x-auto scrollbar-thin">
                <p className="flex gap-2 whitespace-nowrap">
                  <span>Submission Time:</span>
                  <p>{formattedDate}</p>
                </p>
                <p className="flex gap-2 whitespace-nowrap">
                  <span>Total Cost:</span>
                  <span>$ {totalPrice}</span>
                </p>
                <p className="flex gap-2 whitespace-nowrap">
                  <span>Discount:</span>
                  <span>$ {discounts}</span>
                </p>
                <p className="flex gap-2 whitespace-nowrap">
                  <span>Total Items:</span>
                  <span>{totalItems}</span>
                </p>
              </div>

              <div className="flex flex-col gap-5 w-full bg-stone-50 dark:bg-stone-700 p-5 rounded-lg overflow-x-auto scrollbar-thin">
                <p className="flex gap-2 whitespace-nowrap">
                  <span>Address:</span>
                  <span className="">{order?.address}</span>
                </p>

                <p className="flex gap-2 whitespace-nowrap">
                  <span>Postal Code:</span>
                  <span>{order?.postalCode}</span>
                </p>

                <p className="flex gap-2 whitespace-nowrap">
                  <span>Email Address:</span>
                  <p>{order?.emailAddress}</p>
                </p>

                <p className="flex gap-2 whitespace-nowrap">
                  <span>Phone Number:</span>
                  <span>{order?.phoneNumber}</span>
                </p>
              </div>
            </div>

            <Separator orientation="horizontal" />

            <div className="flex gap-10 overflow-x-auto scrollbar-thin">
              {cart?.products.map((item) => (
                <div key={item.id}>
                  <Image
                    src={`http://localhost:1337${item.image[0].url}`}
                    alt="book image cover"
                    width={80}
                    height={80}
                  />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent
          className="text-center min-h-[250px] rounded-lg border-2 border-gray-100 border-solid"
          value="delivered"
        >
          <div className="flex flex-col p-7 gap-6">
            <div className="flex gap-3 items-center">
              <GoCheckCircleFill size={27} fill="#84cc16" />
              <span className="font-bold">Delivered</span>
            </div>
            <div className="flex gap-6">
              <p>2023/03/16</p>
              <p className="flex gap-2">
                <span>Total Cost:</span>
                <span>34$</span>
              </p>
              <p className="flex gap-2">
                <span>Discount</span>
                <span>3.4$</span>
              </p>
              <p className="flex gap-2">
                <span>Total Items:</span>
                <span>3</span>
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
