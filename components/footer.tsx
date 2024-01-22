export default function Footer() {
  return (
    <footer className="overflow-hidden">
      <div className="p-8 lg:p-20 pb-0 lg:pb-0 2xl:max-w-7xl mx-auto bg-black border-b border-black">
        <div className="h-full space-y-12 lg:space-y-0 pb-12 lg:pb-48">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-32 items-start">
            <div className="flex flex-col gap-6 lg:col-span-2 max-w-xl">
              <div>
                <h3 className="text-3xl md:text-4xl text-white lg:text-5xl font-medium tracking-tight">
                  Subscribe, get tips to grow the way you deserve.
                </h3>
                <form className="bg-white border-2 border-black overflow-hidden  justify-between mt-4 rounded-xl sm:flex">
                  <label className="sr-only" htmlFor="email-address">
                    Email address
                  </label>
                  <input
                    autoComplete="email"
                    className="w-full px-5 text-center lg:text-left border-transparent focus:ring-black h-20 text-sm py-3 bg-transparent focus:border-black placeholder-black rounded-xl"
                    id="email-address"
                    name="email"
                    placeholder="Enter your email"
                    required
                    type="email"
                  />
                  <button
                    className="text-black flex items-center text-lg font-bold focus:outline-none justify-center text-center bg-lila-500 lg:border-l-2 border-black transform transition hover:shadow-none duration-200 hover:bg-lila-600 w-full h-20 sm:w-20 shrink-0"
                    type="button"
                  >
                    <svg
                      className="w-10 h-10"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.22789 16.8936H4.22789V18.8936H5.22789V16.8936ZM31.2279 18.8936C31.7802 18.8936 32.2279 18.4459 32.2279 17.8936C32.2279 17.3413 31.7802 16.8936 31.2279 16.8936V18.8936ZM22.2279 7.89362V6.89362H20.2279V7.89362H22.2279ZM30.6485 18.671C31.1334 18.9355 31.7408 18.7568 32.0053 18.2719C32.2697 17.7871 32.0911 17.1797 31.6062 16.9152L30.6485 18.671ZM20.2278 27.7931V28.7931H22.2278V27.7931H20.2278ZM5.22789 18.8936H31.1273V16.8936H5.22789V18.8936ZM31.1273 18.8936H31.2279V16.8936H31.1273V18.8936ZM20.2279 7.89362C20.2279 9.36603 21.0232 10.7723 21.9994 11.9705C22.9957 13.1932 24.2995 14.3434 25.5662 15.3222C26.8387 16.3055 28.1063 17.1406 29.0529 17.7286C29.5271 18.0232 29.9231 18.2571 30.2017 18.4181C30.341 18.4987 30.4511 18.561 30.5272 18.6037C30.5653 18.625 30.5948 18.6414 30.6152 18.6527C30.6254 18.6583 30.6334 18.6627 30.6389 18.6658C30.6417 18.6673 30.6439 18.6685 30.6455 18.6694C30.6463 18.6698 30.647 18.6702 30.6475 18.6704C30.6477 18.6706 30.648 18.6707 30.6481 18.6708C30.6484 18.6709 30.6485 18.671 31.1274 17.7931C31.6062 16.9152 31.6063 16.9153 31.6064 16.9153C31.6064 16.9153 31.6064 16.9153 31.6064 16.9153C31.6063 16.9152 31.606 16.9151 31.6056 16.9149C31.6048 16.9144 31.6034 16.9137 31.6015 16.9126C31.5975 16.9104 31.5913 16.907 31.5828 16.9023C31.5657 16.8929 31.5397 16.8784 31.5052 16.8591C31.4363 16.8204 31.3337 16.7624 31.2024 16.6865C30.9396 16.5346 30.5621 16.3116 30.1083 16.0297C29.1987 15.4647 27.9914 14.6686 26.7891 13.7396C25.5809 12.806 24.4098 11.7626 23.5499 10.7072C22.67 9.62732 22.2279 8.6712 22.2279 7.89362H20.2279ZM31.1273 17.8936C30.7527 16.9664 30.7524 16.9666 30.7521 16.9667C30.7519 16.9667 30.7516 16.9669 30.7513 16.967C30.7507 16.9673 30.7499 16.9676 30.749 16.9679C30.7472 16.9687 30.7447 16.9697 30.7417 16.9709C30.7357 16.9734 30.7273 16.9768 30.7166 16.9812C30.6953 16.99 30.6648 17.0028 30.6258 17.0193C30.5478 17.0524 30.4356 17.1007 30.2941 17.1639C30.0113 17.2903 29.6105 17.4762 29.1309 17.7176C28.1742 18.1991 26.8918 18.9078 25.603 19.8126C24.3193 20.7138 22.9944 21.8337 21.9824 23.1472C20.9694 24.4621 20.2278 26.0278 20.2278 27.7931H22.2278C22.2278 26.6087 22.7237 25.4621 23.5668 24.3678C24.411 23.272 25.5609 22.2858 26.7521 21.4495C27.9382 20.6169 29.1306 19.9568 30.0301 19.504C30.4786 19.2782 30.8512 19.1055 31.1097 18.9901C31.2389 18.9324 31.3394 18.8891 31.4064 18.8607C31.4399 18.8465 31.465 18.836 31.4812 18.8293C31.4892 18.826 31.495 18.8236 31.4985 18.8222C31.5003 18.8215 31.5014 18.821 31.502 18.8208C31.5023 18.8206 31.5024 18.8206 31.5024 18.8206C31.5024 18.8206 31.5023 18.8206 31.5023 18.8206C31.5021 18.8207 31.5019 18.8208 31.1273 17.8936Z"
                        fill="black"
                      ></path>
                    </svg>
                  </button>
                </form>
              </div>
              <div className="flex flex-col gap-6 ">
                <p className="text-white text-xl font-normal tracking-wide">
                  Lexington Themes{" "}
                  <span> © Copyright 2023. All rights reserved.</span>
                </p>
                <div className="flex gap-4">
                  <a
                    href="#_"
                    className="flex h-10 w-10 items-center justify-center hover:shadow-none hover:border-white border-2 border-black shadow-tiny duration-300 shadow-white hover:translate-x-1 hover:translate-y-1 rounded-full bg-white focus:bg-black focus:text-white"
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-brand-x w-4 h-4"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                      </svg>
                    </div>
                  </a>
                  <a
                    href="#_"
                    className="flex h-10 w-10 items-center justify-center hover:shadow-none hover:border-white border-2 border-black shadow-tiny duration-300 shadow-white hover:translate-x-1 hover:translate-y-1 rounded-full bg-white focus:bg-black focus:text-white"
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-currency-bitcoin w-4 h-4"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M6 6h8a3 3 0 0 1 0 6a3 3 0 0 1 0 6h-8"></path>
                        <path d="M8 6l0 12"></path>
                        <path d="M8 12l6 0"></path>
                        <path d="M9 3l0 3"></path>
                        <path d="M13 3l0 3"></path>
                        <path d="M9 18l0 3"></path>
                        <path d="M13 18l0 3"></path>
                      </svg>
                    </div>
                  </a>
                  <a
                    href="#_"
                    className="flex h-10 w-10 items-center justify-center hover:shadow-none hover:border-white border-2 border-black shadow-tiny duration-300 shadow-white hover:translate-x-1 hover:translate-y-1 rounded-full bg-white focus:bg-black focus:text-white"
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-brand-github-filled w-4 h-4"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path
                          d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z"
                          strokeWidth="0"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <nav
              className="grid grid-cols-1 gap-x-12 gap-y-4 l justify-between text-base tracking-wide items-center text-white"
              role="navigation"
            >
              <a className="hover:text-lila-500" href="/">
                Overview
              </a>
              <a className="hover:text-lila-500" href="/style-guide">
                Style Guide
              </a>
              <a
                className="hover:text-lila-500"
                href="https://www.lexingtonthemes.com/license"
              >
                License
              </a>
              <a
                className="hover:text-lila-500"
                href="https://www.lexingtonthemes.com/documentation"
              >
                Documentation
              </a>
              <a
                className="hover:text-lila-500"
                href="https://x.com/lexingtonthemes"
              >
                @lexingtonthemes
              </a>
              <a
                className="hover:text-lila-500"
                href="https://x.com/mike_andreuzza"
              >
                @Mike_Andreuzza
              </a>
              <a
                className="hover:text-lila-500"
                href="https://lexingtonthemes.com/pricing"
              >
                Get the bundle
              </a>
            </nav>
          </div>
        </div>
        <svg
          className="lg:-mb-6 lg:-mx-64 lg:scale-[3]  "
          viewBox="0 0 1507 125"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.210789 122V2.56H26.2704V122H0.210789ZM12.6977 77.3005V55.9461H82.371V77.3005H12.6977ZM12.6977 24.8193V2.56H89.0669V24.8193H12.6977ZM107.485 122V2.56H133.544V122H107.485ZM112.914 122V100.103H184.035V122H112.914ZM193.141 122L234.041 2.56H272.044L312.943 122H284.712L254.49 23.1905H251.776L221.373 122H193.141ZM216.125 98.4739V80.7389H293.761V98.4739H216.125ZM329.455 122V2.56H379.041C386.401 2.56 392.976 3.22355 398.767 4.55066C404.558 5.75712 409.504 7.62714 413.606 10.1607C417.829 12.6943 421.026 16.0121 423.198 20.1141C425.49 24.0954 426.636 28.8609 426.636 34.4107C426.636 39.1159 425.611 43.2179 423.56 46.7166C421.629 50.2154 418.553 53.0505 414.33 55.2222C410.228 57.3938 404.799 58.9019 398.043 59.7464V62.461C409.504 63.3055 417.889 66.201 423.198 71.1475C428.627 75.9734 431.341 82.4883 431.341 90.6922C431.341 97.5691 429.532 103.36 425.912 108.065C422.414 112.65 417.105 116.149 409.987 118.562C402.869 120.854 394.062 122 383.565 122H329.455ZM354.248 101.008H383.203C390.925 101.008 396.656 99.8614 400.396 97.5691C404.136 95.1562 406.006 91.4764 406.006 86.5299C406.006 80.8596 403.653 76.6369 398.948 73.8621C394.243 70.9665 387.124 69.5188 377.593 69.5188H354.248V101.008ZM354.248 53.2315H373.793C383.203 53.2315 390.08 51.9647 394.424 49.4311C398.888 46.7769 401.119 42.9162 401.119 37.8491C401.119 32.7819 399.129 29.1022 395.147 26.8099C391.166 24.397 385.074 23.1905 376.87 23.1905H354.248V53.2315ZM452.988 122V2.56H502.574C509.934 2.56 516.509 3.22355 522.3 4.55066C528.091 5.75712 533.037 7.62714 537.139 10.1607C541.362 12.6943 544.559 16.0121 546.731 20.1141C549.023 24.0954 550.169 28.8609 550.169 34.4107C550.169 39.1159 549.144 43.2179 547.093 46.7166C545.162 50.2154 542.086 53.0505 537.863 55.2222C533.761 57.3938 528.332 58.9019 521.576 59.7464V62.461C533.037 63.3055 541.422 66.201 546.731 71.1475C552.16 75.9734 554.874 82.4883 554.874 90.6922C554.874 97.5691 553.065 103.36 549.445 108.065C545.947 112.65 540.638 116.149 533.52 118.562C526.402 120.854 517.595 122 507.098 122H452.988ZM477.781 101.008H506.736C514.458 101.008 520.189 99.8614 523.929 97.5691C527.669 95.1562 529.539 91.4764 529.539 86.5299C529.539 80.8596 527.186 76.6369 522.481 73.8621C517.776 70.9665 510.658 69.5188 501.126 69.5188H477.781V101.008ZM477.781 53.2315H497.326C506.737 53.2315 513.613 51.9647 517.957 49.4311C522.421 46.7769 524.652 42.9162 524.652 37.8491C524.652 32.7819 522.662 29.1022 518.681 26.8099C514.699 24.397 508.607 23.1905 500.403 23.1905H477.781V53.2315ZM576.522 122V2.56H602.762V122H576.522ZM594.618 122V100.827H668.635V122H594.618ZM594.618 71.3285V51.9647H659.587V71.3285H594.618ZM594.618 23.5525V2.56H668.273V23.5525H594.618ZM688.921 122V2.56H737.421C743.935 2.56 749.847 3.10291 755.156 4.18872C760.464 5.1539 765.169 6.60165 769.271 8.53199C773.373 10.4623 776.812 12.8753 779.587 15.7708C782.482 18.5457 784.654 21.8031 786.101 25.5431C787.549 29.1625 788.273 33.2042 788.273 37.6681C788.273 41.8907 787.61 45.7514 786.282 49.2502C784.955 52.6283 782.965 55.5841 780.31 58.1177C777.656 60.6513 774.338 62.7626 770.357 64.4516C766.376 66.02 761.731 67.1059 756.422 67.7091V70.4236C762.575 71.0269 767.462 72.4746 771.081 74.7669C774.821 76.9385 777.716 79.8944 779.767 83.6344C781.939 87.3745 783.809 92.0194 785.378 97.5691L792.616 122H763.842L758.232 99.3788C757.146 94.5529 755.578 90.8129 753.527 88.1587C751.476 85.3838 748.882 83.4535 745.745 82.3676C742.608 81.1612 738.808 80.5579 734.344 80.5579H714.98V122H688.921ZM714.98 61.0132H735.611C743.815 61.0132 750.149 59.4448 754.613 56.308C759.077 53.1712 761.309 48.285 761.309 41.6494C761.309 35.1345 759.197 30.369 754.975 27.3528C750.873 24.216 744.659 22.6476 736.335 22.6476H714.98V61.0132ZM858.98 124.534C849.208 124.534 840.4 122.302 832.558 117.838C824.837 113.253 818.684 106.497 814.099 97.5691C809.635 88.5206 807.404 77.1798 807.404 63.5468C807.404 53.5331 808.67 44.6656 811.204 36.9442C813.858 29.1022 817.658 22.4667 822.605 17.0376C827.672 11.4878 833.885 7.2652 841.245 4.36969C848.604 1.47418 857.11 0.0264204 866.762 0.0264204C874 0.0264204 880.576 0.870946 886.487 2.56C892.399 4.24905 897.526 6.66198 901.87 9.79879C906.213 12.9356 909.591 16.736 912.004 21.1999C914.538 25.5431 915.925 30.4897 916.166 36.0394L891.554 43.6401C891.313 38.573 889.986 34.4107 887.573 31.1532C885.281 27.8958 882.204 25.4828 878.344 23.9144C874.604 22.2254 870.381 21.3808 865.676 21.3808C859.161 21.3808 853.551 22.8889 848.846 25.9051C844.261 28.8006 840.762 33.3248 838.349 39.4778C835.936 45.5101 834.73 53.1712 834.73 62.461C834.73 69.5791 835.394 75.7321 836.721 80.9199C838.168 85.987 840.28 90.2097 843.055 93.5878C845.829 96.9659 849.147 99.4994 853.008 101.188C856.869 102.757 861.332 103.541 866.4 103.541C871.708 103.541 876.293 102.697 880.153 101.008C884.135 99.1978 887.271 96.4833 889.564 92.8639C891.977 89.1238 893.304 84.4186 893.545 78.7482H870.924V59.9274H919.243V81.8247V122H901.146L901.508 91.4161H898.25C896.32 98.6549 893.726 104.748 890.469 109.694C887.211 114.52 882.989 118.2 877.801 120.733C872.734 123.267 866.46 124.534 858.98 124.534ZM934.163 122L975.062 2.56H1013.07L1053.96 122H1025.73L995.512 23.1905H992.797L962.394 122H934.163ZM957.146 98.4739V80.7389H1034.78V98.4739H957.146ZM1114.68 124.534C1106.84 124.534 1099.78 123.749 1093.51 122.181C1087.35 120.733 1082.05 118.501 1077.58 115.485C1073.24 112.348 1069.8 108.488 1067.27 103.903C1064.85 99.1978 1063.47 93.829 1063.1 87.7967L1085.91 80.377C1086.15 85.8061 1087.47 90.3303 1089.89 93.9497C1092.42 97.5691 1095.98 100.223 1100.56 101.912C1105.15 103.601 1110.28 104.446 1115.95 104.446C1121.38 104.446 1125.96 103.782 1129.7 102.455C1133.44 101.128 1136.28 99.3788 1138.21 97.2071C1140.14 94.9149 1141.1 92.4416 1141.1 89.7874C1141.1 86.6506 1139.9 84.117 1137.48 82.1867C1135.07 80.2563 1131.75 78.6276 1127.53 77.3005C1123.43 75.9734 1118.72 74.7066 1113.41 73.5001C1107.5 72.173 1101.65 70.6649 1095.86 68.9759C1090.19 67.2868 1085 65.1152 1080.3 62.461C1075.71 59.8067 1072.03 56.3683 1069.26 52.1457C1066.6 47.9231 1065.28 42.6146 1065.28 36.2204C1065.28 28.8609 1067.09 22.527 1070.7 17.2185C1074.44 11.7895 1079.87 7.56682 1086.99 4.55066C1094.11 1.5345 1102.68 0.0264204 1112.69 0.0264204C1122.82 0.0264204 1131.45 1.5345 1138.57 4.55066C1145.81 7.44618 1151.42 11.6085 1155.4 17.0376C1159.38 22.346 1161.55 28.68 1161.91 36.0394L1138.39 42.5543C1138.39 38.8143 1137.78 35.5568 1136.58 32.7819C1135.37 30.0071 1133.68 27.7148 1131.51 25.9051C1129.34 23.9747 1126.62 22.527 1123.37 21.5618C1120.23 20.5966 1116.61 20.1141 1112.51 20.1141C1107.8 20.1141 1103.7 20.7173 1100.2 21.9238C1096.82 23.1302 1094.23 24.7589 1092.42 26.8099C1090.73 28.8609 1089.89 31.2739 1089.89 34.0487C1089.89 37.3062 1091.21 40.0207 1093.87 42.1924C1096.64 44.2434 1100.26 45.9324 1104.73 47.2595C1109.31 48.5866 1114.32 49.8534 1119.75 51.0599C1124.94 52.1457 1130.18 53.5331 1135.49 55.2222C1140.92 56.7906 1145.93 58.9019 1150.51 61.5561C1155.22 64.0897 1158.96 67.5884 1161.73 72.0524C1164.63 76.3956 1166.08 81.885 1166.08 88.5206C1166.08 95.7594 1164.15 102.093 1160.28 107.522C1156.42 112.952 1150.63 117.174 1142.91 120.19C1135.31 123.086 1125.9 124.534 1114.68 124.534ZM1211.04 122V2.56H1237.1V122H1211.04ZM1175.75 24.4573V2.56H1272.39V24.4573H1175.75ZM1289.09 122V2.56H1315.33V122H1289.09ZM1307.19 122V100.827H1381.2V122H1307.19ZM1307.19 71.3285V51.9647H1372.15V71.3285H1307.19ZM1307.19 23.5525V2.56H1380.84V23.5525H1307.19ZM1413.98 122V100.827H1448.72C1455.48 100.827 1461.09 99.3788 1465.55 96.4833C1470.02 93.4671 1473.39 89.1238 1475.69 83.4535C1477.98 77.7831 1479.12 70.8459 1479.12 62.6419C1479.12 55.8857 1478.4 50.0947 1476.95 45.2688C1475.51 40.3223 1473.33 36.2807 1470.44 33.1439C1467.66 30.0071 1464.1 27.6545 1459.76 26.0861C1455.54 24.5177 1450.53 23.7334 1444.74 23.7334H1413.98V2.56H1443.84C1458.31 2.56 1470.14 4.9126 1479.31 9.61781C1488.47 14.323 1495.23 21.0792 1499.57 29.8864C1503.92 38.573 1506.09 49.0089 1506.09 61.1942C1506.09 70.3633 1505 78.326 1502.83 85.0822C1500.66 91.8384 1497.7 97.5691 1493.96 102.274C1490.34 106.98 1486.12 110.78 1481.3 113.675C1476.47 116.571 1471.34 118.682 1465.91 120.009C1460.48 121.336 1455 122 1449.45 122H1413.98ZM1401.49 122V2.56H1427.55V122H1401.49Z"
            fill="#f5f5f5"
          />
        </svg>

        <svg
          className="lg:-mb-6 lg:-mx-64 lg:scale-[3]  sr-only"
          viewBox="0 0 99 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.676 9H0.42V0.96H2.676V9ZM6.468 6.324H1.032V4.308H6.468V6.324ZM6.648 2.988H1.032V0.96H6.648V2.988ZM9.426 9H7.17V0.96H9.426V9ZM13.458 9H7.794V6.972H13.458V9ZM15.8135 9H13.4855L16.2815 0.96H19.5575L22.3415 9H19.8695L18.5975 5.016L17.9615 2.916H17.7935L17.1335 5.016L15.8135 9ZM20.7455 7.452H15.1655V5.484H20.7455V7.452ZM26.9633 9H22.4513V0.96H26.7233C27.3393 0.96 27.8473 1.032 28.2473 1.176C28.6553 1.312 28.9593 1.528 29.1593 1.824C29.3593 2.112 29.4593 2.484 29.4593 2.94C29.4593 3.444 29.3233 3.844 29.0513 4.14C28.7793 4.436 28.3673 4.608 27.8153 4.656V4.812C28.4953 4.836 28.9993 5.032 29.3273 5.4C29.6633 5.768 29.8313 6.224 29.8313 6.768C29.8313 7.232 29.7273 7.632 29.5193 7.968C29.3193 8.304 29.0073 8.56 28.5833 8.736C28.1593 8.912 27.6193 9 26.9633 9ZM24.7073 5.772V6.972H26.8793C27.0953 6.972 27.2593 6.94 27.3713 6.876C27.4833 6.812 27.5393 6.648 27.5393 6.384C27.5393 6.112 27.4873 5.944 27.3833 5.88C27.2793 5.808 27.1113 5.772 26.8793 5.772H24.7073ZM24.7073 2.988V4.02H26.6033C26.8353 4.02 26.9913 3.984 27.0713 3.912C27.1593 3.84 27.2033 3.704 27.2033 3.504C27.2033 3.288 27.1513 3.148 27.0473 3.084C26.9513 3.02 26.7873 2.988 26.5553 2.988H24.7073ZM34.932 9H30.42V0.96H34.692C35.308 0.96 35.816 1.032 36.216 1.176C36.624 1.312 36.928 1.528 37.128 1.824C37.328 2.112 37.428 2.484 37.428 2.94C37.428 3.444 37.292 3.844 37.02 4.14C36.748 4.436 36.336 4.608 35.784 4.656V4.812C36.464 4.836 36.968 5.032 37.296 5.4C37.632 5.768 37.8 6.224 37.8 6.768C37.8 7.232 37.696 7.632 37.488 7.968C37.288 8.304 36.976 8.56 36.552 8.736C36.128 8.912 35.588 9 34.932 9ZM32.676 5.772V6.972H34.848C35.064 6.972 35.228 6.94 35.34 6.876C35.452 6.812 35.508 6.648 35.508 6.384C35.508 6.112 35.456 5.944 35.352 5.88C35.248 5.808 35.08 5.772 34.848 5.772H32.676ZM32.676 2.988V4.02H34.572C34.804 4.02 34.96 3.984 35.04 3.912C35.128 3.84 35.172 3.704 35.172 3.504C35.172 3.288 35.12 3.148 35.016 3.084C34.92 3.02 34.756 2.988 34.524 2.988H32.676ZM40.6448 9H38.3888V0.96H40.6448V9ZM44.8808 9H39.0008V6.972H44.8808V9ZM44.7008 5.976H39.0008V3.96H44.7008V5.976ZM44.8808 2.988H39.0008V0.96H44.8808V2.988ZM47.8283 9H45.5723V0.96H49.6163C50.2963 0.96 50.8563 1.056 51.2963 1.248C51.7363 1.432 52.0643 1.708 52.2803 2.076C52.4963 2.444 52.6043 2.896 52.6043 3.432C52.6043 3.856 52.5443 4.224 52.4243 4.536C52.3043 4.848 52.1083 5.1 51.8363 5.292C51.5723 5.476 51.2123 5.596 50.7563 5.652V5.76C51.1643 5.864 51.4683 6.04 51.6683 6.288C51.8763 6.536 52.0563 6.832 52.2083 7.176L53.0483 9H50.4203L49.6283 7.332C49.5163 7.1 49.4123 6.92 49.3163 6.792C49.2283 6.656 49.1123 6.564 48.9683 6.516C48.8323 6.46 48.6363 6.432 48.3803 6.432H47.8283V9ZM47.8283 2.988V4.56H49.5323C49.8523 4.56 50.0683 4.504 50.1803 4.392C50.2923 4.28 50.3483 4.064 50.3483 3.744C50.3483 3.448 50.2923 3.248 50.1803 3.144C50.0683 3.04 49.8523 2.988 49.5323 2.988H47.8283ZM56.5707 9.12C55.8187 9.12 55.1867 8.956 54.6747 8.628C54.1627 8.292 53.7747 7.816 53.5107 7.2C53.2547 6.584 53.1267 5.844 53.1267 4.98C53.1267 4.14 53.2867 3.412 53.6067 2.796C53.9267 2.172 54.3947 1.692 55.0107 1.356C55.6267 1.012 56.3827 0.84 57.2787 0.84C58.1187 0.84 58.8107 0.972 59.3547 1.236C59.9067 1.492 60.3187 1.856 60.5907 2.328C60.8627 2.792 60.9987 3.34 60.9987 3.972V4.056H58.5867V4.02C58.5867 3.652 58.4867 3.396 58.2867 3.252C58.0867 3.108 57.6987 3.036 57.1227 3.036C56.7307 3.036 56.4187 3.088 56.1867 3.192C55.9547 3.288 55.7907 3.476 55.6947 3.756C55.5987 4.028 55.5507 4.436 55.5507 4.98C55.5507 5.572 55.6027 6.016 55.7067 6.312C55.8187 6.608 56.0027 6.804 56.2587 6.9C56.5227 6.996 56.8787 7.044 57.3267 7.044C57.7587 7.044 58.0827 7.016 58.2987 6.96C58.5147 6.904 58.6587 6.816 58.7307 6.696C58.8027 6.568 58.8387 6.404 58.8387 6.204V5.52H61.0107V5.688L59.0547 7.872H58.7907C58.7107 8.064 58.5907 8.256 58.4307 8.448C58.2707 8.64 58.0427 8.8 57.7467 8.928C57.4587 9.056 57.0667 9.12 56.5707 9.12ZM61.0107 9H58.8987V6.708L58.8387 6.552V4.812H61.0107V9ZM61.0107 6.36H56.9307V4.668H61.0107V6.36ZM63.1338 9H60.8058L63.6018 0.96H66.8778L69.6618 9H67.1898L65.9178 5.016L65.2818 2.916H65.1138L64.4538 5.016L63.1338 9ZM68.0658 7.452H62.4858V5.484H68.0658V7.452ZM72.9106 9.12C72.1426 9.12 71.5026 9.008 70.9906 8.784C70.4786 8.552 70.0946 8.232 69.8386 7.824C69.5826 7.408 69.4546 6.92 69.4546 6.36V6.204H71.6746V6.3C71.6746 6.516 71.7106 6.684 71.7826 6.804C71.8546 6.916 71.9826 6.992 72.1666 7.032C72.3586 7.072 72.6346 7.092 72.9946 7.092C73.4186 7.092 73.6946 7.056 73.8226 6.984C73.9586 6.912 74.0266 6.788 74.0266 6.612C74.0266 6.484 74.0066 6.384 73.9666 6.312C73.9346 6.24 73.8706 6.184 73.7746 6.144C73.6786 6.096 73.5386 6.06 73.3546 6.036L71.6026 5.76C71.0586 5.672 70.6146 5.524 70.2706 5.316C69.9346 5.1 69.6866 4.832 69.5266 4.512C69.3746 4.184 69.2986 3.812 69.2986 3.396C69.2986 2.916 69.4226 2.484 69.6706 2.1C69.9186 1.716 70.2986 1.412 70.8106 1.188C71.3226 0.956 71.9706 0.84 72.7546 0.84C73.5066 0.84 74.1266 0.956 74.6146 1.188C75.1026 1.412 75.4666 1.724 75.7066 2.124C75.9466 2.516 76.0666 2.964 76.0666 3.468V3.672H73.8466V3.528C73.8466 3.368 73.8106 3.24 73.7386 3.144C73.6746 3.048 73.5546 2.98 73.3786 2.94C73.2026 2.892 72.9466 2.868 72.6106 2.868C72.1866 2.868 71.9026 2.904 71.7586 2.976C71.6146 3.048 71.5426 3.16 71.5426 3.312C71.5426 3.392 71.5626 3.46 71.6026 3.516C71.6426 3.572 71.7066 3.62 71.7946 3.66C71.8906 3.692 72.0146 3.724 72.1666 3.756L73.9186 4.068C74.4866 4.164 74.9426 4.328 75.2866 4.56C75.6386 4.784 75.8906 5.06 76.0426 5.388C76.2026 5.716 76.2826 6.088 76.2826 6.504C76.2826 6.968 76.1666 7.4 75.9346 7.8C75.7106 8.2 75.3506 8.52 74.8546 8.76C74.3666 9 73.7186 9.12 72.9106 9.12ZM81.055 9H78.799V0.96H81.055V9ZM83.527 2.988H76.327V0.96H83.527V2.988ZM86.1838 9H83.9278V0.96H86.1838V9ZM90.4198 9H84.5398V6.972H90.4198V9ZM90.2398 5.976H84.5398V3.96H90.2398V5.976ZM90.4198 2.988H84.5398V0.96H90.4198V2.988ZM94.5794 9H91.6754V6.972H94.4594C94.9314 6.972 95.2954 6.924 95.5514 6.828C95.8074 6.732 95.9834 6.54 96.0794 6.252C96.1834 5.964 96.2354 5.54 96.2354 4.98C96.2354 4.412 96.1834 3.988 96.0794 3.708C95.9834 3.42 95.8074 3.228 95.5514 3.132C95.2954 3.036 94.9314 2.988 94.4594 2.988H91.6754V0.96H94.5794C95.4594 0.96 96.2034 1.12 96.8114 1.44C97.4194 1.752 97.8794 2.208 98.1914 2.808C98.5114 3.408 98.6714 4.132 98.6714 4.98C98.6714 5.828 98.5114 6.552 98.1914 7.152C97.8794 7.752 97.4194 8.212 96.8114 8.532C96.2034 8.844 95.4594 9 94.5794 9ZM93.3674 9H91.1114V0.96H93.3674V9Z"
            fill="#f5f5f5"
          ></path>
        </svg>
      </div>
    </footer>
  );
}