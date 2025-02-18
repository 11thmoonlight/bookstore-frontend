import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import { GoCheckCircleFill } from "react-icons/go";

const DeliveredOrderTab: React.FC = () => {
  return (
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
  );
};

export default DeliveredOrderTab;
