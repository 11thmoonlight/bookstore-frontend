import Image from "next/image";
import React from "react";
import { GoPerson } from "react-icons/go";
import { PiShoppingCartLight } from "react-icons/pi";
import { IoSearchOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { Input } from "./ui/input";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { IoReorderThreeOutline } from "react-icons/io5";

export default function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
        <div className="flex justify-between items-center px-4 md:px-6 border-b-2">
          <div className="flex gap-1 items-center">
            <Image src="/img/logo2.png" alt="logo" width={80} height={80} />
            <h1 className="font-bold text-4xl font-mono text-amber-600 ">
              HINDOE
            </h1>
          </div>
          <div className="relative hidden md:inline-block md:w-[260px] lg:w-[400px]">
            <Input type="text" placeholder="Search..." />
            <button className="block w-7 h-7 text-center text-xl leading-0 absolute top-1 right-1 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors">
              <i>
                <IoSearchOutline size={20} />
              </i>
            </button>
          </div>
          <div className="gap-4 pl-14 hidden md:flex">
            <Link href="/register">
              <GoPerson size={27} />
            </Link>

            <Link href="/wishlist">
              <GoHeart size={27} />
            </Link>

            <Link href="/cart">
              <PiShoppingCartLight size={27} />
            </Link>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="border-none">
                  <IoReorderThreeOutline size={30} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Hinode bookstore</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="relative w-full">
                    <Input type="text" placeholder="Search..." />
                    <button className="block w-7 h-7 text-center text-xl leading-0 absolute top-1 right-1 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors">
                      <i>
                        <IoSearchOutline size={20} />
                      </i>
                    </button>
                  </div>
                  <Link href="/sign-up" className="flex justify-between">
                    Account
                    <GoPerson size={27} />
                  </Link>

                  <Link href="/wishlist" className="flex justify-between">
                    Wishlist
                    <GoHeart size={27} />
                  </Link>

                  <Link href="/cart" className="flex justify-between">
                    Cart
                    <PiShoppingCartLight size={27} />
                  </Link>
                </div>
                <SheetFooter></SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="flex justify-center items-center gap-8 py-2 ">
          <Link href="/">Home</Link>
          <Link href="/">shop</Link>
          <Link href="/">Articles</Link>
          <Link href="/">FAQ</Link>
        </div>
      </header>
    </>
  );
}
