export default function Footer() {
  const social = [
    {
      image: "/images/footer/facebook.png",
      link: "https://www.facebook.com/MolimorFoods1/",
    },
    {
      image: "/images/footer/x.png",
      link: "https://x.com/MMolimor",
    },
    {
      image: "/images/footer/instagram.png",
      link: "https://www.instagram.com/molimorfoods/",
    },
    {
      image: "/images/footer/linkedin.png",
      link: "https://www.linkedin.com/company/molimor-private-limited/",
    },
    {
      image: "/images/footer/pintrest.png",
      link: "https://in.pinterest.com/molimor777/",
    },
    {
      image: "/images/footer/youtube.png",
      link: "https://www.youtube.com/@molimor",
    },
  ];
  return (
    <footer className="py-[51px]">
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[120px]">
          {/* Logo and Description Section */}
          <div className="space-y-4">
            <div className="flex items-center mb-5">
              <img src="/images/logo.png" className="h-[66px]" alt="" />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-[293px] text-justify mb-[50px]">
              Lorem ipsum dolor sit amet consectetur. Orci posuere vulputate
              tempor tempor placerat. Et et placerat ut tincidunt sagittis. Non
              feugiat vitae in quis semper lobortis aliquam auctor. Quis quis
              dui urna pharetra feugiat ornare.
            </p>
            <div className="space-y-[10px]">
              <p className="text-lg font-bold text-[#333333]">
                Follow us on social media:
              </p>
              <div className="flex gap-[10px]">
                {social &&
                  social.map((item) => {
                    return (
                      <a
                        href={item.link}
                        target="_blank"
                        className="p-[10px] h-[36px] border bg-white border-[#E5E7EB] rounded-[6px]"
                      >
                        <img src={item.image} className="h-4" alt="" />
                      </a>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Let Us Help You Section */}
          <div className="space-y-[22px]">
            <h3 className="text-lg font-bold text-[#333333]">
              Let Us Help You
            </h3>
            <ul className="space-y-[10px]">
              <li>
                <a href="#" className="text-sm text-[#333333]">
                  Your Account
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#333333]">
                  Your Orders
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#333333]">
                  Returns & Replacements
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#333333]">
                  Shipping Rates & Policies
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#333333]">
                  Refund and Returns Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#333333]">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#333333]">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#333333]">
                  Cookie Settings
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#333333]">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Get to Know Us Section */}
          <div className="space-y-[22px]">
            <h3 className="text-lg font-bold text-[#333333]">Get to Know Us</h3>
            <ul className="space-y-[10px]">
              <li>
                <a href="#" className="text-sm text-[#333333]">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#333333]">
                  Career
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#333333]">
                  Returns & Replacements
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#333333]">
                  Distributor
                </a>
              </li>
            </ul>
          </div>

          {/* Do You Need Help Section */}
          <div className="space-y-[22px]">
            <h3 className="text-lg font-bold text-[#333333]">
              Do You Need Help?
            </h3>
            <p className="text-sm text-[#333333] mb-[22px]">
              Lorem ipsum dolor sit amet consectetur. Cursus arcu posuere tortor
              duis urna.
            </p>
            <div className="space-y-[22px]">
              <div className="flex items-center space-x-[22px]">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.3434 16.436C21.13 16.3054 20.122 16.0347 19.3194 15.624C18.7407 15.4 18.148 15.358 17.5414 15.498C16.9347 15.638 16.398 15.9134 15.9314 16.324L14.8674 17.5C12.5154 15.9694 10.574 14.028 9.04338 11.676L10.1074 10.612C10.5554 10.164 10.84 9.6367 10.9614 9.03004C11.0827 8.42337 11.0314 7.82137 10.8074 7.22404C10.4714 6.3467 10.238 5.33871 10.1074 4.20004C9.97672 3.4347 9.59872 2.79537 8.97338 2.28204C8.34805 1.76871 7.63405 1.51204 6.83138 1.51204H3.10738C2.52872 1.54937 2.01072 1.73604 1.55338 2.07204C1.09605 2.40804 0.741382 2.83737 0.489382 3.36004C0.237382 3.8827 0.130049 4.43337 0.167382 5.01204C0.354049 6.8787 0.764715 8.70337 1.39938 10.486C2.03405 12.2687 2.87405 13.944 3.91938 15.512C5.78605 18.4614 8.19405 20.8694 11.1434 22.736C12.73 23.7254 14.41 24.5374 16.1834 25.172C17.9567 25.8067 19.7767 26.2454 21.6434 26.488H22.0074C22.3994 26.488 22.7914 26.404 23.1834 26.236C23.5754 26.068 23.9207 25.8394 24.2194 25.55C24.518 25.2607 24.7467 24.92 24.9054 24.528C25.064 24.136 25.1434 23.7347 25.1434 23.324V19.824C25.1434 18.9654 24.882 18.2187 24.3594 17.584C23.8367 16.9494 23.1647 16.5667 22.3434 16.436ZM23.2674 19.712V23.212C23.2674 23.604 23.118 23.9587 22.8194 24.276C22.4834 24.5747 22.1287 24.724 21.7554 24.724H21.6434C19.926 24.556 18.2554 24.1827 16.6314 23.604C14.9514 23.0067 13.3927 22.2134 11.9554 21.224C10.63 20.3654 9.39338 19.362 8.24538 18.214C7.09738 17.066 6.08472 15.82 5.20738 14.476C4.27405 13.02 3.51338 11.4707 2.92538 9.82804C2.33738 8.18537 1.93138 6.50537 1.70738 4.78804C1.76338 4.35871 1.93138 3.99937 2.21138 3.71004C2.49138 3.4207 2.82738 3.27604 3.21938 3.27604H6.83138C7.18605 3.27604 7.50805 3.40204 7.79738 3.65404C8.08672 3.90604 8.23138 4.20004 8.23138 4.53604C8.26872 5.02137 8.36205 5.5627 8.51138 6.16004C8.60472 6.53337 8.75405 7.07471 8.95938 7.78404L9.04338 8.03604C9.15538 8.33471 9.18338 8.61937 9.12738 8.89004C9.07138 9.1607 8.93138 9.38937 8.70738 9.57604L7.41938 10.976C7.25138 11.088 7.15338 11.242 7.12538 11.438C7.09738 11.634 7.11138 11.8254 7.16738 12.012C8.04472 13.524 9.11338 14.91 10.3734 16.17C11.6334 17.43 13.0194 18.4987 14.5314 19.376C14.6994 19.488 14.886 19.5254 15.0914 19.488C15.2967 19.4507 15.4554 19.3667 15.5674 19.236L17.1074 17.724C17.294 17.5374 17.5367 17.4067 17.8354 17.332C18.134 17.2574 18.3954 17.276 18.6194 17.388C19.702 17.8174 20.8687 18.088 22.1194 18.2C22.474 18.256 22.7727 18.438 23.0154 18.746C23.258 19.054 23.342 19.376 23.2674 19.712ZM14.8674 3.13604C16.3794 3.28537 17.7514 3.75204 18.9834 4.53604C20.2154 5.32004 21.2234 6.32804 22.0074 7.56004C22.7914 8.79204 23.258 10.164 23.4074 11.676C23.4074 11.9 23.496 12.0914 23.6734 12.25C23.8507 12.4087 24.0327 12.488 24.2194 12.488H24.3314C24.5554 12.488 24.7467 12.39 24.9054 12.194C25.064 11.998 25.1434 11.7787 25.1434 11.536C24.9567 9.78137 24.3874 8.1667 23.4354 6.69204C22.5207 5.25471 21.3307 4.0787 19.8654 3.16404C18.4 2.24937 16.7807 1.6987 15.0074 1.51204C14.7647 1.51204 14.5454 1.59137 14.3494 1.75004C14.1534 1.9087 14.0554 2.0907 14.0554 2.29604C14.0554 2.50137 14.1347 2.69271 14.2934 2.87004C14.452 3.04737 14.6434 3.13604 14.8674 3.13604ZM14.0554 6.88804C13.9994 7.11204 14.046 7.3267 14.1954 7.53204C14.3447 7.73737 14.5314 7.86804 14.7554 7.92404C15.726 8.1107 16.5707 8.56804 17.2894 9.29604C18.008 10.024 18.4887 10.892 18.7314 11.9C18.7874 12.124 18.89 12.2967 19.0394 12.418C19.1887 12.5394 19.3567 12.6 19.5434 12.6H19.6554C19.898 12.544 20.0894 12.4134 20.2294 12.208C20.3694 12.0027 20.4114 11.7787 20.3554 11.536C20.1314 10.2107 19.5387 9.0627 18.5774 8.09204C17.616 7.12137 16.4634 6.4867 15.1194 6.18804C14.8767 6.13204 14.6527 6.16471 14.4474 6.28604C14.242 6.40737 14.1114 6.60804 14.0554 6.88804Z"
                    fill="#333333"
                  />
                </svg>

                <div>
                  <p className="text-xs mb-[1px] text-[#333333] opacity-60">
                    Monday-Friday, 08am-5pm
                  </p>
                  <p className="text-[20px] font-bold text-[#333333]">
                    0 800 300-353
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-[22px]">
                <svg
                  width="28"
                  height="29"
                  viewBox="0 0 28 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.0842 4.336H3.43616C2.85749 4.336 2.31616 4.476 1.81216 4.756C1.30816 5.036 0.906823 5.41867 0.608156 5.904C0.30949 6.38933 0.160156 6.92133 0.160156 7.5V21.5C0.160156 22.0787 0.304823 22.62 0.594156 23.124C0.88349 23.628 1.27549 24.0293 1.77016 24.328C2.26482 24.6267 2.82016 24.776 3.43616 24.776H22.0842C22.6628 24.776 23.2042 24.6313 23.7082 24.342C24.2122 24.0527 24.6135 23.6607 24.9122 23.166C25.2108 22.6713 25.3602 22.116 25.3602 21.5V7.5C25.3602 6.92133 25.2108 6.38933 24.9122 5.904C24.6135 5.41867 24.2122 5.036 23.7082 4.756C23.2042 4.476 22.6628 4.336 22.0842 4.336ZM3.43616 6.1H22.0842C22.4948 6.1 22.8308 6.24 23.0922 6.52C23.3535 6.8 23.4842 7.12667 23.4842 7.5V8.2L13.4602 14.612C13.2175 14.724 12.9655 14.78 12.7042 14.78C12.4428 14.78 12.1908 14.724 11.9482 14.612L2.03616 8.2V7.5C2.03616 7.08933 2.16682 6.75333 2.42816 6.492C2.68949 6.23067 3.02549 6.1 3.43616 6.1ZM22.0842 23.012H3.43616C3.04416 23.012 2.71282 22.8673 2.44216 22.578C2.17149 22.2887 2.03616 21.9667 2.03616 21.612V10.3L11.1362 16.124C11.5282 16.4413 12.0695 16.6 12.7602 16.6C13.4508 16.6 13.9922 16.4413 14.3842 16.124L23.4842 10.3V21.5C23.4842 21.9107 23.3535 22.2653 23.0922 22.564C22.8308 22.8627 22.4948 23.012 22.0842 23.012Z"
                    fill="#333333"
                  />
                </svg>

                <div>
                  <p className="text-xs mb-[1px] text-[#333333] opacity-60">
                    Need help with your order?
                  </p>
                  <p className="text-sm font-semibold text-[#333333]">
                    info@example.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-[49px] flex flex-col md:flex-row justify-between">
          <p className="text-xs text-gray-600">
            ©Copyright <span className="font-bold">Molimor</span> 2023. All
            Right Reserved.
          </p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <img src="/images/footer/applePay.png" className="h-8" alt="" />
            <img src="/images/footer/visa.png" className="h-8" alt="" />
            <img src="/images/footer/discover.png" className="h-8" alt="" />
            <img src="/images/footer/mastercard.png" className="h-8" alt="" />
            <img src="/images/footer/secure.png" className="h-8" alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
}
