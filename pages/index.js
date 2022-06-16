import Head from "next/head";
import { Navbar } from "../components/Navbar";
import styles from "../styles/Home.module.css";




export default function Home() {

  
  const makePayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
       
    const data = await fetch("/api/razorpay/", { method: "POST" }).then((t) =>
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
  <title>Integrate Payments 🔥</title>
  <link rel="manifest" href="/manifest.json" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="../icons/apple-icon.png"></link>
      </Head>

      <main className="font-Inter h-screen  bg-gradient-to-tr from-[#252B30] to-[#191C22]">
        <Navbar />
        <Hero onClick={makePayment} />
      </main>
    </div>
  );

}



const Hero = ({ onClick}) => {


  

  return (
        <div className="relative z-10 flex flex-col md:flex-row mt-10 items-center  max-w-6xl justify-evenly mx-auto">
      <div className="md:w-1/3 mb-20 md:mb-0 mx-10">
        <h1 className=" text-white font-bold text-3xl mb-10">
          FaeBikes{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            onboarding
          </span>{" "}
          Task
        </h1>
        <p className="text-sm text-gray-300 font-light tracking-wide w-[300px] mb-10">
        Razorpay payments has been successfully integrated in this PWA
        </p>
        <div className="bg-gradient-to-r from-[#3e4044] to-[#1D2328] p-[1px] rounded-md mb-4">
        

          <button
            onClick={onClick}
            className="bg-gradient-to-r from-[#2E3137] to-[#1D2328] rounded-md w-full py-4 shadow-xl drop-shadow-2xl text-gray-300 font-bold"
          >
            Try Now!
          </button>
        </div>
      </div>
      
     
      <img
        className="w-1/2"
        alt="stripe payment from undraw"
        src="/payments.svg"
      />
      
    </div>
  );


};
