"use client";
import { useState, useEffect } from "react";
import { FaLinkedin, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import emblaCarouselAutoplay from "embla-carousel-autoplay";

// Import images
import img1 from "@/app/images/program-1.jpg";
import img2 from "@/app/images/program-2.jpg";
import img3 from "@/app/images/program-3.jpg";
import img4 from "@/app/images/program-4.jpeg";
import img5 from "@/app/images/program-5.jpg";

export default function Team() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);

  const teamMembers = [
    {
      name: "Gurushankar",
      title: "Founder",
      image: img1,
      linkedinUrl:
        "https://www.linkedin.com/in/gurushankar-ajikumar-8073761a5/",
    },
    {
      name: "Veena C",
      title: "Consultant and Cofounder",
      image: img2,
      linkedinUrl:
        "https://www.linkedin.com/in/veena-c-1986aa22b/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Renu John",
      title: "Mentor: Professor & Head CfHE, IITH",
      image: img3,
      linkedinUrl: "https://www.linkedin.com/in/renu-john-ab20a29/",
    },
    {
      name: "Sushmee Badhulika",
      title: "Scientific advisor: Professor IITH",
      image: img4,
      linkedinUrl: "https://www.linkedin.com/in/sushmee-badhulika-48422433/",
    },
    {
      name: "Neeko Inees Chiriyankandath",
      title: "Scientific Advisor: Consultant Gynaecologist",
      image: img5,
      linkedinUrl:
        "https://www.linkedin.com/in/dr-neeko-inees-chiriyankdath-2b79a0196/",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        emblaCarouselAutoplay({
          delay: 6000,
        }),
      ]}
      className="lg:w-[80%] my-10 mx-auto w-[85%]"
    >
      <CarouselContent>
        {teamMembers.map((_, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/3 sm:basis-1/2 xl:basis-1/4 w-full"
          >
            <Card className="rounded-lg h-full border backdrop-blur-sm bg-[rgba(255,255,255,.1)]">
              <CardContent className="flex aspect-square flex-col lg:p-3 p-2">
                <Image
                  className="h-full w-full rounded-lg object-cover"
                  width={333}
                  height={218}
                  src={_.image}
                  alt="Mentor Image"
                />
                <div className=" w-full relative py-2 px-1">
                  <Link  href={_.linkedinUrl} passHref legacyBehavior>
                    <a className="absolute -top-4 right-2" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin size={30} className="text-blue-600 bg-white rounded" />
                    </a>
                  </Link>
                  <h2 className="font-semibold">{_.name}</h2>
                  <p className=" text-sm">{_.title}</p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="md:block hidden" />
      <CarouselNext className="md:block hidden" />
    </Carousel>
  );
}
