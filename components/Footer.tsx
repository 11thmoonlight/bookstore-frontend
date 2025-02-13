import Image from "next/image";
import React from "react";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";

const footerSections = [
  {
    title: "Delivery",
    links: [
      "Cost of delivery",
      "Payment Method",
      "Delivery Areas",
      "Delivery Dates",
      "Complains & Return",
    ],
  },
  {
    title: "Discovery",
    links: [
      "Latest News & Blog",
      "My Checkout",
      "Return & Exchange",
      "Shipping & Delivery",
      "Track Your Order",
    ],
  },
  {
    title: "Quick Links",
    links: [
      "Privacy & Policy",
      "Pricing Plans",
      "Our Service",
      "Contact Us",
      "FAQ",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 bg-amber-100 dark:bg-stone-600 px-6 py-3 justify-between items-center border-dotted border-t-4 border-amber-600">
      <div className="flex flex-col gap-4 items-center">
        <div className="flex gap-1 items-center">
          <Image src="/img/logo2.png" width={80} height={80} alt="logo" />
          <h1 className="font-bold text-4xl font-mono text-amber-600">
            HINDOE BOOKS
          </h1>
        </div>
        <div className="flex gap-8 ml-16">
          {[
            FaSquareInstagram,
            FaSquareFacebook,
            FaSquareXTwitter,
            FaLinkedin,
          ].map((Icon, index) => (
            <Icon key={index} size={30} className="text-amber-700" />
          ))}
        </div>
      </div>

      {footerSections.map(({ title, links }) => (
        <div key={title} className="flex flex-col items-center">
          <h1 className="font-bold text-lg mb-2">{title}</h1>
          {links.map((link, index) => (
            <p key={index} className="text-sm">
              {link}
            </p>
          ))}
        </div>
      ))}
    </footer>
  );
}
