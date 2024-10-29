import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { GiMagicGate } from "react-icons/gi";
import { GiArrest } from "react-icons/gi";
import { GiThreeKeys } from "react-icons/gi";
import { GiSpectre } from "react-icons/gi";
import { GiLovers } from "react-icons/gi";
import { GiRiceCooker } from "react-icons/gi";
import { GiMountedKnight } from "react-icons/gi";
import { GiPaintBrush } from "react-icons/gi";
import { MdPsychology } from "react-icons/md";
import { GiRollingSuitcase } from "react-icons/gi";
import { TbBusinessplan } from "react-icons/tb";
import { GiAnatomy } from "react-icons/gi";
import { FaFaceLaughBeam } from "react-icons/fa6";
import { GiSkier } from "react-icons/gi";
import { TbMoodKid } from "react-icons/tb";
import { GiMaterialsScience } from "react-icons/gi";
import Link from "next/link";

export default function Categories() {
  const genres = [
    { name: "Fantacy", icon: GiMagicGate },
    { name: "Thriller", icon: GiArrest },
    { name: "Mystery", icon: GiThreeKeys },
    { name: "Horror", icon: GiSpectre },
    { name: "Romance", icon: GiLovers },
    { name: "Cooking", icon: GiRiceCooker },
    { name: "History", icon: GiMountedKnight },
    { name: "Art", icon: GiPaintBrush },
    { name: "Self-help", icon: MdPsychology },
    { name: "Travel", icon: GiRollingSuitcase },
    { name: "Business", icon: TbBusinessplan },
    { name: "Health", icon: GiAnatomy },
    { name: "Comedy", icon: FaFaceLaughBeam },
    { name: "Sport", icon: GiSkier },
    { name: "Children", icon: TbMoodKid },
    { name: "Science", icon: GiMaterialsScience },
  ];
  return (
    <div className="px-6 mb-28 mt-14">
      <div className="flex items-center justify-center w-full my-8">
        <div className="flex-grow border-t border-gray-300 border-2 border-dashed" />
        <h1 className="mx-4 text-3xl font-bold text-center text-amber-600 font-mono">
          VIEW ALL CATEGORIES
        </h1>
        <div className="flex-grow border-t border-gray-300 border-2 border-dashed" />
      </div>

      <div className="grid lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-4 grid-cols-2 gap-6 place-items-center">
        {genres.map(({ name, icon: Icon }) => (
          <Card key={name} className="w-36 h-36 bg-amber-200 shadow-xl">
            <Link href={`/genre/${name}`}>
              <CardHeader className="items-center p-5">
                <Icon size={60} className="text-amber-600" />
              </CardHeader>
              <CardContent className="font-bold text-lg text-center text-amber-800">
                {name}
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
