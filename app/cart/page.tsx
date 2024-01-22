"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { displayFormattedPrice } from "@/lib/utils";
import { Cart } from "@/types/extra";
import { paths } from "@/types/polylab";
import { Database } from "@/types/supabase";
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon as XMarkIconMini,
} from "@heroicons/react/20/solid";
import useLocalStorage, { writeStorage } from "@rehooks/local-storage";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import createClient from "openapi-fetch";
import { useEffect, useState } from "react";

export default function Example() {
  const [total, setTotal] = useState(0);
  const [cart] = useLocalStorage<Cart>("cart");

  const client = useQueryClient();

  const products = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { GET } = createClient<paths>({
        baseUrl: process.env.NEXT_PUBLIC_POLYLAB_URL,
      });

      const products = [];

      if (cart?.items === undefined) {
        return [];
      }

      for (let i of cart?.items) {
        let item = await GET("/products/{id}", {
          params: {
            path: {
              id: i.id,
            },
          },
        });
        if (item.data === undefined) {
          continue;
        }
        products.push({ ...item.data, amount: i.amount });
      }

      return products;
    },
  });

  const updateCart = ({ id, quantity }: { id: string; quantity: number }) => {
    let c = cart ?? { items: [] };
    const item = cart?.items.findIndex((i) => i.id === id) ?? 0;

    if (item !== -1) {
      c.items[item].amount = quantity;
    } else {
      c.items.push({
        id,
        amount: quantity,
      });
    }

    client.invalidateQueries({ queryKey: ["products"] });

    writeStorage("cart", c);
  };

  const delItem = ({ id }: { id: string }) => {
    let c = cart ?? { items: [] };
    const item = cart?.items.findIndex((i) => i.id === id) ?? 0;

    if (item > -1) {
      c.items.splice(item, 1);
    }

    client.invalidateQueries({ queryKey: ["products"] });

    writeStorage("cart", c);
  };

  useEffect(() => {
    const t =
      cart?.items.reduce(
        (accumulator, currentValue) =>
          accumulator +
            (products.data?.find((i) => i.id === currentValue.id)?.price ?? 0) *
              currentValue.amount ?? 0,
        0
      ) ?? 0;

    setTotal(t + 2000);
  }, [products]);

  return (
    <section>
      <div className="relative items-center w-full divide-y-2 divide-black mx-auto 2xl:max-w-7xl border-b-2 border-black 2xl:border-x-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y-2 divide-black md:divide-y-0 md:divide-x-2">
          <div className="relative p-8 lg:px-20 bg-white items-center gap-12 h-full lg:inline-flex">
            <div className="max-w-xl lg:text-left text-center mx-auto">
              <div>
                <h2 className="text-3xl lg:text-5xl font-medium text-black max-w-4xl">
                  Shopping Cart
                </h2>
                <ul
                  role="list"
                  className="divide-y divide-gray-200 border-b border-t border-gray-200"
                >
                  {products.data?.map((product, productIdx) => (
                    <li key={product.id} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <img
                          src={product.image_src}
                          alt={product.image_alt}
                          className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <a
                                  href={`/item/${product.id}`}
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {product.name}
                                </a>
                              </h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                              {/* @ts-ignore */}
                              {product.color && (
                                <>
                                  {/* @ts-ignore */}
                                  <p className="text-gray-500">Product.color</p>
                                </>
                              )}
                              {/* @ts-ignore */}
                              {product.size ? (
                                <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                                  {/* @ts-ignore */}
                                  {product.size}
                                </p>
                              ) : null}
                            </div>
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              {displayFormattedPrice(product.price)}
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <label
                              htmlFor={`quantity-${productIdx}`}
                              className="sr-only"
                            >
                              Quantity, {product.name}
                            </label>
                            <select
                              id={`quantity-${productIdx}`}
                              name={`quantity-${productIdx}`}
                              value={product.amount ?? "1"}
                              onChange={(e) =>
                                updateCart({
                                  id: product.id,
                                  quantity: +e.target.value,
                                })
                              }
                              className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            >
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                              <option value={7}>7</option>
                              <option value={8}>8</option>
                            </select>

                            <div className="absolute right-0 top-0">
                              <button
                                type="button"
                                onClick={() => delItem({ id: product.id })}
                                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                              >
                                <span className="sr-only">Remove</span>
                                <XMarkIconMini
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        </div>

                        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                          {product.is_in_stock ? (
                            <CheckIcon
                              className="h-5 w-5 flex-shrink-0 text-green-500"
                              aria-hidden="true"
                            />
                          ) : (
                            <ClockIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-300"
                              aria-hidden="true"
                            />
                          )}

                          <span>
                            {product.is_in_stock
                              ? "In stock"
                              : `Ships in ${product.lead_time} day(s)`}
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="relative z-10 flex flex-col flex-1 px-4 py-10 bg-green-500 lg:py-24 md:flex-none md:px-28">
            <h2
              id="summary-heading"
              className="text-3xl lg:text-5xl font-medium text-black max-w-4xl"
            >
              Order summary
            </h2>
            <div className="border-2 border-black divide-y-2 divide-black shadow-large rounded-xl overflow-hidden sm:grid-cols-2 sm:gap-x-4 mt-4 bg-white">
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {displayFormattedPrice(
                      cart?.items.reduce(
                        (accumulator, currentValue) =>
                          accumulator +
                            (products.data?.find(
                              (i) => i.id === currentValue.id
                            )?.price ?? 0) *
                              currentValue.amount ?? 0,
                        0
                      ) ?? 0
                    )}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex items-center text-sm text-gray-600">
                    <span>Shipping estimate</span>
                    <a
                      href="#"
                      className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">
                        Learn more about how shipping is calculated
                      </span>
                      <QuestionMarkCircleIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">$20.00</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex text-sm text-gray-600">
                    <span>Tax</span>
                    <a
                      href="#"
                      className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">
                        Tax will be calculated at the next step.
                      </span>
                      <QuestionMarkCircleIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  </dt>
                  <Skeleton className="w-[85px] h-4" />
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">
                    Sub total
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    {displayFormattedPrice(total)}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="mt-6">
              <a href={`/checkout`}>
                <button className="text-black items-center shadow shadow-lila-600 text-lg font-semibold inline-flex px-6 focus:outline-none justify-center text-center bg-lila-300 focus:bg-lila-600 border-lila-600 duration-300 outline-none focus:shadow-none border-2 py-3 rounded-lg h-16 tracking-wide focus:translate-y-1 w-full hover:bg-lila-500">
                  Check Out <span className="ml-3">&rarr;</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
