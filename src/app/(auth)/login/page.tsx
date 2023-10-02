"use client";

import Link from "next/link";
import React from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { useForm, SubmitHandler } from "react-hook-form";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { notifyError, notifySuccess } from "@/utils/toast";
import Input from "@/components/Input";
import Button from "@/components/Button";

interface LoginFormData {
  email: string;
  password: string;
}

const login = async (data: LoginFormData) =>
  await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, data);

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { push } = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: login,

    onSuccess: (e: any) => {
      localStorage.setItem("user", JSON.stringify(e.data));
      Cookies.set("token", e.data.token);
      console.log(e);

      notifySuccess("Login successful");
      push("/contacts");
    },
    onError: (e: AxiosError<{ message: string }>) => {
      notifyError(e.response?.data.message as string);
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      mutate(data);
      console.log("Login successful");
    } catch (error) {
      console.error("Login failed");
    }
  };

  return (
    <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
      <h2
        className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
          xl:text-bold"
      >
        Log in
      </h2>
      <div className="mt-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              type="email"
              register={register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="mt-8">
            <Input
              type="password"
              register={register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div className="mt-10">
            <Button isLoading={isLoading} type="submit">
              Log In
            </Button>
          </div>
        </form>

        <div className="flex justify-between items-center mt-12">
          <Link
            href="forget-password"
            className="cursor-pointer text-indigo-600 hover:text-indigo-800"
          >
            Forget Password
          </Link>
          <Link
            href="register"
            className="cursor-pointer text-indigo-600 hover:text-indigo-800"
          >
            Sign up
          </Link>
        </div>

        {/* <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
          Don't have an account ?{" "}
          <Link
            href="register"
            className="cursor-pointer text-indigo-600 hover:text-indigo-800"
          >
            Sign up
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
