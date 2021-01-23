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
  const base = [];
  switch (type) {
    case "info":
      base.push(tw`border-green-600 hover:bg-green-200`);
      break;
    case "message":
      base.push(tw`border-purple-600 hover:bg-purple-200`);
      break;
    case "warn":
      base.push(tw`border-yellow-600 hover:bg-yellow-200`);
      break;
    case "error":
      base.push(tw`border-purple-600 hover:bg-purple-200`);
      break;
    default:
      break;
  }

  return (
    <Button onClick={onClick} css={base} type={t}>
      {children}
    </Button>
  );
};

export default Submit;
