import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import AddToCartButton from "@/components/AddToCartButton";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import { Button } from "./ui/button";

interface BookCardProps {
  book: {
    id: number;
    documentId: string;
    name: string;
    author: string;
    price: number;
    image: { url: string }[];
  };
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-80 h-[420px] shadow-2xl bg-stone-100 dark:bg-stone-700 flex flex-col justify-around items-center">
        <CardHeader className="relative flex justify-center items-center mt-3 h-[200px] w-[130px]">
          <Image
            src={`http://localhost:1337${book.image[0].url}`}
            fill
            alt="book cover image"
            className="absolute shadow-xl object-cover"
          />
        </CardHeader>

        <CardTitle className="text-base text-center">{book.name}</CardTitle>
        <CardDescription className="text-center">{book.author}</CardDescription>
        <CardContent className="font-bold text-lg text-center text-lime-600">
          {book.price} $
        </CardContent>

        <CardFooter className="flex justify-around items-center w-full">
          <AddToWishlistButton productId={book.documentId} variant="icon" />
          <Button className="bg-amber-800 text-base hover:bg-amber-700 transition-all hover:scale-105 active:scale-95 active:bg-amber-600">
            <Link href={`/book/${book.documentId}`} className="w-full">
              More Details
            </Link>
          </Button>

          <AddToCartButton productId={book.documentId} variant="icon" />
        </CardFooter>
      </Card>
    </motion.div>
  );
}
