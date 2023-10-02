import Providers from "@/utils/provider";
import "../globals.css";
import { Poppins } from "next/font/google";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import ToastContainerComp from "@/components/ToastContainer";
import Link from "next/link";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body suppressHydrationWarning className={`${poppins.className}`}>
          {/* <div>{children}</div> */}
          <ToastContainerComp>
            <div>
              <div className="lg:flex">
                <div className="lg:w-1/2 xl:max-w-screen-sm overflow-scroll h-screen">
                  <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
                    <div className="cursor-pointer flex items-center">
                      <div>
                        {/* <svg className="w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 225 225" style="enable-background:new 0 0 225 225;" xml:space="preserve">
                      <style type="text/css">
                          .st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}
                      </style>
                      <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                      <g>
                      <path id="Layer0_0_1_STROKES" className="st0" d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8"/>
                      </g>
                      </g>
                  </svg> */}
                      </div>
                      <Link
                        href="/"
                        className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold"
                      >
                        YFilm
                      </Link>
                    </div>
                  </div>
                  {children}
                </div>
                <div className="hidden lg:flex items-center justify-center bg-indigo-800 flex-1 h-screen">
                  <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
                    <Image
                      priority
                      src="/svg/undraw_collaboration_re_vyau.svg"
                      alt="Follow us on Twitter"
                      width={200}
                      height={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </ToastContainerComp>
        </body>
      </Providers>
    </html>
  );
}
