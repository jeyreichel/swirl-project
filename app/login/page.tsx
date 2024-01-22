"use client";

import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClientComponentClient<Database>();
  const searchParams = useSearchParams();

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

    window.location.href = searchParams.get("redirectTo") ?? "/";
  };

  return (
    <section>
      <div className="2xl:max-w-7xl mx-auto 2xl:border-x-2 border-black">
        <div className="relative justify-center max-h-full overflow-hidden  grid grid-cols-1 lg:grid-cols-2 h-screen lg:divide-x-2 divide-black">
          <div className="relative z-10 flex flex-col flex-1 px-4 py-10 bg-yellow-500 lg:py-24 md:flex-none md:px-28 sm:justify-center">
            <div className="w-full mx-auto md:px-0 sm:px-4 text-center">
              <h2 className="text-3xl lg:text-5xl font-medium text-black ">
                Sign in to Flabbergasted
              </h2>

              <form className="mt-6">
                <input
                  autoComplete="false"
                  name="hidden"
                  type="text"
                  style={{display:'none'}}
                />
                <input type="hidden" name="_redirect" value="#" />
                <div className="space-y-6">
                  <div className="border-2 border-black divide-y-2 divide-black shadow rounded-xl overflow-hidden">
                    <div>
                      <label className="sr-only">
                        User name or email Adress
                      </label>
                      <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="User name or email Adress"
                        className="block w-full px-3 py-4 text-xl text-black border-2 border-transparent appearance-none placeholder-black border-black focus:border-black focus:bg-lila-500 focus:outline-none focus:ring-black sm:text-sm"
                      />
                    </div>
                    <div className="col-span-full">
                      <label className="sr-only">
                        {" "}
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="block w-full px-3 py-4 text-xl text-black border-2 border-transparent appearance-none placeholder-black border-black focus:border-black focus:bg-lila-500 focus:outline-none focus:ring-black sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-black focus:ring-black border-black border-2 rounded-full"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block lg:text-2xl text-black"
                      >
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <Link
                        href="/forgot"
                        className="text-black lg:text-2xl hover:text-black"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>
                  <div className="flex-col flex gap-3 mt-10">
                    <a
                      className="text-black items-center shadow shadow-black text-lg font-semibold inline-flex px-6 focus:outline-none justify-between text-center bg-white border-black ease-in-out transform transition-all focus:ring-lila-700 focus:shadow-none border-2 duration-100 focus:bg-black focus:text-white sm:w-auto py-3 rounded-lg h-16 tracking-wide focus:translate-y-1 w-full hover:text-lila-800 gap-3"
                      href="#_"
                    >
                      <span>Log in with</span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M30.0014 16.3109C30.0014 15.1598 29.9061 14.3198 29.6998 13.4487H16.2871V18.6442H24.1601C24.0014 19.9354 23.1442 21.8798 21.2394 23.1864L21.2127 23.3604L25.4536 26.58L25.7474 26.6087C28.4458 24.1665 30.0014 20.5731 30.0014 16.3109Z"
                          fill="#4285F4"
                        ></path>
                        <path
                          d="M16.2862 30C20.1433 30 23.3814 28.7555 25.7465 26.6089L21.2386 23.1865C20.0322 24.011 18.4132 24.5866 16.2862 24.5866C12.5085 24.5866 9.30219 22.1444 8.15923 18.7688L7.9917 18.7827L3.58202 22.1272L3.52435 22.2843C5.87353 26.8577 10.6989 30 16.2862 30Z"
                          fill="#34A853"
                        ></path>
                        <path
                          d="M8.16007 18.7688C7.85848 17.8977 7.68395 16.9643 7.68395 15.9999C7.68395 15.0354 7.85849 14.1021 8.1442 13.231L8.13621 13.0455L3.67126 9.64734L3.52518 9.71544C2.55696 11.6132 2.0014 13.7444 2.0014 15.9999C2.0014 18.2555 2.55696 20.3865 3.52518 22.2843L8.16007 18.7688Z"
                          fill="#FBBC05"
                        ></path>
                        <path
                          d="M16.2863 7.4133C18.9688 7.4133 20.7783 8.54885 21.8101 9.4978L25.8418 5.64C23.3657 3.38445 20.1434 2 16.2863 2C10.699 2 5.87354 5.1422 3.52435 9.71549L8.14339 13.2311C9.30223 9.85555 12.5086 7.4133 16.2863 7.4133Z"
                          fill="#EB4335"
                        ></path>
                      </svg>
                    </a>

                    <Button
                      className="text-black items-center shadow shadow-black text-lg font-semibold inline-flex px-6 focus:outline-none justify-between text-center bg-white border-black ease-in-out transform transition-all focus:ring-lila-700 focus:shadow-none border-2 duration-100 focus:bg-black focus:text-white sm:w-auto py-3 rounded-lg h-16 tracking-wide focus:translate-y-1 w-full hover:text-lila-800"
                      onClick={handleSignIn}
                    >
                      Log in{" "}
                      <svg
                        className="w-8 h-8"
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.22789 16.8936H4.22789V18.8936H5.22789V16.8936ZM31.2279 18.8936C31.7802 18.8936 32.2279 18.4459 32.2279 17.8936C32.2279 17.3413 31.7802 16.8936 31.2279 16.8936V18.8936ZM22.2279 7.89362V6.89362H20.2279V7.89362H22.2279ZM30.6485 18.671C31.1334 18.9355 31.7408 18.7568 32.0053 18.2719C32.2697 17.7871 32.0911 17.1797 31.6062 16.9152L30.6485 18.671ZM20.2278 27.7931V28.7931H22.2278V27.7931H20.2278ZM5.22789 18.8936H31.1273V16.8936H5.22789V18.8936ZM31.1273 18.8936H31.2279V16.8936H31.1273V18.8936ZM20.2279 7.89362C20.2279 9.36603 21.0232 10.7723 21.9994 11.9705C22.9957 13.1932 24.2995 14.3434 25.5662 15.3222C26.8387 16.3055 28.1063 17.1406 29.0529 17.7286C29.5271 18.0232 29.9231 18.2571 30.2017 18.4181C30.341 18.4987 30.4511 18.561 30.5272 18.6037C30.5653 18.625 30.5948 18.6414 30.6152 18.6527C30.6254 18.6583 30.6334 18.6627 30.6389 18.6658C30.6417 18.6673 30.6439 18.6685 30.6455 18.6694C30.6463 18.6698 30.647 18.6702 30.6475 18.6704C30.6477 18.6706 30.648 18.6707 30.6481 18.6708C30.6484 18.6709 30.6485 18.671 31.1274 17.7931C31.6062 16.9152 31.6063 16.9153 31.6064 16.9153C31.6064 16.9153 31.6064 16.9153 31.6064 16.9153C31.6063 16.9152 31.606 16.9151 31.6056 16.9149C31.6048 16.9144 31.6034 16.9137 31.6015 16.9126C31.5975 16.9104 31.5913 16.907 31.5828 16.9023C31.5657 16.8929 31.5397 16.8784 31.5052 16.8591C31.4363 16.8204 31.3337 16.7624 31.2024 16.6865C30.9396 16.5346 30.5621 16.3116 30.1083 16.0297C29.1987 15.4647 27.9914 14.6686 26.7891 13.7396C25.5809 12.806 24.4098 11.7626 23.5499 10.7072C22.67 9.62732 22.2279 8.6712 22.2279 7.89362H20.2279ZM31.1273 17.8936C30.7527 16.9664 30.7524 16.9666 30.7521 16.9667C30.7519 16.9667 30.7516 16.9669 30.7513 16.967C30.7507 16.9673 30.7499 16.9676 30.749 16.9679C30.7472 16.9687 30.7447 16.9697 30.7417 16.9709C30.7357 16.9734 30.7273 16.9768 30.7166 16.9812C30.6953 16.99 30.6648 17.0028 30.6258 17.0193C30.5478 17.0524 30.4356 17.1007 30.2941 17.1639C30.0113 17.2903 29.6105 17.4762 29.1309 17.7176C28.1742 18.1991 26.8918 18.9078 25.603 19.8126C24.3193 20.7138 22.9944 21.8337 21.9824 23.1472C20.9694 24.4621 20.2278 26.0278 20.2278 27.7931H22.2278C22.2278 26.6087 22.7237 25.4621 23.5668 24.3678C24.411 23.272 25.5609 22.2858 26.7521 21.4495C27.9382 20.6169 29.1306 19.9568 30.0301 19.504C30.4786 19.2782 30.8512 19.1055 31.1097 18.9901C31.2389 18.9324 31.3394 18.8891 31.4064 18.8607C31.4399 18.8465 31.465 18.836 31.4812 18.8293C31.4892 18.826 31.495 18.8236 31.4985 18.8222C31.5003 18.8215 31.5014 18.821 31.502 18.8208C31.5023 18.8206 31.5024 18.8206 31.5024 18.8206C31.5024 18.8206 31.5023 18.8206 31.5023 18.8206C31.5021 18.8207 31.5019 18.8208 31.1273 17.8936Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </Button>
                  </div>
                  <div>
                    <p className="text-sm lg:text-2xl text-black">
                      Not a member?
                      <Link
                        href="/register"
                        className="text-black lg:text-2xl hover:text-lila-900 underline ml-3"
                      >
                        Sign up now
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="hidden bg-lila-500 lg:block lg:flex-1 lg:relative sm:contents">
            <div
              className="absolute inset-0 object-cover w-full h-full bg-lila-500"
            >
              <img
                className="object-center w-full h-full"
                src="/images/thumbnail1.svg"
                alt=""
                width="1310"
                height="873"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
