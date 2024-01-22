import { components, paths } from "@/types/polylab";
import { NextRequest, NextResponse } from "next/server";
import createClient from "openapi-fetch";

export interface Root {
  currency: string;
  line_items: LineItem[];
  customer_details: CustomerDetails;
}

export interface LineItem {
  amount: number;
  reference: string;
  tax_code: string;
}

export interface CustomerDetails {
  address: Address;
  address_source: string;
}

export interface Address {
  line1: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}


export async function POST(req: NextRequest) {
  try {
    const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

    const data: {
      data: Root;
      id: string;
    } = await req.json();

    const calculation = await stripe.tax.calculations.create(data.data);

    const { PATCH, POST } = createClient<paths>({
      baseUrl: process.env.NEXT_PUBLIC_POLYLAB_URL,
    });

    await PATCH("/orders/update", {
      body: {
        id: data.id,
        total: calculation.amount_total,
        secret_token:
          "84e7ee1aebe0ebede28c95078a22c61de6af7cf45344201d7f45fbce435d7370a32e1d8ca6add769c73d6ea07cf919428a6ac8aec191858ef0489aae122741e4f6b1f99c28c8b55c9377bab902f1490a871185bb7709af17ef2ad6a7b705a65988d968dfd297b3b94c28d6ee00fb53e0dd0ab6e7c8d79fbed755e875009f4859",
      },
    });

    return NextResponse.json(calculation);
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}
