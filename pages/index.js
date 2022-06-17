import Head from "next/head";
import { Navbar } from "../components/Navbar";
import styles from "../styles/Home.module.css";
import Card from "../components/Card"
import bike2 from "../public/Groly1.jpg";
import bike1 from "../public/Fizz11.jpg";

export default function Home() {

  
 

 

  return (
    <div>
      <Head>
      <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
  <meta name="description" content="Integrate Payments" />
  <meta name="theme-color" content="#000" />
  <title>Purchase Bikes 🔥</title>
  <link rel="manifest" href="/manifest.json" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="../icons/apple-icon.png"></link>
      </Head>

      <main className="font-Inter h-screen  bg-slate-700">
        <Navbar />
        {/* <Hero onClick={makePayment} /> */}
        <div className="bg-slate-700">
        <div className="relative z-10 flex flex-col md:flex-row mt-10 items-center  max-w-6xl justify-evenly mx-auto">
        <Card model={"Fizz11"} description={"Very Fast among alll the models"} price={2000} thumb ={bike1}/>
        </div>
       <div className="relative z-10 flex flex-col md:flex-row mt-10 items-center  max-w-6xl justify-evenly mx-auto"> 
        <Card model={"Groly1"} description={"Highest Battery Capacity"} price={3000} thumb={bike2}/>
        </div>
        </div>
      </main>
    </div>
  );

}




