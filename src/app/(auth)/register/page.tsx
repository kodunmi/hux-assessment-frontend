"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { notifyError, notifySuccess } from "@/utils/toast";
import Input from "@/components/Input";
import Button from "@/components/Button";

interface RegisterFormData {
  email: string;
  name: string;
  password: string;
}

const registerFunc = async (data: RegisterFormData) =>
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
    data
  );

const RegisterPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const { push } = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: registerFunc,

    onSuccess: (e: any) => {
      localStorage.setItem("user", JSON.stringify(e.data));
      console.log(e);

      notifySuccess("Registration successful");
      push("/login");
    },
    onError: (e: AxiosError<{ message: string }>) => {
      notifyError(e.response?.data.message as string);
    },
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      mutate(data);
      console.log("Registration successful");
    } catch (error) {
      console.error("Registration failed");
    }
  };

  return (
    <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
      <h2
        className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
          xl:text-bold"
      >
        Register
      </h2>
      <div className="mt-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              type="email"
              register={register("email", { required: "Email is required" })}
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="mt-4">
            <Input
              type="text"
              register={register("name", { required: "Name is required" })}
              placeholder="Name"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          <div className="mt-4">
            <Input
              type="password"
              register={register("password", {
                required: "Password is required",
              })}
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div className="mt-6">
            <Button isLoading={isLoading} type="submit">
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
