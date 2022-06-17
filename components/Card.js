import Image from "next/image";
import Link from "next/link";
import { FaReact } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { AiOutlineClockCircle } from "react-icons/ai";
import { VscChecklist } from "react-icons/vsc";
import { FaPlay } from "react-icons/fa";
import Payment from "../pages/payment";
import React from "react";


export default function Card({model,price,description,thumb}) {

 
  return (
    <div className="md:w-[50rem] md:h-[20.5rem] w-[20.5rem] h-[40rem] p-4 rounded-2xl bg-slate-800 shadow-slate-700 flex flex-col ease-linear duration-300 md:flex-row-reverse">
      <div className=" h-full w-full  shadow-md rounded-2xl basis-2/3 relative">
        <div className=" text-white z-10 bg-[#5865F2] absolute pl-8 pr-8 pb-2 pt-2  rounded-tl-2xl rounded-br-2xl font-semibold">
          <h1>OFFER</h1>
        </div>
        <div className="h-full w-full relative border-2 border-white rounded-2xl p-0.5">
          <Image
            src={thumb}
            alt="thumbnail"
            layout="fill"
            objectFit="cover"
            className=" rounded-2xl"
          />
        </div>
      </div>

      <div className=" h-full w-full mr-2 rounded-2xl ">
        <p className="m-2 font-bold pl-1 text-lg text-[#5865F2]">{model}</p>
        <h1 className="m-1 text-4xl font-bold text-white">
          {description}
        </h1>

        <div className=" pt-16 pr-2 pl-2 flex flex-row justify-around flex-wrap">
          <div className="flex flex-row items-center m-2">
            <FaReact size={20} color="#61DBFB" />
            <h1 className="pl-1 text-white">Fast Speed</h1>
          </div>
          <div className="flex flex-row items-center m-2">
            <SiTypescript size={20} color="#007acc" />
            <h1 className="pl-1 text-white">Fast Charging</h1>
          </div>
          <div className="flex flex-row items-center m-2">
            <AiOutlineClockCircle size={20} className="dark:text-white" />
            <h1 className="pl-1 text-white">12 Hour Mileage</h1>
          </div>
          {/* <div className="flex flex-row items-center m-2">
            <VscChecklist size={20} className="dark:text-white" />
            <h1 className="pl-1 dark:text-white">5 Part</h1>
          </div> */}
        </div>

        <div className="flex flex-row">
         
        <button
            className="text-white md:m-2 m-auto mt-8 bg-[#5865F2] shadow-md shadow-[#5865f28a] p-2.5 rounded-xl flex flex-row justify-center items-center hover:bg-[#424bb6] ease-linear duration-300"
          >
            Rs. {price}
          </button>
          <Link href={{
        pathname: "/payment",
        query: { amount: price,
                  description: description,
                  model:model,
        }
      }} >
          <a>
          <button className="md:m-2 m-auto mt-8 bg-[#5865F2] shadow-md shadow-[#5865f28a]  pt-2 pb-2 pl-6 pr-4 rounded-xl flex flex-row justify-center items-center hover:bg-[#424bb6] ease-linear duration-300">
            <FaPlay className="animate-ping" size={10} color="#fff" />
            
            <h1 className="text-white">BUY Now! &rarr;</h1>
          
          </button>
          </a>
          </Link>
        </div>
      </div>
    </div>
  );
}