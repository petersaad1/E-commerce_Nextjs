"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cartContext } from "@/Context/CartContext";
import React, { useContext, useRef } from "react";
import { cashPaymentAction } from "../../PaymentAction/cashPayment";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { onlinePaymentAction } from "../../PaymentAction/onlinePayment";

function Payment() {
  const details = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);
  const city = useRef<HTMLInputElement>(null);

  const { cartId, afterPayment } = useContext(cartContext);
  const router = useRouter();

  async function CashPayment() {
    if (
      !details.current?.value ||
      !phone.current?.value ||
      !city.current?.value
    ) {
      toast.error("Please fill in all fields", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }

    if (!cartId) {
      toast.error("Your cart is empty, please add items first", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }

    const values = {
      shippingAddress: {
        details: details.current.value,
        phone: phone.current.value,
        city: city.current.value,
      },
    };

    try {
      const data = await cashPaymentAction(cartId, values);
      toast.success(data.status, {
        duration: 3000,
        position: "top-center",
      });
      afterPayment();
      router.push("/allOrders");
    } catch (error) {
      toast.error("Payment failed, please try again", {
        duration: 3000,
        position: "top-center",
      });
      console.log(error);
    }
  }
  async function handleOnlinePayment() {
    if (
      !details.current?.value ||
      !phone.current?.value ||
      !city.current?.value
    ) {
      toast.error("Please fill in all fields", {
        duration: 1000,
        position: "top-center",
      });
      return;
    }

    if (!cartId) {
      toast.error("Your cart is empty, please add items first", {
        duration: 1000,
        position: "top-center",
      });
      return;
    }

    const values = {
      shippingAddress: {
        details: details.current.value,
        phone: phone.current.value,
        city: city.current.value,
      },
    };

    try {
      const data = await onlinePaymentAction(cartId, values);
      if (data.status === "success") {
        window.location.href = data.session.url;
      }
    } catch (error) {
      toast.error("Payment failed, please try again", {
        duration: 1000,
        position: "top-center",
      });
      console.log(error);
    }
  }

  return (
    <div className="w-full md:w-[60%] px-5 md:px-0 mx-auto my-10 ">
      <h1 className="mb-10 text-3xl font-bold text-center">Payment</h1>

      <div>
        <label htmlFor="details">Details :</label>
        <Input
          ref={details}
          type="text"
          id="details"
          className="mb-4 bg-white text-white border border-gray-300 focus:border-green-600 focus:ring-1 focus:ring-green-600"
        />
        <label htmlFor="phone">Phone :</label>
        <Input
          ref={phone}
          type="tel"
          id="phone"
          className="mb-4 bg-white text-white border border-gray-300 focus:border-green-600 focus:ring-1 focus:ring-green-600"
        />

        <label htmlFor="city">City :</label>
        <Input
          ref={city}
          type="text"
          id="city"
          className="mb-4 bg-white text-white border border-gray-300 focus:border-green-600 focus:ring-1 focus:ring-green-600"
        />

        <div className="flex items-center justify-between my-5">
          <Button
            onClick={CashPayment}
            className="bg-transparent border border-green-600 text-green-600 hover:bg-green-100 hover:text-black transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Cash Payment
          </Button>
          <Button
            onClick={handleOnlinePayment}
            className="bg-transparent border border-green-600 text-green-600 hover:bg-green-100 hover:text-black transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Online Payment
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
