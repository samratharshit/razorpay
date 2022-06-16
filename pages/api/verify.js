const Razorpay = require("razorpay");
const crypto = require("crypto");

export default async function verifier(req,res){
    if (req.method === "POST") {
        try {
            const s = JSON.parse(req.body);
            const razorpay_order_id = s.response.razorpay_order_id;
            const razorpay_payment_id = s.response.razorpay_payment_id;
            const razorpay_signature = s.response.razorpay_signature;
            
            const sign = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSign = crypto
                .createHmac("sha256", process.env.RAZORPAY_SECRET)
                .update(sign.toString())
                .digest("hex");

                // console.log(s.response);
            console.log(expectedSign);
            console.log(razorpay_signature);
            if (razorpay_signature === expectedSign) {
                return res.status(200).json({ message: "Payment verified successfully" });
            } else {
                return res.status(400).json({ message: "Invalid signature sent!" });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error!" });
            console.log(error);
        }
    }
}