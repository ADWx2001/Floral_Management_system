"use client"

import { Carousel } from "flowbite-react";

export default function EventSlider(){
    return(
        <div className="h-56 sm:h-96 xl:h-96 2xl:h-96">
            <Carousel>
                <img src="/gallery/1.jpg" alt="" />
                <img src="/gallery/2.jpg" alt="" />
                <img src="/gallery/3.jpg" alt="" />
                <img src="/gallery/4.jpg" alt="" />
                <img src="/gallery/5.jpg" alt="" />
            </Carousel>
        </div>
    );
}