import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { IoStar } from "react-icons/io5";
import { IoStarHalf } from "react-icons/io5";

export default function Book() {
  return (
    <>
      <div className="flex gap-10 mt-[160px] mb-10 justify-center px-10">
        <div className="relative">
          <Image
            src="/img/harry.jpg"
            alt="book image cover"
            width={400}
            height={700}
          />
        </div>
        <div className="w-fit flex flex-col gap-3">
          <h2 className="font-bold text-2xl">
            Harry Potter And The Cursed Child
          </h2>
          <div className="text-lg flex gap-4 items-center">
            <Avatar>
              <AvatarImage src="/img/jkRowling.jpg" alt="writer image" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <p>By J.K. Rowling</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex">
              <IoStar className="text-amber-600" />
              <IoStar className="text-amber-600" />
              <IoStar className="text-amber-600" />
              <IoStar className="text-amber-600" />
              <IoStarHalf className="text-amber-600" />
            </div>

            <p>1,056,107 ratings</p>
          </div>

          <div className="text-sm">
            The eighth story, nineteen years later... It was always difficult
            being Harry Potter, and it isn't much easier now that he is an
            overworked employee of the Ministry of Magic, a husband, and a
            father of three school-age children. While Harry grapples with a
            past that refuses to stay where it belongs, his youngest son, Albus,
            must struggle with the weight of a family legacy he never wanted. As
            past and present fuse ominously, both father and son learn the
            uncomfortable truth: sometimes, darkness comes from unexpected
            places. Based on an original new story by J.K. Rowling, Jack Thorne,
            and John Tiffany, a new play by Jack Thorne, "Harry Potter and the
            Cursed Child" is the complete and official playscript of the
            original, award-winning West End production. This updated edition
            includes the final dialogue and stage directions, a conversation
            piece between director John Tiffany and playwright Jack Thorne, the
            Potter family tree, and a timeline of events in the wizarding world
            leading up to "Harry Potter and the Cursed Child."
          </div>

          <div className="w-48 flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="font-bold">Publisher</p>
              <p>Generic</p>
            </div>

            <div className="flex justify-between">
              <p className="font-bold">Publication Date</p>
              <p>2017</p>
            </div>

            <div className="flex justify-between">
              <p className="font-bold">Language</p>
              <p>English</p>
            </div>

            <div className="flex justify-between">
              <p className="font-bold">Pages</p>
              <p>670</p>
            </div>

            <div className="flex justify-between">
              <p className="font-bold">Genere</p>
              <p>Fantacy</p>
            </div>

            <div className="flex justify-between">
              <p className="font-bold">Price</p>
              <p className="text-teal-700 text-lg font-bold">13.99$</p>
            </div>
          </div>
          <Button className="w-96 bg-amber-800 text-base hover:bg-amber-700 font-bold text-amber-50">
            Add to cart
          </Button>
        </div>
      </div>
      {/* <Button>Add to cart</Button> */}
    </>
  );
}
