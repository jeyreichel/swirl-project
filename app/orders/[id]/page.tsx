"use client";

import { components, paths } from "@/types/polylab";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import createClient from "openapi-fetch";
import dayjs from "dayjs";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { displayFormattedPrice } from "@/lib/utils";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Nomad Tumbler",
    description:
      "This durable and portable insulated tumbler will keep your beverage at the perfect temperature during your next adventure.",
    href: "#",
    price: "35.00",
    status: "Preparing to ship",
    step: 1,
    date: "March 24, 2021",
    datetime: "2021-03-24",
    address: ["Floyd Miles", "7363 Cynthia Pass", "Toronto, ON N3Y 4H8"],
    email: "f•••@example.com",
    phone: "1•••••••••40",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/confirmation-page-03-product-01.jpg",
    imageAlt: "Insulated bottle with white base and black snap lid.",
  },
  {
    id: 2,
    name: "Minimalist Wristwatch",
    description:
      "This contemporary wristwatch has a clean, minimalist look and high quality components.",
    href: "#",
    price: "149.00",
    status: "Shipped",
    step: 0,
    date: "March 23, 2021",
    datetime: "2021-03-23",
    address: ["Floyd Miles", "7363 Cynthia Pass", "Toronto, ON N3Y 4H8"],
    email: "f•••@example.com",
    phone: "1•••••••••40",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/confirmation-page-03-product-02.jpg",
    imageAlt:
      "Arm modeling wristwatch with black leather band, white watch face, thin watch hands, and fine time markings.",
  },
  // More products...
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type OrderStatus = components["schemas"]["OrderStatus"];

const orderStatuses = [
  "CREATED",
  "PAID",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

const statusToText = (status: OrderStatus) => {
  switch (status) {
    case "CREATED":
      return "Order placed";
    case "PAID":
      return "Payment processed";
    case "PROCESSING":
      return "Preparing for Shipment";
    case "SHIPPED":
      return "Shipped";
    case "DELIVERED":
      return "Delivered";
    case "CANCELLED":
      return "Cancelled";
  }
};

enum Carrier {
  USPS,
  UPS,
  FedEx,
  DHL,
}

function stringToCarrier(carrierStr: string): Carrier {
  switch (carrierStr.toLowerCase()) {
    case "usps":
      return Carrier.USPS;
    case "ups":
      return Carrier.UPS;
    case "fedex":
      return Carrier.FedEx;
    case "dhl":
      return Carrier.DHL;
    default:
      throw new Error("Invalid carrier name");
  }
}

function generateTrackingLink(
  carrier: Carrier,
  trackingNumber: string,
): string {
  switch (carrier) {
    case Carrier.USPS:
      return `https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=${trackingNumber}`;
    case Carrier.UPS:
      return `https://www.ups.com/track?tracknum=${trackingNumber}`;
    case Carrier.FedEx:
      return `https://www.fedex.com/apps/fedextrack/?tracknumbers=${trackingNumber}`;
    case Carrier.DHL:
      return `https://www.dhl.com/en/express/tracking.html?AWB=${trackingNumber}&brand=DHL`;
    default:
      throw new Error("Unsupported carrier");
  }
}

export default function Example({ params }: { params: { id: string } }) {
  const supabase = createClientComponentClient<Database>();
  const client = useQueryClient();
  const router = useRouter();
  const [token, setToken] = useState<string | null | undefined>(null);
  const [user, setUser] = useState<User | undefined | null>(null);

  useEffect(() => {
    (async () => {
      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        router.push("/login");
        return;
      }
      console.log("session", session.data.session?.access_token);
      setToken(session.data.session?.access_token);
      setUser(session.data.session?.user);
      client.invalidateQueries({ queryKey: ["order_info"] });
    })();
  }, []);

  const getStep = (step: OrderStatus) => {
    return orderStatuses.indexOf(step);
  };

  const order_info = useQuery({
    queryFn: async ({ queryKey }) => {
      const [_, id, token] = queryKey;
      const { GET } = createClient<paths>({
        baseUrl: process.env.NEXT_PUBLIC_POLYLAB_URL,
      });

      const order = await GET("/orders/{id}", {
        params: {
          path: {
            id: params.id,
          },
        },
        headers: {
          "X-API-Key": `${token}`,
        },
      });

      return order.data;
    },
    queryKey: ["order_info", params.id, token],
  });

  console.log(order_info.data);

  return (
    <div className="bg-gray-50">
      <main className="mx-auto max-w-2xl pb-24 pt-8 sm:px-6 sm:pt-16 lg:max-w-7xl lg:px-8">
        <div className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
          <div className="flex sm:items-baseline sm:space-x-4">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Order #{params.id}
            </h1>
            {/* <a */}
            {/*   href="#" */}
            {/*   className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:block" */}
            {/* > */}
            {/*   View invoice */}
            {/*   <span aria-hidden="true"> &rarr;</span> */}
            {/* </a> */}
          </div>
          <p className="text-sm text-gray-600">
            Order placed{" "}
            <time dateTime="2021-03-22" className="font-medium text-gray-900">
              {dayjs(order_info.data?.created_at).format("MMM DD, YYYY")}
            </time>
          </p>
        </div>

        {/* Products */}
        <section aria-labelledby="products-heading" className="mt-6">
          <h2 id="products-heading" className="sr-only">
            Products purchased
          </h2>

          <div className="space-y-8">
            <div className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
              {order_info.data?.items.map((product, idx) => (
                <>
                  <div className="px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                    <div className="sm:flex lg:col-span-7">
                      <div className="aspect-h-1 aspect-w-1 w-full flex-shrink-0 overflow-hidden rounded-lg sm:aspect-none sm:h-40 sm:w-40">
                        <img
                          src={product.product.image_src}
                          alt={product.product.image_alt}
                          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                        />
                      </div>

                      <div className="mt-6 sm:ml-6 sm:mt-0">
                        <h3 className="text-base font-medium text-gray-900">
                          <a href={`/item/${product.product_id}}'`}>
                            {product.product.name}
                          </a>
                        </h3>
                        <p className="mt-2 text-sm font-medium text-gray-900">
                          {displayFormattedPrice(product.product.price)}
                        </p>
                        <p
                          className="mt-3 text-sm text-gray-500"
                          dangerouslySetInnerHTML={{
                            __html: product.product.description,
                          }}
                        ></p>
                      </div>
                    </div>

                    {idx === 0 && (
                      <div className="mt-6 lg:col-span-5 lg:mt-0">
                        <dl className="grid grid-cols-2 gap-x-6 text-sm">
                          <div>
                            <dt className="font-medium text-gray-900">
                              Delivery address
                            </dt>
                            <dd className="mt-3 text-gray-500">
                              <span className="block">
                                {order_info.data?.address.first_name}{" "}
                                {order_info.data?.address.last_name}
                              </span>
                              <span className="block">
                                {order_info.data?.address.street}
                              </span>
                              <span className="block">
                                {order_info.data?.address.city},{" "}
                                {order_info.data?.address.state}
                              </span>
                              <span className="block">
                                {order_info.data?.address.zip}
                              </span>
                            </dd>
                          </div>
                          <div>
                            <dt className="font-medium text-gray-900">
                              Shipping updates
                            </dt>
                            <dd className="mt-3 space-y-3 text-gray-500">
                              <p>{user?.email}</p>
                              {/* <button */}
                              {/*   type="button" */}
                              {/*   className="font-medium text-indigo-600 hover:text-indigo-500" */}
                              {/* > */}
                              {/*   Edit */}
                              {/* </button> */}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    )}
                  </div>
                </>
              ))}

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6 lg:p-8">
                <h4 className="sr-only">Status</h4>
                <p className="text-sm font-medium text-gray-900">
                  {statusToText(order_info.data?.status ?? "CREATED")} on{" "}
                  <time dateTime={order_info.data?.updated_at}>
                    {dayjs(order_info.data?.updated_at).format("MMM DD, YYYY")}
                  </time>
                  {order_info.data?.shipping.carrier && (
                    <Link
                      href={generateTrackingLink(
                        stringToCarrier(order_info.data.shipping.carrier),
                        order_info.data.shipping.tracking_number ?? "",
                      )}
                      target="_blank"
                    >
                      <p className="text-indigo-600">
                        Shipped with{" "}
                        {
                          Carrier[
                            stringToCarrier(order_info.data.shipping.carrier)
                          ]
                        }
                        , click here to track your order.
                      </p>
                    </Link>
                  )}
                </p>
                <div className="mt-6" aria-hidden="true">
                  <div className="overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-indigo-600"
                      style={{
                        width: `calc((${getStep(
                          order_info.data?.status ?? "CREATED",
                        )} * 2 + 1) / 8 * 100%)`,
                      }}
                    />
                  </div>
                  <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
                    <div className="text-indigo-600">Order placed</div>
                    <div
                      className={classNames(
                        getStep(order_info.data?.status ?? "CREATED") > 0
                          ? "text-indigo-600"
                          : "",
                        "text-center",
                      )}
                    >
                      Processing
                    </div>
                    <div
                      className={classNames(
                        getStep(order_info.data?.status ?? "CREATED") > 1
                          ? "text-indigo-600"
                          : "",
                        "text-center",
                      )}
                    >
                      Shipped
                    </div>
                    <div
                      className={classNames(
                        getStep(order_info.data?.status ?? "CREATED") > 2
                          ? "text-indigo-600"
                          : "",
                        "text-right",
                      )}
                    >
                      Delivered
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Billing */}

        {order_info.data?.receipt && (
          <section aria-labelledby="summary-heading" className="mt-16">
            <h2 id="summary-heading" className="sr-only">
              Billing Summary
            </h2>

            <div className="bg-gray-100 px-4 py-6 sm:rounded-lg sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-8">
              <dl className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7">
                <div>
                  <dt className="font-medium text-gray-900">Billing address</dt>
                  <dd className="mt-3 text-gray-500">
                    <span className="block">
                      {order_info.data?.address.first_name}{" "}
                      {order_info.data?.address.last_name}
                    </span>
                    <span className="block">
                      {order_info.data?.address.street}
                    </span>
                    <span className="block">
                      {order_info.data?.address.city},{" "}
                      {order_info.data?.address.state}
                    </span>
                    <span className="block">
                      {order_info.data?.address.zip}
                    </span>
                  </dd>
                </div>
              </dl>

              <dl className="mt-8 divide-y divide-gray-200 text-sm lg:col-span-5 lg:mt-0">
                <div className="flex items-center justify-between pb-4">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd className="font-medium text-gray-900">
                    {displayFormattedPrice(order_info.data?.receipt?.subtotal)}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="text-gray-600">Shipping</dt>
                  <dd className="font-medium text-gray-900">
                    {displayFormattedPrice(order_info.data.receipt.shipping)}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="text-gray-600">Tax</dt>
                  <dd className="font-medium text-gray-900">
                    {displayFormattedPrice(order_info.data.receipt.tax)}
                  </dd>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <dt className="font-medium text-gray-900">Order total</dt>
                  <dd className="font-medium text-indigo-600">
                    {displayFormattedPrice(order_info.data.receipt.total)}
                  </dd>
                </div>
              </dl>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
