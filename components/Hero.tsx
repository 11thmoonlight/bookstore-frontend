import Image from "next/image";
import { MdAirplanemodeActive } from "react-icons/md";
import { MdPayments } from "react-icons/md";
import { MdHighQuality } from "react-icons/md";
import { MdAssignmentReturn } from "react-icons/md";

export default function Hero() {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "460px",
          position: "relative",
          marginTop: "120px",
        }}
      >
        <Image
          src="/img/hero3.png"
          fill
          style={{ objectFit: "cover" }}
          alt="hero"
          quality={100}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-10 px-6 justify-between">
        <div className="flex gap-3 items-center bg-cyan-50 dark:bg-cyan-900 pr-3 shadow-md rounded-md w-full">
          <MdAirplanemodeActive
            size={80}
            className="text-amber-600 shadow-2xl rounded-md p-2"
          />
          <div>
            <h1>Quick Delivery</h1>
            <span className="text-sm text-gray-400">whenever you choose</span>
          </div>
        </div>
        <div className="flex gap-3 items-center bg-cyan-50 dark:bg-cyan-900 pr-3 shadow-md rounded-md w-full">
          <MdPayments
            size={80}
            className="text-amber-600 shadow-2xl rounded-md p-2"
          />
          <div>
            <h1>Secure Payment</h1>
            <span className="text-sm text-gray-400">with different ways</span>
          </div>
        </div>
        <div className="flex gap-3 items-center bg-cyan-50 dark:bg-cyan-900 shadow-md pr-3 rounded-md w-full">
          <MdHighQuality
            size={80}
            className="text-amber-600 shadow-2xl rounded-md p-2"
          />
          <div>
            <h1>Best Quality</h1>
            <span className="text-sm text-gray-400">with guaranti</span>
          </div>
        </div>
        <div className="flex gap-3 items-center bg-cyan-50 dark:bg-cyan-900 pr-3 shadow-md rounded-md w-full">
          <MdAssignmentReturn
            size={80}
            className="text-amber-600 shadow-2xl rounded-md p-2"
          />
          <div>
            <h1>Return Guarantee</h1>
            <span className="text-sm text-gray-400">
              10-days hassle free returns
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
