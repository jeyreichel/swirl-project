import { Button } from "@/components/ui/button";
import { displayFormattedPrice } from "@/lib/utils";
import { paths } from "@/types/polylab";
import { CheckIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import createClient from "openapi-fetch";

export default async function Added() {
  const { GET } = createClient<paths>({
    baseUrl: process.env.NEXT_PUBLIC_POLYLAB_URL,
  });
  const { data: products } = await GET("/products");

  return (
    <div>
      <div className="bg-green-100 w-full text-center">
        <div className="flex flex-col justify-center items-center py-12 w-full">
          <div className="flex">
            <h1 className="font-bold text-2xl mr-4">
              Your Order was added to cart{" "}
            </h1>
            <CheckIcon className="w-8 h-8"></CheckIcon>
          </div>
          <p className="text-green-800 mt-2">
            While you&apos;re here, why don&apos;t you check out these products
            below?
          </p>
          <div className="flex w-full justify-center mt-4 space-x-4">
            <Link href="/">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
            <Link href="/cart">
              <Button className="w-36">Go to Cart</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-4 p-4">
        {products?.map((p, idx) => (
          <Link key={idx} href={`/item/${p.id}`}>
            <div className="bg-gray-50 p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-150 block overflow-hidden w-64 rounded-md">
              <img
                className="rounded-lg object-cover w-full h-48"
                src={p.image_src}
                alt={p.image_alt}
              />
              <p className="mt-2">{p.name}</p>
              <p className="font-bold">{displayFormattedPrice(p.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
