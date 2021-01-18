import React, { PropsWithChildren } from "react";
import tw from "twin.macro";

const Button = tw.button`
  inline-flex justify-center 
  py-2 px-4 ml-4
  border shadow-sm rounded-md
  text-sm font-medium
  
  transition transform duration-100 ease-in-out
  hover:shadow-xl
`;

interface SubmitProperty {
  type?: "info" | "message" | "warn" | "error";
  isSubmit?: boolean;
  onClick?: () => void;
}

const Submit = ({ onClick, type, isSubmit, children }: PropsWithChildren<SubmitProperty>): JSX.Element => {
  const t = isSubmit ? "submit" : "button";
  switch (type) {
    case "info":
      return (
        <Button onClick={onClick} tw="border-green-600 hover:bg-green-200" type={t}>
          {children}
        </Button>
      );
    case "message":
      return (
        <Button onClick={onClick} tw="border-purple-600 hover:bg-purple-200" type={t}>
          {children}
        </Button>
      );
    case "warn":
      return (
        <Button onClick={onClick} tw="border-yellow-600 hover:bg-yellow-200" type={t}>
          {children}
        </Button>
      );
    case "error":
      return (
        <Button onClick={onClick} tw="border-red-600 hover:bg-red-200" type={t}>
          {children}
        </Button>
      );
    default:
      return (
        <Button onClick={onClick} type={t}>
          {children}
        </Button>
      );
  }
  return;
};

export default Submit;
