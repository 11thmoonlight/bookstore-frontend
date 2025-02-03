import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { GrAdd } from "react-icons/gr";
import { FaMinus } from "react-icons/fa6";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface CartTableProps {
  quantities: { [key: string]: number };
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  cart: CartItems;
}

const CartTable: React.FC<CartTableProps> = ({
  cart,
  quantities,
  onAdd,
  onRemove,
}) => {
  return (
    <div className="flex flex-col gap-8">
      {cart?.products.map((item) => (
        <Table key={item.id}>
          <TableBody>
            <TableRow>
              <TableCell className="flex gap-4 items-center">
                <Image
                  src={`http://localhost:1337${item.image[0].url}`}
                  alt="book image cover"
                  width={110}
                  height={210}
                />

                <div className="flex flex-col justify-between gap-4">
                  <div className="flex flex-col gap-2 justify-center">
                    <p className="md:font-bold lg:text-lg font-semibold text-base text-amber-950">
                      {item.name}
                    </p>
                    <p className="text-amber-950">By {item.author}</p>
                    <p className="font-bold text-lime-600 text-lg lg:text-2xl">
                      {item.price}$
                    </p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Button
                      onClick={() => onRemove(item.documentId)}
                      className="bg-white hover:bg-amber-50 rounded-full"
                    >
                      <FaMinus size={18} className="text-amber-800" />
                    </Button>
                    <p className="text-amber-950 text-lg">
                      {quantities[item.documentId]}
                    </p>
                    <Button
                      onClick={() => onAdd(item.documentId)}
                      className="bg-white hover:bg-amber-50 rounded-full"
                      disabled={quantities[item.documentId] >= item.stock}
                    >
                      <GrAdd size={18} className="text-amber-800" />
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </div>
  );
};

export default CartTable;
