"use client";

import { Carousel } from "flowbite-react";

export default function Slider() {
  return (
    <div className="h-56 sm:h-96 xl:h-96 2xl:h-96">
      <Carousel>
        <img src="/img/1.jpg" alt="..." />
        <img src="/img/2.jpg"  alt="..." />
        <img src="/img/3.jpg" alt="..." />
        <img src="/img/4.jpg"  alt="..." />
        <img src="/img/5.jpg"   alt="..." />
      </Carousel>
    </div>
  );
}
