import Head from "next/head";
import { Navbar } from "../components/Navbar";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";


export default function Payment(){
  const router = useRouter();
  const query = router.query;
  const price = query.amount;
  const [extra, setExtra] = useState(0);
  const [cash,setCash] = useState(false);
  const [razor,setRazor] = useState(false);
  const [money,setMoney] = useState(0);
  const description  = query.description;
  const model = query.model;



    const makePayment = async () => {
        const res = await initializeRazorpay();

        if (!res) {
          alert("Razorpay SDK Failed to load");
          return;
        }
    
        
        const razorAmount = Number(extra) + Number(price) - Number(money);
        if(Number(money)<0 || Number(money)>(Number(price)+Number(extra))) {alert('Cash Amount should be Less than Total Amount');return;}
        
        // Make API call to the serverless API
        const data = await fetch("/api/razorpay/", { method: "POST",body: JSON.stringify({razor: razorAmount,cash:money}) }).then((t) =>
          t.json()
        );
    
        console.log(data);
    
        var options = {
          key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
          name: "Faebikes Pvt Ltd",
          currency: data.currency,
          amount: data.amount,
          order_id: data.id,
          description: "Thankyou for making this payment",
          image: "https://knowindia.india.gov.in/assets/images/national_currency_inner.jpg",
          handler: async function (response) {
            try{
              const ans = await fetch("/api/verify/", { method: "POST", body: JSON.stringify({response:response}) }).then((t) =>
              t.json());
            
            if(ans) {alert(ans.nessage);}
            else alert('fail');
          } catch (error) {
            console.log(error);
            alert('Error!! Payment Failed!')
          }
            // Validate payment at server - using webhooks is a better idea.
          },
          prefill: {
            name: "Harshit Mishra",
            email: "harshit@gmail.com",
            contact: "9999999999",
          },
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.on('payment.failed', function (response){
          console.log(response);
          alert("This step of Payment Failed");
    });
        paymentObject.open();
      };
    
     
     
    
      const initializeRazorpay = () => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          
    
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
    
          document.body.appendChild(script);
        });
      };


      return (
        <div>
          <Head>
          <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
      <meta name="description" content="Integrate Payments" />
      <meta name="theme-color" content="#000" />
      <title>CHoose Payment Methods 🔥</title>
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="../icons/apple-icon.png"></link>
          </Head>
    
          <main className="font-Inter h-screen  bg-gradient-to-tr from-[#252B30] to-[#191C22]">
            <Navbar />
            <Hero onClick={makePayment} extra={extra}  setExtra=  {setExtra} description={description}
             model={model} price={price} cash={cash} setCash={setCash} money={money} setMoney={setMoney}
              razor={razor} setRazor={setRazor}/>
          </main>
        </div>
      );
    }


const PaymentMethod = () =>{

}

const Hero = ({ onClick ,extra,setExtra,description,model,price,cash,setCash,money,setMoney,razor,setRazor}) => {
  const thumb = "/" + model+".jpg";
 
  return (
        <div className="relative z-10 flex flex-col md:flex-row mt-10 items-center  max-w-6xl justify-evenly mx-auto">
      <div className="md:w-1/3 mb-20 md:mb-0 mx-10">
        <h1 className=" text-white font-bold text-3xl mb-6">
         Faebikes {" \n"}
         </h1>
         <h1 className=" text-white font-bold text-3xl mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          Bike Model: {model} {" \n"}
          </span>{" "}
        </h1>
        <p className="text-sm text-gray-300 font-light tracking-wide w-[300px] mb-6">
            {description}
        </p>
        <p className="text-sm text-gray-300 font-bold tracking-wide w-[300px] mb-6">
       Price: {price}
        </p>
        <div className="bg-gradient-to-r from-[#3e4044] to-[#1D2328] p-[1px] rounded-md mb-4 p-1">
          <p className="text-white mb-1">
            Enter Advance Amount that you want to pay(if any)
          </p>
        <input
          type="text"
          placeholder="Advance Amount"
          value={extra}
          onChange={(event) =>
            setExtra(event.target.value)
          }
        />
        <p className="text-sm text-gray-300 font-bold tracking-wide w-[600px] mb-4 mt-6">
       Total Amount: {Number(price)+Number(extra)}
        </p>
          <p className="text-white m-2  mt-10">
             Choose Payment Method
          </p>
          <div className="radio-buttons text-white mb-1 p-1">
       <div>
            
        <input
        id="razorpaay"
        value="razorpay"
        name="payment"
        type="checkbox"
        onChange={() =>{setRazor(!razor)}}
      />
        Razorpay  
       </div>
        <div>

             
        <input
          id="cash"
          value="cash"
          name="payment"
          type="checkbox"

          onChange={() =>{setCash(!cash)}}
        />
          Cash

          {cash? (<div className="text-black">
            <input
          type="text"
          placeholder="Cash Amount to Pay"
          value={money}
          onChange={(event) =>
            setMoney(event.target.value)
          }
        />
          </div>) : setMoney(0)}  
        </div>
        </div>
          <button
            onClick={onClick}
            className="bg-gradient-to-r from-[#2E3137] to-[#1D2328] rounded-md w-full py-3 shadow-xl drop-shadow-2xl text-gray-300 font-bold  mb-3"
          >
            Buy Now!
          </button>

        </div>
      </div>
      
     
      <Image
            src={thumb}
            width= "280rem"
            height = "370rem"
            alt="thumbnail"
            className=" rounded-2xl w-1/4"
          />
      
    </div>
  );


};