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

      <div className="flex flex-wrap justify-center gap-6">
        {genres.map(({ name, icon: Icon }) => (
          <Card
            key={name}
            className="w-36 h-36 bg-amber-200 shadow-xl flex flex-col items-center transition-all hover:scale-105 hover:bg-amber-300 active:scale-95 active:bg-amber-400"
          >
            <Link
              href={`/genre/${name}`}
              className="flex flex-col items-center w-full h-full group"
            >
              <CardHeader className="items-center p-5">
                <Icon
                  size={60}
                  className="text-amber-600 transition-transform duration-300 group-hover:rotate-12"
                />
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
