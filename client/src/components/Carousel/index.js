import React from "react";
import { useState, useRef, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { Segment, Grid, Image } from 'semantic-ui-react';

export default function PhotoSlide() {
    // const PhotoSlide = [
    //   {
    //     title: "",
    //     url: ,
    //     Link: ''
    //   },
    //   {
    //     title: "",
    //     url: ,
    //     Link: ''
  
    //   },
    //   {
    //     title: "",
    //     url: ,
    //     Link: ''
    //   },
    //   {
    //     title: "",
    //     url: ,
    //     Link: ''
    //   },
    //   {
    //     title: "",
    //     url: ,
    //     Link: ''
    //   },
    //   {
    //     title: '',
    //     url: ,
    //     Link: ''
  
    //   }
    // ];
  
  
    const [currentIndex, setCurrentIndex] = useState(0)
    const prevSlide = () => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? PhotoSlide.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    };
    const nextSlide = () => {
      const isLastSlide = currentIndex === PhotoSlide.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    };
    const goToSlide = (slideIndex) => {
      setCurrentIndex(slideIndex);
    };
  
    return (
      <div className="max-w-[1400px] h-[780px] flex place-content-center  w-full m-auto mt-24 py-12 px-4 relative group">
        <div style={{ backgroundImage: `url(${PhotoSlide[currentIndex].url})` }} className="w-1/2 h-3/5 flex-wrap justify-center rounded-2xl flex bg-center bg-cover duration-500">
          {/* left arrow*/}
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer" >
            <BsChevronCompactLeft onClick={prevSlide} size={30} />
          </div>
          {/* right arrow */}
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactRight onClick={nextSlide} size={30} />
          </div>
          <div className="flex items-center  m-auto flex-col w-4/5 top-4 justify-center py-2 font-bold font-serif text-2xl text-black" >{PhotoSlide[currentIndex].title}
            <div className="flex flex-row pb-6">
  
  
              {PhotoSlide.map((slide, slideIndex) => (
                <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className="text-2xl text-black cursor-pointer">
  
                  <RxDotFilled />
                </div>
              ))}
            </div>
            <a href={PhotoSlide[currentIndex].Link} target="_blank" className="opacity-0  text-sm inline break-all text-gray-950">
            </a> 
                {/* the other option here was to just simply raise the Z-index but I was already committed with limited time on my hands */}
          </div>
  
          
        </div>
      </div>
  
  
  
    );
  }