"use client";

import {
  UserIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";
import Cart from "./cart";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Navbar({ user }: { user: User | null }) {
  const [isOpenBar, setOpenBar] = useState(false);
  const supabase = createClientComponentClient<Database>();
  const handleClickBarButton = () => setOpenBar((prev) => !prev);

  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <>
      <div className="mx-auto w-full bg-lila-500 2xl:border-2 justify-center sticky top-0 z-20 2xl:max-w-7xl border-y-2 border-black">
        <div
          className="mx-auto w-full flex flex-col lg:flex-row py-6 md:py-0 lg:items-center lg:justify-between 2xl:max-w-7xl px-8 md:px-0"
          x-data="{ open: false }"
        >
          <div className="text-black items-center flex justify-between flex-row">
            <a
              className="items-center font-bold gap-3 inline-flex text-lg tracking-tighter md:hidden"
              href="/"
            >
              <span>FLABBERGASTED.</span>
            </a>
            <button
              className="focus:outline-none focus:shadow-outline md:hidden ml-auto border-2 border-black bg-red-500"
              onClick={handleClickBarButton}
            >
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  className={isOpenBar ? "hidden" : "inline-flex"}
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
                <path
                  className={isOpenBar ? "inline-flex" : "hidden"}
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
            </button>
          </div>
          <nav
            className={`flex flex-col items-center flex-grow md:flex text-black text-lg font-medium tracking-wide md:flex-row md:justify-start md:mt-0 lg:p-0 py-2 md:py-0 md:px-0 md:pb-0 px-5 ${
              isOpenBar ? "" : "hidden"
            }`}
          >
            <Link
              className="duration-300 ease-in-out focus:outline-none focus:shadow-none focus:text-orange/90 hover:text-lila-900 md:my-0 px-4 py-2 transform transition md:ml-8 lg:ml-16 2xl:ml-0"
              href="/"
            >
              Home
            </Link>

            <Link
              className="duration-300 ease-in-out focus:outline-none focus:shadow-none focus:text-orange/90 hover:text-lila-900 md:my-0 px-4 py-2 transform transition"
              href="/"
            >
              Company
            </Link>

            <Link
              className="duration-300 ease-in-out focus:outline-none focus:shadow-none focus:text-orange/90 hover:text-lila-900 md:my-0 px-4 py-2 transform transition"
              href="/"
            >
              Store
            </Link>

            <Link
              className="duration-300 ease-in-out focus:outline-none focus:shadow-none focus:text-orange/90 hover:text-lila-900 md:my-0 px-4 py-2 transform transition"
              href="/checkout"
            >
              Checkout
            </Link>

            <Link
              className="duration-300 ease-in-out focus:outline-none focus:shadow-none focus:text-orange/90 hover:text-lila-900 md:my-0 px-4 py-2 transform transition"
              href="/cart"
            >
              Cart
            </Link>

            <div className="md:ml-auto inline-flex tracking-wide items-center justify-center">
              <Link
                href="/profile"
                className="-m-2 p-2 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Account</span>
                <UserIcon className="h-6 w-6" aria-hidden="true" />
              </Link>
              <span
                className="mx-4 h-6 w-px bg-gray-200 lg:mx-6"
                aria-hidden="true"
              />
              <Cart></Cart>
              <span
                className="mx-4 h-6 w-px bg-gray-200 lg:mx-6"
                aria-hidden="true"
              />
              {user ? (
                <>
                  <Button
                    onClick={handleSignOut}
                    className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Sign Out</span>
                    <ArrowLeftOnRectangleIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </Button>
                  <span
                    className="mx-4 h-6 w-px bg-gray-200 lg:mx-6"
                    aria-hidden="true"
                  />
                  <p className="text-white md:ml-auto bg-black border-l-2 border-black duration-500 ease-in-out focus:outline-none ring-inset ring-offset-black focus:ring-2 focus:ring-black focus:ring-offset-2 h-12 lg:h-20 hover:bg-white hover:text-black inline-flex tracking-wide items-center justify-center px-6 text-center transform transition py-2 md:py-4">
                    <span>{user.email}</span>
                  </p>
                </>
              ) : (
                <>
                  <Link
                    className="text-white md:ml-auto bg-black border-l-2 border-black duration-500 ease-in-out focus:outline-none ring-inset ring-offset-black focus:ring-2 focus:ring-black focus:ring-offset-2 h-12 lg:h-20 hover:bg-white hover:text-black inline-flex tracking-wide items-center justify-center px-6 text-center transform transition py-2 md:py-4"
                    href="/register"
                  >
                    <span>Sign Up</span>
                  </Link>
                  <span className="h-6 w-px bg-gray-600" aria-hidden="true" />
                  <Link
                    className="text-white md:ml-auto bg-black border-l-2 border-black duration-500 ease-in-out focus:outline-none ring-inset ring-offset-black focus:ring-2 focus:ring-black focus:ring-offset-2 h-12 lg:h-20 hover:bg-white hover:text-black inline-flex tracking-wide items-center justify-center px-6 text-center transform transition py-2 md:py-4"
                    href="/login"
                  >
                    <span>Sign In</span>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
