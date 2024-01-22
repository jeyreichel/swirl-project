"use client";

import { Fragment, Suspense, useEffect, useState } from "react";

import { Dialog, Tab, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import UserComponent from "../user/user";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useQuery } from "@tanstack/react-query";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const navigation = {
  categories: [
    {
      name: "Men",
      featured: [
        { name: "Casual", href: "#" },
        { name: "Boxers", href: "#" },
        { name: "Outdoor", href: "#" },
      ],
      collection: [
        { name: "Everything", href: "#" },
        { name: "Core", href: "#" },
        { name: "New Arrivals", href: "#" },
        { name: "Sale", href: "#" },
      ],
      categories: [
        { name: "Artwork Tees", href: "#" },
        { name: "Pants", href: "#" },
        { name: "Accessories", href: "#" },
        { name: "Boxers", href: "#" },
        { name: "Basic Tees", href: "#" },
      ],
      brands: [
        { name: "Significant Other", href: "#" },
        { name: "My Way", href: "#" },
        { name: "Counterfeit", href: "#" },
        { name: "Re-Arranged", href: "#" },
        { name: "Full Nelson", href: "#" },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function MobileComponent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const supabase = createClientComponentClient();
  const user = useQuery({
    queryFn: async () => {
      return await supabase.auth.getUser();
    },
    queryKey: ["user"],
  });

  return (
    <Transition.Root show={mobileMenuOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileMenuOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div className="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex space-x-8 px-4">
                    {navigation.categories.map((category) => (
                      <Tab
                        key={category.name}
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? "border-indigo-600 text-indigo-600"
                              : "border-transparent text-gray-900",
                            "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium",
                          )
                        }
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  {navigation.categories.map((category, categoryIdx) => (
                    <Tab.Panel
                      key={category.name}
                      className="space-y-12 px-4 pb-6 pt-10"
                    >
                      <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10">
                          <div>
                            <p
                              id={`mobile-featured-heading-${categoryIdx}`}
                              className="font-medium text-gray-900"
                            >
                              Featured
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`mobile-featured-heading-${categoryIdx}`}
                              className="mt-6 space-y-6"
                            >
                              {category.featured.map((item) => (
                                <li key={item.name} className="flex">
                                  <a href={item.href} className="text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p
                              id="mobile-categories-heading"
                              className="font-medium text-gray-900"
                            >
                              Categories
                            </p>
                            <ul
                              role="list"
                              aria-labelledby="mobile-categories-heading"
                              className="mt-6 space-y-6"
                            >
                              {category.categories.map((item) => (
                                <li key={item.name} className="flex">
                                  <a href={item.href} className="text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10">
                          <div>
                            <p
                              id="mobile-collection-heading"
                              className="font-medium text-gray-900"
                            >
                              Collection
                            </p>
                            <ul
                              role="list"
                              aria-labelledby="mobile-collection-heading"
                              className="mt-6 space-y-6"
                            >
                              {category.collection.map((item) => (
                                <li key={item.name} className="flex">
                                  <a href={item.href} className="text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p
                              id="mobile-brand-heading"
                              className="font-medium text-gray-900"
                            >
                              Brands
                            </p>
                            <ul
                              role="list"
                              aria-labelledby="mobile-brand-heading"
                              className="mt-6 space-y-6"
                            >
                              {category.brands.map((item) => (
                                <li key={item.name} className="flex">
                                  <a href={item.href} className="text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>

              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a
                      href={page.href}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      {page.name}
                    </a>
                  </div>
                ))}
              </div>

              {!user.isLoading && (
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {user ? (
                    <div className="flow-root">
                      <p className="-m-2 block p-2 font-medium text-gray-900">
                        {user.data?.data.user?.email}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flow-root">
                        <Link
                          href="/login"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Create an account
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link
                          href="/login"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Sign in
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                {/* Currency selector */}
                <form>
                  <div className="inline-block">
                    <label htmlFor="mobile-currency" className="sr-only">
                      Currency
                    </label>
                    <div className="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white">
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                        <ChevronDownIcon
                          className="h-5 w-5 text-gray-500"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
