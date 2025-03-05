"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CurrentOrderTab from "@/components/CurrentOrder";
import DeliveredOrderTab from "@/components/DeliveredOrder";

const Order: React.FC = () => {
  return (
    <div className="mt-[160px] md:px-20 px-2 md:flex md:flex-row flex flex-col gap-4 mb-6 justify-center items-start text-sm md:text-base">
      <Tabs defaultValue="current" className="w-full">
        <TabsList className="w-full bg-amber-700 text-amber-50">
          <TabsTrigger value="current">Current Order</TabsTrigger>
          <TabsTrigger value="delivered">Delivered Order</TabsTrigger>
        </TabsList>

        <CurrentOrderTab />
        <DeliveredOrderTab />
      </Tabs>
    </div>
  );
};

export default Order;
