"use client";

import { Disclosure, Tab } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { HeartIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import createClient from "openapi-fetch";
import { paths } from "@/types/polylab";
import { displayFormattedPrice } from "@/lib/utils";
import { Cart } from "@/types/extra";
import useLocalStorage, { writeStorage } from "@rehooks/local-storage";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Details({ params }: { params: { id: string } }) {
  const router = useRouter();

  const product = useQuery({
    queryKey: ["product", params.id],
    queryFn: async () => {
      const { GET } = createClient<paths>({
        baseUrl: process.env.NEXT_PUBLIC_POLYLAB_URL,
      });

      return await GET("/products/{id}", {
        params: {
          path: {
            id: params.id,
          },
        },
      });
    },
  });

  const [cart] = useLocalStorage<Cart>("cart");

  const addToCart = async ({ id }: { id: string }) => {
    let c = cart ?? { items: [] };
    const item = cart?.items.findIndex((i) => i.id === id) ?? 0;

    if (item !== -1) {
      c.items[item].amount += 1;
    } else {
      c.items.push({
        id,
        amount: 1,
      });
    }

    writeStorage("cart", c);
    router.push("/added");
  };

  return (
    <section>
      <div className="relative items-center w-full mx-auto 2xl:max-w-7xl ">
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y-2 divide-black md:divide-y-0 md:divide-x-2 2xl:border-x-2 border-black">
          <div className="relative p-8 lg:px-20 items-center gap-12 h-full lg:inline-flex bg-yellow-500">
            <div className="max-w-xl text-left md:text-center lg:text-left mx-auto">
              <div>
                {product.isLoading ? (
                  <Skeleton className="w-[150px] h-8" />
                ) : (
                  <p className="text-2xl mt-12 xl:text-5xl tracking-tight font-medium text-black">
                    {product.data?.data?.name}
                  </p>
                )}
                <div className="mt-3">
                  <h2 className="sr-only">Product information</h2>
                  {product.isLoading ? (
                    <Skeleton className="w-[100px] h-8" />
                  ) : (
                    <p className="max-w-xl mt-4 text-black tracking-wide xl:text-xl">
                      {displayFormattedPrice(product.data?.data?.price ?? 0)}
                    </p>
                  )}
                </div>
                <div className="mt-6">
                  <h3 className="sr-only">Description</h3>
                  {product.isLoading ? (
                    <Skeleton className="w-[500px] h-12" />
                  ) : (
                    <div
                      className="xl:text-xl tracking-wide mt-6 text-black flex flex-col"
                      dangerouslySetInnerHTML={{
                        __html: product.data?.data?.description ?? "",
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="flex-col flex gap-3 mt-10 sm:flex-row">
                <button
                  className="text-black items-center shadow shadow-lila-600 text-lg font-semibold inline-flex px-6 focus:outline-none justify-center text-center bg-lila-300 focus:bg-lila-600 border-lila-600 duration-300 outline-none focus:shadow-none border-2 sm:w-auto py-3 rounded-lg h-16 tracking-wide focus:translate-y-1 w-full hover:bg-lila-500"
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart({ id: params.id });
                  }}
                >
                  Add to bag <span className="ml-3">&rarr;</span>
                </button>
              </div>
            </div>
            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

              <div className="divide-y divide-gray-200 border-t">
                {product.data?.data?.features.map((detail) => (
                  <Disclosure as="div" key={detail.name}>
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                            <span
                              className={classNames(
                                open ? "text-indigo-600" : "text-gray-900",
                                "text-sm font-medium"
                              )}
                            >
                              {detail.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel
                          as="div"
                          className="prose prose-sm pb-6"
                        >
                          <ul role="list">
                            {detail.features.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            </section>
          </div>
          <Tab.Group as="div" className="flex flex-col-reverse">
            <Tab.List className="grid grid-cols-4 gap-6"></Tab.List>
            <Tab.Panels className="block w-full aspect-square lg:mt-0 bg-lila-500  h-full">
              <Tab.Panel className="aspect-h-1 aspect-w-1 w-full">
                {product.isLoading ? (
                  <Skeleton className="w-full h-full" />
                ) : (
                  <img
                    src={product.data?.data?.image_src}
                    alt={product.data?.data?.image_alt}
                    className="w-full object-cover object-center h-full sm:rounded-lg"
                  />
                )}
              </Tab.Panel>
              {product.data?.data?.images.map((image) => (
                <Tab.Panel key={image.id}>
                  <img
                    src={image.image_src}
                    alt={image.image_alt}
                    className="w-full object-cover object-center h-full sm:rounded-lg"
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </section>
  );
}
