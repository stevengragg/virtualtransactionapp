import React from "react";

import AppIconSVG from "/imports/ui/svg/AppIconSVG";

function Footer() {
  return (
    <footer className="bg-white lg:block hidden">
      <div className="container mx-auto px-8">
        <div className="w-full flex flex-col md:flex-row py-6">
          <div className="flex-1 mb-6 text-black">
            <a
              className="text-pink-600 no-underline hover:no-underline font-bold text-2xl lg:text-4xl flex items-center"
              href="#"
            >
              <span>
                <AppIconSVG width={64} height={64} />
              </span>
              <span>
                <img src="/imgs/UCCLOGO.png" alt="UCCLogo" className=" object-contain" />
              </span>
            </a>
            <b>Virtual Transaction Assistance | UCC Congress</b>
          </div>
          <div className="flex-1">
            <p className="uppercase text-gray-500 md:mb-6">Links</p>
            <ul className="list-reset mb-6">
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">
                  FAQ
                </a>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">
                  Help
                </a>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <p className="uppercase text-gray-500 md:mb-6">Legal</p>
            <ul className="list-reset mb-6">
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">
                  Terms
                </a>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <p className="uppercase text-gray-500 md:mb-6">Social</p>
            <ul className="list-reset mb-6">
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">
                  Facebook
                </a>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">
                  Linkedin
                </a>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <p className="uppercase text-gray-500 md:mb-6">UCC</p>
            <ul className="list-reset mb-6">
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a
                  href="https://www.ucc-caloocan.edu.ph/"
                  target={"_blank"}
                  className="no-underline hover:underline text-gray-800 hover:text-pink-500"
                >
                  Official UCC Website
                </a>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a className="no-underline hover:underline text-gray-800 hover:text-pink-500">About Us</a>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
