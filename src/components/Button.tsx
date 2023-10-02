import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const Button = ({ isLoading, children, type = "button", ...props }: Props) => {
  return (
    <button
      className={`btn btn-primary w-full ${props.className}`}
      disabled={isLoading}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
