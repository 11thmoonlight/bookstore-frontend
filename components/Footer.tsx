import Image from "next/image";
import React from "react";
import { Separator } from "./ui/separator";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 bg-amber-100 px-6 py-3 justify-between items-center border-dotted border-t-4 border-amber-600">
      <div className="flex flex-col gap-4 items-center">
        <div className="flex gap-1 items-center">
          <Image src="/img/logo2.png" width={80} height={80} alt="logo" />
          <h1 className="font-bold text-4xl font-mono text-amber-600">
            HINDOE BOOKS
          </h1>
        </div>
        <div className="flex gap-8 ml-16">
          <FaSquareInstagram size={30} className="text-amber-700" />
          <FaSquareFacebook size={30} className="text-amber-700" />
          <FaSquareXTwitter size={30} className="text-amber-700" />
          <FaLinkedin size={30} className="text-amber-700" />
        </div>
      </div>
      {/* <Separator orientation="vertical" /> */}
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-lg mb-4">Delivery</h1>
        <p className="text-sm">Cost of delivery</p>
        <p className="text-sm">Payment Method</p>
        <p className="text-sm">Delivery Areas</p>
        <p className="text-sm">Delivery Dates</p>
        <p className="text-sm">Complains & Return</p>
      </div>
      {/* <Separator orientation="vertical" /> */}
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-lg mb-4">Discovery</h1>
        <p className="text-sm">Latest News & Blog</p>
        <p className="text-sm">My Checkout</p>
        <p className="text-sm">Return & Exchange</p>
        <p className="text-sm">Shipping & Delivery</p>
        <p className="text-sm">Track Your Order</p>
      </div>
      {/* <Separator orientation="vertical" /> */}
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-lg mb-4">Quick Links</h1>
        <p className="text-sm">Privacy & Policy</p>
        <p className="text-sm">Pricing Plans</p>
        <p className="text-sm">Our Service</p>
        <p className="text-sm">Contact Us</p>
        <p className="text-sm">FAQ</p>
      </div>
    </footer>
  );
}
