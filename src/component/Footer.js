/* eslint-disable @next/next/no-img-element */
// components/Footer.tsx
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="main">
      {/* Newsletter Section */}
      <section className="newsletter mb-[15px]">
        <div className=" mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full">
              <div className="relative newsletter-inner p-[20px] md:px-[78px] md:py-[84px]">
                <div className="newsletter-content">
                  <h2 className="mb-10 text-2xl md:text-5xl font-bold">
                    Stay home & get your daily <br />
                    needs from our shop
                  </h2>
                  <p className="mb-11">
                    Start Your Daily Shopping with{" "}
                    <span className="text-brand">Nest Mart</span>
                  </p>
                  <form className="form-subcriber hidden md:flex">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="flex-1 px-4 py-2 md:pl-[58px] pl-[0px]  border border-gray-300 rounded-l-md focus:outline-none"
                    />
                    <button
                      className="btn px-2 md:px-6 py-2 bg-green-600 text-[10px] text-white rounded-r-md"
                      type="submit"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>

                <img
                  src="https://nest-frontend-v6.vercel.app/assets/imgs/banner/banner-9.png"
                  alt="newsletter"
                  width={400}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured section-padding">
        <div className=" mx-auto p-[20px]">
          <div className="md:grid grid-cols-4">
            {[
              {
                icon: "icon-1.svg",
                title: "Best prices & offers",
                text: "Orders $50 or more",
              },
              // {
              //   icon: "icon-2.svg",
              //   title: "Free delivery",
              //   text: "24/7 amazing services",
              // },
              {
                icon: "icon-3.svg",
                title: "Great daily deal",
                text: "When you sign up",
              },
              {
                icon: "icon-4.svg",
                title: "Wide assortment",
                text: "Mega Discounts",
              },
              {
                icon: "icon-5.svg",
                title: "Easy returns",
                text: "Within 30 days",
              },
              {
                icon: "icon-6.svg",
                title: "Safe delivery",
                text: "Within 30 days",
                hiddenOnXL: true,
              },
            ].map((item, index) => (
              <div
                key={index}
                className={` p-2 ${item.hiddenOnXL ? "xl:hidden" : ""}`}
              >
                <div className="banner-left-icon flex items-center">
                  <div className="banner-icon mr-2">
                    <img
                      src={`https://nest-frontend-v6.vercel.app/assets/imgs/theme/icons/icon-1.svg`}
                      alt={item.title}
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="banner-text">
                    <h3 className="icon-box-title font-semibold">
                      {item.title}
                    </h3>
                    <p>{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Mid Section */}
      <section className="section-padding footer-mid">
        <div className=" mx-auto p-[20px]">
          <div className="flex flex-wrap -mx-4">
            {/* About Widget */}
            <div className="w-full md:w-1/3 lg:w-1/6 px-4 mb-6 md:mb-0">
              <div className="widget-about font-md">
                <div className="logo mb-6">
                  <a className="mb-4 inline-block">
                    <Image
                      src="https://i.ibb.co.com/5ggRm6QC/nonggor.png"
                      alt="logo"
                      width={150}
                      height={50}
                      unoptimized
                    />
                  </a>
                  <p className="font-lg text-heading">
                    Awesome grocery store website template
                  </p>
                </div>
                <ul className="contact-infor space-y-2">
                  <li className="flex items-start">
                    <i className="ri-map-pin-line text-green-600 text-xl mr-2 mt-1"></i>
                    <span>
                      <strong>Address: </strong>5171 W Campbell Ave undefined
                      Kent, Utah 53127 United States
                    </span>
                  </li>
                  <li className="flex items-center">
                    <i className="ri-phone-line text-green-600 text-xl mr-2"></i>
                    <span>
                      <strong>Call Us: </strong>(+91) - 540-025-124553
                    </span>
                  </li>
                  <li className="flex items-center">
                    <i className="ri-mail-line text-green-600 text-xl mr-2"></i>
                    <span>
                      <strong>Email: </strong>sale@Nest.com
                    </span>
                  </li>
                  <li className="flex items-center">
                    <i className="ri-time-line text-green-600 text-xl mr-2"></i>
                    <span>
                      <strong>Hours: </strong>10:00 - 18:00, Mon - Sat
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer Links Widgets */}
            {[
              {
                title: "Company",
                links: [
                  "About Us",
                  "Delivery Information",
                  "Privacy Policy",
                  "Terms & Conditions",
                  "Contact Us",
                  "Support Center",
                  "Careers",
                ],
              },
              {
                title: "Account",
                links: [
                  "Sign In",
                  "View Cart",
                  "My Wishlist",
                  "Track My Order",
                  "Help Ticket",
                  "Shipping Details",
                  "Compare products",
                ],
              },
              {
                title: "Corporate",
                links: [
                  "Become a Vendor",
                  "Affiliate Program",
                  "Farm Business",
                  "Farm Careers",
                  "Our Suppliers",
                  "Accessibility",
                  "Promotions",
                ],
              },
              {
                title: "Popular",
                links: [
                  "Milk & Flavoured Milk",
                  "Butter and Margarine",
                  "Eggs Substitutes",
                  "Marmalades",
                  "Sour Cream and Dips",
                  "Tea & Kombucha",
                  "Cheese",
                ],
              },
            ].map((widget, idx) => (
              <div
                key={idx}
                className="w-full md:w-1/3 lg:w-1/6 px-4 mb-6 md:mb-0"
              >
                <h4 className="widget-title font-semibold mb-4">
                  {widget.title}
                </h4>
                <ul className="footer-list space-y-2">
                  {widget.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="hover:text-green-600">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Install App Widget */}
            <div className="w-full md:w-1/3 lg:w-1/6 px-4">
              <h4 className="widget-title font-semibold mb-2">Install App</h4>
              <p>From App Store or Google Play</p>
              <div className="download-app flex space-x-2 mb-4">
                <a href="#">
                  <Image
                    src="https://nest-frontend-v6.vercel.app/assets/imgs/theme/app-store.jpg"
                    alt="App Store"
                    width={120}
                    height={40}
                    unoptimized
                  />
                </a>
                <a href="#">
                  <Image
                    src="https://nest-frontend-v6.vercel.app/assets/imgs/theme/google-play.jpg"
                    alt="Google Play"
                    width={120}
                    height={40}
                    unoptimized
                  />
                </a>
              </div>
              <p className="mb-2">Secured Payment Gateways</p>
              <Image
                src="https://nest-frontend-v6.vercel.app/assets/imgs/theme/payment-method.png"
                alt="Payment Methods"
                width={200}
                height={40}
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Bottom */}
      <div className=" mx-auto px-4 pb-8">
        <div className="flex flex-wrap items-center">
          {/* Copyright */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <p className="text-sm">
              © 2024, <strong className="text-brand">Nest</strong> - HTML
              Ecommerce Template <br />
              All rights reserved
            </p>
          </div>

          {/* Hotline */}
          <div className="w-full md:w-1/3 text-center hidden xl:flex justify-center space-x-8">
            <div className="hotline flex items-center space-x-2">
              <i className="ri-phone-line text-green-600 text-xl"></i>
              <p>
                1900 - 6666 <span>Working 8:00 - 22:00</span>
              </p>
            </div>
            <div className="hotline flex items-center space-x-2">
              <i className="ri-phone-line text-green-600 text-xl"></i>
              <p>
                1900 - 8888 <span>24/7 Support Center</span>
              </p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="w-full md:w-1/3 text-right hidden md:block">
            <div className="mobile-social-icon flex items-center justify-end space-x-3">
              <h6 className="mr-2 text-white">Follow Us</h6>
              <a
                href="#"
                className="text-white text-xl  "
              >
                <i className="ri-facebook-line"></i>
              </a>
              <a
                href="#"
                className="text-white text-xl  "
              >
                <i className="ri-twitter-line"></i>
              </a>
              <a
                href="#"
                className="text-white text-xl  "
              >
                <i className="ri-instagram-line"></i>
              </a>
              <a
                href="#"
                className="text-white text-xl  "
              >
                <i className="ri-pinterest-line"></i>
              </a>
              <a
                href="#"
                className="text-white text-xl  "
              >
                <i className="ri-youtube-line"></i>
              </a>
            </div>
            <p className="text-sm mt-2 text-white">
              Up to 15% discount on your first subscribe
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
