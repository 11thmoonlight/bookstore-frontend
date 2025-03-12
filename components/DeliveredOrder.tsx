import { useUser } from "@/context/userContext";
import { useFetchDelivered } from "@/hooks/useOrder";
import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import { GoCheckCircleFill } from "react-icons/go";
import Loader from "./custom/Loader";
import ErrorMessage from "./custom/ErrorMessage";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { Separator } from "./ui/separator";

const DeliveredOrderTab: React.FC = () => {
  const { user } = useUser();
  const { order, loading, error } = useFetchDelivered(user?.id || 0);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;
  if (!order || order.length === 0) {
    return (
      <TabsContent
        value="delivered"
        className="text-center min-h-[250px] rounded-lg border-2 border-gray-100 border-solid"
      >
        <ErrorMessage message="You have no delivered order !" />
      </TabsContent>
    );
  }

  return (
    <div>
      {order?.map((item) => {
        const totalItems =
          item.cart_items?.reduce(
            (sum, cartItem) => sum + cartItem.quantity,
            0
          ) || 0;

        const discounts =
          item.cart_items
            ?.reduce(
              (sum, cartItem) =>
                sum +
                (cartItem.product
                  ? cartItem.product.discount * cartItem.quantity
                  : 0),
              0
            )
            .toFixed(2) || "0.00";

        return (
          <>
            <TabsContent
              className="text-center min-h-[250px] rounded-lg border-2 border-gray-100 border-solid"
              value="delivered"
              key={item.id}
            >
              <div className="flex flex-col p-7 gap-6">
                <div className="flex gap-3 items-center">
                  <GoCheckCircleFill size={27} fill="#84cc16" />
                  <span className="font-bold">Delivered</span>
                </div>
                <div className="flex gap-6">
                  <p>{formatDate(item.updatedAt)}</p>
                  <p className="flex gap-2">
                    <span>Total Cost:</span>
                    <span>$ {item.payAmount}</span>
                  </p>
                  <p className="flex gap-2">
                    <span>Discount</span>
                    <span>$ {discounts}</span>
                  </p>
                  <p className="flex gap-2">
                    <span>Total Items:</span>
                    <span>{totalItems}</span>
                  </p>
                </div>

                <div className="flex gap-10 overflow-x-auto scrollbar-thin">
                  {item.cart_items.map((item) => (
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
            <Separator orientation="horizontal" />
          </>
        );
      })}
    </div>
  );
};

export default DeliveredOrderTab;
