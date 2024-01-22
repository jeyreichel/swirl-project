"use client";

import { useEffect, useState } from "react";

import { RadioGroup } from "@headlessui/react";

import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import createClient from "openapi-fetch";
import { components, paths } from "@/types/polylab";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Purchase from "./components/purchase";
import { displayFormattedPrice } from "@/lib/utils";
import { Cart, TaxInfo } from "@/types/extra";
import axios from "axios";
import useLocalStorage, { writeStorage } from "@rehooks/local-storage";
import { Skeleton } from "@/components/ui/skeleton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

type Address = components["schemas"]["Address"];

const stripePromise = loadStripe(
  "pk_test_51MW708CotpJCCPRLHmIRPff8fzu8BzFjPEN6IPtpCpmauKtVurUeFE361rigXUyTZ2MIXvDgQWwIGvnLzwbrsdmo00bAVJQrVO"
);

const deliveryMethods = [
  {
    id: 1,
    title: "Standard",
    turnaround: "4–10 business days",
    price: 2000,
  },
];

function classNames(...classNamees: string[]) {
  return classNamees.filter(Boolean).join(" ");
}

const getTaxes = async ({
  info,
  id,
  addr,
}: {
  info: TaxInfo;
  id: string;
  addr: Address;
}) => {
  for (let k of Object.keys(addr)) {
    // @ts-ignore
    if (addr[k] === "") {
      return null;
    }
  }

  const d = await axios.post("/api/taxes", { data: info, id: id });

  return d.data;
};

const createOrder = async (token: string, products: string[]) => {
  const { POST } = createClient<paths>({
    baseUrl: process.env.NEXT_PUBLIC_POLYLAB_URL,
  });

  if (token === "" || products.length === 0) {
    return;
  }

  return await POST("/orders/create", {
    body: {
      items: products,
    },
    headers: {
      "X-API-Key": `${token}`,
    },
  });
};

export default function Example() {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );

  const [token, setToken] = useState<string | null | undefined>(null);

  useEffect(() => {
    (async () => {
      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        router.push("/login?redirectTo=" + encodeURIComponent("/checkout"));
      }
      setToken(session.data.session?.access_token);
    })();
  }, []);

  const products = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const c = JSON.parse(
        localStorage.getItem("cart") ?? JSON.stringify({ items: [] })
      ) as Cart;

      const { GET } = createClient<paths>({
        baseUrl: process.env.NEXT_PUBLIC_POLYLAB_URL,
      });

      const products = [];

      for (let i of c.items) {
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

  const [address, setAddress] = useState<Address>({
    first_name: "",
    last_name: "",
    city: "",
    country: "US",
    street: "",
    zip: "",
    state: "",
    phone: "",
    discord: "",
  });

  const [total, setTotal] = useState(0);
  const [cart] = useLocalStorage<Cart>("cart");
  const client = useQueryClient();

  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const session = await supabase.auth.getSession();
      if (session.data.session) {
        setSignedIn(true);
      }
    })();
  }, []);

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
    client.invalidateQueries({ queryKey: ["tax", "products"] });
  }, [cart]);

  const order = useQuery({
    queryKey: ["shop", token, products],
    queryFn: () =>
      createOrder(token ?? "", products.data?.map((p) => p.id ?? "") ?? []),
  });

  const updateAddr = (key: keyof Address, value: string) => {
    let addr = address;
    addr[key] = value;
    console.log(addr);
    setAddress({ ...addr });
  };

  const taxes = useQuery({
    queryKey: ["tax", address, total],
    queryFn: async () =>
      await getTaxes({
        addr: address,
        info: {
          currency: "usd",
          customer_details: {
            address: {
              city: address.city,
              country: address.country,
              line1: address.street,
              postal_code: `${address.zip}`,
              state: address.state,
            },
            address_source: "shipping",
          },
          line_items: [
            {
              amount:
                cart?.items.reduce(
                  (accumulator, currentValue) =>
                    accumulator +
                      (products.data?.find((i) => i.id === currentValue.id)
                        ?.price ?? 0) *
                        currentValue.amount ?? 0,
                  0
                ) ?? 0,
              reference: "L1",
              tax_code: "txcd_99999999",
            },
          ],
          shipping_cost: {
            amount: 2000,
            tax_code: "txcd_92010001",
          },
        },
        id: order.data?.data?.payment_intent ?? "",
      }),
  });

  const isDisabled: () => boolean = () => {
    for (let k of Object.keys(address)) {
      // @ts-ignore
      if (address[k] === "") {
        return true;
      }
    }

    if (taxes.isPending) {
      return true;
    }

    return false;
  };

  return (
    <section>
      <div className="mx-auto 2xl:max-w-7xl lg:flex 2xl:border-x-2 border-black border-b-2">
        <div className="lg:w-1/2 p-10 lg:px-20 bg-green-500">
          <div className="w-full mx-auto md:px-0 sm:px-4 text-center">
            <h2 className="sr-only">check Out</h2>

            <form className="mt-6">
              <h2 className="text-3xl lg:text-5xl font-medium text-black max-w-4xl">
                shipping information
              </h2>
              <input
                autoComplete="false"
                name="hidden"
                type="text"
                style={{ display: "none" }}
              />
              <input type="hidden" name="_redirect" value="#" />
              <div className="space-y-6">
                <div className="border-2 border-black divide-y-2 divide-black shadow-large rounded-xl overflow-hidden sm:grid-cols-2 sm:gap-x-4 mt-4">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {" "}
                      First name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      name="first-name"
                      value={address.first_name}
                      placeholder="First name"
                      onChange={(e) => updateAddr("first_name", e.target.value)}
                      className="block w-full px-3 py-4 text-xl text-black border-2 border-transparent appearance-none placeholder-black border-black focus:border-black focus:bg-lila-500 focus:outline-none focus:ring-black sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="last-name"
                    >
                      {" "}
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="last-name"
                        name="last-name"
                        value={address.last_name}
                        onChange={(e) =>
                          updateAddr("last_name", e.target.value)
                        }
                        placeholder="last name"
                        className="block w-full px-3 py-4 text-xl text-black border-2 border-transparent appearance-none placeholder-black border-black focus:border-black focus:bg-lila-500 focus:outline-none focus:ring-black sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="address"
                    >
                      {" "}
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="address"
                        value={address.street}
                        onChange={(e) => updateAddr("street", e.target.value)}
                        id="address"
                        autoComplete="street-address"
                        placeholder="Street Address"
                        className="block w-full px-3 py-4 text-xl text-black border-2 border-transparent appearance-none placeholder-black border-black focus:border-black focus:bg-lila-500 focus:outline-none focus:ring-black sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {" "}
                      City
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="city"
                        value={address.city}
                        onChange={(e) => updateAddr("city", e.target.value)}
                        id="city"
                        autoComplete="address-level2"
                        placeholder="City"
                        className="block w-full px-3 py-4 text-xl text-black border-2 border-transparent appearance-none placeholder-black border-black focus:border-black focus:bg-lila-500 focus:outline-none focus:ring-black sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="country"
                    >
                      {" "}
                      Country
                    </label>
                    <div className="mt-1">
                      <select
                        id="country"
                        name="country"
                        value={address.country}
                        onChange={(e) => updateAddr("country", e.target.value)}
                        autoComplete="country-name"
                        className="block w-full px-3 py-4 text-xl text-black border-2 border-transparent appearance-none placeholder-black border-black focus:border-black focus:bg-lila-500 focus:outline-none focus:ring-black sm:text-sm"
                      >
                        <option value="AF">Afghanistan</option>{" "}
                        <option value="AX">Aland Islands</option>{" "}
                        <option value="AL">Albania</option>{" "}
                        <option value="DZ">Algeria</option>{" "}
                        <option value="AS">American Samoa</option>{" "}
                        <option value="AD">Andorra</option>{" "}
                        <option value="AO">Angola</option>{" "}
                        <option value="AI">Anguilla</option>{" "}
                        <option value="AQ">Antarctica</option>{" "}
                        <option value="AG">Antigua and Barbuda</option>{" "}
                        <option value="AR">Argentina</option>{" "}
                        <option value="AM">Armenia</option>{" "}
                        <option value="AW">Aruba</option>{" "}
                        <option value="AU">Australia</option>{" "}
                        <option value="AT">Austria</option>{" "}
                        <option value="AZ">Azerbaijan</option>{" "}
                        <option value="BS">Bahamas</option>{" "}
                        <option value="BH">Bahrain</option>{" "}
                        <option value="BD">Bangladesh</option>{" "}
                        <option value="BB">Barbados</option>{" "}
                        <option value="BY">Belarus</option>{" "}
                        <option value="BE">Belgium</option>{" "}
                        <option value="BZ">Belize</option>{" "}
                        <option value="BJ">Benin</option>{" "}
                        <option value="BM">Bermuda</option>{" "}
                        <option value="BT">Bhutan</option>{" "}
                        <option value="BO">Bolivia</option>{" "}
                        <option value="BQ">
                          Bonaire, Sint Eustatius and Saba
                        </option>{" "}
                        <option value="BA">Bosnia and Herzegovina</option>{" "}
                        <option value="BW">Botswana</option>{" "}
                        <option value="BV">Bouvet Island</option>{" "}
                        <option value="BR">Brazil</option>{" "}
                        <option value="IO">
                          British Indian Ocean Territory
                        </option>{" "}
                        <option value="BN">Brunei Darussalam</option>{" "}
                        <option value="BG">Bulgaria</option>{" "}
                        <option value="BF">Burkina Faso</option>{" "}
                        <option value="BI">Burundi</option>{" "}
                        <option value="KH">Cambodia</option>{" "}
                        <option value="CM">Cameroon</option>{" "}
                        <option value="CA">Canada</option>{" "}
                        <option value="CV">Cape Verde</option>{" "}
                        <option value="KY">Cayman Islands</option>{" "}
                        <option value="CF">Central African Republic</option>{" "}
                        <option value="TD">Chad</option>{" "}
                        <option value="CL">Chile</option>{" "}
                        <option value="CN">China</option>{" "}
                        <option value="CX">Christmas Island</option>{" "}
                        <option value="CC">Cocos (Keeling) Islands</option>{" "}
                        <option value="CO">Colombia</option>{" "}
                        <option value="KM">Comoros</option>{" "}
                        <option value="CG">Congo</option>{" "}
                        <option value="CD">
                          Congo, Democratic Republic of the Congo
                        </option>{" "}
                        <option value="CK">Cook Islands</option>{" "}
                        <option value="CR">Costa Rica</option>{" "}
                        <option value="CI">Cote D&apos;Ivoire</option>{" "}
                        <option value="HR">Croatia</option>{" "}
                        <option value="CU">Cuba</option>{" "}
                        <option value="CW">Curacao</option>{" "}
                        <option value="CY">Cyprus</option>{" "}
                        <option value="CZ">Czech Republic</option>{" "}
                        <option value="DK">Denmark</option>{" "}
                        <option value="DJ">Djibouti</option>{" "}
                        <option value="DM">Dominica</option>{" "}
                        <option value="DO">Dominican Republic</option>{" "}
                        <option value="EC">Ecuador</option>{" "}
                        <option value="EG">Egypt</option>{" "}
                        <option value="SV">El Salvador</option>{" "}
                        <option value="GQ">Equatorial Guinea</option>{" "}
                        <option value="ER">Eritrea</option>{" "}
                        <option value="EE">Estonia</option>{" "}
                        <option value="ET">Ethiopia</option>{" "}
                        <option value="FK">Falkland Islands (Malvinas)</option>{" "}
                        <option value="FO">Faroe Islands</option>{" "}
                        <option value="FJ">Fiji</option>{" "}
                        <option value="FI">Finland</option>{" "}
                        <option value="FR">France</option>{" "}
                        <option value="GF">French Guiana</option>{" "}
                        <option value="PF">French Polynesia</option>{" "}
                        <option value="TF">French Southern Territories</option>{" "}
                        <option value="GA">Gabon</option>{" "}
                        <option value="GM">Gambia</option>{" "}
                        <option value="GE">Georgia</option>{" "}
                        <option value="DE">Germany</option>{" "}
                        <option value="GH">Ghana</option>{" "}
                        <option value="GI">Gibraltar</option>{" "}
                        <option value="GR">Greece</option>{" "}
                        <option value="GL">Greenland</option>{" "}
                        <option value="GD">Grenada</option>{" "}
                        <option value="GP">Guadeloupe</option>{" "}
                        <option value="GU">Guam</option>{" "}
                        <option value="GT">Guatemala</option>{" "}
                        <option value="GG">Guernsey</option>{" "}
                        <option value="GN">Guinea</option>{" "}
                        <option value="GW">Guinea-Bissau</option>{" "}
                        <option value="GY">Guyana</option>{" "}
                        <option value="HT">Haiti</option>{" "}
                        <option value="HM">
                          Heard Island and Mcdonald Islands
                        </option>{" "}
                        <option value="VA">
                          Holy See (Vatican City State)
                        </option>{" "}
                        <option value="HN">Honduras</option>{" "}
                        <option value="HK">Hong Kong</option>{" "}
                        <option value="HU">Hungary</option>{" "}
                        <option value="IS">Iceland</option>{" "}
                        <option value="IN">India</option>{" "}
                        <option value="ID">Indonesia</option>{" "}
                        <option value="IR">Iran, Islamic Republic of</option>{" "}
                        <option value="IQ">Iraq</option>{" "}
                        <option value="IE">Ireland</option>{" "}
                        <option value="IM">Isle of Man</option>{" "}
                        <option value="IL">Israel</option>{" "}
                        <option value="IT">Italy</option>{" "}
                        <option value="JM">Jamaica</option>{" "}
                        <option value="JP">Japan</option>{" "}
                        <option value="JE">Jersey</option>{" "}
                        <option value="JO">Jordan</option>{" "}
                        <option value="KZ">Kazakhstan</option>{" "}
                        <option value="KE">Kenya</option>{" "}
                        <option value="KI">Kiribati</option>{" "}
                        <option value="KP">
                          Korea, Democratic People&apos;s Republic of
                        </option>{" "}
                        <option value="KR">Korea, Republic of</option>{" "}
                        <option value="XK">Kosovo</option>{" "}
                        <option value="KW">Kuwait</option>{" "}
                        <option value="KG">Kyrgyzstan</option>{" "}
                        <option value="LA">
                          Lao People&apos;s Democratic Republic
                        </option>{" "}
                        <option value="LV">Latvia</option>{" "}
                        <option value="LB">Lebanon</option>{" "}
                        <option value="LS">Lesotho</option>{" "}
                        <option value="LR">Liberia</option>{" "}
                        <option value="LY">Libyan Arab Jamahiriya</option>{" "}
                        <option value="LI">Liechtenstein</option>{" "}
                        <option value="LT">Lithuania</option>{" "}
                        <option value="LU">Luxembourg</option>{" "}
                        <option value="MO">Macao</option>{" "}
                        <option value="MK">
                          Macedonia, the Former Yugoslav Republic of
                        </option>{" "}
                        <option value="MG">Madagascar</option>{" "}
                        <option value="MW">Malawi</option>{" "}
                        <option value="MY">Malaysia</option>{" "}
                        <option value="MV">Maldives</option>{" "}
                        <option value="ML">Mali</option>{" "}
                        <option value="MT">Malta</option>{" "}
                        <option value="MH">Marshall Islands</option>{" "}
                        <option value="MQ">Martinique</option>{" "}
                        <option value="MR">Mauritania</option>{" "}
                        <option value="MU">Mauritius</option>{" "}
                        <option value="YT">Mayotte</option>{" "}
                        <option value="MX">Mexico</option>{" "}
                        <option value="FM">
                          Micronesia, Federated States of
                        </option>{" "}
                        <option value="MD">Moldova, Republic of</option>{" "}
                        <option value="MC">Monaco</option>{" "}
                        <option value="MN">Mongolia</option>{" "}
                        <option value="ME">Montenegro</option>{" "}
                        <option value="MS">Montserrat</option>{" "}
                        <option value="MA">Morocco</option>{" "}
                        <option value="MZ">Mozambique</option>{" "}
                        <option value="MM">Myanmar</option>{" "}
                        <option value="NA">Namibia</option>{" "}
                        <option value="NR">Nauru</option>{" "}
                        <option value="NP">Nepal</option>{" "}
                        <option value="NL">Netherlands</option>{" "}
                        <option value="AN">Netherlands Antilles</option>{" "}
                        <option value="NC">New Caledonia</option>{" "}
                        <option value="NZ">New Zealand</option>{" "}
                        <option value="NI">Nicaragua</option>{" "}
                        <option value="NE">Niger</option>{" "}
                        <option value="NG">Nigeria</option>{" "}
                        <option value="NU">Niue</option>{" "}
                        <option value="NF">Norfolk Island</option>{" "}
                        <option value="MP">Northern Mariana Islands</option>{" "}
                        <option value="NO">Norway</option>{" "}
                        <option value="OM">Oman</option>{" "}
                        <option value="PK">Pakistan</option>{" "}
                        <option value="PW">Palau</option>{" "}
                        <option value="PS">
                          Palestinian Territory, Occupied
                        </option>{" "}
                        <option value="PA">Panama</option>{" "}
                        <option value="PG">Papua New Guinea</option>{" "}
                        <option value="PY">Paraguay</option>{" "}
                        <option value="PE">Peru</option>{" "}
                        <option value="PH">Philippines</option>{" "}
                        <option value="PN">Pitcairn</option>{" "}
                        <option value="PL">Poland</option>{" "}
                        <option value="PT">Portugal</option>{" "}
                        <option value="PR">Puerto Rico</option>{" "}
                        <option value="QA">Qatar</option>{" "}
                        <option value="RE">Reunion</option>{" "}
                        <option value="RO">Romania</option>{" "}
                        <option value="RU">Russian Federation</option>{" "}
                        <option value="RW">Rwanda</option>{" "}
                        <option value="BL">Saint Barthelemy</option>{" "}
                        <option value="SH">Saint Helena</option>{" "}
                        <option value="KN">Saint Kitts and Nevis</option>{" "}
                        <option value="LC">Saint Lucia</option>{" "}
                        <option value="MF">Saint Martin</option>{" "}
                        <option value="PM">Saint Pierre and Miquelon</option>{" "}
                        <option value="VC">
                          Saint Vincent and the Grenadines
                        </option>{" "}
                        <option value="WS">Samoa</option>{" "}
                        <option value="SM">San Marino</option>{" "}
                        <option value="ST">Sao Tome and Principe</option>{" "}
                        <option value="SA">Saudi Arabia</option>{" "}
                        <option value="SN">Senegal</option>{" "}
                        <option value="RS">Serbia</option>{" "}
                        <option value="CS">Serbia and Montenegro</option>{" "}
                        <option value="SC">Seychelles</option>{" "}
                        <option value="SL">Sierra Leone</option>{" "}
                        <option value="SG">Singapore</option>{" "}
                        <option value="SX">Sint Maarten</option>{" "}
                        <option value="SK">Slovakia</option>{" "}
                        <option value="SI">Slovenia</option>{" "}
                        <option value="SB">Solomon Islands</option>{" "}
                        <option value="SO">Somalia</option>{" "}
                        <option value="ZA">South Africa</option>{" "}
                        <option value="GS">
                          South Georgia and the South Sandwich Islands
                        </option>{" "}
                        <option value="SS">South Sudan</option>{" "}
                        <option value="ES">Spain</option>{" "}
                        <option value="LK">Sri Lanka</option>{" "}
                        <option value="SD">Sudan</option>{" "}
                        <option value="SR">Suriname</option>{" "}
                        <option value="SJ">Svalbard and Jan Mayen</option>{" "}
                        <option value="SZ">Swaziland</option>{" "}
                        <option value="SE">Sweden</option>{" "}
                        <option value="CH">Switzerland</option>{" "}
                        <option value="SY">Syrian Arab Republic</option>{" "}
                        <option value="TW">Taiwan, Province of China</option>{" "}
                        <option value="TJ">Tajikistan</option>{" "}
                        <option value="TZ">Tanzania, United Republic of</option>{" "}
                        <option value="TH">Thailand</option>{" "}
                        <option value="TL">Timor-Leste</option>{" "}
                        <option value="TG">Togo</option>{" "}
                        <option value="TK">Tokelau</option>{" "}
                        <option value="TO">Tonga</option>{" "}
                        <option value="TT">Trinidad and Tobago</option>{" "}
                        <option value="TN">Tunisia</option>{" "}
                        <option value="TR">Turkey</option>{" "}
                        <option value="TM">Turkmenistan</option>{" "}
                        <option value="TC">Turks and Caicos Islands</option>{" "}
                        <option value="TV">Tuvalu</option>{" "}
                        <option value="UG">Uganda</option>{" "}
                        <option value="UA">Ukraine</option>{" "}
                        <option value="AE">United Arab Emirates</option>{" "}
                        <option value="GB">United Kingdom</option>{" "}
                        <option value="US">United States</option>{" "}
                        <option value="UM">
                          United States Minor Outlying Islands
                        </option>{" "}
                        <option value="UY">Uruguay</option>{" "}
                        <option value="UZ">Uzbekistan</option>{" "}
                        <option value="VU">Vanuatu</option>{" "}
                        <option value="VE">Venezuela</option>{" "}
                        <option value="VN">Viet Nam</option>{" "}
                        <option value="VG">Virgin Islands, British</option>{" "}
                        <option value="VI">Virgin Islands, U.s.</option>{" "}
                        <option value="WF">Wallis and Futuna</option>{" "}
                        <option value="EH">Western Sahara</option>{" "}
                        <option value="YE">Yemen</option>{" "}
                        <option value="ZM">Zambia</option>{" "}
                        <option value="ZW">Zimbabwe</option>{" "}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="region"
                    >
                      {" "}
                      State / Province
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="region"
                        id="region"
                        value={address.state}
                        onChange={(e) => updateAddr("state", e.target.value)}
                        autoComplete="address-level1"
                        placeholder="State / Province"
                        className="block w-full px-3 py-4 text-xl text-black border-2 border-transparent appearance-none placeholder-black border-black focus:border-black focus:bg-lila-500 focus:outline-none focus:ring-black sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="address"
                    >
                      {" "}
                      Postal Code
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        value={address.zip}
                        onChange={(e) => updateAddr("zip", e.target.value)}
                        autoComplete="postal-code"
                        placeholder="Postal Code"
                        className="block w-full px-3 py-4 text-xl text-black border-2 border-transparent appearance-none placeholder-black border-black focus:border-black focus:bg-lila-500 focus:outline-none focus:ring-black sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="phone"
                    >
                      {" "}
                      Phone
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={address.phone}
                        onChange={(e) => updateAddr("phone", e.target.value)}
                        autoComplete="tel"
                        placeholder="Phone Number"
                        className="block w-full px-3 py-4 text-xl text-black border-2 border-transparent appearance-none placeholder-black border-black focus:border-black focus:bg-lila-500 focus:outline-none focus:ring-black sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="discord-username"
                    >
                      {" "}
                      Discord Username
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={address.discord}
                        onChange={(e) => updateAddr("discord", e.target.value)}
                        autoComplete="tel"
                        placeholder="Discord Username"
                        className="block w-full px-3 py-4 text-xl text-black border-2 border-transparent appearance-none placeholder-black border-black focus:border-black focus:bg-lila-500 focus:outline-none focus:ring-black sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-14">
                <RadioGroup
                  value={selectedDeliveryMethod}
                  onChange={setSelectedDeliveryMethod}
                >
                  <RadioGroup.Label className="text-lg font-medium text-gray-900">
                    Delivery method
                  </RadioGroup.Label>

                  <div className="border-2 border-black divide-y-2 divide-black shadow-large rounded-xl overflow-hidden sm:grid-cols-2 sm:gap-x-4 mt-4">
                    {deliveryMethods.map((deliveryMethod) => (
                      <RadioGroup.Option
                        key={deliveryMethod.id}
                        value={deliveryMethod}
                        className={({ checked, active }) =>
                          classNames(
                            checked ? "border-transparent" : "border-gray-300",
                            active ? "ring-2 ring-indigo-500" : "",
                            "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                          )
                        }
                      >
                        {({ checked, active }) => (
                          <>
                            <span className="flex flex-1">
                              <span className="flex flex-col">
                                <RadioGroup.Label
                                  as="span"
                                  className="block text-sm font-medium text-gray-900"
                                >
                                  {deliveryMethod.title}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as="span"
                                  className="mt-1 flex items-center text-sm text-gray-500"
                                >
                                  {deliveryMethod.turnaround}
                                </RadioGroup.Description>
                                <RadioGroup.Description
                                  as="span"
                                  className="mt-6 text-sm font-medium text-gray-900"
                                >
                                  {displayFormattedPrice(deliveryMethod.price)}
                                </RadioGroup.Description>
                              </span>
                            </span>
                            {checked ? (
                              <CheckCircleIcon
                                className="h-5 w-5 text-indigo-600"
                                aria-hidden="true"
                              />
                            ) : null}
                            <span
                              className={classNames(
                                active ? "border" : "border-2",
                                checked
                                  ? "border-indigo-500"
                                  : "border-transparent",
                                "pointer-events-none absolute -inset-px rounded-lg"
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </form>
          </div>
        </div>
        <div className="lg:w-1/2 p-10 lg:px-20 bg-green-500">
          <div className="w-full mx-auto md:px-0 sm:px-4">
            <h2 className="text-3xl lg:text-5xl font-medium text-black max-w-4xl">
              Order summary
            </h2>

            <div className="border-2 border-black divide-y-2 divide-black shadow-large rounded-xl overflow-hidden sm:grid-cols-2 sm:gap-x-4 mt-4 bg-white">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {products.data?.map((product) => (
                  <li key={product.id} className="flex px-4 py-6 sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        src={product.image_src}
                        alt={product.image_alt}
                        className="w-20 rounded-md"
                      />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <a
                              href={`/item/${product.id}`}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.name}
                            </a>
                          </h4>
                          {/* @ts-ignore */}
                          {product.size !== undefined && (
                            <p className="mt-1 text-sm text-gray-500">
                              {/* @ts-ignore */}
                              {product.size}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {displayFormattedPrice(product.price)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
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
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">$20.00</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  {taxes.data?.tax_amount_exclusive !== undefined ? (
                    <dd className="text-sm font-medium text-gray-900">
                      {displayFormattedPrice(
                        taxes.data?.tax_amount_exclusive ?? 0
                      )}
                    </dd>
                  ) : (
                    <Skeleton className="h-4 w-[50px]" />
                  )}
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  {taxes.data?.amount_total ? (
                    <dd className="text-base font-medium text-gray-900">
                      {displayFormattedPrice(taxes.data?.amount_total ?? 0)}
                    </dd>
                  ) : (
                    <Skeleton className="h-6 w-[50px]" />
                  )}
                </div>
              </dl>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                {order.data?.data?.client_secret && (
                  <Elements
                    stripe={stripePromise}
                    options={{ clientSecret: order.data.data?.client_secret }}
                  >
                    <Purchase
                      disabled={isDisabled()}
                      data={{
                        address,
                        order_id: order.data.data.id,
                        receipt: {
                          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                          shipping: 2000,
                          subtotal:
                            cart?.items.reduce(
                              (accumulator, currentValue) =>
                                accumulator +
                                  (products.data?.find(
                                    (i) => i.id === currentValue.id
                                  )?.price ?? 0) *
                                    currentValue.amount ?? 0,
                              0
                            ) ?? 0,
                          tax: taxes.data?.tax_amount_exclusive ?? 0,
                          total: taxes.data?.amount_total ?? 0,
                        },
                      }}
                    />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
