"use client";

import { Cart } from "@/types/extra";
import { Database } from "@/types/supabase";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import useLocalStorage, { writeStorage } from "@rehooks/local-storage";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

let c: Cart = { items: [] };

export default function Cart() {
  const [cart] = useLocalStorage<Cart>("cart");

  const [cartItems, setCartItems] = useState<number | null>(null);

  useEffect(() => {
    if (cart === null) {
      writeStorage("cart", c);
    } else {
      setCartItems(
        cart.items
          .map((i) => i.amount)
          .reduce((partialSum, a) => partialSum + a, 0),
      );
    }
  }, [cart]);

  return (
    <div className="flow-root">
      <Link href="/cart" className="group -m-2 flex items-center p-2 duration=100">
        <ShoppingCartIcon
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {cartItems}
        </span>
        <span className="sr-only">items in cart, view bag</span>
      </Link>
    </div>
  );
}
