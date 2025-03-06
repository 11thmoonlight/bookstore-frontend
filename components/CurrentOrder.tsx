import React from "react";
import OrderProcessingChart from "@/components/OrderProcessingChart";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { TabsContent } from "@radix-ui/react-tabs";
import { useFetchOrder } from "@/hooks/useOrder";
import { useUser } from "@/context/userContext";
import { stages } from "@/components/OrderProcessingChart";
import Loader from "./custom/Loader";
import ErrorMessage from "./custom/ErrorMessage";

const CurrentOrderTab: React.FC = () => {
  const { user } = useUser();
  const { order, loading, error } = useFetchOrder(
    user?.orders[0]?.documentId || ""
  );

  console.log("user", user?.orders);

  console.log("order", order);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;
  if (!order?.cart_items) {
    return (
      <TabsContent
        className="text-center min-h-[250px] rounded-lg border-1 border-2 border-gray-100 border-solid"
        value="current"
      >
        <ErrorMessage message="You have no new order !" />
      </TabsContent>
    );
  }

  const formattedDate = formatDate(order?.createdAt ?? "");

  const currentStatus = order?.orderStatus || "order placed";
  const currentStage = stages.findIndex(
    (stage) => stage.status === currentStatus
  );

  const totalItems =
    order?.cart_items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const discounts =
    order?.cart_items
      ?.reduce(
        (sum, item) =>
          sum + (item.product ? item.product.discount * item.quantity : 0),
        0
      )
      .toFixed(2) || "0.00";

  return (
    <TabsContent
      className="text-center min-h-[250px] rounded-lg border-1 border-2 border-gray-100 border-solid"
      value="current"
    >
      <OrderProcessingChart currentStage={currentStage} />

      <div className="flex flex-col p-7 gap-6">
        <div className="flex flex-col justify-between gap-10 lg:flex-row">
          <div className="flex flex-col gap-5 w-full bg-stone-50 dark:bg-stone-700 p-5 rounded-lg overflow-x-auto scrollbar-thin">
            <p className="flex gap-2 whitespace-nowrap">
              <span className="font-bold">Submission Time:</span>
              <p>{formattedDate}</p>
            </p>
            <p className="flex gap-2 whitespace-nowrap">
              <span className="font-bold">Total Cost:</span>
              <span>$ {order.payAmount}</span>
            </p>
            <p className="flex gap-2 whitespace-nowrap">
              <span className="font-bold">Discount:</span>
              <span>$ {discounts}</span>
            </p>
            <p className="flex gap-2 whitespace-nowrap">
              <span className="font-bold">Total Items:</span>
              <span>{totalItems}</span>
            </p>
          </div>

          <div className="flex flex-col gap-5 w-full bg-stone-50 dark:bg-stone-700 p-5 rounded-lg overflow-x-auto scrollbar-thin">
            <p className="flex gap-2 whitespace-nowrap">
              <span className="font-bold">Address:</span>
              <span>{order?.address}</span>
            </p>

            <p className="flex gap-2 whitespace-nowrap">
              <span className="font-bold">Postal Code:</span>
              <span>{order?.postalCode}</span>
            </p>

            <p className="flex gap-2 whitespace-nowrap">
              <span className="font-bold">Email Address:</span>
              <span>{order?.emailAddress}</span>
            </p>

            <p className="flex gap-2 whitespace-nowrap">
              <span className="font-bold">Phone Number:</span>
              <span>{order?.phoneNumber}</span>
            </p>
          </div>
        </div>

        <Separator orientation="horizontal" />

        <div className="flex gap-10 overflow-x-auto scrollbar-thin">
          {order.cart_items.map((item) => (
            <div key={item.id} className="flex flex-col gap-4">
              <Image
                src={`http://localhost:1337${item.product.image[0].url}`}
                alt="book image cover"
                width={80}
                height={80}
              />
              <div className="text-sm text-stone-400">
                {item.quantity} copies
              </div>
            </div>
          ))}
        </div>
      </div>
    </TabsContent>
  );
};

export default CurrentOrderTab;
