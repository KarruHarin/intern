"use client"
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import img from "../../app/images/bg_3.jpg"
import Image from "next/image"
import emblaCarouselAutoplay from "embla-carousel-autoplay";

export function MainCarausel() {
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
              <Card className="p-0">
                <CardContent className=" h-auto lg:h-[20vw] rounded-xl p-0 w-full overflow-hidden flex items-center justify-center">
                 <Image alt="Image" className="w-[110%] object-cover" width={600} height={300} src={img} />
                </CardContent>
              </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

