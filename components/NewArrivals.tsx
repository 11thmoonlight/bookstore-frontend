"use client";

import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
  DotButton,
  useDotButton,
} from "@/components/custom/EmblaCarouselDotButton";
import useEmblaCarousel from "embla-carousel-react";
import { useNewBooks } from "@/hooks/useBook";
import BookCard from "./BookCard";
import Loader from "./custom/Loader";
import ErrorMessage from "./custom/ErrorMessage";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const OPTIONS: EmblaOptionsType = { align: "start" };

const NewArrivals: React.FC<PropType> = () => {
  const { books, error, loading } = useNewBooks();
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <section className="max-w-[70rem] mx-auto flex flex-col gap-8 mb-20">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex backface-hidden touch-pan-y">
          {books?.map((book, index) => (
            <div
              key={index}
              className="min-w-0 flex-[0_0_100%] px-4 sm:flex-[0_0_50%] sm:px-6 lg:flex-[0_0_calc(100%/3)] lg:px-8"
            >
              <div className="rounded-[1.8rem] text-4xl font-semibold flex items-center justify-center select-none">
                <BookCard book={book} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={`w-4 h-4 flex items-center justify-center rounded-full ${
              index === selectedIndex
                ? "border-2 bg-stone-500"
                : "border-2 border-gray-500"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
