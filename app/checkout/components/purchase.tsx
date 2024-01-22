"use client";

import { Button } from "@/components/ui/button";
import { components, paths } from "@/types/polylab";
import { writeStorage } from "@rehooks/local-storage";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import createClient from "openapi-fetch";
import { useState } from "react";

type AddressFull = components["schemas"]["Address"];
type Receipt = components["schemas"]["Receipt"];

export default function Purchase({
  disabled,
  data,
}: {
  disabled: boolean;
  data: {
    order_id: string;
    address: AddressFull;
    receipt: Receipt;
  };
}) {
  const [errorMessage, setErrorMessage] = useState<undefined | null | string>(
    null,
  );

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements || disabled) {
      return;
    }

    const { POST } = createClient<paths>({
      baseUrl: process.env.NEXT_PUBLIC_POLYLAB_URL,
    });

    const o = await POST("/orders/place", {
      body: {
        id: data.order_id,
        address: data.address,
        reciept: data.receipt,
      },
    });

    if (o.error) {
      setErrorMessage(
        "Error placing order, please make sure all of your information is correct.",
      );
      return;
    }

    writeStorage("cart", { items: [] });

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.origin}/orders/${o.data?.id}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      console.log("purchases");
    }
  };

  return (
    <>
      <PaymentElement />
      <Button
        onClick={handleSubmit}
        className="text-black items-center shadow shadow-success-600 text-lg font-semibold inline-flex px-6 focus:outline-none justify-center text-center bg-success-300 focus:bg-success-600 border-success-600 duration-300 outline-none focus:shadow-none border-2 py-3 rounded-lg h-16 tracking-wide focus:translate-y-1 w-full hover:bg-success-500"
        disabled={disabled}
      >
        Confirm Order
      </Button>

      {errorMessage && (
        <div className="bg-red-100 mt-4 rounded-md p-4">
          <p className="text-red-600">{errorMessage}</p>
        </div>
      )}
    </>
  );
}
