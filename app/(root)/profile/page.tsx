import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GoCheckCircleFill } from "react-icons/go";
import { BsClipboardCheck } from "react-icons/bs";
import { LuPackageCheck } from "react-icons/lu";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GoCheckCircle } from "react-icons/go";
import { Separator } from "@/components/ui/separator";

const stages = [
  { label: "Order Placed", icon: <BsClipboardCheck size={24} /> },
  { label: "Processing", icon: <LuPackageCheck size={24} /> },
  { label: "Shipped", icon: <LiaShippingFastSolid size={24} /> },
  { label: "Delivered", icon: <GoCheckCircle size={24} /> },
];

const OrderProcessingChart = ({ currentStage }) => {
  return (
    <div className="flex justify-between items-center w-full p-4 bg-amber-50 rounded-lg">
      {stages.map((stage, index) => (
        <>
          <div key={index} className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                index <= currentStage
                  ? "bg-lime-400 text-lime-900"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {stage.icon}
            </div>
            <span
              className={`mt-2 text-sm whitespace-nowrap ${
                index <= currentStage ? "text-lime-700" : "text-gray-500"
              }`}
            >
              {stage.label}
            </span>
          </div>
          {index < stages.length - 1 && (
            <Separator orientation="horizontal" className="shrink" />
          )}
        </>
      ))}
    </div>
  );
};

export default function Profile() {
  const currentStage = 1;

  return (
    <div className="mt-[160px] lg:px-20 px-2 md:flex md:flex-row flex flex-col gap-4 mb-6 justify-center items-start">
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
