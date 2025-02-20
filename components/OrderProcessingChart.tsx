import React from "react";
import { Separator } from "@/components/ui/separator";
import { GoCheckCircle } from "react-icons/go";
import { BsClipboardCheck } from "react-icons/bs";
import { LuPackageCheck } from "react-icons/lu";
import { LiaShippingFastSolid } from "react-icons/lia";

interface Stage {
  label: string;
  icon: (size: number) => JSX.Element;
  status: string;
}

export const stages: Stage[] = [
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

interface OrderProcessingChartProps {
  currentStage: number;
}

const OrderProcessingChart: React.FC<OrderProcessingChartProps> = ({
  currentStage,
}) => {
  return (
    <div className="flex justify-between items-center w-full p-4 bg-amber-50 dark:bg-stone-900 rounded-lg">
      {stages.map((stage, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center">
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
                className={`mt-2 text-xs sm:text-sm whitespace-nowrap transition-all font-semibold
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
        </React.Fragment>
      ))}
    </div>
  );
};

export default OrderProcessingChart;
