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

export default function Categories() {
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
        <Card className="w-36 h-36 bg-amber-200 shadow-xl">
          <CardHeader className="items-center p-5">
            <GiMagicGate size={60} className="text-amber-600" />
          </CardHeader>
          <CardContent className="font-bold text-lg text-center text-amber-800">
            Fantacy
          </CardContent>
        </Card>
        <Card className="w-36 h-36 bg-amber-200 shadow-xl">
          <CardHeader className="items-center p-5">
            <GiArrest size={60} className="text-amber-600" />
          </CardHeader>
          <CardContent className="font-bold text-lg text-center text-amber-800">
            Thriller
          </CardContent>
        </Card>
        <Card className="w-36 h-36 bg-amber-200 shadow-xl">
          <CardHeader className="items-center p-5">
            <GiThreeKeys size={60} className="text-amber-600" />
          </CardHeader>
          <CardContent className="font-bold text-lg text-center text-amber-800">
            Mystery
          </CardContent>
        </Card>
        <Card className="w-36 h-36 bg-amber-200 shadow-xl">
          <CardHeader className="items-center p-5">
            <GiSpectre size={60} className="text-amber-600" />
          </CardHeader>
          <CardContent className="font-bold text-lg text-center text-amber-800">
            Horror
          </CardContent>
        </Card>
        <Card className="w-36 h-36 bg-amber-200 shadow-xl">
          <CardHeader className="items-center p-5">
            <GiLovers size={60} className="text-amber-600" />
          </CardHeader>
          <CardContent className="font-bold text-lg text-center text-amber-800">
            Romance
          </CardContent>
        </Card>
        <Card className="w-36 h-36 bg-amber-200 shadow-xl">
          <CardHeader className="items-center p-5">
            <GiRiceCooker size={60} className="text-amber-600" />
          </CardHeader>
          <CardContent className="font-bold text-lg text-center text-amber-800">
            Cooking
          </CardContent>
        </Card>
        <Card className="w-36 h-36 bg-amber-200 shadow-xl">
          <CardHeader className="items-center p-5">
            <GiMountedKnight size={60} className="text-amber-600" />
          </CardHeader>
          <CardContent className="font-bold text-lg text-center text-amber-800">
            History
          </CardContent>
        </Card>
        <Card className="w-36 h-36 bg-amber-200 shadow-xl">
          <CardHeader className="items-center p-5">
            <GiPaintBrush size={60} className="text-amber-600" />
          </CardHeader>
          <CardContent className="font-bold text-lg text-center text-amber-800">
            Art
          </CardContent>
        </Card>
        <Card className="w-36 h-36 bg-amber-200 shadow-xl">
          <CardHeader className="items-center p-5">
            <MdPsychology size={60} className="text-amber-600" />
          </CardHeader>
          <CardContent className="font-bold text-lg text-center text-amber-800">
            Self-help
          </CardContent>
        </Card>
        <Card className="w-36 h-36 bg-amber-200 shadow-xl">
          <CardHeader className="items-center p-5">
            <GiRollingSuitcase size={60} className="text-amber-600" />
          </CardHeader>
          <CardContent className="font-bold text-lg text-center text-amber-800">
            Travel
          </CardContent>
        </Card>
        <Card className="w-36 h-36 bg-amber-200 shadow-xl">
          <CardHeader className="items-center p-5">
            <TbBusinessplan size={60} className="text-amber-600" />
          </CardHeader>
          <CardContent className="font-bold text-lg text-center text-amber-800">
            Business
          </CardContent>
        </Card>
        <Card className="w-36 h-36 bg-amber-200 shadow-xl">
          <CardHeader className="items-center p-5">
            <GiAnatomy size={60} className="text-amber-600" />
          </CardHeader>
          <CardContent className="font-bold text-lg text-center text-amber-800">
            Health
          </CardContent>
        </Card>
        <Card className="w-36 h-36 bg-amber-200 shadow-xl">
          <CardHeader className="items-center p-5">
            <FaFaceLaughBeam size={60} className="text-amber-600" />
          </CardHeader>
          <CardContent className="font-bold text-lg text-center text-amber-800">
            Comedy
          </CardContent>
        </Card>
        <Card className="w-36 h-36 bg-amber-200 shadow-xl">
          <CardHeader className="items-center p-5">
            <GiSkier size={60} className="text-amber-600" />
          </CardHeader>
          <CardContent className="font-bold text-lg text-center text-amber-800">
            Sport
          </CardContent>
        </Card>
        <Card className="w-36 h-36 bg-amber-200 shadow-xl">
          <CardHeader className="items-center p-5">
            <TbMoodKid size={60} className="text-amber-600" />
          </CardHeader>
          <CardContent className="font-bold text-lg text-center text-amber-800">
            Children
          </CardContent>
        </Card>
        <Card className="w-36 h-36 bg-amber-200 shadow-xl">
          <CardHeader className="items-center p-5">
            <GiMaterialsScience size={60} className="text-amber-600" />
          </CardHeader>
          <CardContent className="font-bold text-lg text-center text-amber-800">
            Science
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
