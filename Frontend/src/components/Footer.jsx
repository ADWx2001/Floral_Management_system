/* eslint-disable no-irregular-whitespace */

import "boxicons/css/boxicons.min.css";

export default function FooterCom() {
  return (
    <div style={{ backgroundColor: "#151515" }}>
      <footer
        className=" bg-neutral-100 text-center text-neutral-600 dark:bg-neutral-600 dark:text-neutral-200 lg:text-left"
        style={{ backgroundColor: "#151515" }}
      >
        <div className="flex items-center justify-center border-b-2 border-neutral-200 p-6 dark:border-neutral-500 lg:justify-between">
          <div className="mr-12 hidden lg:block">
            <span className="font-cinzel text-white dark:text-neutral-200">
              Get connected with us on social networks:
            </span>
          </div>

          <div className="flex justify-center">
            <a
              href="https://www.facebook.com/SondurumamalKurunegala/"
              className="mr-6 text-neutral-600 dark:text-neutral-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 48 48"
                id="facebook"
              >
                <g fill="none" fillRule="evenodd">
                  <g fill="#4460A0" transform="translate(-200 -160)">
                    <path d="M225.638 208H202.65a2.65 2.65 0 0 1-2.649-2.65v-42.7a2.649 2.649 0 0 1 2.65-2.65h42.701a2.649 2.649 0 0 1 2.649 2.65v42.7a2.65 2.65 0 0 1-2.649 2.65h-12.232v-18.588h6.24l.934-7.244h-7.174v-4.625c0-2.098.583-3.527 3.59-3.527l3.836-.002v-6.479c-.663-.088-2.94-.285-5.59-.285-5.53 0-9.317 3.376-9.317 9.575v5.343h-6.255v7.244h6.255V208z"></path>
                  </g>
                </g>
              </svg>
            </a>
            <a
              href="#!"
              className="mr-6 text-neutral-600 dark:text-neutral-200"
            >
             {/* if there instagram account svg need to paste here */}
            </a>

          </div>
        </div>

        <div className="mx-6 py-10 text-center md:text-left">
          <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex justify-center items-center">
              <img
                src="/logo/black_logo.png"
                alt="FloraShop Logo"
                className="h-16 w-auto sm:h-20 md:h-24 lg:h-28 xl:h-32 2xl:h-36"
              />
            </div>

            <div className="font-cinzel text-white">
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                Products
              </h6>
              <p className="mb-4">
                <a href="#!" className=" text-white dark:text-neutral-200">
                  Flower
                </a>
              </p>
              <p className="mb-4">
                <a href="#!" className=" text-white dark:text-neutral-200">
                  Gift Basket
                </a>
              </p>
              <p className="mb-4">
                <a href="#!" className=" text-white dark:text-neutral-200">
                  Chocolate
                </a>
              </p>
              <p>
                <a href="#!" className=" text-white dark:text-neutral-200">
                  Cakes
                </a>
              </p>
            </div>

            <div className="font-cinzel text-white">
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                Useful links
              </h6>
              <p className="mb-4">
                <a href="#!" className=" text-white dark:text-neutral-200">
                  Pricing
                </a>
              </p>
              <p className="mb-4">
                <a href="#!" className=" text-white dark:text-neutral-200">
                  Settings
                </a>
              </p>
              <p className="mb-4">
                <a href="#!" className=" text-white dark:text-neutral-200">
                  Orders
                </a>
              </p>
              <p>
                <a href="#!" className=" text-white dark:text-neutral-200">
                  Help
                </a>
              </p>
            </div>

            {/* Address details */}
            <div className="font-cinzel text-white dark:text-neutral-200">
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                Contact
              </h6>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <box-icon name="home" color="white"></box-icon>: Wanduragala,
                Kurunegala ,SL
              </p>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <box-icon name="envelope" color="white"></box-icon>:
                flora@info.com
              </p>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <box-icon name="phone-call" color="white"></box-icon>: + 01 234
                567 88
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <box-icon name="phone-call" color="white"></box-icon>: + 01 234
                567 89
              </p>
            </div>
          </div>
        </div>

        <div
          className="bg-neutral-200 p-6 text-center dark:bg-neutral-700 flex justify-center items-center"
          style={{ backgroundColor: "#151515" }}
        >
          <a href="https://www.payhere.lk" target="_blank" rel="noreferrer">
            <img
              src="https://www.payhere.lk/downloads/images/payhere_short_banner.png"
              alt="PayHere"
              width="500"
            />
          </a>
        </div>
      </footer>
          
    </div>
  );
}
