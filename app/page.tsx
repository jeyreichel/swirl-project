import { displayFormattedPrice } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";

export default async function Example() {
  const d = await axios.get(`${process.env.NEXT_PUBLIC_POLYLAB_URL}/products`);

  const trendingProducts = d.data;

  return (
    <section className="bg-white">
      <div className="relative items-center w-full mx-auto 2xl:max-w-7xl p-8 lg:p-20 lg:py-32  2xl:border-x-2 border-b-2 border-black bg-lila-500">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-3xl lg:text-5xl font-medium text-black max-w-4xl mx-auto">
            Welcome to Flabbergasted's Store
          </h1>
          <p className="max-w-lg mt-4 xl:text-xl tracking-wide text-black mx-auto">
            Look around and see if you like something that you like.
          </p>
        </div>
      </div>
      <div className=" 2xl:max-w-7xl p-8 lg:p-20  2xl:border-x-2  mx-auto border-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-12 ">
          {trendingProducts.map((product: any) => (
            <>
              <Link href={`/item/${product.id}`} key={product.id}>
                <div className="group relative border-2 border-black divide-y-2 divide-black shadow-large h-full rounded-2xl overflow-hidden">
                  <div>
                    <img
                      src={product.image_src}
                      alt="{template.name}"
                      className="aspect-[384/246]  object-cover bg-center h-full "
                    />
                  </div>
                  <div className="p-8 bg-lila-500 text-black">
                    <div className=" flex items-center justify-between space-x-8 text-lg font-medium  ">
                      <h3 className="text-xl lg:text-3xl ">{product.name}</h3>
                      <p>{displayFormattedPrice(product.price)}</p>
                    </div>
                    <p className="mt-3 text-xl text-black">{product.type}</p>
                  </div>
                </div>
              </Link>
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
