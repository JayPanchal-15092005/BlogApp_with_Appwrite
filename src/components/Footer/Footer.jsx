import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo.jsx";

function Footer() {
  return (
    <section className="relative overflow-hidden py-12 bg-gray-900 text-white border-t border-gray-700">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap -mx-6">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex flex-col h-full justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="120px" />
              </div>
              <p className="text-sm text-gray-400">
                &copy; 2025 DevUI. All Rights Reserved.
              </p>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="text-sm font-semibold uppercase text-gray-400 mb-5">
              Company
            </h3>
            <ul>
              {["Features", "Pricing", "Affiliate Program", "Press Kit"].map(
                (item) => (
                  <li key={item} className="mb-3">
                    <Link
                      className="text-base text-gray-300 hover:text-white transition duration-300"
                      to="/"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="text-sm font-semibold uppercase text-gray-400 mb-5">
              Support
            </h3>
            <ul>
              {["Account", "Help", "Contact Us", "Customer Support"].map(
                (item) => (
                  <li key={item} className="mb-3">
                    <Link
                      className="text-base text-gray-300 hover:text-white transition duration-300"
                      to="/"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <h3 className="text-sm font-semibold uppercase text-gray-400 mb-5">
              Legals
            </h3>
            <ul>
              {["Terms & Conditions", "Privacy Policy", "Licensing"].map(
                (item) => (
                  <li key={item} className="mb-3">
                    <Link
                      className="text-base text-gray-300 hover:text-white transition duration-300"
                      to="/"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
