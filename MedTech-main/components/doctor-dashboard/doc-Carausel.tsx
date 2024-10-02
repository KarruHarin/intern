"use client"
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import img from "../../app/images/doc-dash.png"
import Image from "next/image"
import emblaCarouselAutoplay from "embla-carousel-autoplay";

export function DocCarausel() {
  return (
    <Carousel
    opts={{
      align: "start",
      loop: true,
    }}
    plugins={[
      emblaCarouselAutoplay({
        delay: 2000,
      }),
    ]}
    className="w-full">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
              <Card className="p-0 flex">
                <CardContent className=" h-auto lg:h-[20vw] rounded-xl p-0 w-full overflow-hidden flex items-center justify-center">
                 <Image alt="Image" className="w-[100%] object-cover" width={800} height={500} src={img} />
                </CardContent>
              </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

