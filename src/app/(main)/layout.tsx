"use client";

import Button from "@/components/Button";
import logo from "/logo.png";
import { RiMenu4Fill } from "react-icons/ri";
import Providers from "@/utils/provider";
import ToastContainerComp from "@/components/ToastContainer";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
  return (
    <Providers>
      <ToastContainerComp>
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

          <div className="drawer-content bg-base-200 ">
            <div className="navbar bg-base-100 lg:hidden">
              <div className="flex-1">
                <a className="btn btn-ghost">
                  {/* <img className="w-28 h-auto float-left " src={logo} alt="logo" /> */}
                  Hux Contact
                </a>
              </div>
              <div className="flex-none">
                <label
                  className="btn btn-square btn-ghost drawer-button"
                  htmlFor="my-drawer-2"
                >
                  <RiMenu4Fill size={25} />
                </label>
              </div>
            </div>
            <div className="p-5 md:p-10 lg:p-14">
              {/* Page content here */}
              {children}
            </div>
          </div>

          <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu w-80 h-full bg-base-100 text-base-content text-center">
              {/* Sidebar content here */}
              <div className=" py-5 px-5"> Hux Contact</div>
              <li className=" cursor-pointer px-2 py-2 mb-2 bg-primary w-full text-white">
                Contacts
              </li>
              <li className="cursor-pointer px-2 py-2 mb-2 bg-primary w-full text-white">
                Users
              </li>
              <Button
                onClick={() => (window as any).my_modal_5.showModal()}
                className="mt-auto btn btn-primary"
              >
                Add New Contact
              </Button>
            </ul>
          </div>
        </div>
      </ToastContainerComp>
    </Providers>
  );
};

export default MainLayout;
