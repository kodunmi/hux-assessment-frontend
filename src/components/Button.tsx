import React from "react";

const Button = ({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: React.ReactNode;
}) => {
  return <button>{children}</button>;
};

export default Button;
