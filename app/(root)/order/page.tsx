"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFetchOrder } from "@/hooks/useOrder";
import { useUser } from "@/context/userContext";
import { formatDate } from "@/lib/utils";
import CurrentOrderTab from "@/components/CurrentOrder";
import DeliveredOrderTab from "@/components/DeliveredOrder";
import { stages } from "@/components/OrderProcessingChart";
import Loader from "@/components/custom/Loader";
import ErrorMessage from "@/components/custom/ErrorMessage";

const Order: React.FC = () => {
  const { user } = useUser();

  const { order, loading, error } = useFetchOrder(
    user?.orders[0]?.documentId || ""
  );

  const formattedDate = formatDate(order?.createdAt ?? "");

  const currentStatus = order?.orderStatus || "order placed";
  const currentStage = stages.findIndex(
    (stage) => stage.status === currentStatus
  );

  console.log(order);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <div className="mt-[160px] md:px-20 px-2 md:flex md:flex-row flex flex-col gap-4 mb-6 justify-center items-start text-sm md:text-base">
      <Tabs defaultValue="current" className="w-full">
        <TabsList className="w-full bg-amber-700 text-amber-50">
          <TabsTrigger value="current">Current Order</TabsTrigger>
          <TabsTrigger value="delivered">Delivered Order</TabsTrigger>
        </TabsList>

        {order && (
          <CurrentOrderTab
            order={order}
            currentStage={currentStage}
            formattedDate={formattedDate}
          />
        )}
        <DeliveredOrderTab />
      </Tabs>
    </div>
  );
};

export default Order;
