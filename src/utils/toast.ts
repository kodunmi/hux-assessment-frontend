"use client";
import { ToastContainer, toast } from "react-toastify";
import React from "react";

const notifySuccess = (message: string) =>
  toast.success(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

const notifyError = (message: string) =>
  toast.error(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

// eslint-disable-next-line no-unused-expressions

export { notifySuccess, notifyError };
