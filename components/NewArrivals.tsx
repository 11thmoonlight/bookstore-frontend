import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { GoHeart } from "react-icons/go";
import { PiShoppingCartLight } from "react-icons/pi";
import { Button } from "./ui/button";
import { getBooks } from "@/data/services/get-books";

export default async function NewArrivals() {
  const books = await getBooks();
  // console.log("books", books);
  // const genre = await getBooksByGenre("Horror");
  // console.log("genre", genre!.data[0].id);
  return (
    <div className="px-6 mb-28 mt-14">
      <div className="flex items-center justify-center w-full my-8">
        <div className="flex-grow border-t border-gray-300 border-2 border-dashed" />
        <h1 className="mx-4 text-3xl font-bold text-center text-amber-600 font-mono">
          New Arrivals
        </h1>
        <div className="flex-grow border-t border-gray-300 border-2 border-dashed" />
      </div>

      <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Card className="w-80 h-[420px] shadow-2xl bg-stone-100">
          <CardHeader className="items-center p-5">
            <Image
              src="/img/harry.jpg"
              height={160}
              width={160}
              alt="book cover image"
              className="shadow-xl"
            />
          </CardHeader>
          <CardTitle className="text-base text-center">
            {books.data[0].name}
          </CardTitle>
          <CardDescription className="text-center">
            {books.data[0].author}
          </CardDescription>
          <CardContent className="font-bold text-lg text-center text-teal-600">
            23 $
          </CardContent>
          <CardFooter className="flex justify-around items-center">
            <GoHeart size={27} />
            <Button className="bg-amber-800 text-base hover:bg-amber-700">
              More Details
            </Button>
            <PiShoppingCartLight size={27} />
          </CardFooter>
        </Card>
        <Card className="w-80 h-[420px] shadow-2xl bg-stone-100">
          <CardHeader className="items-center p-5">
            <Image
              src="/img/harry.jpg"
              height={160}
              width={160}
              alt="book cover image"
              className="shadow-xl"
            />
          </CardHeader>
          <CardTitle className="text-base text-center">
            Harry Potter and cursed child
          </CardTitle>
          <CardDescription className="text-center">J.K rowling</CardDescription>
          <CardContent className="font-bold text-lg text-center text-teal-600">
            23 $
          </CardContent>
          <CardFooter className="flex justify-around items-center">
            <GoHeart size={27} />
            <Button className="bg-amber-800 text-base hover:bg-amber-700">
              More Details
            </Button>
            <PiShoppingCartLight size={27} />
          </CardFooter>
        </Card>
        <Card className="w-80 h-[420px] shadow-2xl bg-stone-100">
          <CardHeader className="items-center p-5">
            <Image
              src="/img/harry.jpg"
              height={160}
              width={160}
              alt="book cover image"
              className="shadow-xl"
            />
          </CardHeader>
          <CardTitle className="text-base text-center">
            Harry Potter and cursed child
          </CardTitle>
          <CardDescription className="text-center">J.K rowling</CardDescription>
          <CardContent className="font-bold text-lg text-center text-teal-600">
            23 $
          </CardContent>
          <CardFooter className="flex justify-around items-center">
            <GoHeart size={27} />
            <Button className="bg-amber-800 text-base hover:bg-amber-700">
              More Details
            </Button>
            <PiShoppingCartLight size={27} />
          </CardFooter>
        </Card>
        <Card className="w-80 h-[420px] shadow-2xl bg-stone-100">
          <CardHeader className="items-center p-5">
            <Image
              src="/img/harry.jpg"
              height={160}
              width={160}
              alt="book cover image"
              className="shadow-xl"
            />
          </CardHeader>
          <CardTitle className="text-base text-center">
            Harry Potter and cursed child
          </CardTitle>
          <CardDescription className="text-center">J.K rowling</CardDescription>
          <CardContent className="font-bold text-lg text-center text-teal-600">
            23 $
          </CardContent>
          <CardFooter className="flex justify-around items-center">
            <GoHeart size={27} />
            <Button className="bg-amber-800 text-base hover:bg-amber-700">
              More Details
            </Button>
            <PiShoppingCartLight size={27} />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
