"use client";
import Faq from "@/components/help/faq";
import Script from "next/script";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col relative h-full w-full pt-20 items-center gap-10">
      {/* <Script
        id="tawk-to"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
            (function() {
              var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
              s1.async = true;
              s1.src = 'https://embed.tawk.to/6421e06f4247f20fefe84a86/1i4gjrld5';
              s1.charset = 'UTF-8';
              s1.setAttribute('crossorigin', '*');
              s0.parentNode.insertBefore(s1, s0);
            })();
          `,
        }}
      /> */}
      <h1 className="text-2xl">Hello, how can we help? </h1>
      <div className="flex relative w-full p-10 items-center gap-10">
        <Faq />
      </div>
    </div>
  );
};

export default page;
