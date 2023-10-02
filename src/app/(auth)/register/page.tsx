"use client";

import { Checkbox, Input, Switch, Textarea } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";

const RegisterPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSelected, setIsSelected] = useState(true);
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl overflow-scroll">
      <h2
        className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
          xl:text-bold"
      >
        Register
      </h2>
      <div className="mt-12">
        <form>
          <div className="mt-4">
            <Input
              type="text"
              variant="underlined"
              label="First Name"
              //   placeholder="Enter your First Name"
            />
          </div>
          <div className="mt-4">
            <Input
              type="text"
              variant="underlined"
              label="Last Name"
              //   placeholder="Enter your First Name"
            />
          </div>
          <div className="mt-4">
            <Input
              type="text"
              variant="underlined"
              label="Email"
              //   placeholder="Enter your First Name"
            />
          </div>
          <div className="mt-8">
            <Input
              label="Password"
              variant="underlined"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <FiEyeOff className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <FiEye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              //   className="max-w-xs"
            />
          </div>
          <div className="mt-8">
            {/* <Checkbox defaultSelected>I work for a company</Checkbox> */}
            <div className="flex flex-col gap-2">
              <Switch isSelected={isSelected} onValueChange={setIsSelected}>
                I want to register a company
              </Switch>
            </div>
          </div>

          {isSelected && (
            <div className="mt-8">
              <h2
                className="text-center text-2xl text-indigo-900 font-display font-semibold lg:text-left xl:text-3xl
          xl:text-bold"
              >
                Register A company
              </h2>
              <div className="mt-4">
                <Input
                  type="text"
                  variant="underlined"
                  label="Name"
                  //   placeholder="Enter your First Name"
                />
              </div>

              <div className="mt-4">
                <p className="text-gray-500">Contact</p>

                <div className="flex items-center gap-3">
                  <Input
                    type="email"
                    variant="underlined"
                    label="Email"
                    //   placeholder="Enter your First Name"
                  />
                  <Input
                    type="phone"
                    variant="underlined"
                    label="Phone"
                    //   placeholder="Enter your First Name"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Textarea
                  variant="underlined"
                  label="Address"
                  cols={2}
                  //   rows={2}

                  //   placeholder="Enter your First Name"
                />
              </div>
            </div>
          )}
          <div className="mt-10">
            <button
              className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                      font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                      shadow-lg"
            >
              Register
            </button>
          </div>
        </form>
        <div className="my-12 text-sm font-display font-semibold text-gray-700 text-center">
          Already have an account ?{" "}
          <Link
            href="login"
            className="cursor-pointer text-indigo-600 hover:text-indigo-800"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
