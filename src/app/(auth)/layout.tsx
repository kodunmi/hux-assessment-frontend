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
        <body
          suppressHydrationWarning
          className={`${poppins.className} bg-base-100`}
        >
          {/* <div>{children}</div> */}
          <ToastContainerComp>
            <div>
              <div className="lg:flex">
                <div className="lg:w-1/2 xl:max-w-screen-sm overflow-scroll h-screen">
                  <div className="py-2 flex justify-center lg:mt-5 lg:px-12">
                    <div className="cursor-pointer flex items-center">
                      <Link
                        href="/"
                        className="text-2xl  text-indigo-800 tracking-wide ml-2 font-semibold"
                      >
                        Hux Contact
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
