"use client";

import Image from "next/image";
import React from "react";
import { GoPerson } from "react-icons/go";
import { PiShoppingCartLight } from "react-icons/pi";
import { GoHeart } from "react-icons/go";
import { Input } from "./ui/input";
import Link from "next/link";
import { IoIosLogIn } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";
import { logoutAction } from "@/data/actions/auth-actions";
import { LogOut } from "lucide-react";
import { useUser } from "@/context/userContext";
import Search from "./Search";

export default function Header() {
  const { user } = useUser();

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
        <div className="flex justify-between items-center px-4 md:px-6 border-b-2">
          <div className="flex gap-1 items-center w-[400px]">
            <Image src="/img/logo2.png" alt="logo" width={80} height={80} />
            <h1 className="font-bold text-4xl font-mono text-amber-600 ">
              HINDOE
            </h1>
          </div>

          <Search />

          <div className="gap-4 flex items-center w-[400px] justify-end">
            {user ? (
              <Menubar className="border-none shadow-none p-0">
                <MenubarMenu>
                  <MenubarTrigger className="p-0">
                    <GoPerson size={34} />
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      <Link
                        href="/wishlist"
                        className="flex items-center gap-4 w-full"
                      >
                        <GoHeart size={27} />
                        <span>Wish List</span>
                      </Link>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      <Link
                        href="/cart"
                        className="flex items-center gap-4 w-full"
                      >
                        <PiShoppingCartLight size={27} />
                        <span>Cart</span>
                      </Link>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      <Link href="/" className="flex items-center gap-4 w-full">
                        <IoSettingsOutline size={27} />
                        <span>Settings</span>
                      </Link>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      <form action={logoutAction}>
                        <button
                          type="submit"
                          className="flex items-center gap-4 w-full"
                        >
                          <LogOut className="w-6 h-6 hover:text-primary" />
                          Log out
                        </button>
                      </form>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            ) : (
              <Link href="/register" className="flex justify-between">
                Sign up
                <IoIosLogIn size={27} />
              </Link>
            )}
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
