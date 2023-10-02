import React from "react";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  // You can add any additional props or customization you need here
  register?: UseFormRegisterReturn<any>;
}

const Input = (props: Props) => {
  return (
    <input
      className={`input w-full ${props.className}`}
      {...props}
      {...(props.register && props.register)}
    />
  );
};

export default Input;
